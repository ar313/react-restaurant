using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface IReservationRepository : IRepository<Reservation>
	{
		Task<IEnumerable<Reservation>> GetReservationsForUser(User user);
		Task<IEnumerable<Reservation>> GetReservations();
	}
}
