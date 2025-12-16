import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.html',
    styleUrls: ['./navbar.scss']
})
export class NavbarComponent {

  constructor(
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}


  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
