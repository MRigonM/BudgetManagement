import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../shared/models/Department';
import {Employee} from '../../shared/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getEmployees() {
    return this.http.get<Employee[]>(this.baseUrl + 'employee');
  }
}
