using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Configurations;
using RestaurantApp.Data.Entities.Order;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Models;
using static System.Net.Mime.MediaTypeNames;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DishesController : ControllerBase
	{
		public readonly IDishRepository _dishRepository;
		public readonly IImageRepository _imageRepository;

		public DishesController(IDishRepository dishRepository,
			IImageRepository imageRepository)
		{
			_dishRepository = dishRepository;
			_imageRepository = imageRepository;
		}

		[HttpGet]
		[Authorize(Policy = PermissionsList.PermissionsDishDishes)]
		public async Task<IActionResult> GetIngredients()
		{
			return Ok(new { dishes = await _dishRepository.GetAllDish() });
		}

		[HttpGet]
		[Route("image/{id}")]
		//[Authorize(Policy = PermissionsList.PermissionsDishDishes)]
		public async Task<IActionResult> GetImage(string id)
		{

			Guid Id = Guid.Parse(id);
			var dish = await _dishRepository.GetDish(Id);
			if(dish.DishImage == null)
			{
				return NotFound();
			}
			var image = dish.DishImage.ImageData;
			byte[] imgData = image;

			return File(imgData, MediaTypeNames.Image.Jpeg, dish.DishImage.ImageTitle);

			//return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> AddDish([FromBody] DishModel dishModel)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest();
			}

			List<DishRecipe> recipes = new List<DishRecipe>();
			var Id = Guid.NewGuid();
			var image = await _imageRepository.GetById(Guid.Parse(dishModel.File));

			foreach (RecipeModel recipe in dishModel.Recipes)
			{
				recipes.Add(new DishRecipe()
				{
					DishId = Id,
					RecipeId = Guid.Parse(recipe.Id)
				});
			}

			Dish dish = new Dish()
			{
				Id = Id,
				DishImage = image,
				DishPrice = dishModel.Price,
				Name = dishModel.Dish,
				Recipes = recipes
			};

			_dishRepository.Create(dish);

			return Ok();
		} 

		[HttpPost]
		[Route("image/add")]
		//[Authorize(Policy = PermissionsList.PermissionsDishAdd)]
		public IActionResult AddImage([FromForm]IList<IFormFile> files)
		{

			var inputStream = new FileStream(Path.GetTempFileName(), FileMode.Create);

			var formFile = files.First();
			formFile.CopyTo(inputStream);

			byte[] image = new byte[inputStream.Length];
			inputStream.Seek(0, SeekOrigin.Begin);
			inputStream.Read(image, 0, image.Length);
			var Id = Guid.NewGuid();

			_imageRepository.Create(new Data.Entities.Order.Image()
			{
				Id = Id,
				ImageTitle = formFile.FileName,
				ImageData = image
			});

			return Ok(new { image = Id });
		}
	}
}
