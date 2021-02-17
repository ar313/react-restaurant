using RestaurantApp.Data.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces.Order
{
	public interface IRecipeIngredientRepository: IRepository<RecipeIngredient>
	{
		Task<RecipeIngredient> GetRecipeIngredient(Guid recipeId, Guid ingredientId);
		Task<IEnumerable<RecipeIngredient>> GetIngredientsForRecipe(Guid recipeId);
	}
}
