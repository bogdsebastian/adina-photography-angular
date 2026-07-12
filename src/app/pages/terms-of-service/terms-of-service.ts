import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Language } from '../../services/language';
import { LegalPage } from '../legal/legal-page';
import { TERMS_OF_SERVICE_CONTENT } from './terms-of-service-content';

@Component({
  selector: 'adp-terms-of-service',
  imports: [LegalPage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<adp-legal-page [content]="content()" />`,
})
export class TermsOfService {
  private readonly lang = inject(Language);
  protected readonly content = computed(() => TERMS_OF_SERVICE_CONTENT[this.lang.current()]);
}
