import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  static saveToken(token:string){
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN,token);
   }

   static saveUser(user:any){

    localStorage.removeItem(USER);
    localStorage.setItem(USER,JSON.stringify(user));

   }

   static getToken(){
    return localStorage.getItem(TOKEN);
   }

   static getUser() :any {
    const user= localStorage.getItem(USER);
    return user ? JSON.parse(user) :null;

   }

   static getUserRole():string {
    const user = this.getUser();

    return user ? user.role :'';
   }

   static isAdminLoggedIn():boolean{
    if(this.getToken()=== null){
      return false;
    }
    const role:string = this.getUserRole();



    return role === "ADMIN"
   }

   static isEmployeeLoggedIn():boolean{
    if(this.getToken()=== null){
      return false;
    }
    const role:string = this.getUserRole();
    return role === "CUSTOMER"
   }

   static getUserId():any {
    const user = this.getUser();
    return user ? user.id :null
   }

   static getUserName():string {
    const user = this.getUser();
    return user ? user.name :''
   }

   static hasToken():boolean{
    if(this.getToken() === null){
      return false;
    }
    else{

      return true;
    }

   }

   static signout(){
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
   }
}
