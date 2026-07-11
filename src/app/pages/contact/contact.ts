import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact';
import { Language } from '../../services/language';

/** Mirrors the zod schema's `.trim().min(1)` — whitespace-only input is invalid. */
function requiredTrimmed(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim().length > 0
    ? null
    : { required: true };
}

type ContactField = 'name' | 'email' | 'phone' | 'subject' | 'message' | 'consent';

@Component({
  selector: 'adp-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly lang = inject(Language);

  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly status = signal<'idle' | 'success' | 'error'>('idle');

  protected readonly form = this.fb.group({
    name: ['', [requiredTrimmed, Validators.maxLength(100)]],
    email: ['', [requiredTrimmed, Validators.email, Validators.maxLength(255)]],
    phone: ['', [Validators.maxLength(20)]],
    subject: ['', [requiredTrimmed, Validators.maxLength(200)]],
    message: ['', [requiredTrimmed, Validators.maxLength(2000)]],
    consent: [false, Validators.requiredTrue],
  });

  private readonly errorKeys: Record<
    ContactField,
    { required?: string; email?: string; maxlength?: string }
  > = {
    name: {
      required: 'contact.validation.nameRequired',
      maxlength: 'contact.validation.nameMax',
    },
    email: {
      required: 'contact.validation.emailRequired',
      email: 'contact.validation.emailInvalid',
      maxlength: 'contact.validation.emailMax',
    },
    phone: { maxlength: 'contact.validation.phoneMax' },
    subject: {
      required: 'contact.validation.subjectRequired',
      maxlength: 'contact.validation.subjectMax',
    },
    message: {
      required: 'contact.validation.messageRequired',
      maxlength: 'contact.validation.messageMax',
    },
    consent: { required: 'contact.validation.consentRequired' },
  };

  /** Validation errors are shown only after a submit attempt, like the React form. */
  protected errorFor(field: ContactField): string | null {
    if (!this.submitted()) {
      return null;
    }
    const control = this.form.controls[field];
    if (control.valid) {
      return null;
    }
    const keys = this.errorKeys[field];
    if (control.hasError('required') && keys.required) {
      return this.lang.t(keys.required);
    }
    if (control.hasError('email') && keys.email) {
      return this.lang.t(keys.email);
    }
    if (control.hasError('maxlength') && keys.maxlength) {
      return this.lang.t(keys.maxlength);
    }
    return null;
  }

  protected async onSubmit(): Promise<void> {
    this.status.set('idle');
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      setTimeout(() => {
        this.elementRef.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    this.submitting.set(true);
    try {
      const { consent: _consent, ...request } = this.form.getRawValue();
      await this.contactService.send(request);
      this.status.set('success');
      this.submitted.set(false);
      this.form.reset();
    } catch {
      this.status.set('error');
    } finally {
      this.submitting.set(false);
    }
  }
}
