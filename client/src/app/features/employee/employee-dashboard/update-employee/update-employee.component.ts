import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Department} from '../../../../shared/models/department';
import {EmployeeService} from '../../../../core/services/employee.service';
import {DepartmentService} from '../../../../core/services/department.service';

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

  initializeForm() {
    this.updateEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      pictureUrl: ['', Validators.required],
      departmentName: ['', Validators.required],
    });
  }

  loadEmployee() {
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (employee) => {
        this.updateEmployeeForm.patchValue({
          name: employee.name,
          surname : employee.surname,
          role : employee.role,
          email : employee.email,
          salary : employee.salary,
          pictureUrl : employee.pictureUrl,
          departmentId : employee.departmentName
        });
      },
      error: (err) => console.error('Failed to load:', err),
    });
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: department => this.department = department
    })
  }

  onSubmit() {
    if (this.updateEmployeeForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const updatedEmployee = {
      id: this.employeeId,
      ...this.updateEmployeeForm.value,
    };

    console.log('Submitting updated:', updatedEmployee);

    this.employeeService.updateEmployee(updatedEmployee).subscribe({
      next: () => {
        this.router.navigateByUrl('/employee');
      },
      error: (err) => {
        console.error('Failed to update:', err);
      },
    });
  }
}
