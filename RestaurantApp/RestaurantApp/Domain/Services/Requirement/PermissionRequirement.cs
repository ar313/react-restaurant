using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Domain.Services.Requirement
{
	public class PermissionRequirement : IAuthorizationRequirement
	{
		public string PermissionName { get; set; }

		public PermissionRequirement(string permissionName)
		{
			PermissionName = permissionName;
		}
	}
}
