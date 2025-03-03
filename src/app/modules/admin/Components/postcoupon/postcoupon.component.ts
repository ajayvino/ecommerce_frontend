import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AdminService } from '../../Services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-postcoupon',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,MatIconModule,MatButtonModule,MatDatepickerModule],
  templateUrl: './postcoupon.component.html',
  styleUrl: './postcoupon.component.css'
})
export class PostcouponComponent {
  postcouponform!:FormGroup;
  private service = inject(AdminService);
  private snackbar=inject(MatSnackBar)

  ngOnInit(): void {
    this.postcouponform=new FormGroup({

      name:new FormControl(null,[Validators.required]),
      code:new FormControl(null,[Validators.required]),
      discount:new FormControl(null,[Validators.required]),
      expirationdate:new FormControl(null,[Validators.required])


     });

}

createCoupon(){

  console.log(this.postcouponform.value);

  this.service.addCoupon(this.postcouponform.value).subscribe({
    next:(res)=>{
      if(res!=null){
        this.snackbar.open("Coupon Posted Successfully","Close",{duration:5000});
        this.postcouponform.reset();
      }
    },
    error:(err)=>{
      console.log(err);

    }
  })
}

}

