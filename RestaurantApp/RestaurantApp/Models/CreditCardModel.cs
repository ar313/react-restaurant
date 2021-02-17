using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class CreditCardModel
	{
		public string CardNumber { get; set; }
		public string ExpirationDate { get; set; }
		public string CCV { get; set; }
	}
}
