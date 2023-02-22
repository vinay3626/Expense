import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public infoData : any) { }

  status = this.infoData.status


  ngOnInit(): void {


    console.log(this.infoData)

  }

}
