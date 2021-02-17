using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Data.Repositories.Interfaces.Reports;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReportsController : ControllerBase
	{
		public readonly IDailyReportRepository _dailyReportRepository;
		public readonly IMonthlyReportRepository _monthlyReportRepository;

		public ReportsController(
			 IDailyReportRepository dailyReportRepository,
			 IMonthlyReportRepository monthlyReportRepository)
		{
			_dailyReportRepository = dailyReportRepository;
			_monthlyReportRepository = monthlyReportRepository;
		}

		[HttpGet]
		[Route("daily")]
		public async Task<IActionResult> GetDailyReports()
		{
			var dailyReports = await _dailyReportRepository.GetDailyReports();

			return Ok(new { dailyReports });
		}

		[HttpGet]
		[Route("monthly")]
		public async Task<IActionResult> GetMonthlyReports()
		{
			var monthlyReports = await _monthlyReportRepository.GetMonthlyReports();

			return Ok(new { monthlyReports });
		}
	}
}
