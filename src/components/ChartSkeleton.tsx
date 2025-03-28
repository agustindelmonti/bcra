export default function ChartSkeleton() {
  return (
    <div className="h-72 space-y-5 animate-pulse">
      <div className="h-4 bg-gray-200 rounded-md w-3/4" />
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded-md" />
        <div className="h-3 bg-gray-200 rounded-md w-5/6" />
        <div className="h-3 bg-gray-200 rounded-md w-4/6" />
        <div className="h-3 bg-gray-200 rounded-md w-5/6" />
        <div className="h-3 bg-gray-200 rounded-md" />
      </div>
      <div className="grid grid-cols-6 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-md" />
        ))}
      </div>
    </div>
  );
}
