import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Api1Service {

  // constructor(private api:ApiService,private toast:NgToastService) { 

  // }

  // getAllExpenses(){
  //   this.api.getExpense()
  //   .subscribe({
  //     next:(results)=>{
  //       // console.log(results.results)
  //       this.expenseDataSource = new MatTableDataSource(results.results);
  //       this.expenseDataSource.paginator = this.paginator;
  //       this.expenseDataSource.sort = this.sort
  //       },
  //   error:()=>{
  //     this.toast.error({detail:'Error Message',summary:'Error in fetching expenses',duration:5000})
  //   }
  // })
  // }
}
