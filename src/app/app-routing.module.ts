import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';


const routes: Routes = [
  {path : 'recipes', component : RecipesComponent,children:[
    {path : '', component: RecipeStartComponent, pathMatch:'full'},
    {path : 'new', component: EditRecipeComponent},
    {path:':id', component : RecipeDetailComponent,resolve:[RecipeResolverService]},
    {path : ':id/edit', component: EditRecipeComponent,resolve:[RecipeResolverService]}
  ]},
  {path : 'shopping-list',component : ShoppingListComponent},
  {path: '' , redirectTo:'/recipes', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
