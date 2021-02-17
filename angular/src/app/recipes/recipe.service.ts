import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingedient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Schnitzel', 'Tasty Schnitzel', 'https://logosrated.net/wp-content/uploads/parser/A-and-A-Logo-1.png',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]
        ),
        new Recipe('Big Burger', 'Big Chungus', 'IMAGE_PATH PLACEHOLDER',[
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 2),
        ]),
      ];

    constructor(private slService: ShoppingListService){}
	
	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}
	
    getRecipes() {
        return this.recipes.slice();
	}
	
	getRecipe(index: number) {
		return this.recipes[index];
	}

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}