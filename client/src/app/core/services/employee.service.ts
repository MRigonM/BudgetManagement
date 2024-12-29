import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Department} from '../../shared/models/Department';
import {Employee} from '../../shared/models/Employee';
import {EmployeeParams} from '../../shared/models/EmployeeParams';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  departments: string[] = [];

  getEmployees(employeeParams: EmployeeParams) {
    let params = new HttpParams();

    if (employeeParams.departments.length > 0) {
      employeeParams.departments.forEach(department => {
        params = params.append('department', department);
      });
    }

    if (employeeParams.search.length > 0) {
      params = params.append('search', employeeParams.search);
    }

    return this.http.get<Employee[]>(this.baseUrl + 'employee', {params});
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(this.baseUrl + 'employee/' + id);
  }

  getDepartmentsFromEmployees() {
    if (this.departments.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'employee/departments').subscribe({
      next: response => this.departments = response
    })
  }
}
