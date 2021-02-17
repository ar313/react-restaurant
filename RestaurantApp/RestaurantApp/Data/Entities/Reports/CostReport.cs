using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Reports
{
	public class CostReport
	{
		public Guid Id { get; set; }

		public string Name { get; set; }

		public double Cost { get; set; }
	}
}
