import {Component, inject, OnInit} from '@angular/core';
import {DepartmentService} from '../../core/services/department.service';
import {Department} from '../../shared/models/Department';
import {EmployeeService} from '../../core/services/employee.service';
import {Employee} from '../../shared/models/Employee';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-employee',
  imports: [
    MatCard
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  title = 'Employee';
  private employeeService = inject(EmployeeService);
  employees: Employee[] = [];

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: response => this.employees = response,
      error: error => console.log(error)
    })
  }
}
