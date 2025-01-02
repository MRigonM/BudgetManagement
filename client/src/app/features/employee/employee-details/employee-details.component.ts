import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../core/services/employee.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Employee} from '../../../shared/models/employee';
import {CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-employee-details',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  returnUrl: string;
  employee?: Employee

  constructor(private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/employee';
  }

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

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.router.navigateByUrl(this.returnUrl);
      }
    })
  }
}
