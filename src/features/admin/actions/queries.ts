'use server';

import userRepository from '@/features/users/db/user.repo';
import { startOfMonth, subMonths } from 'date-fns';
import { connection } from 'next/server';

export const getUserCount = async () => {
  await connection();
  const now = new Date();

  const startOfThisMonth = startOfMonth(now);
  const startOfPrevMonth = startOfMonth(subMonths(now, 1));

  const [{ count: totalCount }] = await userRepository.getTotalUsersCount();
  const [{ count: currentCount }] = await userRepository.getCurrentMonthCount({ startOfThisMonth });
  const [{ count: prevCount }] = await userRepository.getPreviousMonthCount({ startOfPrevMonth, startOfThisMonth });

  const percentageChange =
    prevCount === 0 ? (currentCount === 0 ? 0 : 100) : ((currentCount - prevCount) / prevCount) * 100;

  return {
    currentCount,
    prevCount,
    totalCount,
    percentageChange,
  };
};
