import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Cari resep..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
};

export default SearchBar;