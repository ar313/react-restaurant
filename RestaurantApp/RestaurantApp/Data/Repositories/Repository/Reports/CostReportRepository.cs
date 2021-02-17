using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities.Reports;
using RestaurantApp.Data.Repositories.Interfaces.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository.Reports
{
	public class CostReportRepository : Repository<CostReport>, ICostReportRepository
	{
		public CostReportRepository(ApplicationDbContext context) : base(context)
		{

		}
	}
}
