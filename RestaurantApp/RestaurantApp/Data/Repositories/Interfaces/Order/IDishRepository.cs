using RestaurantApp.Data.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces.Order
{
	public interface IDishRepository : IRepository<Dish>
	{
		Task<IEnumerable<Object>> GetAllDish();
		Task<Dish> GetDish(Guid Id);
	}
}
