using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Configurations;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
	[Route("[controller]")]
	public class PermissionController : Controller
	{
		public readonly IRolesRepository _rolesRepository;
		public readonly IPermissionRepository _permissionRepository;
		public readonly IRolesPermissionRepository _rolesPermissionRepository;
		public PermissionController(IRolesRepository rolesRepository,
			IPermissionRepository permissionRepository,
			IRolesPermissionRepository rolesPermissionRepository)
		{
			_rolesRepository = rolesRepository;
			_permissionRepository = permissionRepository;
			_rolesPermissionRepository = rolesPermissionRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetRoles()
		{
			var roles = await _rolesRepository.GetRoles();
			var rolePermissions = await _rolesPermissionRepository.GetAll();
			var permissions = await _permissionRepository.GetAll();

			var rolesToReturn = new List<Object>(); 
			
			foreach(Roles role in roles)
			{
				var rolePermission = rolePermissions.Where(rp => rp.Role.Id == role.Id).Select(rp => rp.Permission);
				rolesToReturn.Add(new {
					id = role.Id,
					name = role.Name,
					permissions = rolePermission
				});
			}

			return Ok(new { roles = rolesToReturn, permissions });
		}

		[HttpPost]
		//[Authorize(Policy = PermissionsList.PermissionsRolesAdd)]
		public async Task<IActionResult> Add([FromBody] RolePermissionModel permissionModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest();
			}


			Roles roleToChange = await _rolesRepository.GetRole(permissionModel.Role);

			var permissions = await _permissionRepository.GetAll();

			Permission permission = permissions.Where(p => p.Name == permissionModel.Permission)
			.FirstOrDefault();

			if (permission == null)
			{
				return BadRequest();
			}

			List<RolesPermission> rolePermissions = roleToChange.Permissions.ToList();

			if (rolePermissions.Find(e => e.Permission.Name == permissionModel.Permission) != null)
			{
				return BadRequest();
			}

			RolesPermission permissionToAdd = new RolesPermission()
			{
				Id = Guid.NewGuid(),
				Permission = permission,
				Role = roleToChange
			};

			_rolesPermissionRepository.Create(permissionToAdd);

			rolePermissions.Add(permissionToAdd);

			roleToChange.Permissions = rolePermissions;

			_rolesRepository.Update(roleToChange);

			return Ok(String.Format("Added permission {0} to {1} role",
				permissionModel.Permission,
				permissionModel.Role));
		}

		[HttpPut]
		[Route("{id}")]
		//[Authorize(Policy = PermissionsList.PermissionsRolesUpdate)]
		public async Task<IActionResult> Update(string id, [FromBody]RolePermissionUpdateModel rolePermissionUpdateModel)
		{
			Guid roleId = Guid.Parse(id);

			Roles roleToChange = await _rolesRepository.GetRole(rolePermissionUpdateModel.Name);

			var permissions = await _permissionRepository.GetAll();

			List<RolesPermission> rolePermissions = roleToChange.Permissions.ToList();

			List<RolesPermission> newRolesPermissions = new List<RolesPermission>();

			foreach(RolesPermission rp in rolePermissions)
			{
				if ( !rolePermissionUpdateModel.Permissions.Contains(rp.Permission) ) {
					_rolesPermissionRepository.Delete(rp);
				}
			}

			foreach (Permission permission in rolePermissionUpdateModel.Permissions)
			{
				if (permissions.ToList().Find(p => p.Id == permission.Id) == null)
				{
					continue;
				}
				_rolesPermissionRepository.Create(new RolesPermission
				{
					Id = Guid.NewGuid(),
					Role = roleToChange,
					Permission = await _permissionRepository.GetById(permission.Id)
				}); ;
			}

			//_rolesRepository.Update(roleToChange);

			return Ok();
		}

		[HttpDelete]
		//[Authorize(Policy = PermissionsList.PermissionsRolesRemove)]
		public async Task<IActionResult> Remove([FromBody] RolePermissionModel permissionModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest();
			}

			Roles roleToChange = await _rolesRepository.GetRole(permissionModel.Role);

			FieldInfo validPermission = typeof(PermissionsList)
				.GetFields()
				.Where(f => f.GetValue(null).ToString() == permissionModel.Permission)
				.FirstOrDefault();

			if (validPermission == null)
			{
				return BadRequest();
			}

			List<RolesPermission> rolePermissions = roleToChange.Permissions.ToList();

			if (rolePermissions.Find(e => e.Permission.Name == permissionModel.Permission) == null)
			{
				return BadRequest();
			}

			var permissions = await _permissionRepository.GetAll();
			Permission permission = permissions.Where(p => p.Name == permissionModel.Permission)
				.FirstOrDefault();

			RolesPermission permissionToAdd = new RolesPermission()
			{
				Id = Guid.NewGuid(),
				Permission = permission,
				Role = roleToChange
			};

			_rolesPermissionRepository.Delete(permissionToAdd);

			rolePermissions.Remove(permissionToAdd);

			roleToChange.Permissions = rolePermissions;

			_rolesRepository.Update(roleToChange);

			return Ok(String.Format("Added permission {0} to {1} role",
				permissionModel.Permission,
				permissionModel.Role));
		}

	}
}
