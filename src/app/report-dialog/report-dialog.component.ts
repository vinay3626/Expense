import { AddExpenseInReportsComponent } from './../add-expense-in-reports/add-expense-in-reports.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
// import { ExpenseData } from './expenseData';
import { SelectionModel } from '@angular/cdk/collections';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})



export class ReportDialogComponent implements OnInit {

  actionBtn :string = "Submit";
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];



  ExpensesNames :string[] =[];
  uniqueExpenseNames : string[] =[] ;

  TripsNames : String[] =[];
  uniqueTripNames : String[] = []




  constructor(private dialog :MatDialog,
     private toast : NgToastService,
     private formBuilder : FormBuilder,
     public api : ApiService,
     @Inject(MAT_DIALOG_DATA)   public editData: any,
     private dialogRef: MatDialogRef<ReportDialogComponent> ) { }

   dataSource = new MatTableDataSource<any>();
   ReportForm !: FormGroup

  ngOnInit(): void {


    this.api.getExpense()
    this.selectExpenses()
    this.selectTrips()

    // console.log(this.editData)


    this.ReportForm = this.formBuilder.group({
      date : ['', Validators.required],
      reportName: ['', Validators.required],
      description : ['', Validators.max(30)],
      expenses : [''],
      // trips : ['']
    });

if(this.editData){
  this.actionBtn = 'UPDATE'
  this.ReportForm.controls['date'].setValue(this.editData.date);
  this.ReportForm.controls['reportName'].setValue(this.editData.reportName);
  this.ReportForm.controls['description'].setValue(this.editData.description);
  this.ReportForm.controls['selectExpenses'].setValue(this.editData.expenses);
  this.ReportForm.controls['selectTrips'].setValue(this.editData.trips);
}


}

selectExpenses(){
  this.api.getExpense()
    .subscribe({
      next:(results)=>{

      results.results.forEach((element: any) => {

        this.ExpensesNames.push(element.merchant)

      });
      // console.log(this.ExpensesName);
        this.ExpensesNames.forEach((merchant)=>{
            if(!this.uniqueExpenseNames.includes(merchant)){
              this.uniqueExpenseNames.push(merchant)
            }
        });
        console.log(this.uniqueExpenseNames)
    }
  })

}

selectTrips(){

  this.api.getTrip()
  .subscribe({
    next:(results)=>{
      // console.log(results.results)

     results.results.forEach((element : any)=>{
       this.TripsNames.push(element.tripName)
      //  console.log(element.tripName)

     })
    //  console.log(this.TripsNames)
        this.TripsNames.forEach((tripName : any)=>{
          if(!this.uniqueTripNames.includes(tripName)){
              this.uniqueTripNames.push(tripName)
          }
        });
        console.log(this.uniqueTripNames)
    }

  })

}




async addReports(){
              if(!this.editData){
           if(this.ReportForm.valid){

            if(this.ReportForm.value.expenses == ''){
             let reportObj = {
            ...this.ReportForm.value.expenses = []
          }
        }

      if (this.ReportForm.value.expenses.length >= 1){
        this.api.getExpenseByExpenseName(this.ReportForm.value.expenses[0])
         .subscribe({
        next : (results)=>{
          // console.log(results.results)
          this.ReportForm.value.expenses.splice(0,1)
          this.ReportForm.value.expenses.push(results.results)
          console.log(this.ReportForm.value)
        }
      })
      }

      const sleep = (ms: any) => new Promise(r => setTimeout(r, ms));

      console.log('1');
      // Sleeps for 2 seconds.
      await sleep(1000);
      console.log('2');


      let reportObj = {
        reportId: 0,
        ...this.ReportForm.value
      }

      console.log(this.ReportForm.value)
      this.api.postReport(reportObj)
      .subscribe({
        next:(res)=>{
          alert("Report added successfully");
          this.ReportForm.reset();
          this.dialogRef.close('save')
        },
        error:(err)=>{
          alert("Error adding report")
          console.log(err)
        }

      })


    }
  }else{

    this.updateReport()
  }
  }

  updateReport() {
    if(this.ReportForm.value.expenses == ''){
      let reportObj = {
        ...this.ReportForm.value.expenses = []
      }


    }
    this.api.putReport(this.ReportForm.value,this.editData.reportId)
    .subscribe({
      next:(res)=>{
        this.toast.success({detail:'Success Message',summary:"Report updated",duration:3000})
        this.ReportForm.reset();
        this.dialogRef.close('update')
      },
      error:()=>{
        this.toast.error({detail:'Error Message',summary:'Error Updating Report',duration :3000})
      }
    })
  }


}
