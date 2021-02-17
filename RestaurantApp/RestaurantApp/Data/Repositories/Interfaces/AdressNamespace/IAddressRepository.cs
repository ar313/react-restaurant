using RestaurantApp.Data.Entities.AddressNamespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces.AdressNamespace
{
	public interface IAddressRepository : IRepository<Address>
	{
		public Task<IEnumerable<Address>> GetAddresses();
	}
}
