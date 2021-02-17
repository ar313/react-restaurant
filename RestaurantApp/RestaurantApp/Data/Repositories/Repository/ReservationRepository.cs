using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class ReservationRepository : Repository<Reservation>, IReservationRepository
	{
		public ReservationRepository(ApplicationDbContext context): base (context)
		{

		}

		public async Task<IEnumerable<Reservation>> GetReservations()
		{
			var reservations = _context.Reservations.Include("Table").Include("User");

			return reservations;
		}

		public async Task<IEnumerable<Reservation>> GetReservationsForUser(User user)
		{
			var reservations = _context.Reservations.Where(r => r.User == user).Include("Table").Include("User");

			return reservations;
		}
	}
}
