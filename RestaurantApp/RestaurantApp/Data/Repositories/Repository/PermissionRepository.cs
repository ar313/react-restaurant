using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class PermissionRepository : Repository<Permission>, IPermissionRepository
	{
		public PermissionRepository(ApplicationDbContext dbContext)
			: base(dbContext)
		{

		}
	}
}
