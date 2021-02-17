using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class AuthenticateModel
	{
		[EmailAddress]
		[Required]
		public string Email { get; set; }

		[MinLength(6)] 
		[Required]
		public string Password { get; set; }

		public bool RememberLogin { get; set; }
	}
}
