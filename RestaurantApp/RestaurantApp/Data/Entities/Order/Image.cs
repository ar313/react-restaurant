using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class Image
	{
		[Key]
		public Guid Id { get; set; }
		public string ImageTitle { get; set; }
		public byte[] ImageData { get; set; }
	}
}
