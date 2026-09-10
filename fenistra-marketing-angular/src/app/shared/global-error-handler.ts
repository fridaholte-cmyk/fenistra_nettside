import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown): void {
    console.error(error);
    try {
      const router = this.injector.get(Router);
      if (!router.url.startsWith('/500')) {
        router.navigateByUrl('/500');
      }
    } catch {
      /* router unavailable this early, or navigation itself failed */
    }
  }
}
