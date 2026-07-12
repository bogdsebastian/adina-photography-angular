import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

/** Shared layout for the Privacy Policy and Terms of Service pages. */
@Component({
  selector: 'adp-legal-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-b from-primary to-primary/90 py-20 text-primary-foreground">
      <div class="container mx-auto px-4 text-center">
        <h1 class="mb-6 font-display text-5xl font-bold md:text-6xl">{{ content().title }}</h1>
        <p class="text-lg opacity-90">{{ content().lastUpdated }}</p>
      </div>
    </section>

    <section class="py-20">
      <div class="container mx-auto max-w-4xl px-4">
        <p class="mb-12 text-lg text-muted-foreground">{{ content().intro }}</p>
        @for (section of content().sections; track section.title) {
          <div class="mb-10">
            <h2 class="mb-4 font-display text-2xl font-semibold">{{ section.title }}</h2>
            <p class="whitespace-pre-line text-muted-foreground">{{ section.content }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class LegalPage {
  readonly content = input.required<LegalContent>();
}
