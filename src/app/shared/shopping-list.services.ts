import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Ingredient } from '../Models/ingredients';
import { Subject } from 'rxjs';

@Injectable({
    providedIn : 'root'
})

export class ShoppingListService implements OnInit{
   
    private ingredients : Ingredient[]= [
        new Ingredient('Apple',5,'pcs'),
        new Ingredient('Sugar',250,'gm')
    ];

    ingredientAdded = new Subject<Ingredient[]>();
    selectedIngredient = new Subject<number>();

    ngOnInit(){}

    getAllIngredients(){
        return this.ingredients.slice();
    }

    addIngredients(newItem : Ingredient){
        this.ingredients.push(newItem);
        this.ingredientAdded.next(this.ingredients.slice());
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