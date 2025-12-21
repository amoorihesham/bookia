import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
      <Card className="bg-background/60 w-full max-w-md border-none shadow-xl backdrop-blur-xl">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
            <CheckCircle2
              className="h-10 w-10 text-green-500"
              strokeWidth={2}
            />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">Payment Successful!</CardTitle>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your plan has been upgraded successfully.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pb-6 text-center">
          <div className="bg-secondary/50 text-secondary-foreground rounded-lg p-4 text-sm">
            <p>You now have access to all premium features.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            asChild
            className="w-full"
            variant="default"
          >
            <Link href="/my-events">Go to Events</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
