using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class DishRecipe
	{
		[Key, Column(Order = 0)]
		public Guid RecipeId { get; set; }

		[Key, Column(Order = 1)]
		public Guid DishId { get; set; }

		public Recipe Recipe { get; set; }
		public Dish Dish { get; set; }

	}
}
