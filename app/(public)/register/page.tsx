"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";

import { providerLocations, providerServices } from "@/lib/providers";

type AccountType = "client" | "provider";

type RegistrationForm = {
  accountType: AccountType;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  householdNotes: string;
  servicesNeeded: string[];
  businessName: string;
  experienceYears: string;
  servicesOffered: string[];
  acceptsTerms: boolean;
  updatesOptIn: boolean;
};

const initialForm: RegistrationForm = {
  accountType: "client",
  fullName: "",
  email: "",
  password: "",
  phone: "",
  location: "",
  householdNotes: "",
  servicesNeeded: [],
  businessName: "",
  experienceYears: "",
  servicesOffered: [],
  acceptsTerms: false,
  updatesOptIn: true,
};

const emailPattern = /.+@.+\..+/;

const passwordRules = [
  { label: "At least 8 characters", check: (value: string) => value.length >= 8 },
  { label: "Includes a number", check: (value: string) => /\d/.test(value) },
  { label: "Includes a capital letter", check: (value: string) => /[A-Z]/.test(value) },
  { label: "Includes a symbol", check: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

type PasswordInsight = {
  score: number;
  percentage: number;
  label: string;
};

const evaluatePassword = (password: string): PasswordInsight => {
  const score = passwordRules.filter((rule) => rule.check(password)).length;
  const percentage = Math.round((score / passwordRules.length) * 100);

  const label =
    score <= 1
      ? "Add more strength"
      : score === 2
      ? "Getting stronger"
      : score === 3
      ? "Strong password"
      : "Excellent password";

  return { score, percentage, label };
};

const toggleArrayValue = (values: string[], value: string) => {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
};

export default function RegisterPage() {
  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const passwordInsight = useMemo(
    () => evaluatePassword(form.password),
    [form.password],
  );

  const handleAccountTypeChange = (type: AccountType) => {
    setForm((prev) => ({
      ...prev,
      accountType: type,
      servicesNeeded: type === "client" ? prev.servicesNeeded : [],
      servicesOffered: type === "provider" ? prev.servicesOffered : [],
    }));
    setSubmitted(false);
  };

  const handleInputChange = <Field extends keyof RegistrationForm>(
    field: Field,
    value: RegistrationForm[Field],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  };

  const handleServiceToggle = (service: string) => {
    if (form.accountType === "client") {
      handleInputChange(
        "servicesNeeded",
        toggleArrayValue(form.servicesNeeded, service),
      );
    } else {
      handleInputChange(
        "servicesOffered",
        toggleArrayValue(form.servicesOffered, service),
      );
    }
  };

  const selectedServices =
    form.accountType === "client" ? form.servicesNeeded : form.servicesOffered;

  const validateForm = () => {
    const validationErrors: string[] = [];

    if (!form.fullName.trim()) {
      validationErrors.push("Please tell us your full name.");
    }
    if (!emailPattern.test(form.email)) {
      validationErrors.push("Enter a valid email address.");
    }
    if (passwordInsight.score < 3) {
      validationErrors.push("Choose a stronger password to keep your account safe.");
    }
    if (!form.phone.trim()) {
      validationErrors.push("Add a phone number so we can reach you about bookings.");
    }
    if (!form.location) {
      validationErrors.push("Select the primary neighbourhood you live or work in.");
    }
    if (form.accountType === "client" && form.servicesNeeded.length === 0) {
      validationErrors.push("Pick at least one service you need help with.");
    }
    if (form.accountType === "provider") {
      if (!form.businessName.trim()) {
        validationErrors.push("Tell us your business or team name.");
      }
      if (!form.experienceYears.trim()) {
        validationErrors.push("Share how many years of experience you have.");
      }
      if (form.servicesOffered.length === 0) {
        validationErrors.push("Select at least one service you offer.");
      }
    }
    if (!form.acceptsTerms) {
      validationErrors.push("Please accept the SmartClean terms to continue.");
    }

    return validationErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setErrors([]);
    setSubmitted(true);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = event.target.value.replace(/[^\d+\s-]/g, "");
    handleInputChange("phone", digitsOnly);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors([]);
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Create your SmartClean account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Whether you need support at home or you are offering professional services, this is the first step to joining Nairobi’s trusted household care network.
        </p>
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          {(["client", "provider"] as AccountType[]).map((type) => {
            const isActive = form.accountType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleAccountTypeChange(type)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  isActive
                    ? "border-brand-200 bg-brand-50/70 text-brand-800"
                    : "border-slate-200 bg-slate-50/80 text-slate-700 hover:border-brand-200"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600">
                  {type === "client" ? <UserPlus size={18} /> : <ShieldCheck size={18} />}
                </span>
                <span>
                  <span className="block font-semibold capitalize">{type}</span>
                  <span className="text-xs text-slate-500">
                    {type === "client"
                      ? "For families, hosts, and busy professionals"
                      : "For cleaners, nannies, and support teams"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {submitted ? (
          <div className="mt-8 space-y-6 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 text-sm text-emerald-800">
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 size={20} />
              <p className="font-semibold">You’re all set, {form.fullName.split(" ")[0] || "there"}!</p>
            </div>
            <p>
              We’ve shared your details with the SmartClean concierge team. Expect a call shortly to verify your account and help you make the most of the platform.
            </p>
            <div className="grid gap-4 rounded-2xl bg-white p-4 text-slate-700 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Account type</p>
                <p className="mt-1 font-medium capitalize">{form.accountType}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Primary location</p>
                <p className="mt-1 font-medium">{form.location || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Focus services</p>
                <p className="mt-1 font-medium">
                  {selectedServices.length > 0 ? selectedServices.join(", ") : "We'll confirm during onboarding"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Next step</p>
                <p className="mt-1 font-medium">
                  {form.accountType === "client"
                    ? "Concierge will curate 3 provider matches"
                    : "Our partnerships team will schedule a verification call"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/(public)/login"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
              >
                Go to login
              </Link>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700"
              >
                Register another account
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="font-medium text-slate-700">Full name</span>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => handleInputChange("fullName", event.target.value)}
                  placeholder="Jane Mwangi"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  required
                />
              </label>
              <label className="text-sm">
                <span className="font-medium text-slate-700">Phone number</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  placeholder="0712 345 678"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  required
                />
              </label>
              <label className="text-sm">
                <span className="font-medium text-slate-700">Email address</span>
                <div className="relative mt-1">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleInputChange("email", event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-9 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </label>
              <label className="text-sm">
                <span className="font-medium text-slate-700">Password</span>
                <div className="relative mt-1">
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => handleInputChange("password", event.target.value)}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    required
                  />
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Password strength: {passwordInsight.label}</span>
                <span>{passwordInsight.percentage}% complete</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-brand-600 transition-all"
                  style={{ width: `${Math.max(10, passwordInsight.percentage)}%` }}
                />
              </div>
              <ul className="mt-2 grid gap-1 text-xs text-slate-500 sm:grid-cols-2">
                {passwordRules.map((rule) => (
                  <li key={rule.label} className="flex items-center gap-2">
                    <Sparkles size={14} className={rule.check(form.password) ? "text-brand-600" : "text-slate-300"} />
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>

            <label className="block text-sm">
              <span className="font-medium text-slate-700">Primary neighbourhood</span>
              <select
                value={form.location}
                onChange={(event) => handleInputChange("location", event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                required
              >
                <option value="">Select a location</option>
                {providerLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <p className="text-sm font-medium text-slate-700">
                {form.accountType === "client"
                  ? "What do you need help with?"
                  : "Which services do you offer?"}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {providerServices.map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <label
                      key={service}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                        isSelected
                          ? "border-brand-200 bg-brand-50/70 text-brand-800"
                          : "border-slate-200 bg-white text-slate-700 hover:border-brand-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleServiceToggle(service)}
                        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      {service}
                    </label>
                  );
                })}
              </div>
            </div>

            {form.accountType === "client" ? (
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Household notes</span>
                <textarea
                  value={form.householdNotes}
                  onChange={(event) => handleInputChange("householdNotes", event.target.value)}
                  placeholder="Tell us about your home, family schedule, or any special instructions."
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </label>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm">
                  <span className="font-medium text-slate-700">Business or team name</span>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(event) => handleInputChange("businessName", event.target.value)}
                    placeholder="SparklePro Cleaning"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </label>
                <label className="text-sm">
                  <span className="font-medium text-slate-700">Years of experience</span>
                  <input
                    type="number"
                    min="0"
                    value={form.experienceYears}
                    onChange={(event) => handleInputChange("experienceYears", event.target.value)}
                    placeholder="5"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </label>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={form.acceptsTerms}
                  onChange={(event) => handleInputChange("acceptsTerms", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  required
                />
                <span>
                  I agree to the SmartClean <a href="#" className="text-brand-700 hover:text-brand-800">Terms of Service</a> and
                  <a href="#" className="ml-1 text-brand-700 hover:text-brand-800">Privacy Policy</a>.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={form.updatesOptIn}
                  onChange={(event) => handleInputChange("updatesOptIn", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>Send me onboarding tips and occasional service offers.</span>
              </label>
            </div>

            {errors.length > 0 ? (
              <div className="space-y-2 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-700">
                <p className="font-semibold">Let’s fix a few things:</p>
                <ul className="list-inside list-disc space-y-1">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
            >
              <UserPlus size={16} />
              Create account
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account? {" "}
              <Link href="/(public)/login" className="font-semibold text-brand-700 hover:text-brand-800">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
