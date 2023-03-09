import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public  authenticate(username:string ,password:string){
      if((username === 'User' && password === 'password') || (username=== "Admin" && password === "password@123")){
      sessionStorage.setItem(username,password)
      return true
      }
      else
      return false
  }



  public  isUserAuthenticated(){
  let user = sessionStorage.getItem('user')
  console.log(user)
  return !(user === null)
  }

  public  logout(){
    if(this.checkForAdmin() === 'USER'){
    sessionStorage.removeItem('User')
    return true

    }
    if(this.checkForAdmin() === "ADMIN"){
      sessionStorage.removeItem('Admin')
      return true
    }
    else{
      return false
    }

  }

  checkForAdmin(){
    if(sessionStorage.getItem('Admin') === 'password@123'){

      return "ADMIN"
    }else{
      return "USER"
    }
  }

}
