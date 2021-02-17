using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Domain.Services.Requirement;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RestaurantApp.Domain.Services
{
	public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
	{
		//public IRolesRepository _repository;

		public readonly Container _container;

		public PermissionHandler(Container container)
		{
			_container = container;
		}

		protected override async Task HandleRequirementAsync(
			AuthorizationHandlerContext context, PermissionRequirement requirement)
		{

			var repository = _container.GetInstance<IRolesRepository>();
			var permissionsRepository = _container.GetInstance<IPermissionRepository>();

			if (!context.User.HasClaim(c => c.Type == ClaimTypes.Role))
			{
				return;
			}

			Claim role = context.User.Claims
				.Where(c => c.Type == ClaimTypes.Role)
				.FirstOrDefault();

			var roles = await repository.GetRoles();
			var permissions = await permissionsRepository.GetAll();
			var dbRole = roles.Where(r => r.Name == role.Value)
				.FirstOrDefault();

			var result = dbRole.Permissions
				.Where(p => p.Permission.Name == requirement.PermissionName)
				.FirstOrDefault();

			if (result != null)
			{
				context.Succeed(requirement);
			}
		}
	}
}
