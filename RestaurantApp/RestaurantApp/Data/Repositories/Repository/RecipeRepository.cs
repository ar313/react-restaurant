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
	public class RecipeRepository : Repository<Recipe>, IRecipeRepository
	{
		public RecipeRepository(ApplicationDbContext applicationDbContext)
			: base(applicationDbContext)
		{

		}

		public async Task<IEnumerable<Object>> GetAllRecipes()
		{
			var recipes = await _context.Recipes
				.Select(r =>
				new {
					r.Id,
					r.Name,
					Ingredients = r.Ingredients.Select(i => new { 
						i.Ingredient.Id,
						i.Ingredient.Name,
						i.Quantity
					}).ToList()
				})
				.ToListAsync();

			return recipes;
		}

	}
}
