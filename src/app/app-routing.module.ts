import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./components/layout/layout.component";
import { HomeComponent } from "./components/home/home.component";

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
      ]
    },
    // {
    //   path: 'login',
    //   //component: LogInFormComponent
    // },
    // {
    //   path: 'signup',
    //   //component: RegisterFormComponent
    // },
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(
        ROUTES
      )
    ]
  })
  export class AppRoutingModule {}
  