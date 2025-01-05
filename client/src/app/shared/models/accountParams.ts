import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountParams {
  returnUrl: string = '';
  loginError = false;
  passwordMinLength = 8;
  validationErrors?: string[];
  showFillAllFieldsError = false;
  nameMinLength = 3;
  passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+$/;
}
