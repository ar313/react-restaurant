using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RestaurantApp.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using RestaurantApp.Configurations;
using System.Net.Mail;
using RestaurantApp.Data.Context;
using RestaurantApp.Data.Entities;
using IdentityModel;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace RestaurantApp.Web.Controllers
{

	[Route("[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly ApplicationDbContext _context;
		private readonly JwtTokenSettings _jwtTokenSettings;
		private readonly IConfiguration _configuration;

		public AccountController(
			UserManager<User> userManager,
			ApplicationDbContext context,
			IConfiguration configuration,
			IOptions<JwtTokenSettings> jwtTokenSettings
			)
		{
			this._userManager = userManager;
			this._context = context;
			_configuration = configuration;
			this._jwtTokenSettings = jwtTokenSettings.Value;
		}

		[HttpGet]
		public async Task<IActionResult> ConfirmEmail(string token, string userid)
		{
			User user = _userManager.FindByIdAsync(userid).Result;
			IdentityResult result = await _userManager.
						ConfirmEmailAsync(user, token);

			if (result.Succeeded)
			{
				return Ok(new { Message = "Email confirmed successfully!" } );
			}
			else
			{
				return new BadRequestObjectResult(new { Message = "Error couldn't confirm email!" });
			}
		}

		[HttpPost]
		[Route("Register")]
		public async Task<IActionResult> Register([FromBody]AuthenticateModel user)
		{
			if (!ModelState.IsValid || user == null)
			{
				return new BadRequestObjectResult(new { Message = "User Registration Failed" });
			}

			var identityUser = new User() { UserName = user.Email, Email = user.Email };
			var result = await _userManager.CreateAsync(identityUser, user.Password);
			var roleResult = await _userManager.AddToRoleAsync(identityUser, "Client");

			if (!result.Succeeded || !roleResult.Succeeded)
			{
				return new BadRequestObjectResult(new { Message = "User Registration Failed" });
			}

			SendEmailConfirmation(identityUser);

			return Ok(new { Message = "User Registration Successful" });
		}

		[HttpGet]
		[Authorize(Policy = PermissionsList.PermissionsAccountClaims)]
		[Route("Get")]
		public IActionResult Get()
		{
			return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
		}

		[HttpPost]
		[Route("Login")]
		public async Task<IActionResult> Login([FromBody]AuthenticateModel userModel)
		{
			User identityUser;

			if (!ModelState.IsValid || userModel == null || (identityUser = await ValidateUser(userModel)) == null)
			{
				return new BadRequestObjectResult(new { Message = "Login failed" });
			}
			var roles = await _userManager.GetRolesAsync(identityUser);

			var accessToken = GenerateToken(identityUser, roles[0]);
			var refreshToken = GenerateRefreshToken();

			var response = await GenerateTokenResponse(new RefreshTokenModel()
			{
				access_token = accessToken,
				refresh_token = refreshToken
			}, identityUser, roles[0]);

			await _context.SaveChangesAsync();

			return Ok(response);
		}

		[Route("refresh/token")]
		[HttpPost]
		public async Task<IActionResult>Refresh([FromBody] RefreshTokenModel refreshCredentials)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_jwtTokenSettings.Secret);
			SecurityToken validatedToken;
			
			var principal = tokenHandler.ValidateToken(refreshCredentials.access_token,
				new TokenValidationParameters
				{
					ValidateAudience = false,
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
				}, out validatedToken);
			var accessToken = validatedToken as JwtSecurityToken;
			
			if(accessToken == null || accessToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature))
			{
				throw new SecurityTokenException("Invalid token");
			}

			var userId = accessToken.Claims.Where(claim => claim.Type == "sub").FirstOrDefault();
			var user = await _context.UserTokens.Where(
					userToken => userToken.Value == refreshCredentials.refresh_token
				)
				.FirstOrDefaultAsync();

			if( user != null && userId.Value == user.UserId )
			{
				User identityUser = await _userManager.FindByIdAsync(userId.Value);
				var roles = await _userManager.GetRolesAsync(identityUser);

				var newAccessToken = GenerateToken(identityUser, roles[0]);
				var newRefreshToken = GenerateRefreshToken();
				var response = await GenerateTokenResponse(new RefreshTokenModel()
				{
					access_token = newAccessToken,
					refresh_token = newRefreshToken
				}, identityUser, roles[0]);

				return Ok(response);
			}

			return Unauthorized();
		}

		/*
			public async Task SendEmailConfirmation(User identityUser)
			{
				var apiKey = _configuration.GetSection("SENDGRID_API_KEY").Value;
				var client = new SendGridClient(apiKey);
				var from = new EmailAddress("test1@example.com", "Example User 1");
				string confirmationToken = _userManager.
					GenerateEmailConfirmationTokenAsync(identityUser).Result;

				string confirmationLink = Url.Action("ConfirmEmail",
				  "Account", new
				  {
					  token = confirmationToken,
					  userid = identityUser.Id.ToString(),
				  },
				   protocol: HttpContext.Request.Scheme);

				EmailAddress to = new EmailAddress(identityUser.Email);

				var subject = "Confirm Email";
				var htmlContent = confirmationLink;
				var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlContent);
				var response = await client.SendEmailAsync(msg);
			}
		*/

		public void SendEmailConfirmation(User identityUser)
		{
					string confirmationToken = _userManager.
				GenerateEmailConfirmationTokenAsync(identityUser).Result;

			string confirmationLink = Url.Action("ConfirmEmail",
			  "Account", new
			  {
				  token = confirmationToken,
				  userid = identityUser.Id.ToString(),
			  },
			   protocol: HttpContext.Request.Scheme);

			SmtpClient client = new SmtpClient();
			client.DeliveryMethod = SmtpDeliveryMethod.
			 SpecifiedPickupDirectory;
			client.PickupDirectoryLocation = @"E:\test";

			MailMessage message = new MailMessage("test@localhost", identityUser.Email, "Confirm your email", confirmationLink);
			message.IsBodyHtml = true;

			try
			{
				client.Send(message);
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);
			}
		}


		private async Task<User> ValidateUser(AuthenticateModel credentials)
		{
			var identityUser = await _userManager.FindByNameAsync(credentials.Email);

			if (identityUser != null)
			{
				var result = _userManager.PasswordHasher.VerifyHashedPassword(
					identityUser, identityUser.PasswordHash, credentials.Password
				);

				return result == PasswordVerificationResult.Failed ? null : identityUser;
			}

			return null;
		}

		private string GenerateRefreshToken()
		{
			var randomNumber = new byte[32];
			using var randomNumberGenerator = RandomNumberGenerator.Create();
			randomNumberGenerator.GetBytes(randomNumber);
			return Convert.ToBase64String(randomNumber);
		}

		private async Task<object> GenerateTokenResponse(RefreshTokenModel Tokens, User identityUser, string Role)
		{

			var user = await _context.UserTokens.Where(
				userToken => userToken.UserId == identityUser.Id
			)
			.FirstOrDefaultAsync();

			if (user != null)
			{
				_context.UserTokens.Remove(user);
			}

			await _context.UserTokens.AddAsync(new IdentityUserToken<string>()
			{
				UserId = identityUser.Id,
				LoginProvider = "local",
				Name = "refresh_token",
				Value = Tokens.refresh_token
			});

			await _context.SaveChangesAsync();

			return new { access_token = Tokens.access_token, refresh_token = Tokens.refresh_token };
		}

		private string GenerateToken(IdentityUser user, string role)
		{
			var tokenHandler = new JwtSecurityTokenHandler(); 
			var key = Encoding.ASCII.GetBytes(_jwtTokenSettings.Secret);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new List<Claim>
			{
				new Claim(JwtClaimTypes.Subject, user.Id ),
				new Claim(JwtClaimTypes.Name, user.Email),
				new Claim(JwtClaimTypes.Role, role),
			}),
				Expires = DateTime.UtcNow.AddSeconds(_jwtTokenSettings.ExpiryTimeInSeconds),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
				Audience = _jwtTokenSettings.Audience,
				Issuer = _jwtTokenSettings.Issuer,
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}

	}
}

