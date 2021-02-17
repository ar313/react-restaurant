using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class Ingredient
	{
		[Key]
		public Guid Id { get; set; }

		public string Name { get; set; }

		public int Quantity { get; set; }

		public double Price { get; set; }

		public DateTime ExpirationDate { get; set; }

	}
}
