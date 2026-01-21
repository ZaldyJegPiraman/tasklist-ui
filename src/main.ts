import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { authInterceptor } from './app/interceptors/auth-interceptor';
import { provideMarkdown } from 'ngx-markdown';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideMarkdown()
  ]
}).catch(err => console.error(err));
