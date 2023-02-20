import { NgToastService } from 'ng-angular-popup';
import { ApiService } from './../services/api.service';
import { Api1Service } from './../services/api1.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  expenseDataSource !: MatTableDataSource<any>;
  tripDataSource !: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  expenseColumns : String[] = ['date','merchant','category','currency','amount','description','action']

  tripsColumn = ['tripName','fromLocation','fromDate','toLocation','toDate','description', 'action']

  ApprovedExpenses = {

  }

  constructor(private api :ApiService,private toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllExpenses()
    this.getAllTrips()
  }


  getAllExpenses(){
    this.api.getExpense()
    .subscribe({
      next:(results)=>{
        this.expenseDataSource = new MatTableDataSource(results.results);
        this.expenseDataSource.paginator = this.paginator
        this.expenseDataSource.sort = this.sort

      },
      error:()=>{

      }

    })
  }

  getAllTrips(){
    this.api.getTrip()

    .subscribe({
      next:(results)=>{
        this.tripDataSource =new MatTableDataSource(results.results);
      },
      error:()=>{

      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expenseDataSource.filter = filterValue.trim().toLowerCase();

    if (this.expenseDataSource.paginator) {
      this.expenseDataSource.paginator.firstPage();
    }
  }

  ApproveExpense(row: any){
    // console.log(row)
    this.api.approveExpense(row,row.expenseId)
    .subscribe(res=>{
      this.toast.success({detail:"Expense Approved",duration:3000})
    })
  }

  RejectExpense(row : any){
    this.api.rejectExpense(row,row.expenseId)
    .subscribe(res=>{
      this.toast.info({
        detail: "Expense Rejected",duration:3000
      })
    })
  }

  applyTripsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tripDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tripDataSource.paginator) {
      this.tripDataSource.paginator.firstPage();
    }
  }


}
