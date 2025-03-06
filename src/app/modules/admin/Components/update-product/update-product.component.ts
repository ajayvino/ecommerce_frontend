import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { AdminService } from '../../Services/admin.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";



@Component({
  selector: 'app-update-product',
  imports: [MatIconModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, Bytearray2imgPipe],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

    categoryList:any=[];
    private service = inject(AdminService);
    jwt:any;
    private router =inject(Router);
    private snackbar=inject(MatSnackBar);

    private activatedRoute=inject(ActivatedRoute);
    id=this.activatedRoute.snapshot.params['id'];

    isloaddefault:Boolean=true;

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

       console.log(typeof(this.id));


       this.getProductById();

       this.getallCatergories();









    }

    getallCatergories(){

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
      });


    }

    onFileSelected(event: any) {


      this.isloaddefault=false;

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

      updateProduct(){
        const formData : FormData = new FormData();

        if(this.selectedFile==null){
          formData.append('name',this.productform.get("name")!.value);
          formData.append('price',this.productform.get("price")!.value);
          formData.append('description',this.productform.get("description")!.value);
          formData.append('categoryid',this.productform.get("categoryid")!.value);

        }
        else{

        formData.append('multipartimg',this.selectedFile);
        formData.append('name',this.productform.get("name")!.value);
        formData.append('price',this.productform.get("price")!.value);
        formData.append('description',this.productform.get("description")!.value);
        formData.append('categoryid',this.productform.get("categoryid")!.value);

        }

        console.log(this.selectedFile);






        this.service.updateProduct(this.id,formData).subscribe({
          next:(res)=>{
            if(res.id !=null){
              this.snackbar.open("Product Created Successfully","Close",{duration:3000});
              console.log(res);

              this.imagePreview=null;
              this.productform.markAsUntouched();
              this.productform.reset();
              this.router.navigateByUrl("/admin/dashboard");

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

      getProductById(){

        const id = parseFloat(this.id);
        console.log(typeof(id));

        this.service.getAllProductsById(id).subscribe({
          next:(res)=>{
            console.log(res);

            this.productform.patchValue(res);
            this.imagePreview=res.img;
          },
          error:(err)=>{
            console.log(err);

          }

        })
      }

}
