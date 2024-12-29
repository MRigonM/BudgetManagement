import { Routes } from '@angular/router';
import {EmployeeComponent} from './features/employee/employee.component';
import {HomeComponent} from './features/home/home.component';
import {EmployeeDetailsComponent} from './features/employee/employee-details/employee-details.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'employee/:id', component: EmployeeDetailsComponent},
  {path: '**', redirectTo: '',pathMatch: 'full'},
];
