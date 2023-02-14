import { ApiService } from './services/api.service';

import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { assertPlatform, Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  title = 'Expenses';
  expenseDataSource !: MatTableDataSource<any>;



  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit(): void {

  }

  


}
