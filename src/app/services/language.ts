import { DOCUMENT, Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { translations, TranslationKey } from '../translations';

export type AppLanguage = 'en' | 'de';

const STORAGE_KEY = 'language';

/**
 * App language state and translation lookup.
 * Ported from the React app's LanguageContext: the selected language is
 * persisted to localStorage and mirrored to <html lang>. localStorage is
 * only touched in the browser because the app also renders on the server.
 */
@Injectable({ providedIn: 'root' })
export class Language {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly current = signal<AppLanguage>(this.initialLanguage());

  constructor() {
    effect(() => {
      const language = this.current();
      this.document.documentElement.lang = language;
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, language);
      }
    });
  }

  set(language: AppLanguage): void {
    this.current.set(language);
  }

  /** Resolves a dot-separated key against the active language; falls back to the key itself. */
  t(key: TranslationKey): string {
    const value = this.resolve(key);
    return typeof value === 'string' ? value : key;
  }

  /** Resolves a dot-separated key to a string array (e.g. feature lists); empty when not an array. */
  list(key: TranslationKey): readonly string[] {
    const value = this.resolve(key);
    return Array.isArray(value) ? (value as string[]) : [];
  }

  private resolve(key: TranslationKey): unknown {
    let value: unknown = translations[this.current()];
    for (const part of key.split('.')) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    return value;
  }

  private initialLanguage(): AppLanguage {
    if (this.isBrowser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'de' || saved === 'en') {
        return saved;
      }
    }
    return 'en';
  }
}
