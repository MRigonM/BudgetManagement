import {Component, inject} from '@angular/core';
import {MatBadge} from '@angular/material/badge';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AccountService} from '../../core/services/account.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  accountService = inject(AccountService);
  private router = inject(Router);

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/account/login');
      }
    });
  }


}
