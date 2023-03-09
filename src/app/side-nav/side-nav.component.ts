import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private auth:AuthService) { }

  isAdmin = 'false'

  adminCheck(){

   if( this.auth.checkForAdmin() === 'ADMIN'){
    return 'ADMIN'
   }else{
    return 'USER'
   }
  }


  ngOnInit(): void {
    this.auth.checkForAdmin()
  }

}
