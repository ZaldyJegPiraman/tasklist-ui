import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ REQUIRED for *ngIf
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,     // ✅ FIXES *ngIf WARNING
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.html'
})
export class AppComponent {

  constructor(private router: Router) {}

  /** ✅ Hide navbar on login page */
 get showNavbar(): boolean {
    return !['/login', '/register'].includes(this.router.url);
  }
}
