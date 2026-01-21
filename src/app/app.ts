import { Component } from '@angular/core';
import { Router, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar';
import { AuthGuard } from './guards/auth-guard';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AiSummaryComponent } from './features/ai/ai-summary/ai-summary';
import { AiDocumentUploadComponent } from './features/ai/ai-document-upload/ai-document-upload';

/** ✅ APP ROUTES (Standalone Routing) */
export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ai-summary',
    component: AiSummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ai-document',
    component: AiDocumentUploadComponent,
    canActivate: [AuthGuard]
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,     // ✅ Needed for *ngIf
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.html'
})
export class AppComponent {

  constructor(private router: Router) {}

  /** ✅ Hide navbar on login & register pages */
  get showNavbar(): boolean {
    return !['/login', '/register'].includes(this.router.url);
  }
}
