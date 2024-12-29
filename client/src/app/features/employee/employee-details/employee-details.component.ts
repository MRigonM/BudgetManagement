import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../core/services/employee.service';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../../../shared/models/Employee';
import {CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-employee-details',
  imports: [
     CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private activatedRoute = inject(ActivatedRoute);
  employee?: Employee

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;
    this.employeeService.getEmployee(+id).subscribe({
      next : employee => this.employee = employee,
      error : error => console.log(error)
    })
  }
}
