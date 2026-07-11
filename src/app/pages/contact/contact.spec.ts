import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Contact } from './contact';
import { ContactService } from '../../services/contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let sendSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    sendSpy = vi.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideRouter([]), { provide: ContactService, useValue: { send: sendSpy } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
  });

  function submitButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button[type="submit"]');
  }

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows validation errors and does not submit when the form is empty', async () => {
    submitButton().click();
    await fixture.whenStable();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('#name-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#email-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#consent-error')).toBeTruthy();
  });

  it('rejects whitespace-only required fields', async () => {
    const form = fixture.componentInstance['form'];
    form.setValue({
      name: '   ',
      email: 'jane@example.com',
      phone: '',
      subject: 'Hello',
      message: 'Hi there',
      consent: true,
    });
    submitButton().click();
    await fixture.whenStable();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('#name-error')).toBeTruthy();
  });

  it('submits valid data through the service and shows the success message', async () => {
    const form = fixture.componentInstance['form'];
    form.setValue({
      name: 'Jane',
      email: 'jane@example.com',
      phone: '',
      subject: 'Wedding inquiry',
      message: 'Hi there',
      consent: true,
    });
    submitButton().click();
    await fixture.whenStable();

    expect(sendSpy).toHaveBeenCalledExactlyOnceWith({
      name: 'Jane',
      email: 'jane@example.com',
      phone: '',
      subject: 'Wedding inquiry',
      message: 'Hi there',
    });
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(form.controls.name.value).toBe('');
    expect(form.controls.consent.value).toBe(false);
  });
});
