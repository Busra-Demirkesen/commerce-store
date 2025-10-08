// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  // Sayfa yolları
  "/cart/add(.*)",       // sepete ekleme sayfası/aksiyonu
  "/cart(.*)",           // sepet görüntüleme / işlem
  "/checkout(.*)",       // ödeme sayfası
  // API yolları (POST istekleri dahil)
  "/api/cart(.*)",
  "/api/checkout(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (process.env.NEXT_PUBLIC_E2E === 'true') {
    // In E2E runs, bypass auth protection to allow testing flows.
    return;
  }
  if (isProtectedRoute(req)) {
    // Giriş yapmamışsa otomatik yönlendir.
    // Girişten sonra aynı URL'ye dönmesi için redirect_url paramı geçiyoruz.
    auth.protect({ // Call auth.protect() directly
      unauthenticatedUrl:
        `/sign-in?redirect_url=${encodeURIComponent(req.url)}`,
    });
  }
});

/**
 * Matcher ayarı:
 * - Tüm sayfaları (statik dosyalar ve _next hariç)
 * - API ve trpc yollarını kapsar
 */
export const config = {
  matcher: [
    // Next.js dahili ve statik dosyaları hariç tut
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Ana sayfa için '/' de dahil et (eğer ayrı olarak belirtilmezse middleware tarafından işlenmez)
    "/",
    // API ve trpc rotalarını dahil et
    "/(api|trpc)(.*)",
  ],
};
