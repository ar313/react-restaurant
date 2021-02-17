using IdentityServer4.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Domain.Services.Requirement;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Configurations
{
	public static class PermissionSettings
	{
		public static AuthorizationOptions CreatePermissions(AuthorizationOptions options)
		{
			List<string> permissionsList = GetPermissions();

			foreach(string permission in permissionsList)
			{


				options.AddPolicy(permission, policy =>
				{
					policy.Requirements.Add(new PermissionRequirement(permission));
				});
				
			}

			return options;
		}

		public static async Task SeedPermissions(Container container)
		{
			List<string> permissionsList = GetPermissions();

			using (AsyncScopedLifestyle.BeginScope(container))
			{
				var permissionRepository = container.GetInstance<IPermissionRepository>();
				var permissions = await permissionRepository.GetAll();
				
				foreach (string permission in permissionsList)
				{
					if (permissions.Where(p => p.Name.ToLower() == permission.ToLower())
						.ToList().Count == 0) {
						
						permissionRepository.Create(new Data.Entities.Permission()
						{
							Id = Guid.NewGuid(),
							Name = permission
						});
					}
				}
			}
			
		}

		private static List<string> GetPermissions()
		{
			List<string> permissionsList = new List<string>();
			Type type = typeof(PermissionsList);

			foreach (var field in type.GetFields())
			{
				var val = field.GetValue(null);
				permissionsList.Add(val.ToString());
			}

			return permissionsList;
		}
	}
}
