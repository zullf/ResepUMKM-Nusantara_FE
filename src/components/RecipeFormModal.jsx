import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { createResep } from "../services/resepService";

export default function RecipeFormModal({ onClose, refresh }) {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("makanan");
  const [tingkat_kesulitan, setTingkatKesulitan] = useState("mudah");
  const [bahan, setBahan] = useState([""]);
  const [langkah, setLangkah] = useState([""]);
  const [loading, setLoading] = useState(false);

  const isValid = () => {
    if (!nama.trim()) return false;
    if (bahan.some((b) => !b.trim())) return false;
    if (langkah.some((l) => !l.trim())) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (!confirm("Yakin ingin menambahkan resep?")) return;

    try {
      setLoading(true);

      await createResep({
        nama,
        kategori,
        tingkat_kesulitan,
        bahan,
        langkah,
      });

      refresh();
      onClose();
    } catch (err) {
      alert("Gagal menambahkan resep");
    } finally {
      setLoading(false);
    }
  };

  const handleBahanChange = (i, value) => {
    const newData = [...bahan];
    newData[i] = value;
    setBahan(newData);
  };

  const addBahan = () => setBahan([...bahan, ""]);
  const removeBahan = (i) => setBahan(bahan.filter((_, idx) => idx !== i));

  const handleLangkahChange = (i, value) => {
    const newData = [...langkah];
    newData[i] = value;
    setLangkah(newData);
  };

  const addLangkah = () => setLangkah([...langkah, ""]);
  const removeLangkah = (i) =>
    setLangkah(langkah.filter((_, idx) => idx !== i));

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 animate-fadeIn">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Resep</h2>
          <button onClick={onClose}>
            <X className="hover:text-red-500" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Nama Resep"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <div className="flex gap-2 mb-3">
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
          </select>

          <select
            value={tingkat_kesulitan}
            onChange={(e) => setTingkatKesulitan(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="mudah">Mudah</option>
            <option value="sedang">Sedang</option>
            <option value="sulit">Sulit</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Bahan</h3>

          {bahan.map((b, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={b}
                onChange={(e) => handleBahanChange(i, e.target.value)}
                placeholder={`Bahan ${i + 1}`}
                className="border p-2 w-full rounded"
              />

              {bahan.length > 1 && (
                <button onClick={() => removeBahan(i)}>
                  <Trash2 className="text-red-500" size={18} />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addBahan}
            className="flex items-center gap-1 text-green-600 text-sm"
          >
            <Plus size={16} /> Tambah Bahan
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Langkah</h3>

          {langkah.map((l, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={l}
                onChange={(e) => handleLangkahChange(i, e.target.value)}
                placeholder={`Langkah ${i + 1}`}
                className="border p-2 w-full rounded"
              />

              {langkah.length > 1 && (
                <button onClick={() => removeLangkah(i)}>
                  <Trash2 className="text-red-500" size={18} />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addLangkah}
            className="flex items-center gap-1 text-green-600 text-sm"
          >
            <Plus size={16} /> Tambah Langkah
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}