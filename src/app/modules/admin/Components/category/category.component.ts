import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {



 private service= inject(AdminService);
 private snackbar=inject(MatSnackBar);
 private router = inject(Router)
 jwt:any=null;

   userform!:FormGroup;

   ngOnInit(): void {

       this.jwt=LocalstorageService.getToken();
       this.userform=new FormGroup({
        name:new FormControl("",[Validators.required]),
        description:new FormControl("",[Validators.required])


       });


   }

   onusersave(){

    this.service.createCategory(this.userform.value).subscribe({
      next:(res)=>{

        if(res.id!=null){
          this.snackbar.open("Category Created Successfully","Close",{duration:5000});
          this.userform.reset()
        }
        else{
          this.snackbar.open("Error Creating Category","Error",{duration:5000})
        }


      },
      error:(err)=>{

        if(err.status == 403){
          alert("Session Expired. Login Again");
          this.jwt=null;
          LocalstorageService.signout();
          this.router.navigateByUrl("/login");

        }
        this.snackbar.open("Error Creating Category","Error",{duration:5000})
      }
    })




   }






}
