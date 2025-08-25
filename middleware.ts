import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/', '/product/(.*)', '/category/(.*)', '/api/(.*)'],
});

export const config = {
  matcher: ['/((?!.+\.[\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
