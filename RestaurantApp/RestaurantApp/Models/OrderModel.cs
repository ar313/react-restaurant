using RestaurantApp.Data.Entities.AddressNamespace;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public enum PaymentTypes
	{
		CreditCard,
		Cash
	}

	public class OrderModel
	{
	
		[Required]
		public bool IsForDelivery { get; set; }

		[Required]
		public List<OrderDishModel> Dishes { get; set; }
		
		public PaymentTypes PaymentType { get; set; }

		public CreditCardModel CreditCard { get; set; }

		public Address DeliveryAddress { get; set; }

		public BillingAddressModel BillingAddressModel { get; set; }
	}
}
