import {Component, Input} from '@angular/core';
import {Employee} from '../../../shared/models/Employee';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-employee-show',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon,
    CurrencyPipe
  ],
  templateUrl: './employee-show.component.html',
  styleUrl: './employee-show.component.scss'
})
export class EmployeeShowComponent {
  @Input() employee?: Employee;
}