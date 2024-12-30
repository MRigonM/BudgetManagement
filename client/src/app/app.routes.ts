import { Routes } from '@angular/router';
import {EmployeeComponent} from './features/employee/employee.component';
import {HomeComponent} from './features/home/home.component';
import {EmployeeDetailsComponent} from './features/employee/employee-details/employee-details.component';
import {DepartmentComponent} from './features/department/department.component';
import {AddDepartmentComponent} from './features/department/add-department/add-department.component';
import {UpdateDepartmentComponent} from './features/department/update-department/update-department.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'employee/:id', component: EmployeeDetailsComponent},

  {path: 'department', component: DepartmentComponent},
  {path: 'department/add', component: AddDepartmentComponent},
  {path: 'department/update/:id', component: UpdateDepartmentComponent},
  {path: '**', redirectTo: '',pathMatch: 'full'},

];
