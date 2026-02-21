import { Injectable } from '@angular/core';
import appConfig from '../../assets-config/global-config.json';
import type { AppConfig } from '../models/app-config';

/**
 * Configuration service for app-wide settings.
 *
 * CURRENT IMPLEMENTATION: Static JSON import (build-time bundling)
 * - Config is bundled into the JavaScript during build
 * - Any config changes require full app rebuild and redeployment
 * - Best for: Development and initial deployment
 *
 * FUTURE MIGRATION (for Firebase Hosting):
 * When you need to update config without redeploying the entire app:
 *
 * 1. Configure angular.json to copy assets-config/*.json to /config/ in dist
 * 2. Add provideHttpClient(withFetch()) to app.config.ts
 * 3. Replace direct import with HttpClient:
 *    - Use toSignal(http.get<AppConfig>('/config/global-config.json'))
 *    - Convert getters to computed signals
 * 4. Deploy to Firebase Hosting with cache headers in firebase.json
 * 5. Update config independently: firebase deploy --only hosting:config
 *
 * This allows config updates via Firebase CLI without rebuilding the Angular app.
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly config: AppConfig = appConfig;

  get navbarTitle(): string {
    return this.config.app.navbarTitle;
  }

  get appTitle(): string {
    return this.config.app.appTitle;
  }

  getConfig(): AppConfig {
    return this.config;
  }
}