import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Department} from '../../../shared/models/department';
import {DepartmentService} from '../../../core/services/department.service';

@Component({
  selector: 'app-update-department',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-department.component.html',
  styleUrl: './update-department.component.scss'
})
export class UpdateDepartmentComponent implements OnInit {
  updateDepartmentForm!: FormGroup;
  id!: number;
  department!: Department;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadDepartment();

    this.updateDepartmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      city : ['', Validators.required]
    });
  }

  loadDepartment() {
    this.departmentService.getDepartment(this.id.toString()).subscribe({
      next: (department) => {
        this.department = department;
        this.updateDepartmentForm.patchValue({
          name: department.name,
          city: department.city,
        });
      },
      error: (err) => console.error('Error loading:', err),
    });
  }

  onSubmit() {
    if (this.updateDepartmentForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const updatedDepartment = {
      id: this.id,
      ...this.updateDepartmentForm.value,
    };

    console.log('Updating:', updatedDepartment);

    this.departmentService.updateDepartment(updatedDepartment).subscribe({
      next: () => {
        this.router.navigateByUrl('/department');
      },
      error: (err) => console.error('Failed to update:', err),
    });
  }
}
