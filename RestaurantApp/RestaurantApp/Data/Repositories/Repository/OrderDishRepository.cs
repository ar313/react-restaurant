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
	public class OrderDishRepository : Repository<OrderDish>, IOrderDishRepository
	{
		public OrderDishRepository(ApplicationDbContext context)
			: base(context)
		{

		}

		public async Task<IEnumerable<OrderDish>> GetAllOrderDishes()
		{
			var orderDishes = await _context.OrderDishes
				.Include("Order")
				.Include("Dish")
				.Include("Dish.Recipes")
				.Include("Dish.Recipes.Recipe")
				.Include("Dish.Recipes.Recipe.Ingredients")
				.Include("Dish.Recipes.Recipe.Ingredients.Ingredient")
				.ToListAsync();

			return orderDishes;
		}
	}
}
