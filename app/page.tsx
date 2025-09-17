import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-8">
      <section className="rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-semibold text-brand-700">
          Book trusted cleaners & nannies by location
        </h1>
        <p className="mt-2 text-slate-600">
          Westlands, Kilimani, Kileleshwa, Lavington and more.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/(client)/search"
            className="bg-brand-600 text-white px-4 py-2 rounded-lg"
          >
            Find a Provider
          </Link>
          <Link
            href="/(provider)/onboarding"
            className="border px-4 py-2 rounded-lg"
          >
            Become a Provider
          </Link>
        </div>
      </section>
    </div>
  );
}
