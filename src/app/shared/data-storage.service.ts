import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import { Recipe } from '../Models/recipes-model';
import { Ingredient } from '../Models/ingredients';

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(
        private http:HttpClient, 
        private recipeService: RecipeService,){}

    storeRecipies(){
        const recipes = this.recipeService.getAllRecipes();
        this.http.put('https://shopping-list-2b077.firebaseio.com/recipes.json',recipes)
        .subscribe(Response=>{
            console.log(Response);
        })
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://shopping-list-2b077.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            if(!recipes){
                return []
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

    fetchIngredients(){
        return this.http.get<Ingredient[]>('https://shopping-list-2b077.firebaseio.com/ingredient-list.json')
        .pipe(map(data=>{
            let ingredient : Ingredient[]=[];
            for(let key in data){
                ingredient.push(data[key]);
            }
            return ingredient;
        }))
    }

    saveIngredients(newItem: Ingredient){
        return this.http.post<Ingredient[]>('https://shopping-list-2b077.firebaseio.com/ingredient-list.json',newItem);
    }

    deleteIngredient(item:Ingredient){
        return this.http.delete('https://shopping-list-2b077.firebaseio.com/ingredient-list.json',)
    }

}