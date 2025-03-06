import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../Services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customerdashboard',
  imports: [Bytearray2imgPipe,ReactiveFormsModule,MatButtonModule,MatIconModule,FormsModule,MatTooltipModule],
  templateUrl: './customerdashboard.component.html',
  styleUrl: './customerdashboard.component.css'
})
export class CustomerdashboardComponent {

productsList:any=[];
wishlist:any=[];
iswishlistupdate:Boolean = false;


wishlistidarray:Array<any>=[];
  searchproductform!:FormGroup;

  private service = inject(CustomerService);
  private snackbar=inject(MatSnackBar);
  private router = inject(Router)



ngOnInit(): void {

    this.getAllProducts();

    this.searchproductform=new FormGroup({

      productname:new FormControl(null),


     });

     this.getwishlistbyuserid();




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

getwishlistbyuserid(){

  this.service.getwishlistbyuserid().subscribe({
    next:(res)=>{

      console.log(res);

      if(res!=null){
        this.wishlist=res;
        console.log(this.wishlist);

      }
    },
    error:(err)=>{
      console.log(err);

      this.snackbar.open("Error Fetching Wishlist","Error",{duration:2000})
    }
  })

}

addtowishlist(productId:any){

  const wishlistDTO = {
    userid:LocalstorageService.getUserId(),
    productid:productId
  };

  console.log(wishlistDTO);


  this.service.addwishlist(wishlistDTO).subscribe({
    next:(res)=>{
      this.snackbar.open(" Wishlist Updated","Close",{duration:2000});

      this.getwishlistbyuserid();
    }
  })
}

navigatetourl(id:any){

  console.log(id);


  this.router.navigateByUrl(`/customer/viewproduct/${id}`)

}



}
