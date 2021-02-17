using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class DeliveryRepository : Repository<Delivery>, IDeliveryRepository
	{
		public DeliveryRepository(ApplicationDbContext context)
			: base(context)
		{

		}

		public async Task<IEnumerable<Delivery>> GetDeliveriesForUser(string userID)
		{
			var deliveries = await _context.Deliveries
				.Where(d => d.DeliveryPerson.User.Id == userID || d.DeliveryPerson == null)
				.Include("Order")
				.Include("DeliveryPerson")
				.Include("DeliveryAddress")
				.Include("DeliveryAddress.City")
				.Include("DeliveryAddress.Country")
				.Include("Order.OrderItems")
				.Include("Order.OrderItems.Dish")
				.ToListAsync();

			return deliveries;
		}

		public async Task<Delivery> GetDeliveryForUser(string userID, Guid deliveryID)
		{
			var deliveries = await _context.Deliveries
				.Where(d => d.DeliveryPerson.User.Id == userID && d.Id == deliveryID)
				.Include("Order")
				.Include("DeliveryPerson")
				.Include("DeliveryAddress")
				.Include("DeliveryAddress.City")
				.Include("DeliveryAddress.Country")
				.Include("Order.OrderItems")
				.Include("Order.OrderItems.Dish")
				.FirstOrDefaultAsync();

			return deliveries;
		}
	}
}
