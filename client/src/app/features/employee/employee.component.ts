import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../core/services/employee.service';
import {Employee} from '../../shared/models/Employee';
import {MatCard} from '@angular/material/card';
import {EmployeeShowComponent} from './employee-show/employee-show.component';

@Component({
  selector: 'app-employee',
  imports: [
    MatCard,
    EmployeeShowComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  employees: Employee[] = [];

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: response => this.employees = response,
      error: error => console.log(error)
    })
  }
}
