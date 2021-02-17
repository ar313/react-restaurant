using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository.AdressNamespace
{
	public class UserAddressRepository : Repository<UserAddress>, IUserAddressRepository
	{
		public UserAddressRepository(ApplicationDbContext context)
			: base(context)
		{

		}
	}
}
