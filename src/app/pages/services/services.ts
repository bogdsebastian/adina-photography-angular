import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language';

@Component({
  selector: 'adp-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly lang = inject(Language);

  protected readonly services = [
    { icon: 'heart', key: 'services.wedding' },
    { icon: 'camera', key: 'services.portrait' },
    { icon: 'briefcase', key: 'services.corporate' },
    { icon: 'baby', key: 'services.family' },
    { icon: 'users', key: 'services.engagement' },
    { icon: 'image', key: 'services.commercial' },
  ] as const;

  protected readonly processSteps = [
    { number: 1, key: 'services.process.step1' },
    { number: 2, key: 'services.process.step2' },
    { number: 3, key: 'services.process.step3' },
    { number: 4, key: 'services.process.step4' },
  ] as const;
}
