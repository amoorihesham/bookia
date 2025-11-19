import { EventTable, UserTable } from '@/drizzle/schema';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { BookAlert, Clock, MapPin, TicketCheck } from 'lucide-react';
import { TooltipButton } from '@/components/buttons';

type Props = typeof EventTable.$inferSelect & { organizer: typeof UserTable.$inferSelect | null };

export const EventCard = ({ children, event }: { event: Props; children: (event: Props) => ReactNode }) => {
  return (
    <Card className='w-full bg-[url(/card.jpg)] bg-cover bg-no-repeat bg-center relative p-0 bg-blend-soft-light min-h-[400px] max-h-[500px] hover:border-chart-4 transition-all duration-300 group overflow-hidden'>
      {children(event)}
    </Card>
  );
};

const CardActions = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div
      className={cn(
        'absolute w-40 flex items-center gap-2 justify-center transition-all duration-300 -top-full group-hover:top-3 left-1/2 -translate-x-1/2 bg-background/60 border-chart-4/20 shadow-xl border backdrop-blur-sm rounded-full px-3 py-1',
        className
      )}
    >
      {children}
    </div>
  );
};
