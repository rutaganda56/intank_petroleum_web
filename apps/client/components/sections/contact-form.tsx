"use client";

import { useState, type FormEvent } from "react";
import { Button, Field, Input, Label, Select, Textarea } from "@headlessui/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { company, enquiryTopics } from "@/lib/site";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white placeholder:text-white/30 transition-colors outline-none data-focus:border-brand data-focus:bg-white/6 data-hover:border-white/20";

function FormField({
  label,
  optional,
  className,
  children,
}: {
  label: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Field className={cn("flex flex-col gap-2", className)}>
      <Label className="text-sm font-medium text-white/80">
        {label}
        {optional && <span className="font-normal text-white/40"> (optional)</span>}
      </Label>
      {children}
    </Field>
  );
}

/**
 * Enquiry form. Until the API endpoint exists, submitting opens the visitor's email app with the
 * enquiry filled in and addressed to the company inbox.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const name = get("name");
    const organisation = get("company");
    const topic = get("topic");

    const subject = `Website enquiry: ${topic} from ${name}${organisation ? ` (${organisation})` : ""}`;
    const body = [
      get("message"),
      "",
      "—",
      `Name: ${name}`,
      organisation && `Company: ${organisation}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
      `Area of interest: ${topic}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-[28rem] flex-col items-start justify-center gap-5 p-8 sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand/15 text-brand-bright">
          <Check className="size-6" />
        </span>
        <h3 className="font-heading text-3xl font-medium">Your email is ready to send.</h3>
        <p className="max-w-md leading-relaxed text-white/60">
          We opened your email app with your enquiry filled in. Press send there and our team will get back
          to you. If nothing opened, write to us at{" "}
          <a href={`mailto:${company.email}`} className="text-brand-bright underline-offset-4 hover:underline">
            {company.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
        >
          Write another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10">
      <div className="sm:col-span-2">
        <h3 className="font-heading text-3xl font-medium">Send us an enquiry</h3>
        <p className="mt-2 text-white/55">Tell us what you need and the right team will get back to you.</p>
      </div>

      <FormField label="Full name">
        <Input name="name" required autoComplete="name" placeholder="Jane Mukamana" className={control} />
      </FormField>
      <FormField label="Company" optional>
        <Input name="company" autoComplete="organization" placeholder="Company or institution" className={control} />
      </FormField>
      <FormField label="Email">
        <Input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={control} />
      </FormField>
      <FormField label="Phone" optional>
        <Input name="phone" type="tel" autoComplete="tel" placeholder="+250 7XX XXX XXX" className={control} />
      </FormField>

      <FormField label="Area of interest" className="sm:col-span-2">
        <div className="relative">
          <Select name="topic" required defaultValue="" className={cn(control, "appearance-none pr-10 invalid:text-white/30")}>
            <option value="" disabled>
              Select an area
            </option>
            {enquiryTopics.map((topic) => (
              <option key={topic} value={topic} className="bg-ink-900 text-white">
                {topic}
              </option>
            ))}
          </Select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-white/40" />
        </div>
      </FormField>

      <FormField label="Message" className="sm:col-span-2">
        <Textarea
          name="message"
          required
          rows={5}
          placeholder="Products, volumes, delivery location or anything else we should know."
          className={cn(control, "resize-none")}
        />
      </FormField>

      <div className="flex sm:col-span-2 sm:justify-end">
        <Button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-white transition-colors data-active:bg-brand/75 data-hover:bg-brand/85"
        >
          Send enquiry
          <ArrowRight className="size-4 transition-transform group-data-hover:translate-x-0.5" />
        </Button>
      </div>
    </form>
  );
}
