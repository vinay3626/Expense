import { ExpenseComponent } from './../expense/expense.component';
import { InfoDialogTripComponent } from './../info-dialog-trip/info-dialog-trip.component';
import { InfoDialogComponent } from '../info-dialog-expense/info-dialog.component';
import { RejectDialogComponent } from './../reject-dialog/reject-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from './../services/api.service';
// import { Api1Service } from '../services/serve.services';
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

  filteredExpenses !: object[]
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  expenseColumns : String[] = ['date','merchant','category','currency','amount','description' , 'status','action']

  tripsColumn = ['tripName','fromLocation','fromDate','toLocation','toDate','description', 'status', 'action']



    actionTaken !: boolean;

  customStyle ={
    fontSize : "20px",
    color : 'black'
  }

  constructor(private api :ApiService,
    private toast : NgToastService,private confirm : NgConfirmService,
    public dialog :MatDialog
    ) { }

  ngOnInit(): void {
    this.getAllExpenses()
    this.getAllTrips()
  }


  getAllExpenses(){
    this.api.getExpense()
    .subscribe({
      next:(results)=>{
        console.log(results)
        // console.log(results.results[0])
        for(let x= 0 ; x< results.results.length; x++){
        if(results.results[x].status == 'SUBMITTED' || results.results[x].status == 'REJECTED' || results.results[x].status == 'APPROVED')
        {
          this.filteredExpenses =  results.results[x]

        }
      }
      console.log(this.filteredExpenses)
      console.log(results.results)
        this.expenseDataSource = new MatTableDataSource(results.results);
        console.log(this.expenseDataSource )
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

  approveExpense(row: any){
    console.log(row)
    this.confirm.showConfirm("Are you sure want to Approve "+ row.merchant+ " ("+ row.category+") "+ "expense ?",
    ()=>{
      this.api.approveExpense(row,row.expenseId)
      .subscribe(res=>{
        this.toast.success({detail:"Expense Approved",duration:3000})
        this.getAllExpenses()
      })
    },
    ()=>{

    }
    )

  }

  openRejectDialog(row : any) {
    console.log(row)
    this.dialog.open(RejectDialogComponent, {

        width :'50%',
        height: '55%',
        data : row
    }).afterClosed().subscribe(val=>{
        if(val === 'rejected'){
          this.getAllExpenses()
          this.getAllTrips()
        }
    })
  }

  openInfoDialog(row : any){
    this.dialog.open(InfoDialogComponent, {
        width : "auto",
        data : row
    }).afterClosed().subscribe(val=>{


    })
  }

  openTripInfoDialog(row : any){
    this.dialog.open(InfoDialogTripComponent,{
      width : "auto",
      data :row
    }).afterClosed().subscribe(val=>{

    })
  }

  // rejectExpense(row : any){
  //     this.api.rejectExpense(row,row.expenseId)
  //     .subscribe(res=>{
  //       this.toast.info({
  //         detail: "Expense Rejected",duration:3000
  //       })
  //       this.getAllExpenses()
  //     })



  // }



  approveTrip(row : any){
    console.log(row)
    this.confirm.showConfirm("Are you sure want to approve " +row.tripName+" trip?",
    ()=>{
        this.api.approveTrip(row,row.tripId)
        .subscribe(res=>{
          this.toast.success({
            detail:"Trip Approved",position:'bl', duration: 3000
          })
        this.getAllTrips()

        })
    },
    ()=>{

    }
    )

  }

  rejectTrip(row :any){
    this.confirm.showConfirm(
      "Are you sure want to Reject "+row.tripName+" trip"
    ,
    ()=>{
        this.api.rejectTrip(row,row.tripId)
        .subscribe(res=>{
          this.toast.info({
            detail:"Trip Rejected",duration: 3000,position: 'bl'
          })
          this.getAllTrips()
        })
    },
    ()=>{

    }
    )
  }


  applyTripsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tripDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tripDataSource.paginator) {
      this.tripDataSource.paginator.firstPage();
    }
  }


}
