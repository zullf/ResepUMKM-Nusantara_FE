import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteResep } from "../services/resepService";

export default function RecipeCard({ resep, refresh }) {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin mau hapus?");
    if (!confirmDelete) return;
    try {
      await deleteResep(resep.id);
      try {
        refresh();
      } catch (e) {
        console.error("Refresh error:", e);
      }
      alert("Resep berhasil dihapus");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert(
        err.response?.data?.message || err.message || "Gagal menghapus resep",
      );
    }
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        <Trash2 size={18} />
      </button>
      <h2 className="font-semibold text-lg text-gray-800">{resep.nama}</h2>

      <p className="text-sm text-gray-500 mb-2">
        {resep.kategori} • {resep.tingkat_kesulitan}
      </p>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-orange-500 text-sm hover:underline"
      >
        <ChevronDown size={16} />
        Lihat Detail
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <h3 className="font-medium mb-1">Bahan:</h3>
          <ul className="list-disc ml-5 mb-2">
            {resep.bahan?.map((b, i) => (
              <li key={i}>{b.nama_bahan}</li>
            ))}
          </ul>

          <h3 className="font-medium mb-1">Langkah:</h3>
          <ol className="list-decimal ml-5">
            {resep.langkah?.map((l, i) => (
              <li key={i}>{l.deskripsi}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
