import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-postfaq',
  imports: [ReactiveFormsModule],
  templateUrl: './postfaq.component.html',
  styleUrl: './postfaq.component.css'
})
export class PostfaqComponent {

  private activatedRoute=inject(ActivatedRoute);
  private service=inject(AdminService);
  private snackbar=inject(MatSnackBar);
  private router = inject(Router);
    id:number=this.activatedRoute.snapshot.params['id'];
    faqform!:FormGroup;

    ngOnInit(): void {

      this.faqform=new FormGroup({

        question:new FormControl(null,[Validators.required]),
        answer:new FormControl(null,[Validators.required])

       });




    }

    postfaq(){
      const postfaqDTO = {
        question:this.faqform.get("question")!.value,
        answer:this.faqform.get("answer")!.value,
        productid:this.id
      };


      this.service.postFAQ(postfaqDTO).subscribe({
        next:(res)=>{
          if(res!=null){

            this.snackbar.open("FAQ Posted Successfully","Close",{duration:3000});
            this.router.navigateByUrl("/admin/dashboard");
            this.faqform.reset();

          }


        },
        error:(err)=>{
          this.snackbar.open(err,"Error",{duration:3000});
          this.faqform.reset();
        }
      })
    }

}
