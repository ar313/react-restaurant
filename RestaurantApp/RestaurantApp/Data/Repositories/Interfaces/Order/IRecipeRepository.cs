using RestaurantApp.Data.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces.Order
{
	public interface IRecipeRepository : IRepository<Recipe>
	{
		Task<IEnumerable<Object>> GetAllRecipes();

	}
}
