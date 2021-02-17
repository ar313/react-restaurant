using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class DishModel
	{
		[Required]
		public string Dish { get; set; }
		
		[Required]
		public double Price { get; set; }

		public string Description { get; set; }
		
		[Required]
		public List<RecipeModel> Recipes { get; set; }

		public string File { get; set; }
	}
}
