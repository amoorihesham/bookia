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
      {Array.from({ length: 3 }).map((_, idx) => (
        <Card className="bg-muted/20 h-[398px] w-full overflow-hidden rounded-lg">
          <CardHeader className="flex items-start justify-between">
            <Badge className="bg-muted-foreground/10 px-10 py-3" />
            <Badge className="bg-muted-foreground/10 rounded-sm px-10 py-14" />
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-end gap-3">
            <div className="bg-muted-foreground/10 h-10 w-full animate-pulse rounded-md" />
            <div className="bg-muted-foreground/10 h-10 w-full animate-pulse rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
