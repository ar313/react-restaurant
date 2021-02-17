using RestaurantApp.Data.Entities.AddressNamespace;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class AddressModel
	{
		public string Id { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public string Street { get; set; }

		[Required]
		public Country Country { get; set; }

		[Required]
		public City City { get; set; }
	}
}
