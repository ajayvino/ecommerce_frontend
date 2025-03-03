import { Component, inject } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  imports: [MatIconModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {


  categoryList:any=[];
  private service = inject(AdminService);
  jwt:any;
  private router =inject(Router);
  private snackbar=inject(MatSnackBar)

  productform!:FormGroup;
  selectedFile:any;
  imagePreview :any;




  ngOnInit(): void {

    this.jwt= LocalstorageService.getToken();
    this.productform=new FormGroup({
      name:new FormControl(null,[Validators.required]),
      price:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required]),
      categoryid:new FormControl(null,[Validators.required]),


     });




    this.service.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList=res;
        console.log(this.categoryList);

      },
      error:(err)=>{

        if(err.status == 403){
          alert("Session Expired. Login Again");
          this.jwt=null;
          LocalstorageService.signout();
          this.router.navigateByUrl("/login");

        }
        console.log(err);

      }
    })





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

    addProduct(){
      const formData : FormData = new FormData();

      formData.append('multipartimg',this.selectedFile);
      formData.append('name',this.productform.get("name")!.value);
      formData.append('price',this.productform.get("price")!.value);
      formData.append('description',this.productform.get("description")!.value);
      formData.append('categoryid',this.productform.get("categoryid")!.value);

      this.service.addProduct(formData).subscribe({
        next:(res)=>{
          if(res.id !=null){
            this.snackbar.open("Product Created Successfully","Close",{duration:3000});
            console.log(res);

            this.imagePreview=null;
            this.productform.markAsUntouched();
            this.productform.reset();

          }
          else{
            this.snackbar.open("Error Creating Product","Error",{duration:3000})
          }
        },
        error:(err)=>{
          if(err.status == 403){
            alert("Session Expired. Login Again");
            this.jwt=null;
            LocalstorageService.signout();
            this.router.navigateByUrl("/login");

          }
          this.snackbar.open("Error Creating Product","Error",{duration:3000})
        }
      })


    }



}
