import { Component, OnInit, DoCheck } from '@angular/core';
import { Ingredient } from '../Models/ingredients';
import { ShoppingListService } from '../shared/shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,DoCheck {
  ngDoCheck(): void {
    //this.ingredients = this.shoppingListService.getAllIngredients();
  }

  ingredients : Ingredient[];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getAllIngredients();
    this.shoppingListService.ingredientAdded.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }

  onClickItem(i : number){
    this.shoppingListService.selectedIngredient.next(i);
  }




}
