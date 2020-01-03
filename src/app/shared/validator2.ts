import { Directive } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ShoppingListService } from './shopping-list.services';
import { Ingredient } from '../Models/ingredients';

export function duplicateIngredient(ingredients:Ingredient[]):ValidatorFn{
  return (c:AbstractControl):{[s:string]:boolean} | null =>{
    let name = c.value?c.value:'';
    for (let index = 0; index < ingredients.length; index++) {
    const element = ingredients[index];
    if(element.name.toLowerCase() === name.toLowerCase()){
        return {duplicateIngredient:true}
    }
    }
    return null
  }
}

@Directive({
  selector: '[duplicateIngredient][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: Validator2, multi: true }
  ]
})
export class Validator2 implements Validator {
  validator: ValidatorFn;
  constructor(private shoppingListService: ShoppingListService) {
    this.validator = duplicateIngredient(this.shoppingListService.getAllIngredients())
  }
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}
