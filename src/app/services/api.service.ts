import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  totalCountOfReports !: number

  constructor( private http: HttpClient) {}

  // Expense APi services

  saveExpense(data : any){
    return this.http.post<any>("http://localhost:8080/expense/save/expense",data);
  }

    submitExpense(data:any){
      return this.http.post<any>("http://localhost:8080/expense/submit/expense",data);
    }

    getExpense(){
      return this.http.get<any>("http://localhost:8080/expense/fetch/expenses");
    }

    getExpenseByExpenseName(merchant : String ){
      return this.http.get<any>("http://localhost:8080/expense/fetch/merchant/"+merchant);

    }

    putExpense( data:any,id:number){
      return this.http.put<any>("http://localhost:8080/expense/update/expense/"+id,data)
    }

    deleteExpense(id:number){
      return this.http.delete<any>("http://localhost:8080/expense/delete/expense/"+id)
    }

    approveExpense(data : any,id : number){
      return this.http.post<any>("http://localhost:8080/expense/expense/approve/"+id,data)
    }

    rejectExpense(data : any,id :number){
      return this.http.post<any>("http://localhost:8080/expense/expense/reject/"+id,data)
    }

    //Trip Api services



    getTrip(){
      return this.http.get<any>("http://localhost:8080/expense/fetch/trips")
    }

    saveTrip(data : any){
      return this.http.post<any>("http://localhost:8080/expense/save/trip",data)

    }

    submitTrip(data:any){
      return this.http.post<any>("http://localhost:8080/expense/submit/trip",data)
    }

    putTrip(data:any,id:number){
      return this.http.put<any>("http://localhost:8080/expense/update/trip/"+id,data)
    }

    deleteTrip(id:number){
      return this.http.delete<any>("http://localhost:8080/expense/delete/trip/"+id)
    }

    approveTrip(data : any,id : number){
      return this.http.post<any>("http://localhost:8080/expense/trip/approve/"+id,data)
    }

    rejectTrip(data : any,id: number){
      return this.http.post<any>("http://localhost:8080/expense/trip/reject/"+id,data)
    }

    //Reports Api services

    getReports(){
      return this.http.get<any>("http://localhost:8080/expense/fetch/reports")
    }

    getReportByReportName(reportName :String){
        return this.http.get<any>("http://localhost:8080/expense/fetch/reportName/"+reportName)
    }

    postReport(data :any){
      return this.http.post<any>("http://localhost:8080/expense/save/report",data)
    }

    putReport(data:any,id:number){
      return this.http.put<any>("http://localhost:8080/expense/update/report/"+id,data)
    }

    deleteReport(id:number){
      return this.http.delete<any>("http://localhost:8080/expense/delete/report/"+id)
    }








}
