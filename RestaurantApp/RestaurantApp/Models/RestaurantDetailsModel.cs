using RestaurantApp.Data.Entities.AddressNamespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class RestaurantDetailsModel
	{
		public int OpeningHour { get; set; }

		public int ClosingHour { get; set; }

		public string Details { get; set; }

		public Address Address { get; set; }
	}
}
