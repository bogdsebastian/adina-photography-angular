import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Config } from './services/config';
import { Title } from '@angular/platform-browser';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'adp-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex min-h-screen flex-col',
  },
})
export class App {
  private readonly configService = inject(Config);
  private readonly titleService = inject(Title);

  protected readonly title = this.configService.appTitle;

  constructor() {
    this.titleService.setTitle(this.title);
  }
}
