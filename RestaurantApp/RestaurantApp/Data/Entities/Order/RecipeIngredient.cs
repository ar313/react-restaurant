using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class RecipeIngredient
	{
		[Key, Column(Order = 0)]
		public Guid RecipeId { get; set; }
		
		[Key, Column(Order = 1)]
		public Guid IngredientId { get; set; }

		public Recipe Recipe { get; set; }
		public Ingredient Ingredient { get; set; }

		public int Quantity { get; set; }
	}
}
