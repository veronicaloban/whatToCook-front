import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IRecipe } from 'src/app/interfaces/recipe.interface';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
    standalone: true, 
    selector: 'app-recipe-view',
    styleUrls: ['./recipe-view.component.scss'],
    templateUrl: './recipe-view.component.html',
    imports: [NgIf, AsyncPipe, NgFor]
})
export class RecipeViewComponent {
    public stepText = 'Step'; //move to text constants
    public openedRecipe$!: Observable<IRecipe>;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
        this.openedRecipe$ = this.route.params.pipe(
            switchMap(({ id }) => this.recipeService.getOneRecipe(id))
        )
    }
}