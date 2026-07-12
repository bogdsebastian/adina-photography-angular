import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Language } from '../services/language';

@Component({
  selector: 'adp-hero',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly lang = inject(Language);
}
