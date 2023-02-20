import {  NgToastService } from 'ng-angular-popup';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-trip-dialog',
  templateUrl: './trip-dialog.component.html',
  styleUrls: ['./trip-dialog.component.css']
})
export class TripDialogComponent implements OnInit {

  actionBtn : string = 'Submit'
  constructor(private FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public tripEditData : any,
    private api : ApiService,
    private toast : NgToastService,
    private dialogRef :MatDialogRef<TripDialogComponent>) { }

  tripForm !: FormGroup

  ngOnInit(): void {
    this.tripForm = this.FormBuilder.group({
      tripName : ['',Validators.required],
      fromLocation : ['',Validators.required],
      fromDate : ['',Validators.required],
      toLocation: ['',Validators.required],
      toDate : ['',Validators.required],
      description : ['',Validators.max(30)]

    })

    if(this.tripEditData){
      console.log(this.tripEditData);

      this.actionBtn = 'Update'
      this.tripForm.controls['tripName'].setValue(this.tripEditData.tripName)
      this.tripForm.controls['fromLocation'].setValue(this.tripEditData.fromLocation)
      this.tripForm.controls['fromDate'].setValue(this.tripEditData.fromDate)
      this.tripForm.controls['toLocation'].setValue(this.tripEditData.toLocation)
      this.tripForm.controls['toDate'].setValue(this.tripEditData.toDate)
      this.tripForm.controls['description'].setValue(this.tripEditData.description)
    }


  }

  addTrip(){
    if(!this.tripEditData){
      if(this.tripForm.valid){
        console.log(this.tripForm.value)
        this.api.postTrip(this.tripForm.value)
        .subscribe({
          next:(res)=>{
            this.toast.success({detail:'Success',summary:'Trip added successfully',position:'br', duration: 3000})
            this.tripForm.reset()
            this.dialogRef.close('save')
          },
          error:(err)=>{
            this.toast.error({detail:'Error Message',summary:'Error deleting expense',position:'br',duration:3000})
          }
         } )
        }
    }
    else{
        this.updateTrip()
    }
    }

    updateTrip(){
      this.api.putTrip(this.tripForm.value,this.tripEditData.tripId)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:'Success',summary:'Trip updated successfully',position:'br', duration: 3000})
          this.tripForm.reset()
            this.dialogRef.close('Update')
        },
        error:()=>{
          this.toast.error({detail:'Error Message',summary:'Error Updating expense',position:'br',duration:3000})
        }
      })
    }


  }


