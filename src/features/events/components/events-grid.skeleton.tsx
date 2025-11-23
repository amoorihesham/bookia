import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export const EventsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card
          className="w-full"
          key={idx + 1}
        >
          <CardHeader>
            <CardTitle className="bg-muted-foreground h-4 w-[80%] animate-pulse rounded-full" />
            <CardDescription className="bg-muted-foreground h-3 w-[70%] animate-pulse rounded-full" />
            <CardAction className="flex items-center gap-2">
              <Badge className="bg-muted-foreground w-[40%] animate-pulse" />
              <Badge className="bg-muted-foreground w-[40%] animate-pulse" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="w-full space-y-2">
              <div className="bg-muted-foreground block h-2 w-[50%] animate-pulse rounded-full" />
              <div className="bg-muted-foreground block h-2 w-[50%] animate-pulse rounded-full" />
              <div className="bg-muted-foreground block h-2 w-[50%] animate-pulse rounded-full" />
              <div className="mt-3 flex w-[90%] items-center gap-2">
                <div className="bg-muted-foreground h-1 w-full animate-pulse rounded-full" />
                <div className="bg-muted-foreground h-1 w-full animate-pulse rounded-full" />
                <div className="bg-muted-foreground h-1 w-full animate-pulse rounded-full" />
              </div>
            </div>
            <div>
              <h3 className="text-muted-foreground animate-pulse text-5xl font-bold">??</h3>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="bg-muted-foreground/40 h-10 w-full animate-pulse rounded-md" />
            <div className="bg-muted-foreground/40 h-10 w-full animate-pulse rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
