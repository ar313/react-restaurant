using RestaurantApp.Data.Entities.AddressNamespace;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities
{
	public class RestaurantDetails
	{
		[Key]
		public Guid Id { get; set; }

		public int OpeningHour { get; set; }

		public int ClosingHour { get; set; }

		public string Details { get; set; }

		public Address Address { get; set; }
	}
}
