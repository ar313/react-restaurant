using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class Recipe
	{
		[Key]
		public Guid Id { get; set; }

		public string Name { get; set; }

		public virtual ICollection<RecipeIngredient> Ingredients { get; set; }

		public virtual ICollection<DishRecipe> DishRecipes { get; set; }
	}
}
