import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../../../services/localstorage.service';

const BASIC_URL = "https://ecommerce-backend-vcwg.onrender.com";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient) { }

    getAllProducts() :Observable<any>{

      return this.http.get(BASIC_URL+"/api/customer/products",{
        headers:this.createAuthorizationHeader()
      });

    }

      getAllProductsByName(name:any) :Observable<any>{

        return this.http.get(BASIC_URL+`/api/customer/product/${name}`,{
          headers:this.createAuthorizationHeader()
        });

      }

      addToCart(addProductToCartDTO:any) :Observable<any>{

        return this.http.post(BASIC_URL+"/api/customer/cart",addProductToCartDTO,{
          headers:this.createAuthorizationHeader()
        });

      }

      getCartItemsByUserid(id:number):Observable<any>{
        return this.http.get(BASIC_URL+`/api/customer/cart/${id}`,{
          headers:this.createAuthorizationHeader()
        });

      }

      applyCoupon(id:number,code:string):Observable<any>{
        return this.http.get(BASIC_URL+`/api/customer/coupon/${id}/${code}`,{
          headers:this.createAuthorizationHeader()
        });

      }

      deleteCart(userid:number,productid:number):Observable<any>{
        return this.http.delete(BASIC_URL+`/api/customer/cart/delete/${userid}/${productid}`,{
          headers:this.createAuthorizationHeader()
        });

      }

      updateCartQuantiy(updateCartDTO:any):Observable<any>{
        return this.http.post(BASIC_URL+"/api/customer/cart/update",updateCartDTO,{
          headers:this.createAuthorizationHeader()
        });

      }

      deleteCartQuantiy(updateCartDTO:any):Observable<any>{
        return this.http.post(BASIC_URL+"/api/customer/cart/delete",updateCartDTO,{
          headers:this.createAuthorizationHeader()
        });

      }


      placeOrder(placeOrderDTO:any):Observable<any>{
        return this.http.post(BASIC_URL+"/api/customer/cart/placeorder",placeOrderDTO,{
          headers:this.createAuthorizationHeader()
        });

      }

      getOrdersbyUserid():Observable<any>{
        const userid = LocalstorageService.getUserId();
        return this.http.get(BASIC_URL+`/api/customer/orders/${userid}`,{
          headers:this.createAuthorizationHeader()
        });

      }

      getCartItemsByOrderid(id:number):Observable<any>{
        return this.http.get(BASIC_URL+`/api/customer/order/${id}`,{
          headers:this.createAuthorizationHeader()
        });

      }


      addReview(reviewDTO:any) :Observable<any>{

        return this.http.post(BASIC_URL+"/api/customer/createreview",reviewDTO,{
          headers:this.createAuthorizationHeader()
        });

      }

      getProductDetails(id:number):Observable<any>{
        return this.http.get(BASIC_URL+`/api/customer/getProductDetails/${id}`,{
          headers:this.createAuthorizationHeader()
        });

      }

      getwishlistbyuserid():Observable<any>{
        const userid = LocalstorageService.getUserId();
        return this.http.get(BASIC_URL+`/api/customer/getwishlistbyuserid/${userid}`,{
          headers:this.createAuthorizationHeader()
        });

      }





      addwishlist(wishListDTO:any):Observable<any>{

        return this.http.post(BASIC_URL+"/api/customer/savewishlist",wishListDTO,{
          headers:this.createAuthorizationHeader()
        });

      }

      createTransaction(amount:number):Observable<any>{
        return this.http.get(BASIC_URL+`/api/customer/createTransaction/${amount}`,{
          headers:this.createAuthorizationHeader()
        });

      }









        private createAuthorizationHeader():HttpHeaders{
          return new HttpHeaders().set(
            'Authorization', 'Bearer '+LocalstorageService.getToken()
          )
        }
}
