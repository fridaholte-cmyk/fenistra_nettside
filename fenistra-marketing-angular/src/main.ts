import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { captureInitialErrorCode } from './app/pages/error/error.component';

captureInitialErrorCode(document);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
