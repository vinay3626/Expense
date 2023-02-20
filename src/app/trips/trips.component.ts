import { NgConfirmService } from 'ng-confirm-box';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { TripDialogComponent } from '../trip-dialog/trip-dialog.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  tripsColumn = ['tripName','fromLocation','fromDate','toLocation','toDate','description','Status', 'action']
  tripDataSource !: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog, private api :ApiService,
    private toast : NgToastService,private confirm : NgConfirmService ) { }

  ngOnInit(): void {
    this.getAllTrips()
  }

  openTripDialog(){
    this.dialog.open(TripDialogComponent,{
      width : "50%;"
    }).afterClosed().subscribe(val=>{
        if(val=== 'save')
        {
          this.getAllTrips()
        }
    })

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
      this.toast.error({detail:'Error Message',summary:'Error in fetching Trips',position:'br',duration:3000})
      }

    })

  }

  editTrip(row:any){
    this.dialog.open( TripDialogComponent,{
      width: "40%",
      data : row
    }).afterClosed().subscribe( val=>{
        if(val === 'Update'){
          this.getAllTrips();
        }
    })

  }

  deleteTrip(id:number){

    this.confirm.showConfirm("Are you sure want to delete?",
    ()=>{
      this.api.deleteTrip(id)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:'Success',summary:'Trip deleted successfully',position:'br', duration: 3000})
          this.getAllTrips();
        },
        error:()=>{
          this.toast.error({detail:'Error Message',summary:'Error  deleting trip',position:'br',duration:3000})
        }
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
