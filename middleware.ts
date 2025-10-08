
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  
  "/cart/add(.*)",       
  "/cart(.*)",           
  "/checkout(.*)",       
  
  "/api/cart(.*)",
  "/api/checkout(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (process.env.NEXT_PUBLIC_E2E === 'true') {
    
    return;
  }
  if (isProtectedRoute(req)) {
    
    
    auth.protect({ 
      unauthenticatedUrl:
        `/sign-in?redirect_url=${encodeURIComponent(req.url)}`,
    });
  }
});


export const config = {
  matcher: [
    
    "/((?!_next/static|_next/image|favicon.ico).*)",
    
    "/",
    
    "/(api|trpc)(.*)",
  ],
};
