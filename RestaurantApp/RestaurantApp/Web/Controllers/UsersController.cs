using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public readonly IUserRepository _userRepository;
        public readonly IRolesRepository _rolesRepository;
        public readonly UserManager<User> _userManager;
        public UsersController(
            IUserRepository userRepository, 
            UserManager<User> userManager,
            IRolesRepository rolesRepository)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _rolesRepository = rolesRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var repoUsers = await _userRepository.GetAll();
            List<UserAdminPanelModel> allUsers = new List<UserAdminPanelModel>();
            
            foreach(User user in repoUsers)
            {
                var role = await _userManager.GetRolesAsync(user);
                allUsers.Add(new UserAdminPanelModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Email,
                    Role = role.FirstOrDefault()
                });
            }

            var users = allUsers.ToList();

            return Ok(new { users });
        }

        [HttpGet]
        [Route("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _rolesRepository.GetRoles();

            return Ok(new { roles });
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUserRole(string id, [FromBody] UserAdminPanelModel userAdminPanelModel)
        {
            User user = await _userManager.FindByIdAsync(id);
            var oldRoles = await _userManager.GetRolesAsync(user);
            string newRole = userAdminPanelModel.Role;
            
            await _userManager.RemoveFromRolesAsync(user, oldRoles);

            await _userManager.AddToRoleAsync(user, newRole);

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            _userRepository.Delete(user);

            return Ok();
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> ResetPassword()
        {
            throw new NotImplementedException();
        }
    }
}