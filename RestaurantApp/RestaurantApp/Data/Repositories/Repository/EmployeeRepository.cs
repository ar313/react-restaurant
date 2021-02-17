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
	public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
	{
		public EmployeeRepository(ApplicationDbContext applicationDbContext)
			: base(applicationDbContext)
		{

		}

		public async Task<Employee> GetEmployeeFromUserId(string id)
		{
			Employee resultEmployee;

			resultEmployee = await _context.Employees
				.Where(employee => employee.User.Id == id)
				.Include("User")
				.FirstOrDefaultAsync();

			return resultEmployee;
		}

		public async Task<Employee> GetEmployeeFromId(Guid id)
		{
			Employee resultEmployee;

			resultEmployee = await _context.Employees
				.Where(employee => employee.Id == id)
				.Include("User")
				.FirstOrDefaultAsync();

			return resultEmployee;
		}

		public async Task<IEnumerable<Employee>> GetEmployees()
		{
			List<Employee> employees = await _context.Employees
				.Include("User")
				.ToListAsync();

			return employees;
		}
	}
}
