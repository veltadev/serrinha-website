"use client";

import { useState } from "react";

interface ProductOrderFormProps {
  productTitle: string;
}

export function ProductOrderForm({ productTitle }: ProductOrderFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ---------------------------------------------------------------------------
    // Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your .env.local file.
    // 1. Sign up at https://formspree.io
    // 2. Create a new form — Formspree gives you a URL like:
    //    https://formspree.io/f/xyzabcde
    // 3. Add this line to .env.local (and to Vercel → Settings → Environment Variables):
    //    NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xyzabcde
    // ---------------------------------------------------------------------------
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      console.error(
        "NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set. See the comment in ProductOrderForm.tsx.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const form = e.currentTarget;
      const data = new FormData(form);

      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Hidden field so every submission includes the product name */}
      <input type="hidden" name="product" value={productTitle} />

      <div>
        <label
          htmlFor="order-name"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Name
        </label>
        <input
          id="order-name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-olive/30"
        />
      </div>

      <div>
        <label
          htmlFor="order-email"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Email
        </label>
        <input
          id="order-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-olive/30"
        />
      </div>

      <div>
        <label
          htmlFor="order-quantity"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Quantity
        </label>
        <input
          id="order-quantity"
          name="quantity"
          type="number"
          min="1"
          defaultValue="1"
          required
          className="w-full rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-olive/30"
        />
      </div>

      <div>
        <label
          htmlFor="order-message"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Message{" "}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="order-message"
          name="message"
          rows={3}
          placeholder="Any questions, delivery preferences, etc."
          className="w-full resize-none rounded-lg border border-olive/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-olive/30"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="w-full rounded-lg bg-olive px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending"
          ? "Sending…"
          : status === "sent"
            ? "Order sent!"
            : "Place Order"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-olive">
          Thank you! We&apos;ll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again or{" "}
          <a href="/contact" className="underline">
            contact us directly
          </a>
          .
        </p>
      )}
    </form>
  );
}
