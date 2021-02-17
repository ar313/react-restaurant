using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RecipeController : Controller
	{
		//[Authorize(Policy = )]
		public readonly IRecipeRepository _recipeRepository;
		public readonly IRecipeIngredientRepository _recipeIngredientRepository;

		public RecipeController(IRecipeRepository recipeRepository, IRecipeIngredientRepository recipeIngredientRepository)
		{
			_recipeRepository = recipeRepository;
			_recipeIngredientRepository = recipeIngredientRepository;
		}

		[HttpPost]
		public async Task<IActionResult> AddRecipe([FromBody]RecipeModel recipeModel)
		{
			Guid id = Guid.NewGuid();

			if (recipeModel.Name.Length == 0)
			{
				return BadRequest();
			}

			_recipeRepository.Create(new Recipe()
			{
				Id = id,
				Name = recipeModel.Name
			});

			var recipes = await _recipeRepository.GetAllRecipes();

			return Ok(new { recipes });
		}


		[Authorize(Policy = Configurations.PermissionsList.PermissionsRecipeRecipes)]
		[HttpGet]
		public async Task<IActionResult> GetRecipes()
		{
			var recipes = await _recipeRepository.GetAllRecipes();

			return Ok(new { recipes });
		}

		[HttpPut]
		[Route("{id}")]
		public async Task<IActionResult> UpdateRecipes(string id, [FromBody]RecipeModel recipeModel)
		{
			Guid recipeId = Guid.Parse(id);

			var recipe = await _recipeRepository.GetById(recipeId);
			var recipeIngredients = await _recipeIngredientRepository.GetIngredientsForRecipe(recipeId);

			var ingredients = new List<RecipeIngredient>();

			foreach (Ingredient ing in recipeModel.Ingredients)
			{
				var recipeIngredient = await _recipeIngredientRepository.GetRecipeIngredient(recipeId, ing.Id);
				
				if (recipeIngredient == null)
				{
					ingredients.Add(
						new RecipeIngredient()
						{
							RecipeId = recipe.Id,
							IngredientId = ing.Id,
							Quantity = ing.Quantity
						}
					);
				} else
				{
					recipeIngredient.Quantity = ing.Quantity;
					_recipeIngredientRepository.Update(recipeIngredient);
					ingredients.Add(recipeIngredient);
				}
			}

			foreach(RecipeIngredient ing in recipeIngredients)
			{
				if (ingredients.Where(ri => ri.IngredientId == ing.IngredientId && ri.RecipeId == ing.RecipeId).FirstOrDefault() != null)
				{
					_recipeIngredientRepository.Delete(ing);
				}
			}

			recipe.Name = recipeModel.Name;
			recipe.Ingredients = ingredients;

			_recipeRepository.Update(recipe);
			var recipes = await _recipeRepository.GetAllRecipes();

			return Ok(new { recipes });
		}

		[HttpDelete]
		[Route("{id}")]
		public async Task<IActionResult> DeleteRecipes(string id)
		{
			Guid recipeId = Guid.Parse(id);

			var recipe = await _recipeRepository.GetById(recipeId);

			_recipeRepository.Delete(recipe);

			var recipes = await _recipeRepository.GetAllRecipes();

			return Ok(new { recipes });
		}
	}
}
