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
	public class MonthlyReportRepository : Repository<MonthlyReport>, IMonthlyReportRepository
	{
		public MonthlyReportRepository(ApplicationDbContext context) : base(context)
		{

		}

		public async Task<IEnumerable<MonthlyReport>> GetMonthlyReports()
		{
			return await _context.MonthlyReports.Include("CostReports").ToListAsync();
		}
	}
}
