using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface IEmployeeRepository : IRepository<Employee>
	{
		Task<Employee> GetEmployeeFromUserId(string id);
		Task<Employee> GetEmployeeFromId(Guid id);

		Task<IEnumerable<Employee>> GetEmployees(); 
	}
}
