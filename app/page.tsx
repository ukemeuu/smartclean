import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import {
  featuredProviders,
  providerLocations,
  providerServices,
  providers,
} from "@/lib/providers";

const priceFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

const averageRating = (
  providers.reduce((total, provider) => total + provider.rating, 0) /
  providers.length
).toFixed(2);

const totalReviews = providers.reduce(
  (total, provider) => total + provider.reviewCount,
  0,
);

const heroStats = [
  {
    label: "Average rating",
    value: `${averageRating}★`,
    description: `${totalReviews}+ reviews from Nairobi families`,
  },
  {
    label: "Service coverage",
    value: `${providerLocations.length}+ zones`,
    description: "Westlands, Kilimani, Lavington, Runda and beyond",
  },
  {
    label: "Service options",
    value: `${providerServices.length}+ offerings`,
    description: "From deep cleaning to specialised childcare",
  },
];

const features = [
  {
    title: "Trusted professionals",
    description:
      "All providers are background checked, reference verified, and continuously quality assessed by SmartClean.",
    icon: ShieldCheck,
  },
  {
    title: "Curated matches",
    description:
      "Answer a few questions and instantly compare providers who specialise in your household's needs and schedule.",
    icon: Sparkles,
  },
  {
    title: "Concierge support",
    description:
      "Our Nairobi-based support team is on standby to help with scheduling, payments, and replacements when you need it.",
    icon: Clock,
  },
];

const journeySteps = [
  {
    title: "Tell us what you need",
    description:
      "Share your location, preferred hours, and priorities – from eco-friendly cleaning to infant sleep support.",
    icon: Sparkles,
  },
  {
    title: "Compare vetted providers",
    description:
      "Browse availability, reviews, and pricing transparency. Message favourites without leaving the dashboard.",
    icon: Users,
  },
  {
    title: "Book & relax",
    description:
      "Secure your booking, receive real-time updates, and track every visit through the SmartClean client portal.",
    icon: CalendarCheck,
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 px-8 py-16 text-white shadow-xl">
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <ShieldCheck size={16} /> Nairobi’s trusted household care network
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Book cleaners and nannies trusted by Nairobi families
              </h1>
              <p className="text-lg text-slate-100/90">
                Compare availability, verified reviews, and transparent pricing in minutes.
                SmartClean connects you with the city’s most dependable household professionals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/(client)/search"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-900 shadow-lg shadow-brand-900/30 transition hover:bg-slate-100"
              >
                Start searching
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/(provider)/onboarding"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Join as a provider
              </Link>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl bg-white/10 p-6 backdrop-blur lg:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 p-4 text-center"
                >
                  <p className="text-sm font-medium text-white/80">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/70">{stat.description}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Users size={18} className="text-brand-100" />
                6 active teams are ready to take on new clients this week.
              </div>
              <div className="mt-4 grid gap-3">
                {featuredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-xs text-white/70">
                        <MapPin size={12} className="mr-1 inline" />
                        {provider.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-amber-200">
                      <Star size={16} fill="currentColor" />
                      {provider.rating.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_45%)]" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon size={22} />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Featured providers this week
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Top-rated teams with immediate openings in Nairobi’s premium neighbourhoods.
            </p>
          </div>
          <Link
            href="/(client)/search"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700"
          >
            View all providers
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProviders.map((provider) => (
            <article
              key={provider.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {provider.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      <MapPin size={14} className="mr-1 inline text-brand-600" />
                      {provider.location} • {provider.zonesServed.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                    <Star size={16} fill="currentColor" className="text-amber-500" />
                    {provider.rating.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  {provider.about}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {provider.serviceTypes.slice(0, 3).map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-slate-700"
                    >
                      <Sparkles size={14} className="text-brand-600" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-700">
                  <span>
                    {priceFormatter.format(provider.hourlyRate)} / hr · min {provider.minBookingHours} hrs
                  </span>
                  <span className="text-xs text-slate-500">
                    Responds {provider.responseTime.toLowerCase()}
                  </span>
                </div>
                <Link
                  href={`/(client)/providers/${provider.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
                >
                  View profile
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm lg:grid-cols-3">
        {journeySteps.map(({ icon: Icon, title, description }, index) => (
          <div key={title} className="relative flex flex-col gap-4 rounded-2xl bg-slate-50/60 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                {index + 1}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon size={22} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Families that trust SmartClean
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Hear from clients who rely on our vetted providers for spotless homes and loving childcare.
            </p>
            <div className="mt-6 grid gap-4">
              {featuredProviders.slice(0, 3).map((provider) => (
                <div key={provider.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Star size={18} className="text-amber-500" fill="currentColor" />
                    {provider.rating.toFixed(2)} average • {provider.reviewCount}+ reviews
                  </div>
                  <p className="mt-3 text-sm text-slate-700">
                    “{provider.testimonials[0]?.quote}”
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand-700">
                    {provider.testimonials[0]?.name} · {provider.testimonials[0]?.relationship}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand-50 via-white to-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">
              SmartClean Concierge
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Need ongoing support? Our concierge plans pair you with a dedicated household success manager to coordinate schedules, replacements, and special projects.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <ShieldCheck size={16} className="mt-1 text-brand-600" />
                Quarterly safety audits and refresher training for your providers.
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1 text-brand-600" />
                Priority rescheduling with backup teams in under 2 hours.
              </li>
              <li className="flex items-start gap-2">
                <Users size={16} className="mt-1 text-brand-600" />
                One tap group chat with your SmartClean manager and provider.
              </li>
            </ul>
            <Link
              href="/(public)/register"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
            >
              Talk to concierge
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 px-8 py-12 text-white">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold">Ready to feel supported at home?</h2>
            <p className="mt-2 max-w-xl text-sm text-white/80">
              Join thousands of Nairobi households who save hours every week with SmartClean’s vetted professionals.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/(client)/search"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow"
            >
              Find your match
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/(public)/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-medium text-white"
            >
              Login to your portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
