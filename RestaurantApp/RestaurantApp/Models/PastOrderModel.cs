using RestaurantApp.Data.Entities.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Models
{
	public class PastOrderModel
	{
		public Guid Id { get; set; }
		public DateTime OrderTime { get; set; }
		public string TotalPrice { get; set; }
		public bool isDelivered { get; set; }

		public bool isCancelled { get; set; }
		public List<OrderDishModel> Dishes { get; set; } 
	}
}
