import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlansGridSkeleton() {
  return (
    <div className={'mt-14 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Card
          key={idx + 1}
          className="w-full"
        >
          <CardHeader>
            <CardTitle className="bg-muted-foreground h-3 w-full animate-pulse rounded-full" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="bg-muted-foreground h-3 w-[80%] animate-pulse rounded-full" />
            <ul className="mt-6 list-disc space-y-6 px-7 text-sm">
              <li className="bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full" />
              <li className="bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full" />
              <li className="bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full" />
              <li className="bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full" />
            </ul>
          </CardContent>
          <CardFooter className="mt-10">
            <Button className="bg-muted-foreground h-12 w-full animate-pulse rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
