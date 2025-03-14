import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient,withInterceptorsFromDi  } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),   // ✅ Add this to enable HTTP requests
    provideRouter(routes),
  ],
}).catch(err => console.error(err));
