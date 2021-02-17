using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class Order
	{
		[Key]
		public Guid Id { get; set; }

		public User User { get; set; }

		public ICollection<OrderDish> OrderItems { get; set; }

		public DateTime OrderTime { get; set; }

		public DateTime OrderExpirationTime { get; set; }

		public bool IsForDelivery { get; set; }

		public float TotalPrice { get; set; }

		public bool IsPaid { get; set; }

		public bool IsCancelled { get; set; }

		public bool IsClosed { get; set; }
	}
}
