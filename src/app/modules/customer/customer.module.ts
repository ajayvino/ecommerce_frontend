import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Routes } from '@angular/router';
import { CustomerdashboardComponent } from './Components/customerdashboard/customerdashboard.component';
import { MyordersComponent } from './Components/myorders/myorders.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CartComponent } from './Components/cart/cart.component';
import { PlaceorderComponent } from './Components/placeorder/placeorder.component';
import { ReviewproductComponent } from './Components/reviewproduct/reviewproduct.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';

const routes:Routes = [
  {
    path:"dashboard",
    component:CustomerdashboardComponent
  },
  {
    path:"myorders",
    component:MyordersComponent
  },
  {
    path:"wishlist",
    component:WishlistComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"placeorder",
    component:PlaceorderComponent
  },
  {
    path:"reviewproduct/:id",
    component:ReviewproductComponent
  },
  {
    path:"viewproduct/:id",
    component:ProductdetailsComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[provideRouter(routes)]
})
export class CustomerModule { }
