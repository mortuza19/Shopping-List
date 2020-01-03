import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../Models/recipes-model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipe : Recipe;
  constructor() { }

  ngOnInit() {

  }

}
