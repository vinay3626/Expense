import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ApiService } from './../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  expenseDataSource !: MatTableDataSource<any>
  tripDataSource !: MatTableDataSource<any>
  expenseColumns  : string[] = ['date', 'merchant', 'currency', 'category','description','amount'];
  tripsColumn = ['tripName','fromLocation','fromDate','toLocation','toDate','description'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( private api:ApiService, private toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllExpenses()
    this.getAllTrips()
  }

  getAllExpenses(){
    this.api.getExpense()
    .subscribe({
      next:(results)=>{
        // console.log(results.results)
        this.expenseDataSource = new MatTableDataSource(results.results);
        this.expenseDataSource.paginator = this.paginator;
        this.expenseDataSource.sort = this.sort
        },
    error:()=>{
      this.toast.error({detail:'Error Message',summary:'Error in fetching expenses',duration:5000})
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

  getAllTrips(){
    this.api.getTrip()
    .subscribe({
      next:(results)=>{
  //      console.log(results.results)
        this.tripDataSource = new MatTableDataSource(results.results);
        this.tripDataSource.paginator = this.paginator;
        this.tripDataSource.sort = this.sort
      },
      error:()=>{
      this.toast.error({detail:'Error Message',summary:'Error in fetching Trips',duration:3000})
      }

    })

}
}
