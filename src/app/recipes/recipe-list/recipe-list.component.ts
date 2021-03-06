import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from 'src/app/Models/recipes-model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes : Recipe[] = [];
  subscription : Subscription;
  constructor(
    private recipeService : RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    this.subscription = this.recipeService.recipeAdded.subscribe((recipes)=>{
      this.recipes = recipes;
    })
  }

  onClick(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
