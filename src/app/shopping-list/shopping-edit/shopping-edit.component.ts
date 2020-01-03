import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/Models/ingredients';
import { ShoppingListService } from 'src/app/shared/shopping-list.services';
import { Subscription } from 'rxjs';
import { format } from 'url';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingEdit',{static:false}) shoppingEdit : NgForm;
  units : string[] = ['kg','lit','gm','pcs','ml','pckt'];
  editMode : boolean = false;
  editIndex : number = -1;
  subscription : Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.selectedIngredient.subscribe((i)=>{
      this.editMode = true;
      this.editIndex = i;
      let item = this.shoppingListService.getAllIngredients()[i];
      this.shoppingEdit.setValue({
        ingredient : item.name,
        amount : item.amount,
        unit : item.unit
      });
    })
  }

  onAdd(){
    const name = this.shoppingEdit.value.ingredient;
    const amount = this.shoppingEdit.value.amount;
    const unit = this.shoppingEdit.value.unit;
    if(this.editMode){
      this.shoppingListService.updateIngredient({name:name,amount:amount,unit:unit},this.editIndex);
    }
    else{
      this.shoppingListService.addIngredients(new Ingredient(
        name,
        amount,
        unit));
    }
    this.onReset();
  }

  ondeleteItem(){
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.onReset();
  }

  onReset(){
    this.editIndex = -1;
    this.editMode = false;
    this.shoppingEdit.reset();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
