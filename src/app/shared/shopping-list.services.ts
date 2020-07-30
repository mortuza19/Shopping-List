import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Ingredient } from '../Models/ingredients';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn : 'root'
})

export class ShoppingListService implements OnInit{
   
    private ingredients : Ingredient[];

    ingredientAdded = new Subject<Ingredient[]>();
    selectedIngredient = new Subject<number>();

    constructor(
        private dataStorageService : DataStorageService
        ){}

    ngOnInit(){}

    getAllIngredients(){
        return this.dataStorageService.fetchIngredients()
        .pipe(tap(data=>{
            this.ingredients = data;
            this.ingredientAdded.next(this.ingredients);
        }));
    }

    addIngredients(newItem : Ingredient){
        this.dataStorageService.saveIngredients(newItem).subscribe(data=>{
            alert('Ingredient added to the list!');
            this.ingredients.push(newItem);
            this.ingredientAdded.next(this.ingredients);
        })
    }

    addAllIngredients(allIngredients: Ingredient[]){
        this.ingredients.push(...allIngredients);
        alert('Items added to shopping list successfully!');
        this.ingredientAdded.next(this.ingredients.slice());
    }

    updateIngredient(item: Ingredient,index : number){
        this.ingredients[index] = item;
        this.ingredientAdded.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientAdded.next(this.ingredients.slice());
    }

}