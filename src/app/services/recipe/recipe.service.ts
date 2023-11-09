import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { IRecipe } from "../../interfaces/recipe.interface";
import { urls } from "../../constants/urls";

const { recipesURL } = urls;

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  public addNewRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.http.post<any>(recipesURL, recipe);
  }

  public getAllRecipes(): Observable<IRecipe[]> { //add return type
    return this.http.get<IRecipe[]>(recipesURL);
  }

  public getOneRecipe(id: number) {
    return this.http.get<IRecipe>(`${ recipesURL }/${ id }`)
  }
}
