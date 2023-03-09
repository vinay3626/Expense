import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ApiService } from './../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { serveServices } from '../services/serve.services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  expenseDataSource !: MatTableDataSource<any>
  tripDataSource !: MatTableDataSource<any>
  expenseColumns  : string[] = ['date', 'merchant', 'currency', 'category','description','amount' ,'status'];
  tripsColumn = ['tripName','fromLocation','fromDate','toLocation','toDate','description','status'];
  @ViewChild(MatPaginator) expensepaginator !: MatPaginator;
  @ViewChild(MatSort) expenseSort !: MatSort;

  @ViewChild(MatPaginator) tripPaginator !: MatPaginator;
  @ViewChild(MatSort) tripSort !: MatSort;

  totalExpenseCount!: number;
  totalTripsCount !: number;
  approvedExpensesCount : number = 0;
  amountOfApprovedExpenses : number = 0;


  customStyle={

    fontSize : '20px',
    color : 'black',

  }

  constructor( private api:ApiService, private toast : NgToastService,
    public service : serveServices) { }



  ngOnInit(): void {

    this.getAllExpenses()
    this.getAllTrips()

  //  console.log(this.service.totalCountOfReports )

  }

  countAmount(results : any){
      for(let x= 0 ; x < results.length;x++){
        if(results[x].status == 'APPROVED'){
          this.amountOfApprovedExpenses = this.amountOfApprovedExpenses +  results[x].amount
        }
      }
      console.log(this.amountOfApprovedExpenses)
  }

  countApprovedExpenses(results : any){
    for(let x = 0;x<results.length;x++){
        if(results[x].status == 'APPROVED'){
          this.approvedExpensesCount++
        }
    }
    // console.log(this.approvedExpensesCount)
  }

  getAllExpenses(){
    this.api.getExpense()
    .subscribe({
      next:(results)=>{
        console.log(results.results)
        this.expenseDataSource = new MatTableDataSource(results.results);
        this.expenseDataSource.paginator = this.expensepaginator;
        this.expenseDataSource.sort = this.expenseSort
        this.totalExpenseCount = results.results.length
       this.countApprovedExpenses(results.results)
       this.countAmount(results.results)


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
        this.tripDataSource.paginator = this.tripPaginator;
        this.tripDataSource.sort = this.tripSort
        this.totalTripsCount = results.results.length

      },
      error:()=>{
      this.toast.error({detail:'Error Message',summary:'Error in fetching Trips',duration:3000})
      }

    })

}
}
