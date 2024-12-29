import {Component, inject, OnInit} from '@angular/core';
import {DepartmentService} from '../../core/services/department.service';
import {Department} from '../../shared/models/Department';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-department',
  imports: [
    MatCard
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit {
  title = 'Department';
  private departmentService = inject(DepartmentService);
  depo: Department[] = [];

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe({
      next: response => this.depo = response,
      error: error => console.log(error)
    })
  }
}
