import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../services/account.service';
import {of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.currentUser()) {
    return of(true);
  } else {
    router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
    return of(false);
  }
};
