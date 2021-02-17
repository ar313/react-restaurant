using Microsoft.AspNetCore.Identity;
using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface IUserRepository : IRepository<User>
	{
		Task<User> GetUser(string username, string password);
		Task<User> GetUser(string username);

		Task<User> GetUserById(string id);
		Task<IEnumerable<User>> GetAllEmployableUsers();
	}
}
