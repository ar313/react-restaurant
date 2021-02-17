using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class OrderRepository : Repository<Order>, IOrderRepository
	{
		public OrderRepository(ApplicationDbContext context) : base(context)
		{

		}

		public async Task<Dish> GetDish(string dishName)
		{
			return await _context.Dishes.Where(
				dish => dish.Name == dishName
			).FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<Dish>> GetDishList(List<string> dishNames)
		{

			List<Dish> dishes = await _context.Dishes
				.Where(dish => dishNames.Contains(dish.Name))
				.ToListAsync();

			return dishes;
		}

		public async Task<IEnumerable<RestaurantApp.Data.Entities.Order.Order>> GetOrdersForUser(string id)
		{
			List<Order> orders = await _context.Orders.Where(o => o.User.Id == id).ToListAsync();

			return orders;
		}
	}
}
