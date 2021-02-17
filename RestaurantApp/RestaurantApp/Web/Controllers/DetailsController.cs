using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DetailsController : ControllerBase
	{
		public readonly IRestaurantDetailsRepository _restaurantDetailsRepository;
		public readonly ICountryRepository _countryRepository;
		public readonly ICityRepository _cityRepository;
		public readonly IAddressRepository _addressRepository;

		public DetailsController(IRestaurantDetailsRepository restaurantDetailsRepository,
			ICountryRepository countryRepository,
			ICityRepository cityRepository,
			IAddressRepository addressRepository)
		{
			_restaurantDetailsRepository = restaurantDetailsRepository;
			_countryRepository = countryRepository;
			_cityRepository = cityRepository;
			_addressRepository = addressRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetRestaurantDetails()
		{
			var countries = await _countryRepository.GetAll();
			var cities = await _cityRepository.GetAll();
			var restaurantDetails = await _restaurantDetailsRepository.GetRestaurantDetails();

			return Ok(new { restaurantDetails, countries, cities });
		}

		[HttpPut]
		[Route("{id}")]
		public async Task<IActionResult> UpdateRestaurantDetails(string id, [FromBody]RestaurantDetailsModel detailsModel)
		{
			var details = await _restaurantDetailsRepository.GetRestaurantDetails();

			details.OpeningHour = detailsModel.OpeningHour;
			details.ClosingHour = detailsModel.ClosingHour;
			details.Details = detailsModel.Details;
			
			if (details.Address == null)
			{
				var address = new Address()
				{
					Id = Guid.NewGuid(),
					Name = "RestaurantDetails",
					City = await _cityRepository.GetById(detailsModel.Address.City.Id),
					Country = await _countryRepository.GetById(detailsModel.Address.Country.Id) ,
					Street = detailsModel.Address.Street,
				};
				_addressRepository.Create(address);
				details.Address = address;

			} else
			{
				details.Address.Name = detailsModel.Address.Name;
				details.Address.City = await _cityRepository.GetById(detailsModel.Address.City.Id);
				details.Address.Country = await _countryRepository.GetById(detailsModel.Address.Country.Id);
				details.Address.Street = detailsModel.Address.Street;
			}

			_restaurantDetailsRepository.Update(details);

			return Ok(new { restaurantDetails = details });
		}
	}
}
