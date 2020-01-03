import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import { Recipe } from '../Models/recipes-model';
import { UserDetail } from '../Models/signup-user.model';

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService){}

    storeRecipies(){
        const recipes = this.recipeService.getAllRecipes();
        this.http.put('https://shopping-list-2b077.firebaseio.com/recipes.json',recipes)
        .subscribe(Response=>{
            console.log(Response);
        })
    }

    storeUserDetail(userDetail:UserDetail){
        return this.http.post<{name:string}>('https://shopping-list-2b077.firebaseio.com/userDetail.json',userDetail)
        .subscribe();
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://shopping-list-2b077.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return{
                    ...recipe,
                    ingredients : recipe.ingredients?recipe.ingredients:[]
                }
            })
        }),
        tap(recipes=>{
            this.recipeService.setRecipies(recipes);
        }))
    }

    getUser(){
        return this.http.get<{[key:string]:UserDetail}>('https://shopping-list-2b077.firebaseio.com/userDetail.json')
        .pipe(map(response=>{
            let userArray:UserDetail[]=[];
            for(let key in response){
                if(response.hasOwnProperty(key)){
                    userArray.push({...response[key],id:key});
                }
            }
            return userArray;
        }))
    }

}