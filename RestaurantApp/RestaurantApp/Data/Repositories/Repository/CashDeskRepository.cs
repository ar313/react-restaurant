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
	public class CashDeskRepository : Repository<CashDesk>, ICashDeskRepository
	{
		public CashDeskRepository(ApplicationDbContext context)
			: base(context)
		{

		}

		public async Task AddCash(Guid employeeId, float sum)
		{
			var cashDesk = await _context.CashDesks.Where(cd => cd.Employee.Id == employeeId).FirstOrDefaultAsync();
			
			if (cashDesk == null)
			{
				cashDesk = new CashDesk()
				{
					Id = Guid.NewGuid(),
					Employee = _context.Employees.Where(e => e.Id == employeeId).FirstOrDefault(),
					Cash = 0
				};

				this.Create(cashDesk);
			}

			cashDesk.Cash += sum;

			this.Update(cashDesk);
		}

		public async Task<CashDesk> GetByEmployeeId(Guid Id)
		{
			var cashDesk = await _context.CashDesks.Where(cd => cd.Employee.Id == Id).FirstOrDefaultAsync();

			return cashDesk;
		}

		public async Task RemoveCash(Guid employeeId, float sum)
		{
			var cashDesk = await _context.CashDesks.Where(cd => cd.Employee.Id == employeeId).FirstOrDefaultAsync();

			if (cashDesk == null)
			{
				cashDesk = new CashDesk()
				{
					Id = Guid.NewGuid(),
					Employee = _context.Employees.Where(e => e.Id == employeeId).FirstOrDefault(),
					Cash = 0
				};

				this.Create(cashDesk);
			}

			cashDesk.Cash -= sum;

			if (cashDesk.Cash <= 0)
			{
				cashDesk.Cash = 0;
			}
			
			this.Update(cashDesk);
		}
	}
}
