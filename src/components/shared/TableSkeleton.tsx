export const TableSkeleton = () => {
  return (
    <div className="h-[650px] w-full space-y-2 overflow-hidden rounded-md">
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-75" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-100" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-150" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-200" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-300" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-500" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-700" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-1000" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-1000" />
    </div>
  );
};
