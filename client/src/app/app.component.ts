import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from './layout/header/header.component';
import {DepartmentComponent} from './features/department/department.component';
import {EmployeeComponent} from './features/employee/employee.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, DepartmentComponent, EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BudgetManagement';
}
