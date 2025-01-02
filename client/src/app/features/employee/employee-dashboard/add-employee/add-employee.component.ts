import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from '../../../../core/services/employee.service';
import {Department} from '../../../../shared/models/department';
import {DepartmentService} from '../../../../core/services/department.service';
import {TextInputComponent} from '../../../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-add-employee',
  imports: [
    ReactiveFormsModule,
    TextInputComponent
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {

  departments: Department[] = [];
  returnUrl: string;

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
    pictureUrl: new FormControl('', Validators.required),
    departmentName: new FormControl('', Validators.required),
  })

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private departmentService: DepartmentService) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/employees';

    console.log(this.employeeForm.value);
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: department => {
        console.log(department);
        this.departments = department;
      },
      error: err => console.error('Failed to fetch departments:', err)
    });
  }

  onSubmit() {
    const formValue = this.employeeForm.value;

    const payload = {
      name: formValue.name,
      surname: formValue.surname,
      role: formValue.role,
      email: formValue.email,
      salary: formValue.salary,
      pictureUrl: formValue.pictureUrl,
      departmentId: formValue.departmentName,
    };


    this.employeeService.addEmployee(payload).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: err => console.error('Failed to create employee:', err)
    });
  }


}
