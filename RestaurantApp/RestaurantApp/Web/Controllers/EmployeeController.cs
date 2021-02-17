using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/employee")]
	public class EmployeeController : Controller
	{
		public readonly IEmployeeRepository _employeeRepository;
		public readonly ICashDeskRepository _cashDeskRepository;
		public readonly IDeliveryRepository _deliveryRepository;
		public readonly IUserRepository _userRepository;

		public EmployeeController(IEmployeeRepository employeeRepository,
			ICashDeskRepository cashDeskRepository,
			IDeliveryRepository deliveryRepository,
			IUserRepository userRepository)
		{
			_employeeRepository = employeeRepository;
			_cashDeskRepository = cashDeskRepository;
			_deliveryRepository = deliveryRepository;
			_userRepository = userRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetEmployees()
		{
			var employees = await _employeeRepository.GetEmployees();

			return Ok(new { employees });
		}


		[HttpPost]
		[Route("{id}")]
		public async Task<IActionResult> AddEmployee(string id, [FromHeader]double salary )
		{
			var user = await _userRepository.GetUserById(id);

			var employeeExists = await _employeeRepository.GetEmployeeFromUserId(id);

			if (employeeExists != null)
			{
				return BadRequest();
			}

			var employee = new Employee()
			{
				Id = Guid.NewGuid(),
				Salary = salary,
				User = user
			};

			var cashDesk = new CashDesk()
			{
				Id = Guid.NewGuid(),
				Cash = 0,
				Employee = employee
			};

			_employeeRepository.Create(employee);
			_cashDeskRepository.Create(cashDesk);

			var employees = await _employeeRepository.GetEmployees();

			return Ok(new { employees });
		}

		[HttpPut]
		[Route("{id}")]
		public async Task<IActionResult> UpdateEmployee(string id, [FromBody] Employee employee)
		{
			Guid employeeId = Guid.Parse(id);
			var employeeToChange = await _employeeRepository.GetEmployeeFromUserId(employee.User.Id);
			employeeToChange.Salary = employee.Salary;
			employeeToChange.User.PhoneNumber = employee.User.PhoneNumber;

			_employeeRepository.Update(employeeToChange);

			return Ok(new { employee = employeeToChange });
		}

		[HttpDelete]
		[Route("{id}")]
		public async Task<IActionResult> DeleteEmployee(string id)
		{
			Guid employeeId = Guid.Parse(id);
			var employeeToDelete = await _employeeRepository.GetEmployeeFromId(employeeId);

			var cashDesk = await _cashDeskRepository.GetByEmployeeId(employeeId);
			var deliveries = await _deliveryRepository.GetDeliveriesForUser(employeeToDelete.User.Id);

			foreach(Delivery delivery in deliveries)
			{
				delivery.DeliveryPerson = null;
				_deliveryRepository.Update(delivery);
			}

			_cashDeskRepository.Delete(cashDesk);
			_employeeRepository.Delete(employeeToDelete);

			return Ok();
		}

		[HttpGet]
		[Route("cash")]
		public async Task<IActionResult> GetEmployeeCashDesk()
		{
			var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();

			if (userId == null)
			{
				return Unauthorized();
			}

			var employee = await _employeeRepository.GetEmployeeFromUserId(userId.Value);

			if (employee == null)
			{
				return Unauthorized();
			}

			var cashDesk = await _cashDeskRepository.GetByEmployeeId(employee.Id);

			return Ok(new { cashDesk });
		}
	}
}
