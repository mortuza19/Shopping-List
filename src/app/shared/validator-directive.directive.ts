import { Directive } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ShoppingListService } from './shopping-list.services';
import { Ingredient } from '../Models/ingredients';

export function negativeAmountValidator():ValidatorFn{
  return (c:AbstractControl):{[s:string]:boolean} | null =>{
      let amount = c.value;
      if(amount <= 0){
          return {invalidAmount:true}
      }
      return null
  }
}
@Directive({
  selector: '[nonAmount][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidatorDirectiveDirective, multi: true }
  ]
})
export class ValidatorDirectiveDirective implements Validator {
  validator: ValidatorFn;
  constructor(private shoppingListService: ShoppingListService) {
    this.validator = negativeAmountValidator();
  }
  validate(c: FormControl) {
    return this.validator(c);
  }
}
