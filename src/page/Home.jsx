import { useState } from "react";
import useRecipes from "../hooks/useRecipe";
import RecipeCard from "../components/RecipeCard";
import FilterBar from "../components/FilterBar";
import RecipeFormModal from "../components/RecipeFormModal";
import Pagination from "../components/Pagination";

export default function Home() {
  const [filters, setFilters] = useState({ page: 1, limit: 6, search: "" });
  const { data, refresh } = useRecipes(filters);
  const [open, setOpen] = useState(false);
  const isNextDisabled = (data ?? []).length < filters.limit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 flex px-6 py-10">
      <aside className="w-64 bg-white shadow-md p-4 rounded-2xl mt-12 h-fit">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Filter</h2>
        <FilterBar filters={filters} setFilters={setFilters} />
      </aside>

      <main className="flex-1 ml-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Resep Nusantara UMKM
          </h1>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Cari resep..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                  page: 1,
                }))
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              onClick={() => setOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              + Tambah Resep
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {data.map((r) => (
            <RecipeCard key={r.id} resep={r} refresh={refresh} />
          ))}
        </div>

        <div className="mt-6">
          <Pagination
            page={filters.page}
            setPage={(newPage) =>
              setFilters((prev) => ({
                ...prev,
                page: newPage,
              }))
            }
            isNextDisabled={isNextDisabled}
          />
        </div>
      </main>

      {open && (
        <RecipeFormModal onClose={() => setOpen(false)} refresh={refresh} />
      )}
    </div>
  );
}