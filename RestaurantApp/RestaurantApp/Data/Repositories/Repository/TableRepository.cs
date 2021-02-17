using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class TableRepository : Repository<Table>, ITableRepository
	{
		public TableRepository(ApplicationDbContext context) : base(context)
		{

		}

		public async Task<Table> GetTableByNumber(int number)
		{
			var table = await _context.Tables.Where(t => t.Number == number).FirstAsync();

			return table;
		}
	}
}
