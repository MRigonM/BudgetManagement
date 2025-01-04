import { Routes } from '@angular/router';
import { EmployeeComponent } from './features/employee/employee.component';
import { EmployeeDetailsComponent } from './features/employee/employee-details/employee-details.component';
import { DepartmentComponent } from './features/department/department.component';
import { AddDepartmentComponent } from './features/department/add-department/add-department.component';
import { UpdateDepartmentComponent } from './features/department/update-department/update-department.component';
import { EmployeeDashboardComponent } from './features/employee/employee-dashboard/employee-dashboard.component';
import { AddEmployeeComponent } from './features/employee/employee-dashboard/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './features/employee/employee-dashboard/update-employee/update-employee.component';
import { LoginComponent } from './features/account/login/login.component';
import { RegisterComponent } from './features/account/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { unauthGuard } from './core/guards/unauth.guard';

export const routes: Routes = [
  { path: 'employee', component: EmployeeComponent, canActivate: [authGuard] },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [authGuard] },

  { path: 'department', component: DepartmentComponent, canActivate: [authGuard] },
  { path: 'department/add', component: AddDepartmentComponent, canActivate: [authGuard] },
  { path: 'department/update/:id', component: UpdateDepartmentComponent, canActivate: [authGuard] },

  { path: 'employees', component: EmployeeDashboardComponent, canActivate: [authGuard] },
  { path: 'employees/add', component: AddEmployeeComponent, canActivate: [authGuard] },
  { path: 'employees/update/:id', component: UpdateEmployeeComponent, canActivate: [authGuard] },

  { path: 'account/login', component: LoginComponent, canActivate: [unauthGuard] },
  { path: 'account/register', component: RegisterComponent, canActivate: [unauthGuard] },

  { path: '**', redirectTo: 'employee', pathMatch: 'full' },
];
