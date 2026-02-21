import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './services/config.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'adp-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly configService = inject(ConfigService);
  private readonly titleService = inject(Title);

  protected readonly title = this.configService.appTitle;

  constructor() {
    this.titleService.setTitle(this.title);
  }
}
