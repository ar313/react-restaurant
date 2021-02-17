using Hangfire;
using Hangfire.Storage;
using Microsoft.AspNetCore.Identity;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Domain.Services;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Configurations
{
	public class ConfigureReports
	{

		public static async Task ConfigureReportsDate(Container container, UserManager<User> userManager)
		{
			using (var connection = JobStorage.Current.GetConnection())
			{
				foreach (var recurringJob in connection.GetRecurringJobs())
				{
					RecurringJob.RemoveIfExists(recurringJob.Id);
				}
			}

			using (AsyncScopedLifestyle.BeginScope(container))
			{
				var restaurantDetailsRepository = container.GetInstance<IRestaurantDetailsRepository>();

				var details = await restaurantDetailsRepository.GetRestaurantDetails();

				GenerateReports gr = new GenerateReports(container, userManager);

				//RecurringJob.AddOrUpdate("DailyReport", () => gr.GenerateDailyReport(), Cron.Minutely()); // test
				//RecurringJob.AddOrUpdate("MonthlyReport", () => gr.GenerateMonthlyReport(), Cron.Minutely()); //test
				
				//********** Deploy

				//RecurringJob.AddOrUpdate("DailyReport", () => gr.GenerateDailyReport(), Cron.Daily(details.ClosingHour));
				//RecurringJob.AddOrUpdate("MonthlyReport", () => gr.GenerateMonthlyReport(), Cron.Monthly(1, details.OpeningHour));
			}
		}
	}
}
