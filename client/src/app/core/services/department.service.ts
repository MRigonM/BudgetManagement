import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../shared/models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getDepartments() {
    return this.http.get<Department[]>(this.baseUrl + 'department')
  }
}
