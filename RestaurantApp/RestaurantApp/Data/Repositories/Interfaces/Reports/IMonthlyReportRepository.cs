using RestaurantApp.Data.Entities.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces.Reports
{
	public interface IMonthlyReportRepository : IRepository<MonthlyReport>
	{
		public Task<IEnumerable<MonthlyReport>> GetMonthlyReports();
	}
}
