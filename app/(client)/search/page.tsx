// app/(client)/search/page.tsx
export default function SearchPage() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h1 className="text-2xl font-bold text-brand-700 mb-4">
        Find a Cleaner or Nanny
      </h1>
      <p className="text-slate-600 mb-6">
        Choose a location to see available providers.
      </p>
      {/* Later this will become a real search/filter form */}
      <input
        type="text"
        placeholder="Search by location..."
        className="w-full border rounded-lg p-2 mb-4"
      />
      <button className="bg-brand-600 text-white px-4 py-2 rounded-lg">
        Search
      </button>
    </div>
  );
}
