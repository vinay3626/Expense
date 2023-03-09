import { Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { ApiService } from './../services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import validateform from '../healpers/validateform';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type : string = 'password'
  isText : boolean = false
  eyeIcon : string = "fa-eye-slash"

  loginForm !: FormGroup

  constructor( private fb :FormBuilder,private api : ApiService,
    private route:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "username" : ['', Validators.required],
      "password" : ['',Validators.required]
    })

    console.log(this.loginForm)


  }

  hideShowPassword(){
    this.isText = !this.isText
    this.isText? this.type = "text" : this.type  = 'password'
    this.isText? this.eyeIcon = 'fa-eye' :this.eyeIcon = 'fa-eye-slash'
  }

  onSubmit(){
if(this.loginForm.valid){
  console.log(this.loginForm.value)
    if( this.auth.authenticate(this.loginForm.value.username,this.loginForm.value.password)){
      this.route.navigate(['home'])
 }

}

  }



}
