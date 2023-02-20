import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TripDialogComponent } from './trip-dialog/trip-dialog.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { AddExpenseInReportsComponent } from './add-expense-in-reports/add-expense-in-reports.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {NgToastModule} from 'ng-angular-popup';
import { TripsComponent } from './trips/trips.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import {LayoutModule} from './layout/layout.module'
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { NgConfirmModule } from 'ng-confirm-box'




@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    ExpenseDialogComponent,
    TripDialogComponent,
    ReportDialogComponent,
    AddExpenseInReportsComponent,
    ProfileComponent,
    routingComponents,
    // TabsComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PageNotFoundComponent,
    TripsComponent,
    ReportsComponent,
    SettingsComponent,
    HomeComponent,
    ManagerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    NgToastModule,
    LayoutModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    NgConfirmModule


  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
