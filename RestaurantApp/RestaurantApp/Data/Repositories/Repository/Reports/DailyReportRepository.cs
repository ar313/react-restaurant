using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.Reports;
using RestaurantApp.Data.Repositories.Interfaces.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository.Reports
{
	public class DailyReportRepository : Repository<DailyReport>, IDailyReportRepository
	{
		public DailyReportRepository(ApplicationDbContext context) 
			: base(context)
		{

		}

		public async Task<IEnumerable<DailyReport>> GetDailyReports()
		{
			return await _context.DailyReports.Include("CostReports").ToListAsync();
		}
	}
}
