using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository.AdressNamespace
{
	public class CountryRepository : Repository<Country>, ICountryRepository
	{
		public CountryRepository(ApplicationDbContext context)
			: base(context)
		{

		}
	}
}
