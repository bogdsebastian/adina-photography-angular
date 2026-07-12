import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Hero } from '../hero/hero';
import { Language } from '../services/language';

@Component({
  selector: 'adp-home',
  imports: [Hero, NgOptimizedImage, RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly lang = inject(Language);
}
