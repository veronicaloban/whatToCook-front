import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./components/layout/layout.component";
import { HomeComponent } from "./components/home/home.component";
import { LogInFormComponent } from "./components/log-in-form/log-in-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { AddNewComponent } from "./components/add-new/add-new.component";
import { AuthGuard } from "./guards/auth.guard";
import { MyCollectionComponent } from "./components/my-collection/my-collection.component";
import { RecipeViewComponent } from "./components/recipe-view/recipe-view.component";
import { LeaveFormGuard } from "./guards/leave-form.guard";

const ROUTES: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          redirectTo: '/home',
          pathMatch: 'full'
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'add-new',
          component: AddNewComponent,
          canActivate: [AuthGuard],
          canDeactivate: [LeaveFormGuard]
        },
        {
          path: 'my-collection',
          canActivate: [AuthGuard],
          component: MyCollectionComponent
        },
        {
          path: 'my-collection/:id',
          canActivate: [AuthGuard],
          component: RecipeViewComponent
        }  
      ]
    },
    {
      path: 'login',
      component: LogInFormComponent
    },
    {
      path: 'signup',
      component: RegisterFormComponent
    },
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(
        ROUTES
      )
    ]
  })
  export class AppRoutingModule {}
  