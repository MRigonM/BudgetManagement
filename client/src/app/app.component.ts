import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from './layout/header/header.component';
import {Router, RouterOutlet} from '@angular/router';
import {AccountService} from './core/services/account.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.accountService.getAuthState().subscribe({
      next: (authState) => {
        if (authState.isAuthenticated) {
          this.accountService.getUserInfo().subscribe({
            next: (user) => {
              console.log('User authenticated:', user);
            },
            error: () => {
              console.log('Failed to get user info');
              this.router.navigate(['/account/login']);
            }
          });
        } else {
          console.log('Not authenticated');
          this.router.navigate(['/account/login']);
        }
      },
      error: () => {
        console.log('Auth state check failed');
        this.router.navigate(['/account/login']);
      }
    });
  }
}
