'use client';

import { FileSearch } from 'lucide-react'; // any icon from lucide-react
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

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
    <div
      className={cn(
        `flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-[500px]  py-12 px-4 bg-card/20 rounded-2xl border border-dashed border-gray-600 shadow-sm`,
        className
      )}
    >
      <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-card'>
        <FileSearch className='w-8 h-8 text-gray-300' />
      </div>

      <h2 className='text-lg font-semibold text-foreground'>{title}</h2>

      <p className='mt-1 text-sm text-muted-foreground max-w-sm'>{description}</p>

      <Button
        onClick={() => router.refresh()}
        className='mt-6'
      >
        Refresh
      </Button>
    </div>
  );
};
