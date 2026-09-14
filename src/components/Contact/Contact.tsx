"use client";

import { ContactHero } from "./ContactHero/ContactHero";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactFaq } from "./ContactFaq/ContactFaq";

export function Contact() {
  return (
    <main className="contact-page">
      <ContactHero />
      <ContactForm />
      <ContactFaq />
    </main>
  );
}
