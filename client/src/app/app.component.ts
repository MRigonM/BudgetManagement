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
    if (!this.accountService.currentUser()) {
      this.router.navigate(['/account/login']);
    }
  }
}
  
