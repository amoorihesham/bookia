'use client';

import { FileSearch } from 'lucide-react'; // any icon from lucide-react
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { BlurFade } from '../ui/blur-fade';

type NoDataProps = {
  title?: string;
  description?: string;
  className?: string;
};

export const EmptyComponent: React.FC<NoDataProps> = ({
  title = 'No Data Found',
  description = 'It looks like there’s nothing to show here yet.',
  className = '',
}) => {
  const router = useRouter();
  return (
    <BlurFade
      className={cn(
        `bg-card/20 mx-auto flex max-h-full max-w-4xl flex-col items-center justify-center rounded-2xl border border-dashed border-gray-600 px-4 py-12 text-center shadow-sm`,
        className
      )}
      inView
      delay={0.6}
      duration={0.4}
    >
      <div className="bg-card mb-4 flex h-16 w-16 items-center justify-center rounded-full">
        <FileSearch className="h-8 w-8 text-gray-300" />
      </div>

      <h2 className="text-foreground text-lg font-semibold">{title}</h2>

      <p className="text-muted-foreground mt-1 max-w-sm text-sm">{description}</p>

      <Button
        onClick={() => router.refresh()}
        className="mt-6"
      >
        Refresh
      </Button>
    </BlurFade>
  );
};
