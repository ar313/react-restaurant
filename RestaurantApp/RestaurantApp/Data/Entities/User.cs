using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using RestaurantApp.Data.Entities.AddressNamespace;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities
{
	public class User : IdentityUser
	{
		public IEnumerable<UserAddress> Address { get; set; }
	}
}
