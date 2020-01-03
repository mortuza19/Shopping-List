import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { LoginComponent } from './login/login.component';
import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SignupConfirmationComponent } from './signup-confirmation/signup-confirmation.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path : '', redirectTo:'/login', pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'forgot-password',component:ForgetPasswordComponent},
  {path:'confirmation',component:SignupConfirmationComponent},
  {path: 'dashboard',component:GeneralLayoutComponent, children:[
    {path : 'recipes', component : RecipesComponent,children:[
      {path:'',component:RecipeStartComponent,pathMatch:'full'},
      {path : 'new', component: EditRecipeComponent},
      {path:':id', component : RecipeDetailComponent,resolve:[RecipeResolverService]},
      {path : ':id/edit', component: EditRecipeComponent,resolve:[RecipeResolverService]},
      {path:'**',redirectTo:'/recipes'}

    ]},
    {path:'',redirectTo:'recipes',pathMatch:'full'},
    {path : 'shopping-list',component : ShoppingListComponent},
    {path:'**',redirectTo:'/dashboard/recipes'}

  ]},
  {path:'**',redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
