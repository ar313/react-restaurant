using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Entities.Reports;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Data.Repositories.Interfaces.Reports;
using SendGrid;
using SendGrid.Helpers.Mail;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Domain.Services
{
	public class OrderReport
	{
		public Guid OrderId { get; set; }

		public double TotalPrice { get; set; }

		public string IngName { get; set; }

		public double IngCost { get; set; }
	}

	public class GenerateReports
	{

		private readonly Container container;
		private readonly UserManager<User> _userManager;

		public GenerateReports(Container container, UserManager<User> userManager)
		{
			this.container = container;
			_userManager = userManager;
		}

		public async Task<Dictionary<Guid, DailyReport>> GenerateOrderReport(int days)
		{
			using (AsyncScopedLifestyle.BeginScope(this.container))
			{
				var orderDishRepository = this.container.GetInstance<IOrderDishRepository>();

				var orderDishes = await orderDishRepository.GetAllOrderDishes();

				var orderIngredients = orderDishes.Where(o => o.Order.OrderTime >= DateTime.Now.AddDays(-days) && o.Order.IsClosed).SelectMany(o => o.Dish.Recipes
					.SelectMany(r => r.Recipe.Ingredients
					.Select(i => new OrderReport()
						{ 
							OrderId = o.Order.Id,
							TotalPrice = o.Order.TotalPrice,
							IngName = i.Ingredient.Name,
							IngCost = o.Quantity * i.Quantity * i.Ingredient.Price 
						}))).ToList();

				Dictionary<Guid, DailyReport> orderProfit = new Dictionary<Guid, DailyReport>();

				foreach (OrderReport order in orderIngredients)
				{
					CostReport costReport = new CostReport()
					{
						Name = order.IngName,
						Cost = order.IngCost,
					};

					if(orderProfit.ContainsKey(order.OrderId))
					{
						orderProfit[order.OrderId].Profit -= Math.Round(order.IngCost, 2);
						orderProfit[order.OrderId].Cost += Math.Round(order.IngCost, 2);
						orderProfit[order.OrderId].CostReports.Add(costReport);
					} else
					{
						orderProfit.Add(order.OrderId, new DailyReport() { CostReports = new List<CostReport>() });

						orderProfit[order.OrderId].TotalPrice = order.TotalPrice;
						orderProfit[order.OrderId].Profit = order.TotalPrice;

						orderProfit[order.OrderId].Profit -= Math.Round(order.IngCost, 2);
						orderProfit[order.OrderId].Cost += Math.Round(order.IngCost, 2);
						orderProfit[order.OrderId].CostReports.Add(costReport);
					}
				}

				return orderProfit;
			}
		}

		public async Task GenerateDailyReport()
		{

			var orderReport = await GenerateOrderReport(1);

			double total = 0;
			double cost = 0;
			List<CostReport> costs = new List<CostReport>();

			foreach (KeyValuePair<Guid, DailyReport> report in orderReport)
			{
				total += report.Value.TotalPrice;
				cost += report.Value.Cost;
				costs.AddRange(report.Value.CostReports);
			}

			double netProfit = total - cost;

			using (AsyncScopedLifestyle.BeginScope(this.container))
			{
				var dailyReportsRepository = container.GetInstance<IDailyReportRepository>();

				DailyReport dailyReport = new DailyReport()
				{
					Id = Guid.NewGuid(),
					TotalPrice = total,
					Cost = cost,
					Profit = netProfit,
					CreatedOn = DateTime.Now,
					CostReports = costs
				};

				dailyReportsRepository.Create(dailyReport);

				string subject = "Daily Report: " + dailyReport.Id;
				string costsContent = "";
				
				foreach (CostReport costReport in dailyReport.CostReports)
				{
					costsContent += string.Format("<br> <b>Name: </b> {0} <b>Cost: </b>{1}",costReport.Name, costReport.Cost);
				}

				string content = "<b>Total: </b> " + dailyReport.TotalPrice +
					"<br> <b>Cost: </b> " + dailyReport.Cost +
					"<br> <b>Profit: </b>" + dailyReport.Profit +
					"<hr>" + costsContent;

				//SendEmail(subject, content);
			}

		}
		
		public async Task GenerateMonthlyReport()
		{
			using (AsyncScopedLifestyle.BeginScope(this.container))
			{
				var employeeRepository = container.GetInstance<IEmployeeRepository>();
				var employees = await employeeRepository.GetEmployees();
				var monthlyReportsRepository = container.GetInstance<IMonthlyReportRepository>();

				List<CostReport> costs = new List<CostReport>();

				double cost = 0;
				double totalIncome = 0;

				foreach (Employee employee in employees)
				{
					cost += employee.Salary;

					CostReport costReport = new CostReport()
					{
						Name = employee.User.Email,
						Cost = employee.Salary
					};

					costs.Add(costReport);
				}

				var now = DateTime.Now;
				var lastMonth = now.AddMonths(-1);
				var days = (now.Date - lastMonth.Date).Days;

				var orderReport = await GenerateOrderReport(days);

				foreach (KeyValuePair<Guid, DailyReport> report in orderReport)
				{
					cost += report.Value.Cost;
					totalIncome += report.Value.TotalPrice;

					CostReport costReport = new CostReport()
					{
						Name = report.Key.ToString(),
						Cost = report.Value.Cost,
					};

					costs.Add(costReport);
				}

				double netProfit = totalIncome - cost;
				
				MonthlyReport monthlyReport = new MonthlyReport()
				{
					Id = Guid.NewGuid(),
					Cost = cost,
					TotalPrice = totalIncome,
					Profit = netProfit,
					CreatedOn = DateTime.Now,
					CostReports = costs
				};
				
				monthlyReportsRepository.Create(monthlyReport);

				string subject = "Daily Report: " + monthlyReport.Id;
				string costsContent = "";

				foreach (CostReport costReport in monthlyReport.CostReports)
				{
					costsContent += string.Format("<br> <b>Name: </b> {0} <b>Cost: </b>{1}", costReport.Name, costReport.Cost);
				}

				string content = "<b>Total: </b> " + monthlyReport.TotalPrice +
					"<br> <b>Cost: </b> " + monthlyReport.Cost +
					"<br> <b>Profit: </b>" + monthlyReport.Profit +
					"<hr>" + costsContent;

				//SendEmail(subject, content);
			}
		}

		public async Task SendEmail(string subject, string content)
		{
			using (AsyncScopedLifestyle.BeginScope(container))
			{
				var configuration = container.GetInstance<IConfiguration>();
				var employeeRepository = container.GetInstance<IEmployeeRepository>();


				var apiKey = configuration.GetSection("SENDGRID_API_KEY").Value;
				var client = new SendGridClient(apiKey);
				var from = new EmailAddress("test1@example.com", "Example User 1");

				var employees = await employeeRepository.GetEmployees();

				List<EmailAddress> tos = new List<EmailAddress>();

				foreach (Employee employee in employees)
				{
					var role = await _userManager.GetRolesAsync(employee.User);

					if (role.FirstOrDefault() == "Manager" || role.FirstOrDefault() == "Finance")
					{
						tos.Add(new EmailAddress(employee.User.Email));
					}
				}

				var htmlContent = content;
				var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, subject, "", htmlContent);
				var response = await client.SendEmailAsync(msg);
			}
		}
	}

}
