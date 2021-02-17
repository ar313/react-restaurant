using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class OrderDish
	{
		[Key]
		public Guid Id { get; set; }

		public Order Order { get; set;}
		
		public Dish Dish { get; set; }

		public int Quantity { get; set; }
	}
}
