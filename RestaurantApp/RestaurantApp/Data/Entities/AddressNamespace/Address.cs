using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.AddressNamespace
{
	public class Address
	{
		[Key]
		public Guid Id { get; set; }

		public string Name { get; set; }

		public Country Country { get; set; }
		
		public string Street { get; set; }

		public City City { get; set; }

	}
}
