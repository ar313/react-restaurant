using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RestaurantApp.Data.Repositories.Interfaces
{
	public interface IRepository<T> where T : class
	{
		Task<IEnumerable<T>> GetAll();

		Task<IEnumerable<T>> Find(Expression<Func<T, bool>> predicate);

		Task<T> GetById(Guid id);

		void Create(T entity);

		void Update(T entity);

		void Delete(T entity);

		int Count(Func<T, bool> predicate);
	}
}
