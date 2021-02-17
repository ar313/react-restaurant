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
	public class RecipeIngredientRepository: Repository<RecipeIngredient>, IRecipeIngredientRepository
	{
		public RecipeIngredientRepository(ApplicationDbContext applicationDbContext)
			: base(applicationDbContext)
		{

		}


		public async Task<IEnumerable<RecipeIngredient>> GetIngredientsForRecipe(Guid recipeId)
		{
			var recipeIngredients = await _context.RecipeIngredients
				.Where(ri => ri.RecipeId == recipeId)
				.ToListAsync();

			return recipeIngredients;
		}

		public async Task<RecipeIngredient> GetRecipeIngredient(Guid recipeId, Guid ingredientId)
		{
			var recipeIngredient = await _context.RecipeIngredients
				.Where(ri => ri.IngredientId == ingredientId && ri.RecipeId == recipeId)
				.FirstOrDefaultAsync();

			return recipeIngredient;
		}
	}
}
