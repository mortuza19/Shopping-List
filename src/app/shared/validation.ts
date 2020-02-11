import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RecipeService } from './recipe.service';
import { Recipe } from '../Models/recipes-model';

export class Validator{

    constructor(public recipeService: RecipeService){}
}

export function recipeNameValidator(allRecipes:Recipe[]) : ValidatorFn{
    return (control: AbstractControl):{[key:string]:boolean} | null =>{
        const recipeName = control.value ? control.value:'';
        for (let index = 0; index < allRecipes.length; index++) {
            const element = allRecipes[index];
            if(element.name.toLowerCase() === recipeName.toLowerCase()){
                return {duplicateName:true}
            }
        }
        return null;
    }
}
