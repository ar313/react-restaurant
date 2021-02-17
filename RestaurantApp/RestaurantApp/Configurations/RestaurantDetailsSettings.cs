using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Configurations
{
	public static class RestaurantDetailsSettings
	{

		public static async Task DetailsSetup(Container container)
		{
			using (AsyncScopedLifestyle.BeginScope(container))
			{
				var restaurantDetailsRepository = container.GetInstance<IRestaurantDetailsRepository>();

				var restaurantDetails = await restaurantDetailsRepository.GetAll();

				if (restaurantDetails.Count() == 0)
				{
					restaurantDetailsRepository.Create(new RestaurantDetails()
					{
						Id = Guid.NewGuid(),
						Details = "Restaurant",
						OpeningHour = 8,
						ClosingHour = 22,
					});
				}
			}

		}
	}
}
