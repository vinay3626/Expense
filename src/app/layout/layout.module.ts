import { SideNavComponent } from './../side-nav/side-nav.component';
import { FooterComponent } from './../footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HeaderComponent,
    FooterComponent,
    HeaderComponent,
    SideNavComponent

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule

  ]
})
export class LayoutModule { }
