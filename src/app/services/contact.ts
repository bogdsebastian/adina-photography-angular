import { Injectable } from '@angular/core';

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Contact form submission service.
 *
 * CURRENT IMPLEMENTATION: Simulated submission (mirrors the Lovable React app,
 * which faked the request with a 1s delay and never sent data anywhere).
 *
 * FUTURE MIGRATION (Firebase):
 * Replace the body of send() with a call to a Firebase HTTPS callable function.
 * Recommended setup for privacy/GDPR (business is Brussels-based):
 * - Cloud Function in europe-west1 that validates and forwards the message by
 *   email (e.g. the "Trigger Email" extension) and stores nothing
 * - Firebase App Check so only the deployed site can call the function
 * - Rate limiting inside the function to prevent spam floods
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  async send(request: ContactRequest): Promise<void> {
    void request;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
