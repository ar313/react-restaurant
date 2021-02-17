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
	public class IngredientRepository : Repository<Ingredient>, IIngredientRepository
	{
		public IngredientRepository(ApplicationDbContext applicationDbContext)
			: base(applicationDbContext)
		{

		}

		public async Task<Ingredient> GetIngredient(string name)
		{
			return await _context.Ingredients.Where( 
				ingredient => ingredient.Name == name 
			).FirstOrDefaultAsync();
		}
	}
}
