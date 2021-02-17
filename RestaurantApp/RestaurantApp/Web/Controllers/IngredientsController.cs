using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Configurations;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	//[Authorize(Roles = RolesList.Kitchen)]
	public class IngredientsController : ControllerBase
	{
		public IIngredientRepository _ingredientRepository;
		
		public IngredientsController(IIngredientRepository ingredientRepository)
		{
			_ingredientRepository = ingredientRepository;
		}

		[HttpGet]
		//[Authorize(Policy = PermissionsList.PermissionsIngredientIngredients)]
		public IActionResult GetIngredients()
		{
			return Ok(new { ingredients = _ingredientRepository.GetAll() });
		}

		[HttpPost]
		//[Authorize(Policy = PermissionsList.PermissionsIngredientAdd)]
		public IActionResult AddIngredient([FromBody] IngredientModel ingredientModel)
		{
			Guid ingredientId = Guid.NewGuid();

			var ingredientExist = _ingredientRepository.GetIngredient(ingredientModel.Name);

			if (!ModelState.IsValid 
				|| ingredientExist.Result != null )
			{
				return BadRequest();
			}

			Ingredient ingredient = new Ingredient() {
				Id = ingredientId,
				Name = ingredientModel.Name,
				Quantity = ingredientModel.Quantity,
				Price = ingredientModel.Price,
				ExpirationDate = ingredientModel.ExpirationDate
			};

			_ingredientRepository.Create(ingredient);

			return Ok( new { ingredient } );
		}

		[Route("{id}")]
		[HttpPut]
		//[Authorize(Policy = PermissionsList.PermissionsIngredientUpdate)]
		public async Task<IActionResult> UpdateIngredient(string id, [FromBody] IngredientModel ingredientModel)
		{
			Guid ingredientId = Guid.Parse(id);

			if(!ModelState.IsValid)
			{
				return BadRequest();
			}

			Ingredient ingredient = await _ingredientRepository.GetById(ingredientId);
			ingredient.Name = ingredientModel.Name;
			ingredient.Quantity = ingredientModel.Quantity;
			ingredient.Price = ingredientModel.Price;
			ingredient.ExpirationDate = ingredientModel.ExpirationDate;

			_ingredientRepository.Update(ingredient);

			return Ok(new { ingredient });
		}

		[Route("{id}")]
		[HttpDelete]
		//[Authorize(Policy = PermissionsList.PermissionsIngredientDelete)]
		public async Task<IActionResult> DeleteIngredient(string id)
		{
			Guid ingredientId = Guid.Parse(id);
			Ingredient ingredient = await _ingredientRepository.GetById(ingredientId);

			if (ingredient == null)
			{
				return NotFound();
			}

			_ingredientRepository.Delete(ingredient);


			return Ok();
		}

	}
}