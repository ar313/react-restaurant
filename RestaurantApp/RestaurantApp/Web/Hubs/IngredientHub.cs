using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using RestaurantApp.Configurations;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Models;
using SimpleInjector;
using System;
using System.Threading.Tasks;

namespace RestaurantApp.Web.Hubs
{
	
	public class IngredientHub : Hub
	{
		public readonly Container _container;
		public readonly IIngredientRepository _ingredientRepository;

		public IngredientHub(Container container)
		{
			_container = container;
			_ingredientRepository = _container.GetInstance<IIngredientRepository>();
		}

		[Authorize(Policy = PermissionsList.PermissionsIngredientIngredients)]
		[HubMethodName("GetIngredients")]
		public Task GetIngredients()
		{
			var ingredients = _ingredientRepository.GetAll().Result;
			return Clients.All.SendAsync("GetIngredients", ingredients);
		}

		//[Authorize(Policy = PermissionsList.PermissionsIngredientAdd)]
		[HubMethodName("AddIngredient")]
		public Task AddIngredient(IngredientModel ingredientModel)
		{
			Guid ingredientId = Guid.NewGuid();

			var ingredientExist = _ingredientRepository.GetIngredient(ingredientModel.Name).Result;

			var ingredientsOld = _ingredientRepository.GetAll().Result;
			
			if (ingredientExist != null)
			{
				return Clients.All.SendAsync("GetIngredients", ingredientsOld);
			}

			Ingredient ingredient = new Ingredient()
			{
				Id = ingredientId,
				Name = ingredientModel.Name,
				Quantity = ingredientModel.Quantity,
				Price = ingredientModel.Price,
				ExpirationDate = ingredientModel.ExpirationDate
			};

			_ingredientRepository.Create(ingredient);

			var ingredients = _ingredientRepository.GetAll().Result;
			return Clients.All.SendAsync("GetIngredients", ingredients);	
		}

		[HubMethodName("UpdateIngredient")]
		//[Authorize(Policy = PermissionsList.PermissionsIngredientUpdate)]
		public Task UpdateIngredient(IngredientModel ingredientModel)
		{
			Guid ingredientId = Guid.Parse(ingredientModel.Id);



			Ingredient ingredient = _ingredientRepository.GetById(ingredientId).Result;
			ingredient.Name = ingredientModel.Name;
			ingredient.Quantity = ingredientModel.Quantity;
			ingredient.Price = ingredientModel.Price;
			ingredient.ExpirationDate = ingredientModel.ExpirationDate;

			_ingredientRepository.Update(ingredient);

			var ingredients = _ingredientRepository.GetAll().Result;
			return Clients.All.SendAsync("GetIngredients", ingredients);
		}

		[HubMethodName("DeleteIngredient")]
		//[Authorize(Policy = PermissionsList.PermissionsIngredientDelete)]
		public Task DeleteIngredient(string id)
		{
			Guid ingredientId = Guid.Parse(id);
			Ingredient ingredient =  _ingredientRepository.GetById(ingredientId).Result;

			if (ingredient == null)
			{
				 var ingredientsOld = _ingredientRepository.GetAll().Result;
				return Clients.All.SendAsync("GetIngredients", ingredientsOld);
			}

			_ingredientRepository.Delete(ingredient);

			var ingredients = _ingredientRepository.GetAll().Result;
			return Clients.All.SendAsync("GetIngredients", ingredients);
		}
	}
}
