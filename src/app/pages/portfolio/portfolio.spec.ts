import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Portfolio } from './portfolio';

describe('Portfolio', () => {
  let fixture: ComponentFixture<Portfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portfolio],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Portfolio);
    await fixture.whenStable();
  });

  function articles(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('article');
  }

  function filterButtons(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('[role="tab"]'));
  }

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows all items by default', () => {
    expect(articles().length).toBe(4);
    expect(filterButtons()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('filters items by category', async () => {
    const weddingsButton = filterButtons()[1];
    weddingsButton.click();
    await fixture.whenStable();

    expect(articles().length).toBe(1);
    expect(weddingsButton.getAttribute('aria-selected')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('Romantic Wedding');
  });
});
