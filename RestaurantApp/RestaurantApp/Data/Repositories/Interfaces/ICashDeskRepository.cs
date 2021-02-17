using RestaurantApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface ICashDeskRepository : IRepository<CashDesk>
	{
		public Task AddCash(Guid employeeID, float sum);

		public Task<CashDesk> GetByEmployeeId(Guid Id);

		public Task RemoveCash(Guid employeeID, float sum);
	}
}
