export default function Pagination({ page, setPage, isNextDisabled  }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Prev
      </button>

      <span className="font-semibold">
        Page {page}
      </span>

      <button
        onClick={() => setPage(page + 1)}
          disabled={isNextDisabled}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>

    </div>
  );
}