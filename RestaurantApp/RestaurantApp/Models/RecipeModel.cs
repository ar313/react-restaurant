using RestaurantApp.Data.Entities.Order;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class RecipeModel
	{
		public string Id { get; set; }

		[Required]
		public string Name { get; set; }

		public List<Ingredient> Ingredients { get; set; }
	}
}
