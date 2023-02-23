import { ApiService } from './../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent implements OnInit {

  rejectForm !: FormGroup
  constructor(private formBuilder:FormBuilder,private toast:NgToastService,private api :ApiService,
    @Inject(MAT_DIALOG_DATA) public dataFromManager : any,
    private dialogRef :MatDialogRef<RejectDialogComponent>

    ) { }

  ngOnInit(): void {

    console.log(this.dataFromManager)

    this.rejectForm = this.formBuilder.group({
      rejectReason : ['',Validators.required],
      rejectDescription : ['']
    })
  }

  reject(){
    if(this.rejectForm.valid){
      console.log(this.dataFromManager)


      if(this.dataFromManager.merchant){
      this.api.rejectExpense(this.rejectForm.value,this.dataFromManager.expenseId).subscribe(res=>{

        this.toast.info({
        detail: "Expense rejected", position: 'bl',duration:3000
          })
      this.rejectForm.reset();
      this.dialogRef.close('rejected')
      })
    }

    if(this.dataFromManager.tripName){
      this.api.rejectTrip(this.rejectForm.value,this.dataFromManager.tripId)
      .subscribe(res=>{
        this.toast.info({
          detail:"Trip rejected",position: "bl",duration :3000
        })
        this.rejectForm.reset();
        this.dialogRef.close('rejected')
      })
    }

    }
  }





}
