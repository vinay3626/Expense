import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Expenses';
  expenseDataSource !: MatTableDataSource<any>;



  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog,private api:ApiService,private auth:AuthService,private router:Router){

  }
  ngOnInit(): void {
   console.log( this.auth.isUserAuthenticated());
  }



  getAllExpenses(){
    this.api.getExpense()
    .subscribe({
      next:(res)=>{
        this.expenseDataSource = new MatTableDataSource(res);
        this.expenseDataSource.paginator = this.paginator;
        this.expenseDataSource.sort = this.sort
        },
    error:()=>{
      alert("Error while fetching the expenses")
    }
  })
  }




  openDialog() {
    this.dialog.open(ExpenseDialogComponent, {
        width :'40%'
    }).afterClosed().subscribe(val=>{
        if(val === 'save'){
          this.getAllExpenses();
        }
    })
  }


  logOut(){
    this.auth.logout()
    this.router.navigate([''])
  }




}
