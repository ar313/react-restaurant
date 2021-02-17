using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
	public class UserRepository : Repository<User>, IUserRepository
	{
		public UserRepository(ApplicationDbContext context) : base(context)
		{

		}

		
		public async Task<IEnumerable<User>> GetAllEmployableUsers()
		{
			var role = await _context.Roles.Where(r => r.Name == "Client").FirstOrDefaultAsync() ;
			var userIds = await _context.UserRoles.Where(ur => ur.RoleId != role.Id).Select(u => u.UserId).ToListAsync();
			List<User> users = new List<User>();
			
			foreach(string id in userIds)
			{
				users.Add(_context.Users.Where(u => u.Id == id).FirstOrDefault());
			}

			return users;
		}

		public async Task<User> GetUser(string username, string passwordHash)
		{
			return await _context.Users.SingleOrDefaultAsync(
				user => user.UserName == username && user.PasswordHash == passwordHash
			);
		}

		public async Task<User> GetUser(string username)
		{
			return await _context.Users.SingleOrDefaultAsync(
				user => user.UserName == username
			);
		}

		public async Task<User> GetUserById(string id)
		{
			return await _context.Users.SingleOrDefaultAsync(
				user => user.Id == id
			);
		}
	}
}
