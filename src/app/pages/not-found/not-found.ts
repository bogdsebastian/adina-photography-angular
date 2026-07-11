import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'adp-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex min-h-[60vh] items-center justify-center bg-muted">
      <div class="text-center">
        <h1 class="mb-4 text-4xl font-bold">404</h1>
        <p class="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a routerLink="/" class="text-primary underline hover:text-primary/90">Return to Home</a>
      </div>
    </section>
  `,
})
export class NotFound {
  constructor() {
    const router = inject(Router);
    console.error('404 Error: User attempted to access non-existent route:', router.url);
  }
}
