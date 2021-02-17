using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Configurations
{
	public static class PermissionsList
	{
		public const string PermissionsOrderAdd = "permissions.order.add";
		public const string PermissionsOrderCancel = "permissions.order.cancel";
		public const string PermissionsOrderOrders = "permissions.order.orders";

		public const string PermissionsDishDishes = "permissions.dish.dishes";
		public const string PermissionsDishAdd = "permissions.dish.add";

		public const string PermissionsIngredientAdd = "permissions.ingredient.add";
		public const string PermissionsIngredientUpdate = "permissions.ingredient.update";
		public const string PermissionsIngredientDelete = "permissions.ingredient.delete";
		public const string PermissionsIngredientIngredients = "permissions.ingredient.ingredients";

		public const string PermissionsRecipeRecipes = "permission.recipe.recipes";

		public const string PermissionsAccountClaims = "permissions.account.claims";

		public const string PermissionsRolesAdd = "permissions.roles.add";
		public const string PermissionsRolesRemove = "permissions.roles.remove";
		public const string PermissionsRolesUpdate = "permissions.roles.update";
	}
}
