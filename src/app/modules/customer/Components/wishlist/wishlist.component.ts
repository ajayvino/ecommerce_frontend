import { Component, inject } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [Bytearray2imgPipe,MatIconModule,MatButtonModule,MatTooltipModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  private service = inject(CustomerService);
  wishlistitems:any=[];
  private snackbar = inject(MatSnackBar);

  private router = inject(Router);


  ngOnInit(): void {

    this.getwishlist();




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


        this.getwishlist();
      }
    })
  }

  getwishlist(){

    this.service.getwishlistbyuserid().subscribe({
      next:(res)=>{



        if(res!=null){
          this.wishlistitems=res;
          console.log(this.wishlistitems);

        }
      },
      error:(err)=>{
        console.log(err);

      }
    })


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

  navigatetourl(id:any){

    console.log(id);


    this.router.navigateByUrl(`/customer/viewproduct/${id}`)

  }

}
