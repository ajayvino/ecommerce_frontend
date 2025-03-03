import { Component, inject } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admindashboard',
  imports: [Bytearray2imgPipe,MatIconModule,RouterLink,MatButtonModule,ReactiveFormsModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {




  productsList:any=[];
  searchproductform!:FormGroup;

  private service = inject(AdminService);
  private snackbar=inject(MatSnackBar)
  ngOnInit(): void {

    this.getAllProducts();

    this.searchproductform=new FormGroup({

      productname:new FormControl(null),


     });




  }

  getAllProducts(){
        this.service.getAllProducts().subscribe({
      next:(res)=>{
        this.productsList=[];

        this.productsList=res;

        this.snackbar.open("Products Fetched Successfully","Close",{duration:5000})



      },
      error:(err)=>{
        this.snackbar.open("Error Fetching Products","Error",{duration:5000})

      }
    })
  }

  searchTask() {

    const title=this.searchproductform.get("productname")!.value;


    if(title == ""){
      this.getAllProducts();
    }
    else{
      this.service.getAllProductsByName(this.searchproductform.get("productname")!.value).subscribe({
        next:(res)=>{
          this.productsList=[];
          this.productsList=res;
        },
        error:(err)=>{
          this.snackbar.open("Product Doesn't Exit","Close",{duration:5000})
        }
      })
    }

    }

    deleteProduct(id:number) {

      if(confirm("Are you sure you want to delete this product ?")){

        this.service.deleteProduct(id).subscribe({
          next:(res)=>{
            this.snackbar.open("Product Deleted Successfully","Close",{duration:5000});
            this.getAllProducts();
          },
          error:(err)=>{
            this.snackbar.open("Error Deleting Product","Close",{duration:5000});
          }
        })
      }


      }



}
