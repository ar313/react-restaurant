using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository.AdressNamespace
{
	public class CityRepository : Repository<City>, ICityRepository
	{
		public CityRepository(ApplicationDbContext context)
			: base(context)
		{

		}
	}
}
