import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Department} from '../../../../shared/models/department';
import {EmployeeService} from '../../../../core/services/employee.service';
import {DepartmentService} from '../../../../core/services/department.service';
import {Employee} from '../../../../shared/models/employee';

@Component({
  selector: 'app-update-employee',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})
export class UpdateEmployeeComponent implements OnInit {
  updateEmployeeForm!: FormGroup;
  department: Department[] = [];
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadEmployee();
    this.getDepartments()
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: department => this.department = department
    })
  }

  loadEmployee() {
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (employee: Employee) => {
        this.updateEmployeeForm.patchValue({
          name: employee.name,
          surname: employee.surname,
          role: employee.role,
          email: employee.email,
          salary: employee.salary,
          pictureUrl: employee.pictureUrl,
          departmentId: employee.departmentId
        });
      },
      error: (err) => console.error('Failed to load:', err)
    });
  }

  initializeForm() {
    this.updateEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      pictureUrl: ['', Validators.required],
      departmentId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.updateEmployeeForm.invalid) {
      return;
    }

    const updatedEmployee: Employee = {
      id: Number(this.employeeId),
      name: this.updateEmployeeForm.get('name')?.value,
      surname: this.updateEmployeeForm.get('surname')?.value,
      role: this.updateEmployeeForm.get('role')?.value,
      email: this.updateEmployeeForm.get('email')?.value,
      salary: Number(this.updateEmployeeForm.get('salary')?.value),
      pictureUrl: this.updateEmployeeForm.get('pictureUrl')?.value,
      departmentId: Number(this.updateEmployeeForm.get('departmentId')?.value),
      departmentName: this.department.find(d => d.id === Number(this.updateEmployeeForm.get('departmentId')?.value))?.name || ''
    };

    console.log('Sending to server:', updatedEmployee);

    this.employeeService.updateEmployee(updatedEmployee).subscribe({
      next: () => {
        this.router.navigateByUrl('/employee');
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }
}
