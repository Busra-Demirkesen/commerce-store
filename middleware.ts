import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(); // Call clerkMiddleware directly without options

export const config = {
  matcher: [
    // Match all request paths except for files with extensions, Next.js internal paths, and Clerk's auth routes
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|(api|trpc)(.*)|(sign-in|sign-up)(.*))).*)',
  ],
};
