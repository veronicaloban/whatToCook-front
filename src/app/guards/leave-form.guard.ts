import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AddNewComponent } from '../components/add-new/add-new.component';
import { MODAL_TEXTS } from '../constants/texts.constant';
import { Dialog } from '@angular/cdk/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormGuard implements CanDeactivate<AddNewComponent> {
  private readonly modalTexts = MODAL_TEXTS['leaveModal'];

  constructor(private dialog: Dialog, private overlay: Overlay ) {}

  canDeactivate(
    component: AddNewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot | undefined
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!component.recipeForm.dirty) {
      return of(true)
    } else {
      return this.openModal()
    }
}

  private openModal() {
    const positionStrategy = this.overlay.position().global().centerHorizontally().top('30px'); //TODO: do smth with it
    
    return this.dialog.open(ModalComponent, {
      minWidth: '350px',    // move out to default const 
      maxWidth: '600px',
      width: '50%',
      height: '300px',
      data: {
        type: 'warning',
        texts: this.modalTexts
      },
      positionStrategy
    })
    .closed.pipe(map((res) => Boolean(res)))
  }
}

