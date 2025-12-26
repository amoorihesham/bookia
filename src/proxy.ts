import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import userRepository from './features/users/db/user.repo';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/today(.*)',
  '/upcoming(.*)',
  '/expired(.*)',
  '/featured(.*)',
  '/plan(.*)',
  '/api/inngest(.*)',
  '/api/webhook(.*)',
  '/',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = await auth();
    if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url));
    const user = await userRepository.findUserById(userId!);
    if (!user) return NextResponse.redirect(new URL('/sign-in', req.url));
    if (user.role !== 'admin') return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
