import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


   passwordvisibility:Boolean=false;

   signupDTO:any={
    name:"",
    email:"",
    password:""
   }

   userform!:FormGroup;
   private service = inject(AuthService);
   private router = inject(Router);
   private snackbar=inject(MatSnackBar);

   ngOnInit(): void {
       this.userform=new FormGroup({
        username:new FormControl("",[Validators.required]),
        email:new FormControl("",[Validators.required,Validators.email]),
        password:new FormControl("",[Validators.required,Validators.minLength(6)]),
        confirmpassword:new FormControl("",[Validators.required])

       });
   }

   onusersave(){





    if(this.userform.get("password")!.value == this.userform.get("confirmpassword")!.value){
      this.signupDTO.name=this.userform.get("username")!.value;
      this.signupDTO.email=this.userform.get("email")!.value;
      this.signupDTO.password=this.userform.get("password")!.value;

      this.service.register(this.signupDTO).subscribe({
        next:(res)=>{
          if(res.id !=null){
            this.snackbar.open("Account Created Successfully","Close",{duration:5000})
          }
        },
        error:(err)=>{
          this.snackbar.open("Error Creating Account . Try with different Email","Error",{duration:5000})
        }
      })





    }
    else{
      this.snackbar.open("Passwords didn't match","Close",{duration:5000})
    }
    console.log(this.signupDTO);

     this.userform.reset();


   }

   togglevisibility(){

    if(this.passwordvisibility){
      this.passwordvisibility=false;
    }
      else{
        this.passwordvisibility=true;
      }

   }



}
