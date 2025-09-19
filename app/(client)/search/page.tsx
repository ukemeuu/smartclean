"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import {
  ProviderProfile,
  providerAvailabilityTags,
  providerLocations,
  providerServices,
  providers,
} from "@/lib/providers";

const priceBrackets = [
  { label: "Any budget", value: "any", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under KES 1,500/hr", value: "under-1500", min: 0, max: 1499 },
  {
    label: "KES 1,500 - 1,800/hr",
    value: "1500-1800",
    min: 1500,
    max: 1800,
  },
  { label: "KES 1,800+/hr", value: "1800+", min: 1801, max: Number.POSITIVE_INFINITY },
] as const;

const ratingOptions = [
  { label: "Any rating", value: "any" },
  { label: "4.5 stars & up", value: "4.5" },
  { label: "4.8 stars & up", value: "4.8" },
] as const;

const priceFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

const defaultState = {
  query: "",
  location: "any",
  service: "any",
  price: priceBrackets[0].value,
  rating: ratingOptions[0].value,
  availability: "any",
  backgroundCheck: false,
  suppliesIncluded: false,
};

type FilterState = typeof defaultState;

type PriceBracket = (typeof priceBrackets)[number];

type RatingOption = (typeof ratingOptions)[number];

const getBracket = (value: FilterState["price"]): PriceBracket => {
  return priceBrackets.find((bracket) => bracket.value === value) ?? priceBrackets[0];
};

const toNumber = (value: FilterState["rating"]): number => {
  if (value === "any") return 0;
  return Number.parseFloat(value);
};

const ProviderCard = ({ provider }: { provider: ProviderProfile }) => {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{provider.name}</h3>
            {provider.backgroundCheck ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={14} />
                Verified
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-600">
            <MapPin size={14} className="mr-1 inline text-brand-600" />
            {provider.location} · covers {provider.zonesServed.slice(0, 3).join(", ")}
          </p>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="inline-flex items-center gap-1 text-lg font-semibold text-amber-600">
            <Star size={18} fill="currentColor" />
            {provider.rating.toFixed(2)}
          </span>
          <p className="text-xs text-slate-500">{provider.reviewCount}+ client reviews</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-slate-600">{provider.about}</p>

      <div className="grid gap-3 text-sm md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Services</p>
          <p className="mt-1 font-medium text-slate-800">
            {provider.serviceTypes.slice(0, 3).join(" · ")}
            {provider.serviceTypes.length > 3 ? " +" : ""}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Highlights</p>
          <p className="mt-1 font-medium text-slate-800">
            {provider.highlights.slice(0, 2).join(" · ")}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Availability</p>
          <p className="mt-1 font-medium text-slate-800">
            {provider.availabilityTags.join(" · ")}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm font-medium text-slate-700">
          {priceFormatter.format(provider.hourlyRate)} / hr · min {provider.minBookingHours} hrs
          <span className="ml-2 text-xs font-normal text-slate-500">
            Responds {provider.responseTime.toLowerCase()}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {provider.specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-700"
            >
              <Sparkles size={12} className="text-brand-600" />
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/(client)/providers/${provider.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
        >
          View profile
          <ArrowIcon />
        </Link>
        <Link
          href="/(public)/register"
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:border-brand-300 hover:text-brand-800"
        >
          Request availability
        </Link>
      </div>
    </article>
  );
};

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterState>(defaultState);

  const filteredProviders = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const selectedBracket = getBracket(filters.price);
    const ratingThreshold = toNumber(filters.rating);

    return providers
      .filter((provider) => {
        const haystack = [
          provider.name,
          provider.location,
          provider.about,
          provider.serviceTypes.join(" "),
          provider.specialties.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        const matchesQuery = query.length === 0 || haystack.includes(query);
        const matchesLocation =
          filters.location === "any" ||
          provider.location === filters.location ||
          provider.zonesServed.includes(filters.location);
        const matchesService =
          filters.service === "any" ||
          provider.serviceTypes.includes(filters.service);
        const matchesPrice =
          provider.hourlyRate >= selectedBracket.min &&
          provider.hourlyRate <= selectedBracket.max;
        const matchesRating = provider.rating >= ratingThreshold;
        const matchesAvailability =
          filters.availability === "any" ||
          provider.availabilityTags
            .map((tag) => tag.toLowerCase())
            .includes(filters.availability.toLowerCase());
        const matchesBackground = !filters.backgroundCheck || provider.backgroundCheck;
        const matchesSupplies = !filters.suppliesIncluded || provider.suppliesIncluded;

        return (
          matchesQuery &&
          matchesLocation &&
          matchesService &&
          matchesPrice &&
          matchesRating &&
          matchesAvailability &&
          matchesBackground &&
          matchesSupplies
        );
      })
      .sort((a, b) => b.rating - a.rating);
  }, [filters]);

  const resultStats = useMemo(() => {
    if (filteredProviders.length === 0) {
      return {
        count: 0,
        averageRate: 0,
        minRate: 0,
        maxRate: 0,
      };
    }

    const rates = filteredProviders.map((provider) => provider.hourlyRate);
    const totalRate = rates.reduce((total, rate) => total + rate, 0);

    return {
      count: filteredProviders.length,
      averageRate: Math.round(totalRate / filteredProviders.length),
      minRate: Math.min(...rates),
      maxRate: Math.max(...rates),
    };
  }, [filteredProviders]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.query !== "" ||
      filters.location !== "any" ||
      filters.service !== "any" ||
      filters.price !== priceBrackets[0].value ||
      filters.rating !== ratingOptions[0].value ||
      filters.availability !== "any" ||
      filters.backgroundCheck ||
      filters.suppliesIncluded
    );
  }, [filters]);

  const handleReset = () => {
    setFilters(defaultState);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Find a cleaner or nanny
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Tailor your search by neighbourhood, service type, and schedule. Every provider is SmartClean verified.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Filter size={18} className="text-brand-600" />
            {hasActiveFilters ? "Filters active" : "All providers"}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">Filters</h2>
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasActiveFilters}
                className="text-xs font-medium text-brand-700 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                Reset
              </button>
            </div>

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-slate-700">Search</span>
              <div className="relative">
                <input
                  type="text"
                  value={filters.query}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, query: event.target.value }))
                  }
                  placeholder="Search by keyword"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-9 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </label>

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-slate-700">Location</span>
              <select
                value={filters.location}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, location: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                <option value="any">Any location</option>
                {providerLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-slate-700">Service</span>
              <select
                value={filters.service}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, service: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                <option value="any">All services</option>
                {providerServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-slate-700">Hourly rate</span>
              <select
                value={filters.price}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, price: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {priceBrackets.map((bracket) => (
                  <option key={bracket.value} value={bracket.value}>
                    {bracket.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-slate-700">Minimum rating</span>
              <select
                value={filters.rating}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, rating: event.target.value as RatingOption["value"] }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {ratingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2 text-sm">
              <span className="font-medium text-slate-700">Availability</span>
              <select
                value={filters.availability}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, availability: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                <option value="any">All availability</option>
                {providerAvailabilityTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>

            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  checked={filters.backgroundCheck}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, backgroundCheck: event.target.checked }))
                  }
                />
                Background checked only
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  checked={filters.suppliesIncluded}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, suppliesIncluded: event.target.checked }))
                  }
                />
                Includes cleaning supplies
              </label>
            </div>
          </aside>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{resultStats.count}</span> vetted providers
                {filters.location !== "any" ? ` in ${filters.location}` : ""}.
              </p>
              {resultStats.count > 0 && (
                <div className="text-xs text-slate-500">
                  Avg rate {priceFormatter.format(resultStats.averageRate)} · Range {priceFormatter.format(resultStats.minRate)}–
                  {priceFormatter.format(resultStats.maxRate)}
                </div>
              )}
            </div>

            {filteredProviders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
                <Sparkles size={32} className="mx-auto text-slate-400" />
                <h2 className="mt-4 text-lg font-semibold text-slate-800">No providers match yet</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Try broadening your filters or chat with our concierge team for a hand-picked match.
                </p>
                <Link
                  href="/(public)/register"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500"
                >
                  Talk to concierge
                </Link>
              </div>
            ) : (
              <div className="grid gap-5">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Need recurring support?</h2>
            <p className="text-sm text-slate-600">
              Save your favourite providers, track visits, and get instant updates through the SmartClean portal.
            </p>
          </div>
          <Link
            href="/(public)/login"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700"
          >
            Login to your portal
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50/80 p-5 text-sm text-slate-600">
            <ShieldCheck size={18} className="text-brand-600" />
            <p className="mt-3 font-medium text-slate-800">Verified professionals</p>
            <p className="mt-2">
              Every SmartClean provider completes ID checks, in-person assessments, and ongoing quality audits.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50/80 p-5 text-sm text-slate-600">
            <CalendarCheck size={18} className="text-brand-600" />
            <p className="mt-3 font-medium text-slate-800">Realtime availability</p>
            <p className="mt-2">
              Book visits that fit your calendar and adjust as life changes — no endless WhatsApp threads.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50/80 p-5 text-sm text-slate-600">
            <Sparkles size={18} className="text-brand-600" />
            <p className="mt-3 font-medium text-slate-800">Concierge care</p>
            <p className="mt-2">
              Our team helps with backups, special projects, and check-ins so your home always feels cared for.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
