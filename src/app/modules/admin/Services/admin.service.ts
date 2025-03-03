import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../../../services/localstorage.service';

const BASIC_URL = "http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http :HttpClient) { }


  createCategory(categoryDTO:any) :Observable<any>{

    return this.http.post(BASIC_URL+"/api/admin/createCategory",categoryDTO,{
      headers:this.createAuthorizationHeader()
    });

  }

  getAllCategories() :Observable<any>{

    return this.http.get(BASIC_URL+"/api/admin/allCategories",{
      headers:this.createAuthorizationHeader()
    });

  }

  getAllProducts() :Observable<any>{

    return this.http.get(BASIC_URL+"/api/admin/products",{
      headers:this.createAuthorizationHeader()
    });

  }

  addProduct(productDTO:any) :Observable<any>{

    return this.http.post(BASIC_URL+"/api/admin/createProduct",productDTO,{
      headers:this.createAuthorizationHeader()
    });

  }

  getAllProductsByName(name:any) :Observable<any>{

    return this.http.get(BASIC_URL+`/api/admin/product/${name}`,{
      headers:this.createAuthorizationHeader()
    });

  }

  deleteProduct(id:number) :Observable<any>{

    return this.http.delete(BASIC_URL+`/api/admin/product/${id}`,{
      headers:this.createAuthorizationHeader()
    });

  }

  addCoupon(couponDTO:any) :Observable<any>{

    return this.http.post(BASIC_URL+"/api/admin/coupon/create",couponDTO,{
      headers:this.createAuthorizationHeader()
    });

  }

  getAllCoupons() :Observable<any>{

    return this.http.get(BASIC_URL+ "/api/admin/coupon/getAllCoupons",{
      headers:this.createAuthorizationHeader()
    });

  }

  getAllOrders() :Observable<any>{

    return this.http.get(BASIC_URL+ "/api/admin/allorders",{
      headers:this.createAuthorizationHeader()
    });

  }

  updateOrderStatus(userid:number,status:string) :Observable<any>{

    return this.http.get(BASIC_URL+ `/api/admin/updateOrderStatus/${userid}/${status}`,{
      headers:this.createAuthorizationHeader()
    });

  }





  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer '+LocalstorageService.getToken()
    )
  }




}
