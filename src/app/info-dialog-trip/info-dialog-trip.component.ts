import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit,Inject } from '@angular/core';

@Component({
  selector: 'app-info-dialog-trip',
  templateUrl: './info-dialog-trip.component.html',
  styleUrls: ['./info-dialog-trip.component.css']
})
export class InfoDialogTripComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public infoTripData : any) { }

  ngOnInit(): void {
    console.log(this.infoTripData)
  }

}
