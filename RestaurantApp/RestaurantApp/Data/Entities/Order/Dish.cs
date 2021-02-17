﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Entities.Order
{
	public class Dish
	{
		[Key]
		public Guid Id { get; set; }

		public string Name { get; set; }

		public double DishPrice { get; set; }

		public Image DishImage { get; set; }

		public virtual ICollection<DishRecipe> Recipes{ get; set; }
	}
}
