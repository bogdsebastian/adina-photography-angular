import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../app/services/language';

@Component({
  selector: 'adp-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly lang = inject(Language);
  protected readonly currentYear = new Date().getFullYear();
}
