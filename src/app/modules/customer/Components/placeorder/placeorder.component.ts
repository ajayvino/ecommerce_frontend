import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../Services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { LocalstorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-placeorder',
  imports: [MatCardModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './placeorder.component.html',
  styleUrl: './placeorder.component.css'
})
export class PlaceorderComponent {



  placeorderform!:FormGroup;
  private service = inject(CustomerService);
  private snackbar= inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private router = inject(Router);



  ngOnInit(): void {



    this.placeorderform=new FormGroup({

      address:new FormControl(null,[Validators.required]),
      description:new FormControl(null),
      payment:new FormControl(null,[Validators.required]),


     });





  }


  placeOrder(){

    const placeorderDTO = {
      userid:LocalstorageService.getUserId(),
      address:this.placeorderform.get("address")!.value,
      description:this.placeorderform.get("description")!.value,
      payment:this.placeorderform.get("payment")!.value
    }

    const orderid = localStorage.getItem("orderamount");

    localStorage.setItem("onlinepayorder",JSON.stringify(placeorderDTO));


    if(this.placeorderform.get("payment")!.value == "ONLINE"){
      this.router.navigateByUrl(`/customer/payment/${orderid}`);
      this.closeForm();
    }
    else{



      console.log(placeorderDTO);

      this.service.placeOrder(placeorderDTO).subscribe({
        next:(res)=>{

          this.snackbar.open("Order Placed Successfully","Close",{duration:3000});
          this.router.navigateByUrl("/customer/myorders");
          this.closeForm();


        },
        error:(err)=>{
          this.snackbar.open(err,"Close",{duration:3000})
          this.closeForm();

        }
      })

    }





  }

  closeForm(){
    this.dialog.closeAll();
  }




}
