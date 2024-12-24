import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {HttpClient} from '@angular/common/http';
import {Department} from './shared/models/Department';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  title = 'BudgetManagement';
  departments: any[] = [];

  ngOnInit(): void {
    this.http.get<Department[]>(this.baseUrl + 'department').subscribe({
      next: response => this.departments = response,
      error: error => console.log(error),
      complete : () => console.log('complete')
    })
  }
}
