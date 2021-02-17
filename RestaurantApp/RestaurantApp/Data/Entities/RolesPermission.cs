using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities
{
	public class RolesPermission
	{
		[Key]
		public Guid Id { get; set; }

		public Roles Role { get; set; }
		public Permission Permission { get; set; }

	}
}

