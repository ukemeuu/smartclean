"use client";

import { FormEvent,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Sparkles,
  Users,
} from "lucide-react";

import {
  providerAvailabilityTags,
  providerLocations,
  providerServices,
} from "@/lib/providers";

type OnboardingStep = {
  title: string;
  description: string;
};

type ProviderOnboardingForm = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  primaryLocation: string;
  serviceAreas: string[];
  servicesOffered: string[];
  experienceYears: string;
  certifications: string;
  hourlyRate: string;
  minimumBooking: string;
  hasBackgroundCheck: boolean;
  providesSupplies: boolean;
  availability: string[];
  bio: string;
};

const steps: OnboardingStep[] = [
  {
    title: "Business profile",
    description: "Tell us about your team and the neighbourhoods you cover.",
  },
  {
    title: "Experience & safety",
    description: "Share proof of experience so we can trust you with our families.",
  },
  {
    title: "Availability & next steps",
    description: "Set expectations for scheduling and what makes your service unique.",
  },
];

const initialForm: ProviderOnboardingForm = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  primaryLocation: "",
  serviceAreas: [],
  servicesOffered: [],
  experienceYears: "",
  certifications: "",
  hourlyRate: "",
  minimumBooking: "3",
  hasBackgroundCheck: true,
  providesSupplies: true,
  availability: [],
  bio: "",
};

const emailPattern = /.+@.+\..+/;

const toggleArrayValue = (values: string[], value: string) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

