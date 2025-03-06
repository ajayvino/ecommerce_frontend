import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-trackorder',
  imports: [ReactiveFormsModule,MatInputModule,MatLabel,MatFormField,CurrencyPipe,DatePipe],
  templateUrl: './trackorder.component.html',
  styleUrl: './trackorder.component.css'
})
export class TrackorderComponent {

  trackingform!:FormGroup;
  private service = inject(AuthService);
  orderstatus:any=null;
  private snackbar= inject(MatSnackBar);

  ngOnInit(): void {

    this.trackingform=new FormGroup({

      trackingid:new FormControl(null,[Validators.required])

     });


  }

  getTrackingInfo(){

    this.service.getTrackingStatus(this.trackingform.get("trackingid")!.value).subscribe({
      next:(res)=>{
        if(res !=null){
          this.orderstatus=res;
          console.log(this.orderstatus);

        }
      },
      error:(err)=>{

        this.snackbar.open("Unable To Fetch Order Details","Error",{duration:2000});

      }
    })



  }

}
