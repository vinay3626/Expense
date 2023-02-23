import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {
  actionBtn : string = 'Submit'
  toggleSaveBtn : boolean = true;
  actionButtonTitle : string = 'Add Expense'
  expenseForm !: FormGroup;

  ImageUpload(event:any){

  }

  constructor(private formBuilder : FormBuilder,
    private toast : NgToastService,
     private api :ApiService,
     @Inject(MAT_DIALOG_DATA)   public editData: any,
     private dialogRef: MatDialogRef<ExpenseDialogComponent>) { }

  ngOnInit(): void {

    this.expenseForm = this.formBuilder.group({
      date : ['',Validators.required],
      merchant : ['',Validators.required],
      amount :['',Validators.required],
      currency : ['',Validators.required] ,
      description : ['',Validators.required],
      reports :['',Validators.required],
      category :['',Validators.required]


    })

    if(this.editData.status == 'SUBMITTED'){
      this.toggleSaveBtn = false
  }

    this.actionBtn = 'Update'

    if(this.editData.status == 'SAVED'){
      this.actionBtn = 'Submit'
    }
          // console.log(this.editData)
       if(this.editData){
        this.actionButtonTitle = "Update Expense"
        this.expenseForm.controls['date'].setValue(this.editData.date);
        this.expenseForm.controls['merchant'].setValue(this.editData.merchant);
        this.expenseForm.controls['amount'].setValue(this.editData.amount);
        this.expenseForm.controls['currency'].setValue(this.editData.currency);
        this.expenseForm.controls['description'].setValue(this.editData.description);
        this.expenseForm.controls['category'].setValue(this.editData.category);
      }
  }

  saveExpense(){
    console.log('hi')
    if(!this.editData){
    console.log(this.editData)
    if(this.editData.valid){
      this.api.saveExpense(this.editData)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail: "Success", summary: 'Expense Saved Successfully',position: 'bl',duration: 3000
                             })
          this.expenseForm.reset()
          this.dialogRef.close('saved')
                   }
        ,error: (res)=>{
            this.toast.error({
              detail : 'Error', summary: 'Error while saving expense', position : 'bl', duration: 3000
                              })
                       }
                 })
                           }
    }
  else{
    this.updateExpense()
       }
}


  submitExpense(){
    if(!this.editData){
    if(this.expenseForm.valid){
      // console.log(this.expenseForm.value);
      console.log("hello")
      this.api.submitExpense(this.expenseForm.value)
      .subscribe({
        next:(res)=>{
          console.log("Hello")
        this.toast.success({detail:'Success',summary:'Expense added successfully',position:'bl', duration: 3000})
        this.expenseForm.reset();
          this.dialogRef.close('save')

        },error:(err)=>{
        this.toast.error({detail:'Error Message',summary:'Error addinng expense',position:'bl', duration: 5000})
        }
      })
    }
    }else{
      this.updateExpense()
    }
  }

  updateExpense(){
      this.api.putExpense(this.expenseForm.value,this.editData.expenseId)
        .subscribe({
          next:(res)=>{
            this.toast.success({detail:'Success Message',summary:'Expense updated successfully',position:'bl',duration:3000})
            this.expenseForm.reset();
            this.dialogRef.close('update')
          },
          error:()=>{
            this.toast.error({detail:'Error Message',summary:'Error Updating expense',position:'bl',duration:3000})
          }
        })
  }
}

