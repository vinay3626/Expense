import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseColumns: string[] = ['date', 'merchant', 'currency','category','description','amount', 'action'];

  expenseDataSource !: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog, private api :ApiService,
    private toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllExpenses()

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

  editExpense(row:any){
    console.log(row);

    this.dialog.open(ExpenseDialogComponent,{
      width:"40%" ,
      data:row
    }).afterClosed().subscribe(val=>{
        if(val ==='update'){
          this.getAllExpenses();
        }
    })
  }

  deleteExpense(id:number){
    this.api.deleteExpense(id)
    .subscribe({
      next: (res)=>{
        this.toast.success({detail:'Sucess Message',summary:'Expense Deleted',duration:3000})
        this.getAllExpenses();
      },
      error:()=>{
        this.toast.error({detail:'Error Message',summary:'Error deleting expense',duration:3000})
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

}
