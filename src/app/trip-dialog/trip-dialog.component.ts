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
  actionBtnTitle : string = 'Create Trip'
  toggleSaveBtn : boolean = true
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

      if(this.tripEditData.status == 'SUBMITTED'){
          this.toggleSaveBtn = false
      }

      this.actionBtn = 'Update'

      if(this.tripEditData.status == 'SAVED'){
        this.actionBtn = 'Submit'
      }
      console.log(this.tripEditData);
      this.actionBtnTitle = 'Update Trip'
      this.tripForm.controls['tripName'].setValue(this.tripEditData.tripName)
      this.tripForm.controls['fromLocation'].setValue(this.tripEditData.fromLocation)
      this.tripForm.controls['fromDate'].setValue(this.tripEditData.fromDate)
      this.tripForm.controls['toLocation'].setValue(this.tripEditData.toLocation)
      this.tripForm.controls['toDate'].setValue(this.tripEditData.toDate)
      this.tripForm.controls['description'].setValue(this.tripEditData.description)
    }


  }

  saveTrip(){
    if(!this.tripEditData){
      if(this.tripForm.valid){
        console.log(this.tripForm.value)
        this.api.saveTrip(this.tripForm.value).subscribe({
          next :(res)=>{
          this.toast.success({
            detail:"Success", summary:"Trip Saved Successfully",position: 'bl',duration: 3000
           })
          this.tripForm.reset();
          this.dialogRef.close('save')
        },
        error : (res)=>{
          this.toast.error({
            detail:'Error', summary: 'Error Saving trip', position: 'bl', duration : 3000
          })
        }
      })
      }
    }else{
      this.updateTrip()
    }
  }

  submitTrip(){
    if(!this.tripEditData){
      if(this.tripForm.valid){
        console.log(this.tripForm.value)
        this.api.submitTrip(this.tripForm.value)
        .subscribe({
          next:(res)=>{
            this.toast.success({detail:'Success',summary:'Trip Submitted successfully',position:'bl', duration: 3000})
            this.tripForm.reset()
            this.dialogRef.close('Submit')
          },
          error:(err)=>{
            this.toast.error({detail:'Error Message',summary:'Error deleting expense',position:'bl',duration:3000})
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
          this.toast.success({detail:'Success',summary:'Trip updated successfully',position:'bl', duration: 3000})
          this.tripForm.reset()
            this.dialogRef.close('Update')
        },
        error:()=>{
          this.toast.error({detail:'Error Message',summary:'Error Updating expense',position:'bl',duration:3000})
        }
      })
    }


  }


