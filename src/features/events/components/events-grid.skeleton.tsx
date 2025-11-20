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
  return Array.from({ length: 6 }).map((_, idx) => (
    <Card
      className='w-full'
      key={idx + 1}
    >
      <CardHeader>
        <CardTitle className='animate-pulse bg-muted-foreground h-4 w-[80%] rounded-full' />
        <CardDescription className='animate-pulse bg-muted-foreground h-3 w-[70%] rounded-full' />
        <CardAction className='gap-2 flex items-center'>
          <Badge className='bg-muted-foreground animate-pulse w-[40%]' />
          <Badge className='bg-muted-foreground animate-pulse w-[40%]' />
        </CardAction>
      </CardHeader>
      <CardContent className='flex justify-between'>
        <div className='w-full space-y-2'>
          <div className='bg-muted-foreground h-2 rounded-full animate-pulse block w-[50%]' />
          <div className='bg-muted-foreground h-2 rounded-full animate-pulse block w-[50%]' />
          <div className='bg-muted-foreground h-2 rounded-full animate-pulse block w-[50%]' />
          <div className='flex items-center w-[90%] gap-2 mt-3'>
            <div className='bg-muted-foreground animate-pulse h-1 rounded-full w-full' />
            <div className='bg-muted-foreground animate-pulse h-1 rounded-full w-full' />
            <div className='bg-muted-foreground animate-pulse h-1 rounded-full w-full' />
          </div>
        </div>
        <div>
          <h3 className='text-muted-foreground text-5xl font-bold animate-pulse'>??</h3>
        </div>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <div className='w-full h-10 bg-muted-foreground/40 animate-pulse rounded-md' />
        <div className='w-full h-10 bg-muted-foreground/40 animate-pulse rounded-md' />
      </CardFooter>
    </Card>
  ));
};
