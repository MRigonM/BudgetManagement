import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DepartmentService} from '../../../core/services/department.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TextInputComponent} from '../../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-add-department',
  imports: [
    ReactiveFormsModule,
    TextInputComponent
  ],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss'
})
export class AddDepartmentComponent {
  returnUrl: string;

  departmentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)
  })

  constructor(private departmentService: DepartmentService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/department';
  }

  onSubmit() {
    this.departmentService.addDepartment(this.departmentForm.value).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl)
    });
  }
}
