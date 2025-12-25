export const StatsSkeleton = () => {
  return (
    <div className="mx-auto mb-10 grid max-w-4xl animate-pulse grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <div className="bg-muted/40 h-[100px]" />
      <div className="bg-muted/40 h-[100px]" />
      <div className="bg-muted/40 h-[100px]" />
      <div className="bg-muted/40 h-[100px]" />
    </div>
  );
};
