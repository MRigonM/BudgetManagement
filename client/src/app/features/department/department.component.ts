import {Component, inject, OnInit} from '@angular/core';
import {DepartmentService} from '../../core/services/department.service';
import {Department} from '../../shared/models/Department';
import {MatCard} from '@angular/material/card';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-department',
  imports: [
    RouterLink
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  returnUrl : string;

  constructor(private departmentService : DepartmentService,
              private router : Router,
              private  activatedRoute : ActivatedRoute) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/department';
  }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe({
      next: response => this.departments = response,
      error: error => console.log(error)
    })
  }

  deleteDepartment(id: any) {
  this.departmentService.deleteDepartment(id).subscribe({
    next: (response) => {
      this.router.navigate([this.router.url]).then(() => {
        window.location.reload();
      });
    },
    error: (error) => console.error(error)
  });
}

}
