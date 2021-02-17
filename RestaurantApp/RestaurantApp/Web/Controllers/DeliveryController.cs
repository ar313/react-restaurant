using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        public readonly IDeliveryRepository _deliveryRepository;
        public readonly IEmployeeRepository _employeeRepository;
        public readonly ICashDeskRepository _cashDeskRepository;

        public DeliveryController(
            IDeliveryRepository deliveryRepository,
            IEmployeeRepository employeeRepository,
            ICashDeskRepository cashDeskRepository)
        {
            _deliveryRepository = deliveryRepository;
            _employeeRepository = employeeRepository;
            _cashDeskRepository = cashDeskRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetDeliveries()
        {
            var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();

            if (userId == null)
            {
                return Unauthorized();
            }

            var userDeliveries = await _deliveryRepository.GetDeliveriesForUser(userId.Value);

            List<DeliveryModel> deliveries = new List<DeliveryModel>();

            foreach (Delivery delivery in userDeliveries)
            {
                var orderItems = delivery.Order.OrderItems.Select(od =>
                     new OrderDishModel()
                     {
                         Name = od.Dish.Name,
                         Quantity = od.Quantity
                     });

                deliveries.Add(new DeliveryModel()
                {
                    Id = delivery.Id,
                    OrderId = delivery.Order.Id,
                    DeliveryPersonId = delivery.DeliveryPerson?.Id.ToString(),
                    OrderTime = delivery.Order.OrderTime,
                    IsDelivered = delivery.IsDelivered,
                    IsCancelled = delivery.Order.IsCancelled,
                    DeliveryAddress = delivery.DeliveryAddress,
                    DeliveryTime = delivery.DeliveredTime,
                    IsPaid = delivery.Order.IsPaid,
                    OrderItems = orderItems.ToList(),
                    TotalPrice = delivery.Order.TotalPrice,
                });
            }

            return Ok(new { deliveries });
        }

        [HttpPut]
        [Route("take/{id}")]
        public async Task<IActionResult> TakeDelivery(string id, [FromBody]DeliveryModel deliveryModel)
        {
            var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            var deliveryId = Guid.Parse(id);

            if (userId == null)
            {
                return Unauthorized();
            }

            var employee = await _employeeRepository.GetEmployeeFromUserId(userId.Value);

            var delivery = await _deliveryRepository.GetById(deliveryId);

            delivery.DeliveryPerson = employee;

            deliveryModel.DeliveryPersonId = employee.Id.ToString();

            _deliveryRepository.Update(delivery);

            return Ok(new { delivery = deliveryModel });
        }

        [HttpPut]
        [Route("complete/{id}")]
        public async Task<IActionResult> CompleteDelivery(string id, [FromBody]DeliveryModel deliveryModel)
        {
            var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            var deliveryId = Guid.Parse(id);

            if (userId == null)
            {
                return Unauthorized();
            }


            var delivery = await _deliveryRepository.GetDeliveryForUser(userId.Value, deliveryId);

            delivery.Order.IsClosed = true;
            delivery.IsDelivered = true;
            delivery.Order.IsPaid = true;
            delivery.DeliveredTime = DateTime.Now;

            deliveryModel.IsPaid = true;
            deliveryModel.IsDelivered = true;
            deliveryModel.DeliveryTime = DateTime.Now;

            var employee = await _employeeRepository.GetEmployeeFromUserId(userId.Value);

            await _cashDeskRepository.AddCash(employee.Id, deliveryModel.PaidPrice);

            _deliveryRepository.Update(delivery);

            return Ok(new { delivery = deliveryModel });
        }
    }
}