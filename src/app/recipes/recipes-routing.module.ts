import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

const routes : Routes = [
    {path : '', component : RecipesComponent,canActivate:[AuthGuard],children:[
        {path : '', component: RecipeStartComponent, pathMatch:'full'},
        {path : 'new', component: EditRecipeComponent},
        {path:':id', component : RecipeDetailComponent,resolve:[RecipeResolverService]},
        {path : ':id/edit', component: EditRecipeComponent,resolve:[RecipeResolverService]}
  ]},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RecipesRoutingModule{

}