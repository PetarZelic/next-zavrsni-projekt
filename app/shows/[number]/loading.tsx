export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 mb-4" />
      <p className="text-lg ">Učitavanje serije...</p>
    </div>
  );
}