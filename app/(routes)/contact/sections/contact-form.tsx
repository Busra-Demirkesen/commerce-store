"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const errors = useMemo(() => {
    const e: { [k: string]: string | undefined } = {};
    if (!fullName.trim()) e.fullName = "Please enter your full name.";
    if (!email.trim()) e.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address.";
    if (!subject.trim()) e.subject = "Please add a subject.";
    if (!message.trim()) e.message = "Please write a short message.";
    if (!consent) e.consent = "You must agree before sending.";
    return e;
  }, [fullName, email, subject, message, consent]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, subject: true, topic: true, message: true, consent: true });
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        <h3 className="text-base font-semibold">Thank you! Your message has been sent successfully.</h3>
        <p className="mt-1 text-sm">Our support team will contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Contact Form</h2>
      <p className="mt-1 text-sm text-gray-600">Tell us how we can help you. We’ll get back to you within 1 business day.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="flex items-baseline gap-1 text-sm font-medium text-gray-800">
            Full Name <span className="text-gray-400">(required)</span>
          </label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
            placeholder="John Doe"
            aria-invalid={touched.fullName && !!errors.fullName}
            aria-describedby="fullName-error"
            className={"mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"}
          />
          {touched.fullName && errors.fullName && (
            <p id="fullName-error" className="mt-1 text-xs text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="flex items-baseline gap-1 text-sm font-medium text-gray-800">
            Email Address <span className="text-gray-400">(required)</span>
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="you@example.com"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby="email-error"
            className={"mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"}
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="flex items-baseline gap-1 text-sm font-medium text-gray-800">
            Subject <span className="text-gray-400">(required)</span>
          </label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
            placeholder="How can we help?"
            aria-invalid={touched.subject && !!errors.subject}
            aria-describedby="subject-error"
            className={"mt-1 h-11 border-gray-300 focus-visible:ring-gray-300 focus-visible:ring-offset-0"}
          />
          {touched.subject && errors.subject && (
            <p id="subject-error" className="mt-1 text-xs text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="topic" className="text-sm font-medium text-gray-800">Topic (optional)</label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, topic: true }))}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="">Select a topic...</option>
            <option value="order">Order</option>
            <option value="product">Product</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="flex items-baseline gap-1 text-sm font-medium text-gray-800">
            Message <span className="text-gray-400">(required)</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            rows={5}
            placeholder="What would you like to discuss?"
            aria-invalid={touched.message && !!errors.message}
            aria-describedby="message-error"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {touched.message && errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Please include relevant details like order number or product name if applicable.</p>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-gray-200 p-4">
        <label className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            onBlur={() => setTouched((t) => ({ ...t, consent: true }))}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <span className="text-sm text-gray-700">
            I agree to the processing of my data for the purpose of this request.
          </span>
        </label>
        {touched.consent && errors.consent && (
          <p className="mt-2 text-xs text-red-600">{errors.consent}</p>
        )}
      </div>

      <div className="mt-6">
        <Button type="submit" disabled={loading} className="px-6">
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

