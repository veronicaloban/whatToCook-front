import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe/recipe.service';
import { IRecipe } from '../../interfaces/recipe.interface';
import { MODAL_TEXTS } from '../../constants/texts.constant';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewComponent implements DoCheck {
  private readonly modalTexts = MODAL_TEXTS['successfullyAdded'];

  public recipeForm = this.fb.group({
    title: ['', Validators.required],
    ingredients: this.fb.array([
      new FormControl("", Validators.required)
    ], Validators.required),
    steps: this.fb.array([
      new FormControl("", Validators.required)
    ], Validators.required),
    description: '',
  })

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private dialog: Dialog, private overlay: Overlay ) {}

  ngDoCheck() {
    console.log('checked');
  }

  public getControl(control: 'title' | 'steps' | 'ingredients') {
    return this.recipeForm.controls[control]
  }

  isValid(control: 'title' | 'steps' | 'ingredients'): boolean | undefined {
    return this.getControl(control)?.invalid && (this.getControl(control)?.dirty || this.getControl(control)?.touched)
  }

  isArrayControlInvalid(arrayControl: 'steps' | 'ingredients', index: number)  {
    const controlInArray = this.recipeForm.controls[arrayControl].controls[index];

    return controlInArray.invalid && (controlInArray.dirty || controlInArray.touched)
  }

  public getFormsControls(controlType: 'steps' | 'ingredients') { //add return type  and controlType type shuld be reusable
    return this.recipeForm.controls[controlType]['controls'];
  }

  public addControl(controlType: 'steps' | 'ingredients') {
    this.recipeForm.controls[controlType].push(new FormControl('', Validators.required));
  }

  public removeControl(controlType: 'steps' | 'ingredients', index: number) {
    this.recipeForm.controls[controlType].removeAt(index);
  }

  public addRecipe(): void {
    const recipe = this.recipeForm.value as unknown as IRecipe;

    console.log(recipe)
    
    // this.recipeService.addNewRecipe(recipe).subscribe( (recipe) => { //we also should unsubscribe
    //   this.recipeForm.reset();
    //   this.openModal();
    // })
    this.recipeForm.reset();
    this.openModal();
  }

  public openModal() {
    const positionStrategy = this.overlay.position().global().centerHorizontally().top('30px')

    const dialogRef = this.dialog.open(ModalComponent, {
      minWidth: '350px',
      maxWidth: '600px',
      width: '50%',
      height: '300px',
      data: {
        type: 'success',
        texts: this.modalTexts
      },
      positionStrategy
      } 
    )

  }
}
