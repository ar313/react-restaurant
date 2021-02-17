using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class DeliveryModel
	{
		public Guid Id { get; set; }

		public Guid OrderId { get; set; }

		public DateTime OrderTime { get; set; }

		public DateTime DeliveryTime { get; set; }

		public float TotalPrice { get; set; }

		public ICollection<OrderDishModel> OrderItems { get; set; }

		public Address DeliveryAddress { get; set; }

		public bool IsPaid { get; set; }

		public bool IsCancelled { get; set; }

		public bool IsDelivered { get; set; }

		public string DeliveryPersonId { get; set; }
		
		public float PaidPrice { get; set; }
	}
}
