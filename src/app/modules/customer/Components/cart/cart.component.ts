import { Component, inject } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PlaceorderComponent } from '../placeorder/placeorder.component';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, Bytearray2imgPipe, CurrencyPipe, MatButtonModule, MatCardModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {



 cartItemsList:any=[];
 order:any;
 couponform!:FormGroup;


  private service = inject(CustomerService);
  private snackbar= inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {

    this.getCartItems();
    this.couponform=new FormGroup({

      coupon:new FormControl(null,[Validators.required])

     });

  }

  getCartItems(){

    this.service.getCartItemsByUserid(LocalstorageService.getUserId()).subscribe({
      next:(res)=>{





        this.cartItemsList=res.cartitems;
        this.order=res;
        console.log(this.cartItemsList);
        console.log(this.order);



      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  applyCoupon(){


    this.service.applyCoupon(LocalstorageService.getUserId(),this.couponform.get("coupon")!.value).subscribe({
      next:(res)=>{
        if(res!=null){
          console.log(res);

          this.updateOrder();
          this.snackbar.open("Coupon Applied Successfully","Close",{duration:5000});
          this.couponform.reset();
        }
      },
      error:(err)=>{
        this.snackbar.open("Coupon Invalid","Error",{duration:5000});
      }
    })
  }

  deleteCart(userid:number,productid:number){

    console.log(userid);

    this.service.deleteCart(userid,productid).subscribe({
      next:(res)=>{
        this.getCartItems();
        this.snackbar.open("Product Removed From Cart","Close",{duration:3000})
      },
      error:(err)=>{
        this.snackbar.open("Error Removing From Cart","Error",{duration:3000})
      }
    })
  }

  updateOrder(){
    this.service.getCartItemsByUserid(LocalstorageService.getUserId()).subscribe({
      next:(res)=>{




        this.order=res;






      },
      error:(err)=>{
        console.log(err);

      }
    })
  }


  increaseCart(Userid:number,Productid:number){

    const increaseProductDTO = {
      userid:Userid,
      productid:Productid

    };

    this.service.updateCartQuantiy(increaseProductDTO).subscribe({
      next:(res)=>{
        this.snackbar.open("Item Count Increased","Close",{duration:3000});
        this.getCartItems();
        this.updateOrder();
      }
    })

  }

  decreaseCart(Userid:number,Productid:number){

    const decreaseProductDTO = {
      userid:Userid,
      productid:Productid

    };

    this.service.deleteCartQuantiy(decreaseProductDTO).subscribe({
      next:(res)=>{
        this.snackbar.open("Item Count Decreased","Close",{duration:3000});
        this.getCartItems();
        this.updateOrder();
      }
    })

  }

  placeorder(){



    localStorage.setItem("orderamount",this.order.amount);
    this.dialog.open(PlaceorderComponent);
  }


}
