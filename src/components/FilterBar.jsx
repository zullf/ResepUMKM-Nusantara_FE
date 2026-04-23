export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      
      <select
        value={filters.kategori || ""}
        onChange={(e) =>
          setFilters((f) => ({ ...f, kategori: e.target.value }))
        }
        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-orange-300"
      >
        <option value="">Semua Kategori</option>
        <option value="makanan">Makanan</option>
        <option value="minuman">Minuman</option>
      </select>

      <select
        value={filters.tingkatKesulitan || ""}
        onChange={(e) =>
          setFilters((f) => ({ ...f, tingkatKesulitan: e.target.value }))
        }
        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-orange-300"
      >
        <option value="">Semua Level</option>
        <option value="mudah">Mudah</option>
        <option value="sedang">Sedang</option>
        <option value="sulit">Sulit</option>
      </select>

    </div>
  );
}