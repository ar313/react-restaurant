using RestaurantApp.Data.Entities.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces.Reports
{
	public interface IDailyReportRepository : IRepository<DailyReport>
	{
		public Task<IEnumerable<DailyReport>> GetDailyReports();
	}
}
