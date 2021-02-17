using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class RolePermissionUpdateModel
	{
		public string Id { get; set; }

		public string Name { get; set; }

		public List<Permission> Permissions { get; set; }
	}
}
