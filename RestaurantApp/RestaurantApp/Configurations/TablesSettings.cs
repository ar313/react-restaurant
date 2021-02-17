using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Configurations
{
	public class TablesSettings
	{
		public static async Task SeedTables(Container container)
		{
			using (AsyncScopedLifestyle.BeginScope(container))
			{
				var tableRepository = container.GetInstance<ITableRepository>();
				var tables = await tableRepository.GetAll();


				for (int i = 1; i <= 10; i++)
				{
					var tableExists = tables.Where(t => t.Number == i).ToList();
					if (tableExists.Count == 0)
					{
						tableRepository.Create(new Table() { Id = Guid.NewGuid(), Number = i });;
					}
				}
			}


		}
	}
}
