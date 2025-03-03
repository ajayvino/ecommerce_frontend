import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { CustomerService } from '../../Services/customer.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-showordersdetails',
  imports: [CurrencyPipe],
  templateUrl: './showordersdetails.component.html',
  styleUrl: './showordersdetails.component.css'
})
export class ShowordersdetailsComponent {

  cartItemsList:any=[];
  order:any;
    private service = inject(CustomerService);
    private snackbar= inject(MatSnackBar);
    public dialog = inject(MatDialog);
    orderid:any;



    ngOnInit(): void {

      this.orderid=localStorage.getItem("orderid");
      if(this.orderid!=null){
        this.getCartItemsByOrderId(this.orderid);
      }


    }

    getCartItemsByOrderId(orderid:any){

      this.service.getCartItemsByOrderid(orderid).subscribe({
        next:(res)=>{

          this.cartItemsList=res;



        },
        error:(err)=>{
          console.log(err);

        }
      })
    }

}
