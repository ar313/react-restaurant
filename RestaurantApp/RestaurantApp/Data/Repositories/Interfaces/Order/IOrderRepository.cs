using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestaurantApp.Data.Entities.Order;

namespace RestaurantApp.Data.Repositories.Interfaces.Order
{
	public interface IOrderRepository : IRepository<RestaurantApp.Data.Entities.Order.Order>
	{
		Task<Dish> GetDish(string dishName);
		Task<IEnumerable<Dish>> GetDishList(List<string> dishNames);

		Task<IEnumerable<RestaurantApp.Data.Entities.Order.Order>> GetOrdersForUser(string id);
	}
}
