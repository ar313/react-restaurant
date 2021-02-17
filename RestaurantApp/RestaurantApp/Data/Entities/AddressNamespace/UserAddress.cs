using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.AddressNamespace
{
	public class UserAddress
	{
		[Key]
		public Guid Id { get; set; }
	
		public User User { get; set; }

		public Address Address { get; set; }
	}
}
