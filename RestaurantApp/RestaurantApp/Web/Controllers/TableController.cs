using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TableController : ControllerBase
	{
		private readonly ITableRepository _tableRepository;
		private readonly IReservationRepository _reservationRepository;

		public TableController(ITableRepository tableRepository,
			IReservationRepository reservationRepository)
		{
			_tableRepository = tableRepository;
			_reservationRepository = reservationRepository;
		}

		[HttpGet]
		[Route("free")]
		public async Task<IActionResult> GetFreeTables([FromHeader]string reservationDate)
		{
			var reservations = await _reservationRepository.GetAll();
			var tables = await _tableRepository.GetAll();
			var dateTime = DateTime.Parse(reservationDate);

			var reservedTables = reservations.Where(r =>
				r.ReservationTime >= dateTime.AddHours(-1.5)
				&& r.ReservationTime <= dateTime.AddHours(1.5)
				).Select(r => r.Table).ToList();

			var freeTables = tables.Except(reservedTables).ToList(); 

			return Ok(new { tables = freeTables });
		}
	}
}
