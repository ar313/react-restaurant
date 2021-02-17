using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Entities.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Context
{
	public class ApplicationDbContext : IdentityDbContext<IdentityUser>
	{
		public ApplicationDbContext(DbContextOptions options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			builder.Entity<DishRecipe>().HasKey(q =>
				new
				{
					q.RecipeId,
					q.DishId
				}
			);
			builder.Entity<RecipeIngredient>().HasKey(q =>
				new
				{
					q.RecipeId,
					q.IngredientId
				}
			);

			base.OnModelCreating(builder);
		}


		public DbSet<User> Users { get; set; }
		public DbSet<Ingredient> Ingredients { get; set; }
		public DbSet<Dish> Dishes { get; set; }
		public DbSet<Recipe> Recipes { get; set; }

		public DbSet<Employee> Employees { get; set; }
		public DbSet<Roles> Roles { get; set; }
		public DbSet<RolesPermission> RolesPermissions { get; set; }

		public DbSet<Address> Addresses { get; set; }
		public DbSet<City> Cities { get; set; }
		public DbSet<Country> Countries { get; set; }
		public DbSet<UserAddress> UserAddresses { get; set; }

		public DbSet<Image> Images { get; set; }
		public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
		public DbSet<DishRecipe> DishRecipes { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<OrderDish> OrderDishes { get; set; }

		public DbSet<Table> Tables { get; set; }
		public DbSet<Reservation> Reservations { get; set; }
		public DbSet<Delivery> Deliveries { get; set; }

		public DbSet<CashDesk> CashDesks { get; set; }

		public DbSet<RestaurantDetails> RestaurantDetails { get; set; }

		//Reports
		public DbSet<CostReport> CostReports { get; set; }
		public DbSet<DailyReport> DailyReports { get; set; }
		public DbSet<MonthlyReport> MonthlyReports { get; set; }

	}
}
