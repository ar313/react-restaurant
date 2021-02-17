using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class RefreshTokenModel
	{
		public string access_token { get; set; }
		public string refresh_token { get; set; }
	}
}
