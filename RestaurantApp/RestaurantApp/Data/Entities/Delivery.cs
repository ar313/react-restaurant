using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Entities.Order;

namespace RestaurantApp.Data.Entities
{
	public class Delivery
	{
		[Key]
		public Guid Id { get; set; }


		public Employee DeliveryPerson { get; set; }

		[Required]
		[Key]
		public Order.Order Order { get; set; }

		[Required]
		public Address DeliveryAddress { get; set; }

		[Required]
		public bool IsDelivered { get; set; }


		[AllowNull]
		public DateTime DeliveredTime { get; set; }
	}
}
