using RestaurantApp.Data.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces.Order
{
	public interface IOrderDishRepository: IRepository<OrderDish>
	{
		Task<IEnumerable<OrderDish>> GetAllOrderDishes();
	}
}
