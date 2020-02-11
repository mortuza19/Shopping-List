import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Recipe } from 'src/app/Models/recipes-model';
import { Ingredient } from 'src/app/Models/ingredients';
import { RecipeService } from 'src/app/shared/recipe.service';
import{ recipeNameValidator } from '../../shared/validation';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  editMode : boolean = false;
  units : string[] = ['kg','lit','gm','pcs','ml','pckt'];
  recipeForm : FormGroup;
  imageFlag : boolean = false;
  index : number = -1;
  constructor(
    private route:ActivatedRoute,
    private fb : FormBuilder,
    private recipeService : RecipeService,
    private router : Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.index = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
      }
    )
    
    this.recipeForm = this.fb.group({
      'name' : ['',[Validators.required,recipeNameValidator(this.recipeService.getAllRecipes())]],
      'imagePath' : '',
      'description' : [''],
      'ingredients' : this.fb.array([])
    })

    if(this.index >= 0){
      var recipe = this.recipeService.getSingleRecipe(this.index - 1);
      for (let index = 0; index < recipe.ingredients.length; index++) {
        this.onAddIngredients();        
      }
      this.recipeForm.patchValue({
        'name' : recipe.name,
        'imagePath' : recipe.imagePath,
        'description' : recipe.description,
        'ingredients' : recipe.ingredients
      })
      //this.ingredients.patchValue(recipe.ingredients);
    }

  }

  get recipeName(){
    return this.recipeForm.get('name');
  }
  get recipeImage(){
    return this.recipeForm.get('imagePath');
  }
  get recipeDescription(){
    return this.recipeForm.get('description');
  }
  get ingredients(){
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onAddIngredients(){
    const control = this.fb.group({
      'name' : ['',Validators.required],
      'amount' : ['',Validators.required],
      'unit' : ['',Validators.required]
    });
    this.ingredients.push(control);
  }

  onAddRecipe(){
    var allIngredients : Ingredient[] = this.ingredients.value;
    var newRecipe : Recipe = new Recipe(
      this.recipeName.value,
      this.recipeDescription.value,
      this.recipeImage.value,
      allIngredients
    )
    if(this.index >= 0){
      this.recipeService.updateRecipe(this.index-1,newRecipe);
      this.router.navigate(['../'],{relativeTo:this.route});
      this.index = -1;
    }
    else{
      this.recipeService.addRecipe(newRecipe);
      this.recipeForm.reset();
    }
  }

  onReset(){
    if(this.index>0){
      this.index = -1;
    }
    else{
      this.recipeForm.reset();
      this.ingredients.controls = [];
    }
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onRemoveingredient(index:number){
    this.ingredients.controls.splice(index,1);
    this.recipeForm.markAsDirty();
  }

}
