import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import { Recipe } from '../Models/recipes-model';

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(
        private http:HttpClient, 
        private recipeService: RecipeService,){}

    storeRecipies(){
        const recipes = this.recipeService.getAllRecipes();
        console.log('hi',recipes);
        this.http.put('https://shopping-list-2b077.firebaseio.com/recipes.json',recipes)
        .subscribe(Response=>{
            console.log(Response);
        })
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://shopping-list-2b077.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            if(!recipes){
                return
            }
            return recipes.map(recipe=>{
                return{
                    ...recipe,
                    ingredients : recipe.ingredients ? recipe.ingredients : []
                }
            })
        }),
        tap(recipes=>{
            this.recipeService.setRecipies(recipes);
        }))
    }

}