import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Language } from '../../services/language';
import { LegalPage } from '../legal/legal-page';
import { PRIVACY_POLICY_CONTENT } from './privacy-policy-content';

@Component({
  selector: 'adp-privacy-policy',
  imports: [LegalPage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<adp-legal-page [content]="content()" />`,
})
export class PrivacyPolicy {
  private readonly lang = inject(Language);
  protected readonly content = computed(() => PRIVACY_POLICY_CONTENT[this.lang.current()]);
}
