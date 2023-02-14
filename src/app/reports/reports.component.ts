import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  ReportColumn : string[] = ['reportName','date','description','action' ];
//  expandedElement !: reportsInter | null;
 reportsDataSource !: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

 constructor(private dialog:MatDialog, private api :ApiService,

  private toast : NgToastService ) { }


  ngOnInit(): void {

    this.getAllReports()

  }


  openReportDialog() {
    const dialogRef = this.dialog.open(ReportDialogComponent,{
      width:"60%",
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getAllReports(){
    this.api.getReports()
    .subscribe({
      next:(results)=>{
     //   console.log(results.results)
        this.reportsDataSource = new MatTableDataSource(results.results)
        this.reportsDataSource.paginator = this.paginator
        this.reportsDataSource.sort = this.sort
      },
      error:()=>
      {
      this.toast.error({detail:'Error Message',summary:'Error in fetching Reports',duration:3000})
      }
    })
  }

  applyReportsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reportsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.reportsDataSource.paginator) {
      this.reportsDataSource.paginator.firstPage();
    }
  }

  editReport(row:any){
    this.dialog.open(ReportDialogComponent,{
      width:'60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllReports();
      }
    })
  }


}
