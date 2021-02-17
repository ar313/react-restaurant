using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface IDeliveryRepository : IRepository<Delivery>
	{
		public Task<IEnumerable<Delivery>> GetDeliveriesForUser(string userID);

		public Task<Delivery> GetDeliveryForUser(string userID, Guid deliveryID);
	}
}
