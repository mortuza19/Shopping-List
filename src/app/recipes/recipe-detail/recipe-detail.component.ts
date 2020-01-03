import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Recipe } from 'src/app/Models/recipes-model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ShoppingListService } from 'src/app/shared/shopping-list.services';
import { Ingredient } from 'src/app/Models/ingredients';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe : Recipe;
  id:number;
  constructor(
    private recipeService:RecipeService,
    private shoppingListService : ShoppingListService,
    private route : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params:Params)=>{
        const id = +params['id'];
        this.id = id;
        this.recipe = this.recipeService.getAllRecipes()[id-1];
      }
    )
    // this.recipeService.selectedRecipe.subscribe(
    //   (recipe:Recipe)=>{
    //     this.recipe = recipe;
    //   }
    // )
  }

  addToShoppingList(){
    this.shoppingListService.addAllIngredients(this.recipe.ingredients);
  }

  onEdit(){
    this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id - 1);
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
