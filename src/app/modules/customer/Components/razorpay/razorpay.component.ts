import { Component, inject } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import Razorpay from 'razorpay';

declare var Razorpay:any;

@Component({
  selector: 'app-razorpay',
  imports: [],
  templateUrl: './razorpay.component.html',
  styleUrl: './razorpay.component.css'
})
export class RazorpayComponent {

  private service = inject(CustomerService);
  private routeActivated = inject(ActivatedRoute);
  private snackbar= inject(MatSnackBar);
  private router = inject(Router)



  ngOnInit(): void {


    const orderamount = this.routeActivated.snapshot.params["amount"];
    console.log(orderamount);
    this.createrazorpayTransaction(orderamount);






  }

  createrazorpayTransaction(amount:any){
    this.service.createTransaction(amount).subscribe({
      next:(res)=>{
        console.log(res);
        this.openTransactionModal(res)

      },
      error:(err)=>{
        console.log(err);

      }
    });
  }

  openTransactionModal(response:any){


    var options = {
      order_id:response.orderid,
      key:response.key,
      amount:response.amount,
      currency:response.currency,
      name:LocalstorageService.getUserName(),
      description:"Payment For Online Shopping",
      image:"https://cdn.pixabay.com/photo/2022/02/27/17/03/stones-7037638_640.jpg",
      handler:(response:any)=>{

        if(response!=null && response.razorpay_payment_id!=null){

          this.processResponse(response);

        }
        else{
          this.snackbar.open("Payment Failed","Error",{duration:3000})
        }



      },

      prefill:{
        name:"AV",
        email:"avsoftwaredevelopers@gmail.com",
        contact:"0123456789"
      },

      notes:{
        address:"Online Shopping"
      },
      theme:{
        color:"#F37254"
      }


    };


    var razorpayOBJ = new Razorpay(options);
    razorpayOBJ.open();


  }

  processResponse(resp:any){

    const placedorderDTO = JSON.parse(localStorage.getItem('onlinepayorder') || '{}');

    console.log(placedorderDTO);
    console.log(resp);

    const onlineorderDTO={
      userid:LocalstorageService.getUserId(),
      address:placedorderDTO.address,
      description:placedorderDTO.description,
      payment:placedorderDTO.payment,
      razorpay_payment_id:resp.razorpay_payment_id,
      razorpay_signature:resp.razorpay_signature
    };

    console.log(onlineorderDTO);

    this.service.placeOrder(onlineorderDTO).subscribe({
      next:(res)=>{
        this.snackbar.open("Order Placed Successfully. It will be Delivered Iin 3-5 days","Close",{duration:2000});
        this.router.navigateByUrl("/customer/dashboard");
      },
      error:(err)=>{
        this.snackbar.open("Error Placing Order","Error",{duration:2000});
        this.router.navigateByUrl("/customer/dashboard");

      }
    })









  }

}
