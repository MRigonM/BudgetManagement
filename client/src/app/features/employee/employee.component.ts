import {Component, inject} from '@angular/core';
import {EmployeeService} from '../../core/services/employee.service';
import {Employee} from '../../shared/models/Employee';
import {EmployeeShowComponent} from './employee-show/employee-show.component';
import {MatDialog} from '@angular/material/dialog';
import {FiltersDialogComponent} from './filters-dialog/filters-dialog.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {EmployeeParams} from '../../shared/models/EmployeeParams';

@Component({
  selector: 'app-employee',
  imports: [
    EmployeeShowComponent,
    MatButton,
    MatIcon,
    FormsModule,
    MatIconButton
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent{
  private employeeService = inject(EmployeeService);
  private dialogService = inject(MatDialog)
  employees: Employee[] = [];
  employeeParams = new EmployeeParams();

  ngOnInit(): void {
    this.initialiseEmployee();
  }

  onSearchChange() {
    this.getEmployees();
  }

  initialiseEmployee() {
    this.employeeService.getDepartmentsFromEmployees();
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees(this.employeeParams).subscribe({
      next: response => this.employees = response,
      error: error =>console.log(error)
    })
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
        if(result) {
          this.employeeParams.departments = result.selectedDepartments;
          this.employeeService.getEmployees(this.employeeParams).subscribe({
            next: response => this.employees = response,
            error: error =>console.log(error)
          })
        }
      }
    })
  }
}
