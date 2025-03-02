import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { IRecipe } from '../../interfaces/recipe.interface';
import { urls } from '../../constants/urls';

@Component({
    selector: 'app-my-collection',
    imports: [CommonModule],
    templateUrl: './my-collection.component.html',
    styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  public openFull(recipe: IRecipe) {
    this.router.navigate(['my-collection', recipe.id]);
  }

  protected readonly recipes = rxResource({
    loader: () => this.http.get<IRecipe[]>(urls.recipesURL)
  })
}
