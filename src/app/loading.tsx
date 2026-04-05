export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#020617]">
      <div className="text-center">
        <p className="text-gray-400 text-sm">Loading NIRA...</p>

        <div className="mt-4 flex justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}