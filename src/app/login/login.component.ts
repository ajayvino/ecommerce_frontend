import { Component, inject } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatButtonModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userform!:FormGroup;
  passwordvisibility:Boolean=false;
  authservice=inject(AuthService);
  snackbar=inject(MatSnackBar);
  router=inject(Router);



    //  userdata:any={
    //   email:"",
    //   password:""
    // }



  ngOnInit(): void {
      this.userform= new FormGroup({
        email:new FormControl("",[Validators.required,Validators.email]),
        password:new FormControl("",[Validators.required,Validators.minLength(6)])
      })
  }

  togglevisibility(){

    if(this.passwordvisibility){
      this.passwordvisibility=false;
    }
      else{
        this.passwordvisibility=true;
      }

   }

   onusersave() {

    // this.userdata.email=this.userform.get("email")?.value;
    // this.userdata.password=this.userform.get("password")?.value;

    // console.log(this.userdata);




    this.authservice.login(this.userform.value).subscribe({
      next:(data)=>{

        let storage = {
          id:data.id,
          role:data.userRole,
          name:data.username
        }
        if(data.jwt!=null){
          this.snackbar.open("Account Logged In Successfully","Close",{duration:5000});

        LocalstorageService.saveToken(data.jwt);
        LocalstorageService.saveUser(storage);

        if(LocalstorageService.isAdminLoggedIn()){

          console.log("Admin Logged In");

          this.router.navigateByUrl("/admin/dashboard")
        }
        else if(LocalstorageService.isEmployeeLoggedIn()){
          console.log("Customer Logged In");
          this.router.navigateByUrl("/customer/dashboard")
        }
        else{
          this.snackbar.open("Account Storage Login Failed.Try Again","Close",{duration:5000,panelClass:'error-snackbar'});
        }

      }
      },error:(err)=>{
        this.snackbar.open("Account Login Failed.Try Again","Close",{duration:5000,panelClass:'error-snackbar'});
      }
    })

    this.userform.reset();
  }



}
