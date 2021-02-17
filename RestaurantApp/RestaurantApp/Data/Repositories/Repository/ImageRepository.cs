using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class ImageRepository : Repository<Image>, IImageRepository  
	{
		public ImageRepository(ApplicationDbContext context)
			: base (context)
		{

		}
	}
}
