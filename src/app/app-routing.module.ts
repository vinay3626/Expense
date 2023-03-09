import { HomeComponent } from './home/home.component';
// import { TabsComponent } from './tabs/tabs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./models/auth/auth.module').then((m)=>m.AuthModule)},
  // {path:'',redirectTo:'home',pathMatch:'full'},
  {path: 'home',
  loadChildren: () =>
  import('./layout/layout.module').then((m) => m.LayoutModule),},

  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [ProfileComponent];
