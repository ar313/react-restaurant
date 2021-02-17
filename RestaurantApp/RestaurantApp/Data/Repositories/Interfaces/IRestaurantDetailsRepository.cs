using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface IRestaurantDetailsRepository: IRepository<RestaurantDetails>
	{
		public Task<RestaurantDetails> GetRestaurantDetails();
	}
}
