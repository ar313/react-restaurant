using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthorizeNet.Api.Contracts.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Configurations;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Domain.Services;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepository;
		private readonly IUserRepository _userRepository;
		private readonly IDeliveryRepository _deliveryRepository;
		private readonly IAddressRepository _addressRepository;
		private readonly IDishRepository _dishRepository;
		private readonly IOrderDishRepository _orderDishRepository;
		private readonly ICityRepository _cityRepository;
		private readonly ICountryRepository _countryRepository;


		public OrderController(IOrderRepository orderRepository,
			IUserRepository userRepository,
			IDeliveryRepository deliveryRepository,
			IAddressRepository addressRepository,
			IDishRepository dishRepository,
			IOrderDishRepository orderDishRepository,
			ICityRepository cityRepository,
			ICountryRepository countryRepository)
		{
			_orderRepository = orderRepository;
			_userRepository = userRepository;
			_deliveryRepository = deliveryRepository;
			_addressRepository = addressRepository;
			_dishRepository = dishRepository;
			_orderDishRepository = orderDishRepository;
			_countryRepository = countryRepository;
			_cityRepository = cityRepository;
			
		}

		[HttpPost]
		//[Authorize(Policy = PermissionsList.PermissionsOrderAdd)]
		public async Task<IActionResult> AddOrder([FromBody] OrderModel order)
		{
			var dishNames = order.Dishes.Select(d => d.Name).ToList();
			List<Dish> dishes = (List<Dish>)await _orderRepository.GetDishList(dishNames);
			bool isPaid = false;
			if ( dishes.Count == 0 
				|| User.Identity.Name != null
				|| !ModelState.IsValid)
			{
				return BadRequest();
			}

			Guid orderId = Guid.NewGuid();

			decimal totalPrice = 0;
			var lineItems = new List<lineItemType>();
			List <OrderDish> orderDishes= new List<OrderDish>();

			var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
			User orderUser = await _userRepository.GetUserById(userId.Value);

			Order newOrder = new Order()
			{
				Id = orderId,
				User = orderUser,
				OrderTime = DateTime.Now,
				OrderExpirationTime = DateTime.Now.AddHours(1),
				IsForDelivery = order.IsForDelivery,
				IsCancelled = false,
				IsClosed = false
			};


			dishes.ForEach(dish =>
			{
				var quantity = order.Dishes.Where(d => d.Name == dish.Name).FirstOrDefault().Quantity;
				lineItems.Add(new lineItemType
				{
					itemId = dish.Id.ToString(),
					name = dish.Name,
					quantity = quantity,
					unitPrice = (decimal)dish.DishPrice
				});

				orderDishes.Add(new OrderDish
				{
					Id = Guid.NewGuid(),
					Dish = dish,
					Order = newOrder,
					Quantity = quantity
				});

				totalPrice += (decimal)dish.DishPrice * quantity;
			});

			newOrder.TotalPrice = (float)totalPrice;
			newOrder.OrderItems = orderDishes;

			switch(order.PaymentType)
			{
				case PaymentTypes.CreditCard:
				{
					var creditCard = new creditCardType
					{
						cardNumber = order.CreditCard.CardNumber,
						expirationDate = order.CreditCard.ExpirationDate,
						cardCode = order.CreditCard.CCV
					};

					var billingAddress = new customerAddressType
					{
						firstName = order.BillingAddressModel.FirstName,
						lastName = order.BillingAddressModel.LastName,
						address = order.BillingAddressModel.Address,
						city = order.BillingAddressModel.City,
						zip = order.BillingAddressModel.ZIP
					};

					var response = ChargeCreditCard.Run(creditCard, billingAddress, lineItems, totalPrice);
					if (response.messages.resultCode != messageTypeEnum.Ok)
					{
						return BadRequest(new { error = "Couldn't process transaction" });
					} 
					else
					{
						isPaid = true;
					}
					break;
				}
				case PaymentTypes.Cash: 
				{

					break;	
				}
			}

			newOrder.IsPaid = isPaid;

			_orderRepository.Create(newOrder);

			if (order.IsForDelivery)
			{
				Address address = await _addressRepository.GetById(order.DeliveryAddress.Id);

				if (address == null)
				{
					address = new Address()
					{
						Id = Guid.NewGuid(),
						Name = order.DeliveryAddress.Name,
						City = await _cityRepository.GetById(order.DeliveryAddress.City.Id),
						Country = await _countryRepository.GetById(order.DeliveryAddress.Country.Id),
						Street = order.DeliveryAddress.Street
					};

					_addressRepository.Create(address);
				}

				Delivery delivery = new Delivery()
				{
					Id = Guid.NewGuid(),
					DeliveryAddress = address,
					Order = newOrder,
					IsDelivered = false
				};

				_deliveryRepository.Create(delivery);
			}

			return Ok( new { order_id = orderId } );
		}

		[Route("cancel")]
		[HttpPut("cancel/{id}")]
		[Authorize(Policy = PermissionsList.PermissionsOrderCancel)]
		public async Task<IActionResult> CancelOrder(string id)
		{
			Guid orderId = Guid.Parse(id);

			Order cancelledOrder = await _orderRepository.GetById(orderId);
			cancelledOrder.IsCancelled = true;
			_orderRepository.Update(cancelledOrder);

			var orders = await _orderRepository.GetAll();
			var dishesRepo = await _dishRepository.GetAll();
			var orderDishRepo = await _orderDishRepository.GetAll();

			List<PastOrderModel> pastOrders = new List<PastOrderModel>();

			foreach (Order order in orders)
			{
				var deliveries = await _deliveryRepository.Find(dr => dr.Order.Id == order.Id);

				var Dishes = order.OrderItems.Select(od =>
						new OrderDishModel()
						{
							Name = od.Dish.Name,
							Quantity = od.Quantity
						});

				pastOrders.Add(new PastOrderModel()
				{
					Id = order.Id,
					OrderTime = order.OrderTime,
					TotalPrice = order.TotalPrice.ToString(),
					Dishes = Dishes.ToList(),
					isDelivered = deliveries.FirstOrDefault().IsDelivered,
					isCancelled = order.IsCancelled
				});
			}

			return Ok(new { orders = pastOrders });
		}

		[HttpGet]
		public async Task<IActionResult> GetUserOrders()
		{
			var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
			
			if (userId == null)
			{
				return Unauthorized();
			}

			User orderUser = await _userRepository.GetUserById(userId.Value);

			var orders = await _orderRepository.GetOrdersForUser(userId.Value);
			var dishesRepo = await _dishRepository.GetAll();
			var orderDishRepo = await _orderDishRepository.GetAll();

			List<PastOrderModel> pastOrders = new List<PastOrderModel>();

			foreach( Order order in orders)
			{
				var deliveries = await _deliveryRepository.Find(dr => dr.Order.Id == order.Id);

				var Dishes = order.OrderItems.Select(od =>
						new OrderDishModel()
						{
							Name = od.Dish.Name,
							Quantity = od.Quantity
						});

				pastOrders.Add(new PastOrderModel()
				{
					OrderTime = order.OrderTime,
					TotalPrice = order.TotalPrice.ToString(),
					Dishes = Dishes.ToList(),
					isDelivered = deliveries.FirstOrDefault().IsDelivered
				});
			}

			return Ok(new { pastOrders });
		}

		[HttpGet]
		[Route("all")]
		///[Authorize(Policy = PermissionsList.PermissionsOrderOrders)]
		public async Task<IActionResult> GetOrders()
		{
			var orders = await _orderRepository.GetAll();
			var dishesRepo = await _dishRepository.GetAll();
			var orderDishRepo = await _orderDishRepository.GetAll();

			List<PastOrderModel> pastOrders = new List<PastOrderModel>();

			foreach (Order order in orders)
			{
				var deliveries = await _deliveryRepository.Find(dr => dr.Order.Id == order.Id);

				var Dishes = order.OrderItems.Select(od =>
						new OrderDishModel()
						{
							Name = od.Dish.Name,
							Quantity = od.Quantity
						});

				pastOrders.Add(new PastOrderModel()
				{
					Id = order.Id,
					OrderTime = order.OrderTime,
					TotalPrice = order.TotalPrice.ToString(),
					Dishes = Dishes.ToList(),
					isDelivered = deliveries.FirstOrDefault().IsDelivered,
					isCancelled = order.IsCancelled
				});
			}

			return Ok(new { orders = pastOrders });
		}
	}
}