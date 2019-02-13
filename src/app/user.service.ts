import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LoggedInStatus = false;
  baseUrl: string = environment.baseUrl;

  private headerOptions: any = {
    'Content-type': 'application/json'
  }
  headers: HttpHeaders;
   AddUrl = `${this.baseUrl}/myapi/user/`;
   loginUrl = "http://localhost:8080/myapi/login/";
   BookUrl = "http://localhost:8080/secure/booking/";
   getBookingUrl = "http://localhost:8080/secure/bookings/";
   userInfoUrl = "http://localhost:8080/secure/userInfo/";

  constructor(private http : HttpClient,private Router : Router) { 
    
  }
    sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }

  
  

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
  
    this.Router.navigate(["/home/login"]);
  }
  
  add(data){
    console.log(data)
    return this.http.post(`${this.baseUrl}/myapi/user/`,data);
  }
  login(data){
    return this.http.post(`${this.baseUrl}/myapi/login/`,data)
  }
  book(data){
    return this.http.post(`${this.baseUrl}/secure/booking/`,data);
  }
  getBooking(token){
    console.log("inside service" + token);
    return this.http.post(`${this.baseUrl}/secure/bookings/`,{"token" : token})
  
  }
  userInfo(token){
    return this.http.post(`${this.baseUrl}/secure/userInfo/`,{"token" : token})
  }

  firstname(token){
    return this.http.post(`${this.baseUrl}/secure/firstname/`,{"token" : token})
  }
  DeleteBooking(id,token){
  
   // console.log(username)
      return this.http.request('delete',`${this.baseUrl}/secure/delete`+ '/'+id,{body: {"token" : token}});
    }

    UpdateBooking(id,data){
      return this.http.put(`${this.baseUrl}/secure/update`+ '/'+ id, data)

    }

    GetUserById(id ,token){
      return this.http.post(`${this.baseUrl}/secure/getUserByID` + '/'+ id,{"token" :token});
    }

    Mail(token){
       return this.http.post(`${this.baseUrl}/secure/mail/`,{"token" : token})
    }

    getCabin(){
      return this.http.get(`${this.baseUrl}/cabins`)
    }

    findReserved(data){
      console.log(data);
      //console.log(cabin + Stime +Etime)
      return this.http.post(`${this.baseUrl}/cabins/find`,data,{headers: this.headers})
    }
}
