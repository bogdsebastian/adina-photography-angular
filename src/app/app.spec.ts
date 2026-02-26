import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the page title from config', async () => {
    const titleService = TestBed.inject(Title);
    const setTitleSpy = vi.spyOn(titleService, 'setTitle');

    const fixture = TestBed.createComponent(App);
    
    fixture.whenStable();

    expect(setTitleSpy).toHaveBeenCalledExactlyOnceWith('Collide & Capture');
    expect(titleService.getTitle()).toBe('Collide & Capture');
  });
});
