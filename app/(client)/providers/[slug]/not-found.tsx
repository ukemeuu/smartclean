import Link from "next/link";
import { Search } from "lucide-react";

export default function ProviderNotFound() {
  return (
    <div className="space-y-6 rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Search size={24} />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Provider not found</h1>
        <p className="text-sm text-slate-600">
          The profile you were looking for is unavailable. Explore our vetted network to find the right fit for your household.
        </p>
      </div>
      <Link
        href="/(client)/search"
        className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
      >
        Browse providers
      </Link>
    </div>
  );
}
