import { Component, inject, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { CurrencyPipe } from '@angular/common';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviewproduct',
  imports: [CurrencyPipe, Bytearray2imgPipe,MatButtonModule,MatInputModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './reviewproduct.component.html',
  styleUrl: './reviewproduct.component.css'
})
export class ReviewproductComponent {

  private routerLink = inject(ActivatedRoute);

  orderitemslists:any=[];

  private service = inject(CustomerService);
  orderid:any;
  showReview:Boolean=false;
  reviewID:any;
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);


  selectedFile:any;
  imagePreview :any;
  reviewForm!:FormGroup;



ngOnInit(): void {

  this.orderid= this.routerLink.snapshot.params['id'];
  this.getCartItemsByOrderId();
  this.reviewForm=new FormGroup({

    rating:new FormControl(null,[Validators.required]),
    description:new FormControl(null,[Validators.required])

   });


}


  getCartItemsByOrderId(){
    console.log(this.orderid);


    this.service.getCartItemsByOrderid(this.orderid).subscribe({
      next:(res)=>{

        this.orderitemslists=res;
        console.log(this.orderitemslists);




      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  giveReview(id:any){


    if(this.showReview){

      this.showReview=false;
      this.reviewID=null;
      this.selectedFile=null;
      this.imagePreview=null;


    }
    else{
      this.showReview=true;
      this.reviewID=id;

    }

  }

  submitReview(productid:any){

    console.log(productid);
    console.log(this.orderid);
    console.log(LocalstorageService.getUserId());





    console.log(this.reviewForm.value);
    console.log(this.selectedFile);

    const formData : FormData = new FormData();

    formData.append('multipartimg',this.selectedFile);
    formData.append('rating',this.reviewForm.get("rating")!.value);
    formData.append('description',this.reviewForm.get("description")!.value);
    formData.append('userid',LocalstorageService.getUserId());
    formData.append('productid',productid);
    formData.append('orderid',this.orderid);

    console.log(formData);


    this.service.addReview(formData).subscribe({
      next:(res)=>{

        if(res!=null){
          this.snackbar.open("Review Added","Close",{duration:2000});
          this.router.navigateByUrl("/customer/dashboard");
          this.reviewForm.reset();

        }

      },
      error:(err)=>{

        console.log(err);


        this.snackbar.open("Error adding Review, Try Again Later","Error",{duration:2000});



      }
    })


    this.showReview=false;


  }
  onFileSelected(event: any) {

    this.selectedFile=event.target.files[0];
    this.previewImage();

    }

    previewImage(){
      const reader= new FileReader();
      reader.onload=()=>{
        this.imagePreview=reader.result;
      }

      reader.readAsDataURL(this.selectedFile);

    }

    discardReview(){
      this.showReview=false;
      this.selectedFile=null;
      this.imagePreview=null;
    }

}
