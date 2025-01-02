import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../shared/models/department';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getDepartments() {
    return this.http.get<Department[]>(this.baseUrl + 'department')
  }
  addDepartment(values : any ) {
    return this.http.post<Department>(this.baseUrl + 'department', values);
  }
  updateDepartment(department : any) {
    return this.http.put<Department>(`${this.baseUrl}department/${department.id}`, department);
  }
  getDepartment(id : string): Observable<Department> {
    return  this.http.get<Department>(this.baseUrl + 'department/' + id);
  }
  deleteDepartment(id : any) {
    return this.http.delete<void>(this.baseUrl + 'department/' + id);
  }
}
