using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReservationController : ControllerBase
	{
		private readonly IReservationRepository _reservationRepository;
		private readonly ITableRepository _tableRepository;
		private readonly IUserRepository _userRepository;
		
		public ReservationController(IReservationRepository reservationRepository, 
			IUserRepository userRepository,
			ITableRepository tableRepository)
		{
			_reservationRepository = reservationRepository;
			_userRepository = userRepository;
			_tableRepository = tableRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetReservations()
		{

			var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
			var role = User.Claims.Where(c => c.Type == ClaimTypes.Role).FirstOrDefault();

			if (userId == null || role == null)
			{
				return Unauthorized();
			}
			
			User reservationUser = await _userRepository.GetUserById(userId.Value);

			IEnumerable<Reservation> reservations;

			if (role.Value == "Manager")
			{
				reservations = await _reservationRepository.GetReservations();
			}
			else
			{
				reservations = await _reservationRepository.GetReservationsForUser(reservationUser);
			}
			
			return Ok( new { reservations });
		}


		[HttpPost]
		public async Task<IActionResult> AddReservation([FromBody] ReservationModel reservation)
		{
			var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();

			if (userId == null)
			{
				return Unauthorized();
			}

			User reservationUser = await _userRepository.GetUserById(userId.Value);
			Table table = await _tableRepository.GetTableByNumber(reservation.Table);
			
			var newReservation = new Reservation()
			{
				Id = Guid.NewGuid(),
				ReservationTime = reservation.ReservationTime.ToLocalTime(),
				ReservationMadeTime = DateTime.Now,
				User = reservationUser,
				Table = table,
				IsDone = false,
				PeopleCount = reservation.PeopleCount
			};

			_reservationRepository.Create(newReservation);

			return Ok( new { reservation = newReservation } );
		}
	}
}
