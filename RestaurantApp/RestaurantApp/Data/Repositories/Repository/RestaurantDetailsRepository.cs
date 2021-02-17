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
	public class RestaurantDetailsRepository : Repository<RestaurantDetails>, IRestaurantDetailsRepository
	{
		public RestaurantDetailsRepository(ApplicationDbContext context):
			base(context)
		{

		}

		public async Task<RestaurantDetails> GetRestaurantDetails()
		{
			var restaurantDetails = await _context.RestaurantDetails
				.Include("Address")
				.Include("Address.City")
				.Include("Address.Country")
				.FirstOrDefaultAsync();

			return restaurantDetails;
		}
	}
}
