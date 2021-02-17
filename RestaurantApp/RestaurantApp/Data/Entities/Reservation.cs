using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace RestaurantApp.Data.Entities
{
	public class Reservation
	{
		[Key]
		public Guid Id { get; set; }

		[Required]
		public User User { get; set; }

		[Required]
		public Table Table { get; set; }

		[Required]
		public DateTime ReservationTime { get; set; }

		[Required]
		public int PeopleCount { get; set; }

		[Required]
		public bool IsDone { get; set; }

		[Required]
		public DateTime ReservationMadeTime { get; set; }

	}
}
