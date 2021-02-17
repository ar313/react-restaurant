using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository.AdressNamespace
{
	public class AddressRepository : Repository<Address>, IAddressRepository
	{
		public AddressRepository(ApplicationDbContext context)
			: base(context)
		{

		}

		public async Task<IEnumerable<Address>> GetAddresses()
		{
			return await _context.Addresses.Include("Country").Include("City").ToListAsync();
		}
	}
}
