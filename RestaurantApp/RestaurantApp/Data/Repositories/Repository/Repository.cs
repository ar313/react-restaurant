using Microsoft.EntityFrameworkCore;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Repository
{
	public class Repository<T> : IRepository<T> where T : class
	{
		protected readonly ApplicationDbContext _context;

		public Repository(ApplicationDbContext context)
		{
			_context = context;
		}

		protected void Save() => _context.SaveChanges();

		public int Count(Func<T, bool> predicate)
		{
			return _context.Set<T>().Where(predicate).Count();
		}

		public void Create(T entity)
		{
			_context.Add(entity);
			Save();
		}

		public void Delete(T entity)
		{
			_context.Remove(entity);
			Save();
		}

		public async Task<IEnumerable<T>> Find(Expression<Func<T, bool>> predicate)
		{
			return await _context.Set<T>().Where(predicate).ToListAsync();
		}

		public async Task<IEnumerable<T>> GetAll()
		{
			var result = await _context.Set<T>().ToListAsync();

			return result;
		}

		public async Task<T> GetById(Guid id)
		{
			return await _context.Set<T>().FindAsync(id);
		}

		public void Update(T entity)
		{
			_context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
			Save();
		}
	}
}
