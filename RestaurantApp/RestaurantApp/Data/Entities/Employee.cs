using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities
{
	public class Employee
	{
		[Key]
		public Guid Id { get; set; }

		[Required]
		public User User { get; set; }

		[Required]
		public double Salary { get; set; }

	}
}
