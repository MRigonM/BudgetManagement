import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {EmployeeService} from '../../../../core/services/employee.service';
import {DepartmentService} from '../../../../core/services/department.service';
import {TextInputComponent} from '../../../../shared/components/text-input/text-input.component';
import {Department} from '../../../../shared/models/department';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  imports: [
    TextInputComponent,
    ReactiveFormsModule
  ],
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  departments: Department[] = [];
  returnUrl: string;

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    salary: new FormControl('', [Validators.required, Validators.min(0)]),
    pictureUrl: new FormControl('', Validators.required),
    departmentName: new FormControl('', Validators.required)
  });

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/employee';
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response;
      },
      error: (err) => console.error('Failed to fetch departments:', err)
    });
  }

  onSubmit(): void {
  if (this.employeeForm.invalid) return;

  const formValue = this.employeeForm.value;

  const payload = {
    name: formValue.name,
    surname: formValue.surname,
    role: formValue.role,
    email: formValue.email,
    salary:formValue.salary,
    pictureUrl: formValue.pictureUrl,
    departmentId: formValue.departmentName,
    departmentName: this.departments.find(d => d.id === parseInt(<string>formValue.departmentName))?.name
  };

  this.employeeService.addEmployee(payload).subscribe({
    next: () => {
      this.router.navigateByUrl(this.returnUrl);
    },
    error: (err) => {
      console.error('Failed to create employee:', err);
    }
  });
}
}
