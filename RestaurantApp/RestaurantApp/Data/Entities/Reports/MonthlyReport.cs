using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Reports
{
	public class MonthlyReport
	{
		public Guid Id { get; set; }

		public double TotalPrice { get; set; }

		public double Profit { get; set; }

		public double Cost { get; set; }

		public DateTime CreatedOn { get; set; }

		public List<CostReport> CostReports { get; set; }

	}
}
