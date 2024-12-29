import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Department} from '../../shared/models/Department';
import {Employee} from '../../shared/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  departments: string[] = [];

  getEmployees(departments?: string[]) {
  let params = new HttpParams();

  if (departments && departments.length > 0) {
    departments.forEach(department => {
      params = params.append('department', department); // Append each department separately
    });
  }
  return this.http.get<Employee[]>(this.baseUrl + 'employee', { params });
}


  getDepartmentsFromEmployees() {
    if(this.departments.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'employee/departments').subscribe({
      next : response => this.departments = response
    })
  }
}
