import {Component, Inject, inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../core/services/employee.service';
import {Employee} from '../../shared/models/Employee';
import {EmployeeShowComponent} from './employee-show/employee-show.component';
import {MatDialog} from '@angular/material/dialog';
import {FiltersDialogComponent} from './filters-dialog/filters-dialog.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu} from '@angular/material/menu';
import {MatListOption, MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-employee',
  imports: [
    EmployeeShowComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent{
  private employeeService = inject(EmployeeService);
  private dialogService = inject(MatDialog)
  employees: Employee[] = [];
  selectedDepartments: string[] = [];
  selectedSort: string = 'name';
  sortOptions = [
    {name: 'Alphabetical',value: 'name'},
    {name: 'Price: Low-High',value: 'priceAsc'},
    {name: 'Price: High-Low',value: 'priceDesc'},
  ]

  ngOnInit(): void {
    this.initialiseEmployee();
  }

  initialiseEmployee() {
    this.employeeService.getDepartmentsFromEmployees();
    this.employeeService.getEmployees().subscribe({
      next: response => this.employees = response,
      error: error =>console.log(error)
    })
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedDepartments: this.selectedDepartments
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if(result) {
          this.selectedDepartments = result.selectedDepartments;
          this.employeeService.getEmployees(this.selectedDepartments).subscribe({
            next: response => this.employees = response,
            error: error =>console.log(error)
          })
        }
      }
    })
  }
}
