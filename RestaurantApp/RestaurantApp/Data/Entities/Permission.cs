using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities
{
	public class Permission
	{
		[Key]
		public Guid Id { get; set; }

		[Required]
		public string Name { get; set; }
	}
}
