import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/Models/recipes-model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : Recipe;
  @Input() id : number
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }

  // onSelectRecipe(){
  //   this.recipeService.selectedRecipe.emit(this.recipe);
  // }

}
