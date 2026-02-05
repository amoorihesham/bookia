export const TableSkeleton = () => {
  return (
    <div className="max-h-full w-full space-y-1 overflow-hidden rounded-md">
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-75" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-100" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-150" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-200" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-200" />
      <div className="bg-muted-foreground/20 h-14 w-full animate-pulse rounded-md delay-200" />
    </div>
  );
};
