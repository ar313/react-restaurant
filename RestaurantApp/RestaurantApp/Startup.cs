using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using RestaurantApp.Data.Context;
using RestaurantApp.Configurations;
using RestaurantApp.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using RestaurantApp.Domain.Services;
using RestaurantApp.Data.Repositories.Interfaces;
using RestaurantApp.Data.Repositories.Repository;
using SimpleInjector;
using System.Net;
using SimpleInjector.Lifestyles;
using RestaurantApp.Data.Repositories.Interfaces.Order;
using RestaurantApp.Web.Hubs;
using System.Threading.Tasks;
using RestaurantApp.Data.Repositories.Interfaces.AdressNamespace;
using RestaurantApp.Data.Repositories.Repository.AdressNamespace;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Hangfire;
using Hangfire.SqlServer;
using Hangfire.Storage;
using RestaurantApp.Data.Repositories.Interfaces.Reports;
using RestaurantApp.Data.Repositories.Repository.Reports;

namespace RestaurantApp
{
	public class Startup
	{
		private readonly Container container;
		readonly string AllowSpecificOrigins = "_AllowSpecificOrigins";
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
			container = new Container();
			container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddHangfire(configuration => configuration
				.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
				.UseSimpleAssemblyNameTypeSerializer()
				.UseRecommendedSerializerSettings()
				.UseSqlServerStorage(Configuration.GetConnectionString("SqlConnection"), new SqlServerStorageOptions
				{
					CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
					SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
					QueuePollInterval = TimeSpan.Zero,
					UseRecommendedIsolationLevel = true,
					DisableGlobalLocks = true
				}));

			services.AddHangfireServer();

			services.AddCors( options =>
			{
				options.AddPolicy(name: AllowSpecificOrigins, builder =>
				{
					builder.WithOrigins("http://localhost:3000")
					.AllowAnyHeader()
					.AllowAnyMethod();
				});
			});

			services.AddSignalR();

			services.AddControllers().AddNewtonsoftJson(options =>
				options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
			); ;

			services.AddDbContext<ApplicationDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("SqlConnection")));
			//Dev db and real db are different Reminder

			services.AddScoped<IAuthorizationHandler, PermissionHandler>();
			
			services.AddSimpleInjector(container, options => {
				options.AddAspNetCore()
				.AddControllerActivation();
			});
			
			services.AddIdentity<User, Roles>(options =>
			{
				options.SignIn.RequireConfirmedAccount = true;
				options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultEmailProvider;
			}).AddDefaultTokenProviders()
			.AddEntityFrameworkStores<ApplicationDbContext>();

			services.AddIdentityServer()
				.AddJwtBearerClientAuthentication()
				.AddAspNetIdentity<User>()
				.AddInMemoryApiResources(IdentityServerConfiguration.GetApis())
				.AddInMemoryClients(IdentityServerConfiguration.GetClients())
				.AddDeveloperSigningCredential();

			var JwtSettingsSection = Configuration.GetSection("JwtSettings");
			services.Configure<JwtTokenSettings>(JwtSettingsSection);
			var JwtTokenSettings = JwtSettingsSection.Get<JwtTokenSettings>();

			var key = Encoding.ASCII.GetBytes(JwtTokenSettings.Secret);

			services.AddAuthentication(options => {
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer("Bearer", options =>
			{
				options.RequireHttpsMetadata = false;
				options.SaveToken = true;
				options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
				{
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidIssuer = JwtTokenSettings.Issuer,
					ValidAudience = JwtTokenSettings.Audience,
					ClockSkew = TimeSpan.Zero
				};

				options.Events = new JwtBearerEvents
				{
					OnMessageReceived = context =>
					{
						var accessToken = context.Request.Query["access_token"];

						// If the request is for hub
						var path = context.HttpContext.Request.Path;
						if (!string.IsNullOrEmpty(accessToken) &&
							(path.StartsWithSegments("/ingredients")))
						{
							// Read the token out of the query string
							context.Token = accessToken;
						}
						return Task.CompletedTask;
					}
				};
			});

			services.AddAuthorization(options =>
				options = PermissionSettings.CreatePermissions(options)
			);

		}

		private void InitializeContainer()
		{
			container.Register<IRolesRepository, RolesRepository>(Lifestyle.Transient);
			container.Register<IIngredientRepository, IngredientRepository>(Lifestyle.Transient);
			container.Register<IUserRepository, UserRepository>(Lifestyle.Transient);
			container.Register<IOrderRepository, OrderRepository>(Lifestyle.Transient);
			container.Register<IPermissionRepository, PermissionRepository>(Lifestyle.Transient);
			container.Register<IDishRepository, DishRepository>(Lifestyle.Transient);
			container.Register<IRecipeRepository, RecipeRepository>(Lifestyle.Transient);
			container.Register<IRecipeIngredientRepository, RecipeIngredientRepository>(Lifestyle.Transient);
			container.Register<IRolesPermissionRepository, RolesPermissionRepository>(Lifestyle.Transient);
			container.Register<IAddressRepository, AddressRepository>(Lifestyle.Transient);
			container.Register<IUserAddressRepository, UserAddressRepository>(Lifestyle.Transient);
			container.Register<ICityRepository, CityRepository>(Lifestyle.Transient);
			container.Register<ICountryRepository, CountryRepository>(Lifestyle.Transient);
			container.Register<IDeliveryRepository, DeliveryRepository>(Lifestyle.Transient);
			container.Register<IOrderDishRepository, OrderDishRepository>(Lifestyle.Transient);
			container.Register<ICashDeskRepository, CashDeskRepository>(Lifestyle.Transient);
			container.Register<IEmployeeRepository, EmployeeRepository>(Lifestyle.Transient);
			container.Register<ITableRepository, TableRepository>(Lifestyle.Transient);
			container.Register<IReservationRepository, ReservationRepository>(Lifestyle.Transient);
			container.Register<IRestaurantDetailsRepository, RestaurantDetailsRepository>(Lifestyle.Transient);
			container.Register<ICostReportRepository, CostReportRepository>(Lifestyle.Transient);
			container.Register<IDailyReportRepository, DailyReportRepository>(Lifestyle.Transient);
			container.Register<IMonthlyReportRepository, MonthlyReportRepository>(Lifestyle.Transient);
			container.Register<IImageRepository, ImageRepository>(Lifestyle.Transient);
			container.Register<IConfiguration>(() => Configuration, Lifestyle.Singleton);
			//container.Register<RoleManager<Roles>>();
			//container.Register<IAuthorizationHandler, PermissionHandler>(Lifestyle.Scoped);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, 
			IWebHostEnvironment env, 
			IBackgroundJobClient backgroundJobs,
			IServiceProvider serviceProvider,
			UserManager<User> userManager)
		{

			//if (env.IsDevelopment())
			//{
			//	app.UseDeveloperExceptionPage();
			//}
			app.ConfigureExceptionHandler();

			app.UseRouting();
			
			app.UseIdentityServer();

			app.UseAuthorization();
			app.UseAuthentication();

			app.UseCors(AllowSpecificOrigins);

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers().RequireCors(AllowSpecificOrigins);
				endpoints.MapHub<IngredientHub>("/ingredients").RequireCors(AllowSpecificOrigins);
			});
			
			InitializeContainer();

			container.Verify();

			RolesSetup.createRoles(serviceProvider).Wait();
			PermissionSettings.SeedPermissions(container).Wait();
			TablesSettings.SeedTables(container).Wait();
			RestaurantDetailsSettings.DetailsSetup(container).Wait();

			ConfigureReports.ConfigureReportsDate(container, userManager).Wait();
		}
	}
}