export default function ProviderOnboardingPage() {
  const [form, setForm] = useState<ProviderOnboardingForm>(initialForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => {
    const completeSteps = submitted ? steps.length : stepIndex + 1;
    return Math.round((completeSteps / steps.length) * 100);
  }, [stepIndex, submitted]);

  const updateField = <Field extends keyof ProviderOnboardingForm>(
    field: Field,
    value: ProviderOnboardingForm[Field],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (index: number) => {
    const issues: string[] = [];

    if (index === 0) {
      if (!form.fullName.trim()) {
        issues.push("Add your full name or the primary contact's name.");
      }
      if (!form.businessName.trim()) {
        issues.push("Share your business or team name.");
      }
      if (!emailPattern.test(form.email)) {
        issues.push("Enter a valid email address we can reach you on.");
      }
      if (!form.phone.trim()) {
        issues.push("Add a phone or WhatsApp number for urgent updates.");
      }
      if (!form.primaryLocation) {
        issues.push("Choose your primary service neighbourhood.");
      }
      if (form.serviceAreas.length === 0) {
        issues.push("Select at least one additional area you can cover.");
      }
      if (form.servicesOffered.length === 0) {
        issues.push("Pick the services you specialise in.");
      }
    }

    if (index === 1) {
      if (!form.experienceYears.trim()) {
        issues.push("Tell us how many years you've worked in this field.");
      }
      if (!form.hourlyRate.trim()) {
        issues.push("Share your standard hourly rate so we can quote clients clearly.");
      }
      if (!form.certifications.trim()) {
        issues.push("List any certifications or training. Mention 'None' if not applicable.");
      }
    }

    if (index === 2) {
      if (form.availability.length === 0) {
        issues.push("Select the availability windows that suit you best.");
      }
      if (!form.bio.trim()) {
        issues.push("Write a short introduction that helps clients understand your style.");
      }
    }

    return issues;
  };

  const goToStep = (nextIndex: number) => {
    const issues = validateStep(stepIndex);

    if (issues.length > 0 && nextIndex > stepIndex) {
      setErrors(issues);
      return;
    }

    setErrors([]);
    setStepIndex(Math.max(0, Math.min(steps.length - 1, nextIndex)));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const issues = validateStep(stepIndex);
    if (issues.length > 0) {
      setErrors(issues);
      return;
    }

    setErrors([]);
    setSubmitted(true);
  };

  const toggleServiceArea = (location: string) => {
    updateField("serviceAreas", toggleArrayValue(form.serviceAreas, location));
  };

  const toggleService = (service: string) => {
    updateField("servicesOffered", toggleArrayValue(form.servicesOffered, service));
  };

  const toggleAvailability = (tag: string) => {
    updateField("availability", toggleArrayValue(form.availability, tag));
  };

  const resetForm = () => {
    setForm(initialForm);
    setStepIndex(0);
    setErrors([]);
    setSubmitted(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Join the SmartClean provider network</h1>
        <p className="mt-2 text-sm text-slate-600">
          Share your details below so our partnerships team can verify your business and connect you with ready-to-book clients.
        </p>
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-700">Step {Math.min(stepIndex + 1, steps.length)} of {steps.length}</p>
            <h2 className="text-xl font-semibold text-slate-900">{steps[stepIndex].title}</h2>
            <p className="text-sm text-slate-600">{steps[stepIndex].description}</p>
          </div>
          <div className="w-full rounded-full bg-slate-200 md:w-64">
            <div
              className="h-2 rounded-full bg-brand-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {submitted ? (
          <div className="mt-8 space-y-6 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 text-sm text-emerald-800">
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 size={20} />
              <p className="font-semibold">Welcome aboard, {form.businessName || form.fullName}!</p>
            </div>
            <p>
              Our partnerships specialist will review your profile within the next business day. Expect a verification call to confirm documents and discuss your first bookings.
            </p>
            <div className="grid gap-4 rounded-2xl bg-white p-4 text-slate-700 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Primary contact</p>
                <p className="mt-1 font-medium">{form.fullName} · {form.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Service focus</p>
                <p className="mt-1 font-medium">{form.servicesOffered.join(", ") || "To be confirmed"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Coverage</p>
                <p className="mt-1 font-medium">{[form.primaryLocation, ...form.serviceAreas].filter(Boolean).join(", ")}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Starting rate</p>
                <p className="mt-1 font-medium">KES {form.hourlyRate || "—"} per hour · Minimum {form.minimumBooking} hrs</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/(public)/login"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
              >
                Go to provider login
              </Link>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700"
              >
                Submit another profile
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {stepIndex === 0 && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm">
                    <span className="font-medium text-slate-700">Full name</span>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(event) => updateField("fullName", event.target.value)}
                      placeholder="Jane Wanjiru"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium text-slate-700">Business name</span>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={(event) => updateField("businessName", event.target.value)}
                      placeholder="SparklePro Cleaning"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium text-slate-700">Email address</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="team@smartclean.africa"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium text-slate-700">Phone or WhatsApp</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="0712 345 678"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                </div>

                <label className="block text-sm">
                  <span className="font-medium text-slate-700">Primary location</span>
                  <select
                    value={form.primaryLocation}
                    onChange={(event) => updateField("primaryLocation", event.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="">Select a neighbourhood</option>
                    {providerLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <p className="text-sm font-medium text-slate-700">Additional service areas</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {providerLocations.map((location) => {
                      const selected = form.serviceAreas.includes(location);
                      return (
                        <label
                          key={location}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                            selected
                              ? "border-brand-200 bg-brand-50/70 text-brand-800"
                              : "border-slate-200 bg-white text-slate-700 hover:border-brand-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleServiceArea(location)}
                            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                          />
                          {location}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">Services you provide</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {providerServices.map((service) => {
                      const selected = form.servicesOffered.includes(service);
                      return (
                        <label
                          key={service}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                            selected
                              ? "border-brand-200 bg-brand-50/70 text-brand-800"
                              : "border-slate-200 bg-white text-slate-700 hover:border-brand-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleService(service)}
                            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                          />
                          {service}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {stepIndex === 1 && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="text-sm">
                    <span className="font-medium text-slate-700">Years of experience</span>
                    <input
                      type="number"
                      min="0"
                      value={form.experienceYears}
                      onChange={(event) => updateField("experienceYears", event.target.value)}
                      placeholder="5"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium text-slate-700">Hourly rate (KES)</span>
                    <input
                      type="number"
                      min="0"
                      value={form.hourlyRate}
                      onChange={(event) => updateField("hourlyRate", event.target.value)}
                      placeholder="1500"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium text-slate-700">Minimum booking (hours)</span>
                    <input
                      type="number"
                      min="1"
                      value={form.minimumBooking}
                      onChange={(event) => updateField("minimumBooking", event.target.value)}
                      placeholder="3"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                </div>

                <label className="block text-sm">
                  <span className="font-medium text-slate-700">Training & certifications</span>
                  <textarea
                    value={form.certifications}
                    onChange={(event) => updateField("certifications", event.target.value)}
                    placeholder="e.g. NITA Certified, Infant First Aid, Hospitality etiquette"
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.hasBackgroundCheck}
                      onChange={(event) => updateField("hasBackgroundCheck", event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span>
                      My team has up-to-date background checks and verifiable references.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.providesSupplies}
                      onChange={(event) => updateField("providesSupplies", event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span>We bring our own professional-grade supplies and equipment.</span>
                  </label>
                </div>
              </div>
            )}

            {stepIndex === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-slate-700">Availability windows</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {providerAvailabilityTags.map((tag) => {
                      const selected = form.availability.includes(tag);
                      return (
                        <label
                          key={tag}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                            selected
                              ? "border-brand-200 bg-brand-50/70 text-brand-800"
                              : "border-slate-200 bg-white text-slate-700 hover:border-brand-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleAvailability(tag)}
                            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                          />
                          {tag}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <label className="block text-sm">
                  <span className="font-medium text-slate-700">Introduce your service</span>
                  <textarea
                    value={form.bio}
                    onChange={(event) => updateField("bio", event.target.value)}
                    placeholder="Share what makes your service stand out, your team size, and any client guarantees."
                    rows={5}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm text-slate-600">
                    <Sparkles size={18} className="text-brand-600" />
                    <p className="mt-2 font-medium text-slate-800">Stand out with your story</p>
                    <p className="mt-1 text-xs">
                      Clients love knowing who will be in their home. Mention your team structure and client wins.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm text-slate-600">
                    <Users size={18} className="text-brand-600" />
                    <p className="mt-2 font-medium text-slate-800">Build trust quickly</p>
                    <p className="mt-1 text-xs">
                      Highlight references, reviews, or special training for infants, seniors, or corporate clients.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm text-slate-600">
                    <CalendarCheck size={18} className="text-brand-600" />
                    <p className="mt-2 font-medium text-slate-800">Keep schedules clear</p>
                    <p className="mt-1 text-xs">
                      Let us know your notice period, cancellation policy, and backup plan for emergencies.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errors.length > 0 ? (
              <div className="space-y-2 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-700">
                <p className="font-semibold">Before we continue:</p>
                <ul className="list-inside list-disc space-y-1">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToStep(stepIndex - 1)}
                disabled={stepIndex === 0}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              {stepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => goToStep(stepIndex + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
                >
                  Continue
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
                >
                  Submit profile
                  <ClipboardCheck size={16} />
                </button>
              )}
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
