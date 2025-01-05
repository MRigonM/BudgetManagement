import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../../core/services/account.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AccountParams} from '../../../shared/models/accountParams';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    RouterLink,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AccountParams]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  accountParams = inject(AccountParams);

  constructor() {
    const url = this.activatedRoute.snapshot.queryParams['returnUrl'];
    this.accountParams.returnUrl = url ? url : '/employee';
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(this.accountParams.passwordMinLength),
    ]]
  });

  onSubmit() {
    this.accountParams.loginError = false;

    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: () => {
          this.accountService.getUserInfo().subscribe(() => {
            this.router.navigateByUrl(this.accountParams.returnUrl);
          });
        },
        error: () => {
          this.accountParams.loginError = true;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
