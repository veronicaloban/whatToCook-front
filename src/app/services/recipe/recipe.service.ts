import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { IRecipe } from "../../interfaces/recipe.interface";
import { urls } from "../../constants/urls";

const { recipesURL } = urls;

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  private readonly http = inject(HttpClient);

  public addNewRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.http.post<IRecipe>(recipesURL, recipe);
  }

  public getOneRecipe(id: number): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${ recipesURL }/${ id }`)
  }
}
