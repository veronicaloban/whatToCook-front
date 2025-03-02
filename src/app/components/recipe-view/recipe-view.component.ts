import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap} from 'rxjs';

import { RecipeService } from '../../services/recipe/recipe.service';
import { IRecipe } from '../../interfaces/recipe.interface';

@Component({
    selector: 'app-recipe-view',
    styleUrls: ['./recipe-view.component.scss'],
    templateUrl: './recipe-view.component.html',
})
export class RecipeViewComponent implements OnInit {
    public stepText = 'Step'; //move to text constants

    private readonly route = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly recipeService = inject(RecipeService);
    protected readonly openedRecipe = signal<IRecipe | null>(null);

    public ngOnInit(): void {
        this.fetchRecipe();
    }

    private fetchRecipe(): void {
        this.route.params.pipe(
            switchMap(({id}) => this.recipeService.getOneRecipe(id)),
            tap(recipe => this.openedRecipe.set(recipe)),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe()
    }
}
