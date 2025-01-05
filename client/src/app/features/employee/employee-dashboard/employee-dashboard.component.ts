import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EmployeeService} from '../../../core/services/employee.service';
import {Employee} from '../../../shared/models/employee';
import {EmployeeParams} from '../../../shared/models/employeeParams';
import {FiltersDialogComponent} from '../filters-dialog/filters-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-employee-dashboard',
  imports: [
    RouterLink,
    CurrencyPipe,
    FormsModule,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent implements OnInit {
  employees: Employee[] = [];
  returnUrl: string;
  employeeParams = new EmployeeParams();
  private dialogService = inject(MatDialog)

  constructor(private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/employees';
  }

  ngOnInit() {
    this.getEmployees();
    this.employeeService.getDepartmentsFromEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees(this.employeeParams).subscribe({
      next: response => this.employees = response,
      error: error => console.log(error)
    })
  }

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.router.navigate([this.router.url]).then(() => {
          window.location.reload();
        });
      },
      error: (error) => console.error(error)
    });
  }

  onSearchChange() {
    this.getEmployees();
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedDepartments: this.employeeParams.departments
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.employeeParams.departments = result.selectedDepartments;
          this.employeeService.getEmployees(this.employeeParams).subscribe({
            next: response => this.employees = response,
            error: error => console.log(error)
          })
        }
      }
    })
  }
}
