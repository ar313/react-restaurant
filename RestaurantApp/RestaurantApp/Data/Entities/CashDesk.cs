using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace RestaurantApp.Data.Entities
{
	public class CashDesk
	{
		[Key]
		public Guid Id { get; set; }

		[Required]
		[Key]
		public Employee Employee { get; set; }

		public double Cash { get; set; }
	}
}
