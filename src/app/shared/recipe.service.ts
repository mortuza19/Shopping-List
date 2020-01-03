import { Injectable } from '@angular/core';
import { Recipe } from '../Models/recipes-model';
import { Ingredient } from '../Models/ingredients';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [];

  recipeAdded = new Subject<Recipe[]>();
  constructor() { }

  setRecipies(recipies:Recipe[]){
    this.recipes = recipies;
    this.recipeAdded.next(this.recipes.slice());
  }

  getAllRecipes(){
    return this.recipes.slice();
  }

  getSingleRecipe(index:number){
    return this.recipes.slice()[index];
  }

  addRecipe(newRecipe : Recipe){
    this.recipes.push(newRecipe);
    this.recipeAdded.next(this.recipes.slice());
  }

  updateRecipe(index:number,updatedRecipe: Recipe){
    this.recipes[index] = updatedRecipe;
    this.recipeAdded.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeAdded.next(this.recipes.slice());
  }
}
