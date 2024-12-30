import { Routes } from '@angular/router';
import {EmployeeComponent} from './features/employee/employee.component';
import {EmployeeDetailsComponent} from './features/employee/employee-details/employee-details.component';
import {DepartmentComponent} from './features/department/department.component';
import {AddDepartmentComponent} from './features/department/add-department/add-department.component';
import {UpdateDepartmentComponent} from './features/department/update-department/update-department.component';
import {EmployeeDashboardComponent} from './features/employee/employee-dashboard/employee-dashboard.component';
import {AddEmployeeComponent} from './features/employee/employee-dashboard/add-employee/add-employee.component';
import {
  UpdateEmployeeComponent
} from './features/employee/employee-dashboard/update-employee/update-employee.component';

export const routes: Routes = [
  {path: 'employee', component: EmployeeComponent},
  {path: 'employee/:id', component: EmployeeDetailsComponent},

  {path: 'department', component: DepartmentComponent},
  {path: 'department/add', component: AddDepartmentComponent},
  {path: 'department/update/:id', component: UpdateDepartmentComponent},

  {path: 'employees', component: EmployeeDashboardComponent},
  {path: 'employees/add', component: AddEmployeeComponent},
  {path: 'employees/update/:id', component: UpdateEmployeeComponent},
  {path: '**', redirectTo: 'employee',pathMatch: 'full'},

];
