import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import{Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LoggedInStatus = false;

   AddUrl = "http://localhost:8080/myapi/user/";
   loginUrl = "http://localhost:8080/myapi/login/";
   BookUrl = "http://localhost:8080/secure/booking/";
   getBookingUrl = "http://localhost:8080/secure/bookings/";
   userInfoUrl = "http://localhost:8080/secure/userInfo/";

  constructor(private http : HttpClient,private Router : Router) { }
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
    return this.http.post(this.AddUrl,data);
  }
  login(data){
    return this.http.post(this.loginUrl,data)
  }
  book(data){
    return this.http.post(this.BookUrl,data);
  }
  getBooking(token){
    console.log("inside service" + token);
    return this.http.post(this.getBookingUrl,{"token" : token})
  
  }
  userInfo(token){
    return this.http.post(this.userInfoUrl,{"token" : token})
  }

  firstname(token){
    return this.http.post("http://localhost:8080/secure/firstname/",{"token" : token})
  }
  DeleteBooking(id,token){
  
   // console.log(username)
      return this.http.request('delete','http://localhost:8080/secure/delete'+ '/'+id,{body: {"token" : token}});
    }

    UpdateBooking(id,data){
      return this.http.put('http://localhost:8080/secure/update'+ '/'+ id, data)

    }

    GetUserById(id ,token){
      return this.http.post("http://localhost:8080/secure/getUserByID" + '/'+ id,{"token" :token});
    }
}
