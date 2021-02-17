using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface ITableRepository : IRepository<Table>
	{
		Task<Table> GetTableByNumber(int number);
	}
}
