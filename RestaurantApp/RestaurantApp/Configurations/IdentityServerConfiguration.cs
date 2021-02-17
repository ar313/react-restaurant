using IdentityModel;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static IdentityServer4.IdentityServerConstants;

namespace RestaurantApp.Configurations
{
	public static class IdentityServerConfiguration
	{
		public static IEnumerable<Resource> res =>
			new List<Resource>{
				new IdentityResource
				{
					Name = "roles",
					DisplayName = "Roles",
					UserClaims = { JwtClaimTypes.Role }
				}
			};

		public static IEnumerable<ApiResource> GetApis() =>
			new List<ApiResource> { new ApiResource("RestaurantApi","RestaurantApi",new []
			{
				JwtClaimTypes.Role
			}) };

		public static IEnumerable<Client> GetClients() =>
			new List<Client>
			{
				new Client
				{
					ClientId = "client_id",
					ClientName = "RestaurantClient",

					AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
					AllowOfflineAccess = true,

					ClientSecrets = { new Secret("very nice secret".Sha256()) },
					RedirectUris = { "http://localhost:3000/" },
					PostLogoutRedirectUris = { "http://localhost:3000/" },

					AllowedScopes = {
						StandardScopes.OpenId,
						StandardScopes.Profile,
						StandardScopes.OfflineAccess,
						StandardScopes.Email,
						"roles" 
					},

					AccessTokenType = AccessTokenType.Jwt
				}
			};
	}
}
