import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import {Router, RouterLink} from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatCard,
    MatError,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private snack = inject(SnackbarService);
  validationErrors?: string[];
  showFillAllFieldsError = false;
  passwordMinLength = 8;
  nameMinLength = 3;
  passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+$/;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
    lastName: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.pattern(this.passwordPattern)
      ]
    ],
  });

  onSubmit() {
  this.showFillAllFieldsError = false;
  if (this.registerForm.valid) {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snack.success('Registration successful - you can now login');
        this.router.navigateByUrl('/account/login');
      },
      error: (errorResponse) => {
        const errorMessages = errorResponse?.error?.errors || [];

        if (errorMessages.includes("Email is already in use")) {
          this.validationErrors = ["The email address is already in use. Please use a different email."];
        } else {
          this.validationErrors = errorMessages;
        }
      },
    });
  } else {
    this.showFillAllFieldsError = true;
    this.registerForm.markAllAsTouched();
  }
}

}
