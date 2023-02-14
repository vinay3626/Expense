import { ManagerComponent } from './../manager/manager.component';
import { HomeComponent } from './../home/home.component';
import { SettingsComponent } from './../settings/settings.component';
import { ReportsComponent } from './../reports/reports.component';
import { TripsComponent } from './../trips/trips.component';
import { ExpenseComponent } from './../expense/expense.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
     path: '',
    component: LayoutComponent,
    children:[
      {
        path:"home",
        component:HomeComponent
      },
      {
        path:"expense",
        component:ExpenseComponent
      },
      {
        path:"trips",
        component:TripsComponent
      },
      {
        path:"reports",
        component:ReportsComponent,
      },
      {
        path:"settings",
        component:SettingsComponent
      },
      {
        path: "manager",
        component: ManagerComponent
      }
    ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
