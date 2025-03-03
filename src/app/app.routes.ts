import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [



  {
    path:'',
    redirectTo:"login",
    pathMatch:'full'
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:SignupComponent
  },

  {
    path:"admin",
    loadChildren:()=>import("./modules/admin/admin.module").then(e=>e.AdminModule)
  },

  {
    path:"customer",
    loadChildren:()=>import("./modules/customer/customer.module").then(e=>e.CustomerModule)
  }
];
