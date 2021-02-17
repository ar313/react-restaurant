using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RestaurantApp.Configurations
{
	public static class RolesSetup
	{
		private static List<string> GetRoles()
		{
			List<string> rolesList = new List<string>();
			Type type = typeof(RolesList);
			
			foreach (var field in type.GetFields())
			{
				var val = field.GetValue(null);
				rolesList.Add(val.ToString());
			}

			return rolesList;
		}

		public async static Task createRoles(IServiceProvider serviceProvider)
		{
			List<string> rolesList = GetRoles();

			var _roleManager = serviceProvider.GetRequiredService<RoleManager<Data.Entities.Roles>>();
			
			foreach (string role in rolesList)
			{
				Permission p = new Permission();
				

				Data.Entities.Roles identityRole = new Data.Entities.Roles()
				{
					Id = Guid.NewGuid().ToString(),
					Name = role,
					NormalizedName = role.ToUpper()
				};

				var exist = await _roleManager.RoleExistsAsync(identityRole.Name);
				if (!exist)
				{
					await _roleManager.CreateAsync(identityRole);
				}
			}
		}
	}
}
