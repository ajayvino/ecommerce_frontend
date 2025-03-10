import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "https://ecommerce-backend-vcwg.onrender.com";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(signupDTO:any):Observable<any>{
    return this.http.post(BASIC_URL + "/api/auth/signup",signupDTO);
   }

   login(loginDTO:any):Observable<any>{
    return this.http.post(BASIC_URL + "/api/auth/login",loginDTO);
   }

   getTrackingStatus(trackingId:number):Observable<any>{

    return this.http.get(BASIC_URL+`/api/auth/trackorder/${trackingId}`);

  }



}
