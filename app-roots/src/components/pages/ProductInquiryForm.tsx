"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Product } from "@/data/products";

const inquiryTypes = [
  "Pricing Information",
  "Purchase Inquiry",
  "Partnership Opportunity",
  "Request Demo",
  "Custom Request",
];

export function ProductInquiryForm({ productName }: { productName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 850);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 p-8 text-center">
        <p className="font-inter text-base text-text-heading">
          Thank you! We&apos;ve received your inquiry about {productName} and
          will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div data-form-field>
          <label
            htmlFor="inquiry-name"
            className="mb-2 block font-inter text-sm font-medium text-text-heading"
          >
            Name *
          </label>
          <input
            id="inquiry-name"
            name="name"
            required
            className="h-12 w-full rounded-xl border border-white/[0.08] bg-bg px-4 font-inter text-sm text-text-heading outline-none transition-colors focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20"
          />
        </div>
        <div data-form-field>
          <label
            htmlFor="inquiry-email"
            className="mb-2 block font-inter text-sm font-medium text-text-heading"
          >
            Email *
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            required
            className="h-12 w-full rounded-xl border border-white/[0.08] bg-bg px-4 font-inter text-sm text-text-heading outline-none transition-colors focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20"
          />
        </div>
      </div>

      <div data-form-field>
        <label
          htmlFor="inquiry-phone"
          className="mb-2 block font-inter text-sm font-medium text-text-heading"
        >
          Phone
        </label>
        <input
          id="inquiry-phone"
          name="phone"
          type="tel"
          className="h-12 w-full rounded-xl border border-white/[0.08] bg-bg px-4 font-inter text-sm text-text-heading outline-none transition-colors focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20"
        />
      </div>

      <div data-form-field>
        <label
          htmlFor="inquiry-type"
          className="mb-2 block font-inter text-sm font-medium text-text-heading"
        >
          Inquiry Type *
        </label>
        <select
          id="inquiry-type"
          name="inquiryType"
          required
          defaultValue=""
          className="h-12 w-full rounded-xl border border-white/[0.08] bg-bg px-4 font-inter text-sm text-text-heading outline-none transition-colors focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20"
        >
          <option value="" disabled>
            Select an option
          </option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div data-form-field>
        <label
          htmlFor="inquiry-message"
          className="mb-2 block font-inter text-sm font-medium text-text-heading"
        >
          Message
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-bg px-4 py-3 font-inter text-sm text-text-heading outline-none transition-colors focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20"
        />
      </div>

      <div data-form-field>
        <MagneticButton type="submit">
          <span className="inline-flex items-center gap-2">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : submitted ? (
              <>
                <Check className="h-4 w-4" />
                Sent
              </>
            ) : (
              "Submit Inquiry"
            )}
          </span>
        </MagneticButton>
      </div>
    </form>
  );
}

export function ProductScreenshots({ product }: { product: Product }) {
  if (!product.hasScreenshots) return null;

  return (
    <section className="border-b border-white/[0.07] py-12 lg:py-16">
      <h2 className="text-heading-section mb-6">Mobile App Screenshots</h2>
      <div className="card-grid sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-[9/16] overflow-hidden rounded-2xl border border-white/[0.08]"
            style={{
              background: `linear-gradient(160deg, ${product.color} 0%, #0A0A0F 100%)`,
            }}
          >
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <span className="font-satoshi text-2xl font-black uppercase text-white/20">
                {product.name.split(" ")[0]}
              </span>
              <span className="mt-2 font-inter text-xs text-white/30">
                Screen {i}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
