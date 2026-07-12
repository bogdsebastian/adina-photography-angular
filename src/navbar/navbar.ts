import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Config } from '../app/services/config';
import { AppLanguage, Language } from '../app/services/language';

@Component({
  selector: 'adp-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenus()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Navbar {
  protected readonly lang = inject(Language);
  protected readonly config = inject(Config);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly langMenuOpen = signal(false);

  protected readonly navItems = [
    { path: '/', labelKey: 'nav.home' },
    { path: '/services', labelKey: 'nav.services' },
    { path: '/portfolio', labelKey: 'nav.portfolio' },
    { path: '/pricing', labelKey: 'nav.pricing' },
    { path: '/contact', labelKey: 'nav.contact' },
  ] as const;

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
    this.langMenuOpen.set(false);
  }

  protected toggleLangMenu(): void {
    this.langMenuOpen.update((open) => !open);
  }

  protected selectLanguage(language: AppLanguage): void {
    this.lang.set(language);
    this.langMenuOpen.set(false);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected closeMenus(): void {
    this.mobileMenuOpen.set(false);
    this.langMenuOpen.set(false);
  }

  protected onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMenus();
    }
  }
}
