import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import validateform from '../healpers/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  type : string = 'password'
  isText : boolean = false
  eyeIcon : string = "fa-eye-slash"

  signUpForm !: FormGroup
  
  constructor(private fb :FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      'firstname' : ['', Validators.required],
      'lastname' : ['', Validators.required],
      'email' : ['', Validators.required],
      'username' : ['', Validators.required],
      'password' : ['', Validators.required]
    })

  }

  hideShowPassword(){
    this.isText = !this.isText
    this.isText? this.type = "text" : this.type  = 'password' 
    this.isText? this.eyeIcon = 'fa-eye' :this.eyeIcon = 'fa-eye-slash' 

  }

  onSignUp(){

      if(this.signUpForm.valid){
        console.log(this.signUpForm.value)
      } 
      else
      {
        alert("sign up form is invalid")
        validateform.validateAllFormFields(this.signUpForm)
      }
      
    }

    

}
