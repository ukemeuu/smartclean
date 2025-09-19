import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { getProviderBySlug } from "@/lib/providers";

const priceFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

type ProviderPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: ProviderPageProps) {
  const provider = getProviderBySlug(params.slug);

  if (!provider) {
    return {
      title: "Provider not found | SmartClean",
    };
  }

  return {
    title: `${provider.name} in ${provider.location} | SmartClean`,
    description: provider.about,
  };
}

export default function ProviderProfilePage({ params }: ProviderPageProps) {
  const provider = getProviderBySlug(params.slug);

  if (!provider) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/(client)/search"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft size={16} />
        Back to search
      </Link>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1 text-xs font-semibold text-brand-700">
              <ShieldCheck size={16} /> SmartClean Verified
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{provider.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1 text-lg font-semibold text-amber-600">
                <Star size={18} fill="currentColor" />
                {provider.rating.toFixed(2)}
              </span>
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {provider.reviewCount}+ reviews
              </span>
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <MapPin size={14} /> {provider.location}
              </span>
              <span className="text-xs text-slate-500">
                Serves {provider.zonesServed.join(", ")}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-sm text-brand-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Booking summary</p>
            <p className="mt-3 text-2xl font-semibold text-brand-800">
              {priceFormatter.format(provider.hourlyRate)} <span className="text-base font-medium">/ hour</span>
            </p>
            <p className="mt-2 text-sm text-brand-700">
              Minimum booking {provider.minBookingHours} hours • Responds {provider.responseTime.toLowerCase()}
            </p>
            <div className="mt-4 space-y-2 text-xs text-brand-700">
              <p className="flex items-center gap-2">
                <CheckCircle2 size={14} /> Background check complete
              </p>
              <p className="flex items-center gap-2">
                <Sparkles size={14} /> {provider.specialties[0]}
              </p>
              <p className="flex items-center gap-2">
                <Users size={14} /> Speaks {provider.languages.join(", ")}
              </p>
            </div>
            <Link
              href="/(public)/register"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
            >
              Request booking assistance
              <CalendarCheck size={16} />
            </Link>
            <p className="mt-3 text-xs text-brand-700/80">
              Concierge support will confirm availability within the hour.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">About</h2>
              <p className="text-sm leading-relaxed text-slate-600">{provider.about}</p>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why clients love this provider</p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {provider.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-slate-700">
                      <Sparkles size={16} className="mt-1 text-brand-600" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Services offered</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {provider.serviceTypes.map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-brand-600" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Specialties & certifications</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {provider.specialties.map((specialty) => (
                    <li key={specialty} className="flex items-center gap-2">
                      <Sparkles size={16} className="text-brand-600" />
                      {specialty}
                    </li>
                  ))}
                  {provider.badges.map((badge) => (
                    <li key={badge} className="flex items-center gap-2 text-emerald-700">
                      <ShieldCheck size={16} />
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
              <p className="mt-1 text-sm text-slate-600">
                Flexible scheduling with quick responses for changes or emergency cover.
              </p>
              <ul className="mt-4 space-y-3">
                {provider.availability.map((slot) => (
                  <li key={slot.day} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                    <CalendarCheck size={18} className="mt-1 text-brand-600" />
                    <div>
                      <p className="font-medium text-slate-900">{slot.day}</p>
                      <p className="text-sm text-slate-600">{slot.slots.join(", ")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Experience</p>
              <p className="mt-2 text-sm text-slate-700">{provider.experience}</p>
              <p className="mt-2 text-xs text-slate-500">
                Languages: {provider.languages.join(", ")} · Supplies included: {provider.suppliesIncluded ? "Yes" : "On request"}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Client stories</p>
              <div className="mt-3 space-y-4">
                {provider.testimonials.map((testimonial) => (
                  <figure key={testimonial.quote} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <blockquote className="text-sm leading-relaxed text-slate-600">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-3 text-xs font-medium uppercase tracking-wide text-brand-700">
                      {testimonial.name} · {testimonial.relationship}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next steps</p>
              <ul className="mt-3 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Sparkles size={16} className="mt-1 text-brand-600" />
                  Share your ideal schedule and household priorities.
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={16} className="mt-1 text-brand-600" />
                  Receive a call from our concierge team to finalise logistics.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck size={16} className="mt-1 text-brand-600" />
                  Get matched with backup support whenever you need it.
                </li>
              </ul>
              <Link
                href="/(public)/login"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:border-brand-300 hover:text-brand-800"
              >
                Login to client portal
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
