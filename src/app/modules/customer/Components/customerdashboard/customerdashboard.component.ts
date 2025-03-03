import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../Services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LocalstorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-customerdashboard',
  imports: [Bytearray2imgPipe,ReactiveFormsModule,MatButtonModule,MatIconModule],
  templateUrl: './customerdashboard.component.html',
  styleUrl: './customerdashboard.component.css'
})
export class CustomerdashboardComponent {

productsList:any=[];
  searchproductform!:FormGroup;

  private service = inject(CustomerService);
  private snackbar=inject(MatSnackBar);



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

addtocart(id:number){

  let userID= LocalstorageService.getUserId();

  console.log(userID);


  const addProductToCartDTO={
    userid:userID,
    productid:id
  }

  console.log(addProductToCartDTO);

  this.service.addToCart(addProductToCartDTO).subscribe({
    next:(res)=>{
      console.log(res);

      this.snackbar.open("Added To Cart Successfully","Close",{duration:3000})
    },
    error:(err)=>{
      this.snackbar.open("Error Adding To Cart","Error",{duration:3000})
    }
  })

}


}
