import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AiSummaryComponent } from './features/ai/ai-summary/ai-summary';
import { AiDocumentUploadComponent } from './features/ai/ai-document-upload/ai-document-upload';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  // 🔓 Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Protected dashboard routes
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ai/summary',
    component: AiSummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ai/document',
    component: AiDocumentUploadComponent,
    canActivate: [AuthGuard]
  },
{
  path: 'ai/analyze',
  component: AiDocumentUploadComponent,
  canActivate: [AuthGuard]
},
  // 🔁 Default behavior
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks' }
];
