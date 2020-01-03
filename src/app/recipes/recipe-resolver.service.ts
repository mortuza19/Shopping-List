import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../Models/recipes-model';
import { RecipeService } from '../shared/recipe.service';

@Injectable({
    providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService:DataStorageService,private recipeService:RecipeService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes:Recipe[] = this.recipeService.getAllRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }
        else{
            return recipes;
        }
    }
}