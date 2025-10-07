# 🛍️ Commerce Storefront

> Modern, fast, and feature-rich front-end for your e-commerce store.
> **Companion project:** [Commerce Admin Dashboard](https://github.com/Busra-Demirkesen/commerce-admin.git)

---

## ✨ Overview
The **Commerce Storefront** delivers a seamless, fast, and responsive shopping experience for customers. It is built with the latest front-end technologies to maximize SEO and performance. It integrates directly with the Commerce Admin Dashboard to display real-time product data, manage shopping carts, and handle secure payment processing via Stripe.

### 🔑 Key Features
- ⚡ **Speed & Performance:** Optimized with Next.js Server Components and Image Optimization for superior loading times and SEO.
- 🔎 **Product Browsing:** Features category-based filtering, advanced searching, and dynamic sorting.
- 🛒 **Cart Management:** Client-side cart management using local storage for a seamless shopping experience.
- 💳 **Secure Checkout:** Fully integrated Stripe payment flow for secure transactions.
- 📱 **Design:** Fully responsive and accessible UI built with Tailwind CSS.

---

## 🧰 Tech Stack
- **Framework:** Next.js (App Router) + React + TypeScript  
- **UI:** Tailwind CSS + shadcn/ui + Radix  
- **Payments:** Stripe  
- **Deployment:** Vercel  

---

## ⚙️ Setup Instructions
```bash
# 1️⃣ Clone the repository
git clone [https://github.com/Busra-Demirkesen/commerce-store.git](https://github.com/Busra-Demirkesen/commerce-store.git)
cd commerce-store

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
# Fill in the keys needed for the Storefront to communicate with the Admin Dashboard.
# Example:
NEXT_PUBLIC_API_URL= (The live Vercel URL of your Admin Dashboard API)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= (Your public Stripe key)

# 4️⃣ Start the development server
npm run dev
# http://localhost:3000
