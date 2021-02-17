using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class IngredientModel
	{
		public string Id { get; set; }

		public string Name { get; set; }
		
		public int Quantity { get; set; }

		public double Price { get; set; }

		public DateTime ExpirationDate { get; set; }
	}
}
