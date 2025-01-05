import {Component, inject} from '@angular/core';
import {EmployeeService} from '../../../core/services/employee.service';
import {MatDivider} from '@angular/material/divider';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filters-dialog',
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  employeeService = inject(EmployeeService);
  depo = this.employeeService.departments;
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedDepartments: string[] = this.data.selectedDepartments;

  applyFilters() {
    this.dialogRef.close({
      selectedDepartments: this.selectedDepartments
    });
  }
}
