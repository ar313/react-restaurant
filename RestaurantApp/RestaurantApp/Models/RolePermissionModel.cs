using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class RolePermissionModel
	{
		[Required]
		public string Role { get; set; }

		[Required]
		public string Permission { get; set; }
	}
}
