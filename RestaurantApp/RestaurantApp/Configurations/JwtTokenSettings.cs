using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Configurations
{
	public class JwtTokenSettings
	{
		public string Secret { get; set; }
		public string Audience { get; set; }
		public string Issuer { get; set; }
		public int ExpiryTimeInSeconds { get; set; }
	}
}
