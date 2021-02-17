using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using RestaurantApp.Data.Entities;
using RestaurantApp.Data.Entities.AddressNamespace;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using RestaurantApp.Domain.Services;
using RestaurantApp.Models;

namespace RestaurantApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        public readonly IAddressRepository _addressRepository;
        public readonly ICityRepository _cityRepository;
        public readonly ICountryRepository _countryRepository;
        public readonly IUserAddressRepository _userAddressRepository;
        public readonly IUserRepository _userRepository;

        public AddressController(IAddressRepository addressRepository,
            ICityRepository cityRepository,
            ICountryRepository countryRepository,
            IUserAddressRepository userAddressRepository,
            IUserRepository userRepository)
        {
            _addressRepository = addressRepository;
            _cityRepository = cityRepository;
            _countryRepository = countryRepository;
            _userAddressRepository = userAddressRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserAddresses()
        {
            var id = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            var userAddresses = await _userAddressRepository.Find(adr => adr.User.Id == id.Value);
            var countries = await _countryRepository.GetAll();
            var cities = await _cityRepository.GetAll();
            var loadAddress = await _addressRepository.GetAll();

            List<Address> addresses = new List<Address>();

            foreach (UserAddress userAddress in userAddresses)
            {
                addresses.Add(userAddress.Address);
            }

            return Ok(new { addresses, countries, cities });
        }

        [HttpGet]
        [Route("variables")]
        public async Task<IActionResult> GetVariables()
		{
            var countries = await _countryRepository.GetAll();
            var cities = await _cityRepository.GetAll();

            return Ok(new { countries, cities });
        }

        [HttpPost]
        public async Task<IActionResult> AddAddress([FromBody] AddressModel address)
        {
            var id = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            User user = await _userRepository.GetUserById(id.Value);
            City city = await _cityRepository.GetById(address.City.Id);
            Country country = await _countryRepository.GetById(address.Country.Id);
            
            Address newAddress = new Address()
            {
                Id = Guid.NewGuid(),
                Name = address.Name,
                Street = address.Street,
                City = city,
                Country = country
            };

            UserAddress userAddress = new UserAddress()
            {
                Id = Guid.NewGuid(),
                User = user,
                Address = newAddress
            };

            _userAddressRepository.Create(userAddress);

           

            return Ok(new { address = newAddress });
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateAddress(string id, [FromBody]AddressModel address)
        {
            Guid addressId = Guid.Parse(id);

            Address currentAddress = await _addressRepository.GetById(addressId);

            currentAddress.City = address.City;
            currentAddress.Country = address.Country;
            currentAddress.Name = address.Name;
            currentAddress.Street = address.Street;

            _addressRepository.Update(currentAddress);

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteAddress(string id)
        {
            Guid addressId = Guid.Parse(id);
            var userId = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            Address currentAddress = await _addressRepository.GetById(addressId);
            
            var userAddresses = await _userAddressRepository
                .Find(adr => adr.User.Id == userId.Value && adr.Address.Id == addressId);
            UserAddress userAddress = userAddresses.FirstOrDefault();

            _userAddressRepository.Delete(userAddress);

            _addressRepository.Delete(currentAddress);


            return Ok( new { Message = "Deleted" });
        }
    }
}