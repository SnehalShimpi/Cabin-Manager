import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import{HomeComponent} from './home/home.component';
import{LoginComponent} from './login/login.component';
import{DashboardComponent} from './dashboard/dashboard.component';
import{AuthGuard} from './auth.guard';
import{BookingComponent} from './booking/booking.component';
import { DeleteComponent } from './delete/delete.component';
import{UpdateComponent} from './update/update.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
const routes: Routes = [
  {path : 'home/register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path: 'home/login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate : [AuthGuard]},
  {path:'booking',component:BookingComponent,canActivate : [AuthGuard]},
  {path : 'delete/:id',component:DeleteComponent,canActivate : [AuthGuard]},
  {path:'update/:id',component:UpdateComponent,canActivate : [AuthGuard]},
  { path: '',
  component: HomeComponent,
  pathMatch: 'full',
 
 },
 {path:'**',component:InvalidPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [HomeComponent]
})
export class AppRoutingModule { }
