using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class DishRepository : Repository<Dish>, IDishRepository
	{
		public DishRepository(ApplicationDbContext context) 
			: base(context)
		{

		}

		public async Task<IEnumerable<Object>> GetAllDish()
		{
			var dishes = await _context.Dishes.Select(d =>
					new {
						d.Id,
						d.Name,
						Price = d.DishPrice,
						Ingredients = d.Recipes.SelectMany(i => i.Recipe.Ingredients.Select(i => i.Ingredient.Name)).ToList()
					})
				.ToListAsync();

			
			return dishes;
		}

		public async Task<Dish> GetDish(Guid Id)
		{
			var dish = await _context.Dishes
				.Where(d => d.Id == Id)
				.Include("DishImage")
				.FirstOrDefaultAsync();

			return dish;
		}
	}
}
