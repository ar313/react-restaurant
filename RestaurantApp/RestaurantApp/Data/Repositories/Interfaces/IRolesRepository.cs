using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface IRolesRepository : IRepository<Roles>
	{
		Task<IEnumerable<Roles>> GetRoles();

		Task<Roles> GetRole(string role);
	}
}
