import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlansGridSkeleton() {
  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-14 justify-items-center'}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Card
          key={idx + 1}
          className='w-full'
        >
          <CardHeader>
            <CardTitle className='bg-muted-foreground h-3 w-full animate-pulse rounded-full' />
          </CardHeader>
          <CardContent className='mt-8'>
            <div className='bg-muted-foreground h-3 w-[80%] animate-pulse rounded-full' />
            <ul className='list-disc px-7 space-y-6 text-sm mt-6'>
              <li className='bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full' />
              <li className='bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full' />
              <li className='bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full' />
              <li className='bg-muted-foreground h-3 w-[50%] animate-pulse rounded-full' />
            </ul>
          </CardContent>
          <CardFooter className='mt-10'>
            <Button className='w-full h-12 bg-muted-foreground animate-pulse rounded-md' />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
