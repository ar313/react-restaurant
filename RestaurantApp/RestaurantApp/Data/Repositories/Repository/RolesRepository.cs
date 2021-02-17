using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class RolesRepository : Repository<Roles>, IRolesRepository
	{
		public RolesRepository(ApplicationDbContext applicationDbContext)
			: base(applicationDbContext)
		{

		}

		public async Task<Roles> GetRole(string role)
		{
			Roles returnRole = await _context.Roles
				.Where(r => r.Name == role)
				.Include("Permissions")
				.FirstOrDefaultAsync();

			return returnRole;
		}

		public async Task<IEnumerable<Roles>> GetRoles()
		{
			var roles = await _context.Roles.Include("Permissions")
				.ToListAsync();

			return roles;
		}
	}
}
