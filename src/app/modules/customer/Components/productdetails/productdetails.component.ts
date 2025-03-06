import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { Bytearray2imgPipe } from "../../../../Pipes/bytearray2img.pipe";

@Component({
  selector: 'app-productdetails',
  imports: [Bytearray2imgPipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {


  private activatedRoute = inject(ActivatedRoute);
  private service = inject(CustomerService);
  productDetailsList:any=[];
  productid:any = this.activatedRoute.snapshot.params['id'];
  img:any="";
  isReviewDTOEmpty:Boolean=true;


  ngOnInit(): void {
  console.log(this.productid);
  this.productDetailsList.reviewDTOList=[];
  this.productDetailsList.faqdtoList=[];

  this.getProductDetails();


  }

  getProductDetails(){

    this.service.getProductDetails(this.productid).subscribe({


      next:(res)=>{

        if(res!=null){
          this.productDetailsList=res;
          this.img=this.productDetailsList.productDTO.img;

          if((this.productDetailsList.reviewDTOList).length==0){
            console.log("No Comments");

          }
          console.log(this.productDetailsList);

        }
      }
    })

  }




}
