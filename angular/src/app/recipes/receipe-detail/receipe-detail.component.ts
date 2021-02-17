import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;
	constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {

   }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				this.recipe = this.recipeService.getRecipe(this.id);
			}
		)
  }

  onAddToShoppingList() {
	this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
	  this.router.navigate(['edit'], { relativeTo: this.route })
  }
}
