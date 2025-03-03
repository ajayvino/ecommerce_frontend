import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Routes } from '@angular/router';
import { AdmindashboardComponent } from './Components/admindashboard/admindashboard.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductComponent } from './Components/product/product.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { PostcouponComponent } from './Components/postcoupon/postcoupon.component';
import { CouponsComponent } from './Components/coupons/coupons.component';
import { PostfaqComponent } from './Components/postfaq/postfaq.component';

const routes:Routes = [
  {
    path:"dashboard",
    component:AdmindashboardComponent
  },
  {
    path:"analytics",
    component:AnalyticsComponent
  },
  {
    path:"category",
    component:CategoryComponent
  },
  {
    path:"product",
    component:ProductComponent
  },
  {
    path:"orders",
    component:OrdersComponent
  },
  {
    path:"postcoupon",
    component:PostcouponComponent
  },
  {
    path:"coupons",
    component:CouponsComponent
  },
  {
    path:"postfaq/:id",
    component:PostfaqComponent
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[provideRouter(routes)]
})
export class AdminModule { }
