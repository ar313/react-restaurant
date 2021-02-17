using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.AddressNamespace
{
	public class City
	{
		[Key]
		public Guid Id { get; set; }

		public string Name { get; set; }
	}
}
