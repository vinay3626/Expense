import { reportsInter } from './../reportsInter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profileForm !: FormGroup

  changePasswordform !: FormGroup

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      employeeId : [''],
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : ['']
    });

    this.changePasswordform = this.fb.group({
      currentPassword : ['',Validators.required],
      newPassword : ['',Validators.required],
      confirmPassword : ['',Validators.required]
    })





  }
}
