import { Component, OnInit, DoCheck } from '@angular/core';
import { Ingredient } from '../Models/ingredients';
import { ShoppingListService } from '../shared/shopping-list.services';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,DoCheck {
  ngDoCheck(): void {
    //this.ingredients = this.shoppingListService.getAllIngredients();
  }

  ingredients : Ingredient[]=[];
  constructor(
    private shoppingListService: ShoppingListService,
    ) { }

  ngOnInit() {
    this.shoppingListService.ingredientAdded.subscribe(data=>{
      this.ingredients = data;
    })
    if(this.ingredients.length===0){
      this.shoppingListService.getAllIngredients().subscribe(data=>{
        this.ingredients = data;
      });
    }
  }

  onClickItem(i : number){
    this.shoppingListService.selectedIngredient.next(i);
  }
}
