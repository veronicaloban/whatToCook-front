import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe/recipe.service';
import { IRecipe } from 'src/app/interfaces/recipe.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent {
  public recipes$ = this.recipeService.getAllRecipes();

  constructor(private recipeService: RecipeService, private router: Router) {}

  public openFull(recipe: IRecipe) {
    this.router.navigate(['my-collection', recipe.id]);
  }
}
