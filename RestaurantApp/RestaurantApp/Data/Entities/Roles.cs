using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities
{
	public class Roles : IdentityRole
	{
		public IEnumerable<RolesPermission> Permissions { get; set; }
	}
}
