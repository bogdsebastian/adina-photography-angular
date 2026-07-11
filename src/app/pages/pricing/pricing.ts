import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'adp-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  protected readonly lang = inject(Language);

  protected readonly packages = [
    { key: 'pricing.packages.essential', highlighted: false },
    { key: 'pricing.packages.professional', highlighted: true },
    { key: 'pricing.packages.premium', highlighted: false },
  ] as const;

  /* Prices are not in the translation files (currency-neutral); they mirror Pricing.tsx. */
  protected readonly addOns = [
    { key: 'pricing.addons.items.additionalHour', price: '€150' },
    { key: 'pricing.addons.items.extraAlbum', price: '€399' },
    { key: 'pricing.addons.items.canvasPrint', price: '€249' },
    { key: 'pricing.addons.items.drone', price: '€349' },
    { key: 'pricing.addons.items.video', price: '€799' },
    { key: 'pricing.addons.items.rush', price: '€299' },
  ] as const;

  protected readonly faqItems = [
    'pricing.faq.q1',
    'pricing.faq.q2',
    'pricing.faq.q3',
    'pricing.faq.q4',
  ] as const;
}
