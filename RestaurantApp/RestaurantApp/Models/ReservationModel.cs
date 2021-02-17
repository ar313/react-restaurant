using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class ReservationModel
	{
		public Guid Id { get; set; }

		[Required]
		public DateTime ReservationTime { get; set; }

		[Required]
		public int PeopleCount { get; set; }

		[Required]
		public int Table { get; set; }

		public DateTime ReservationMadeTime { get; set; }
	}
}
