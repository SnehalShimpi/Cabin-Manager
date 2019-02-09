import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import{FormsModule} from '@angular/forms';
import{UserService} from './user.service';
import{HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import{AuthGuard}from './auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from './booking/booking.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import{DatePipe} from '@angular/common'
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    BookingComponent,
    DeleteComponent,
    UpdateComponent,
    InvalidPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AmazingTimePickerModule,
    OrderModule
    
 
  
   
  ],
  providers: [UserService, AuthGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
