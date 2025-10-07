# 🛍️ Commerce Storefront

> Modern, fast, and feature-rich front-end for your e-commerce store.
> **Companion project:** [Commerce Admin Dashboard](https://github.com/Busra-Demirkesen/commerce-admin.git)

---

## ✨ Overview
The **Commerce Storefront** delivers a seamless, fast, and responsive shopping experience for customers. It is built with the latest front-end technologies to maximize SEO and performance. It integrates directly with the Commerce Admin Dashboard to display real-time product data, manage shopping carts, and handle secure payment processing via Stripe.

---
<img width="1572" height="758" alt="e-commerce project screenshot1" src="https://github.com/user-attachments/assets/ac1d0584-e7d3-42ed-ad19-ffab35c6c28a" />


<img width="1575" height="755" alt="e-commerce project screenshot2" src="https://github.com/user-attachments/assets/e138e8da-f061-4609-bb51-60dcb5706798" />


<img width="1567" height="754" alt="e-commerce project screenshot3" src="https://github.com/user-attachments/assets/027d3af0-7f9f-4986-b6de-b8965f71f4e9" />







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

```
---
## 🔗 Related Links

⚙️ Admin Dashboard Repo: [Commerce Admin Dashboard](https://github.com/Busra-Demirkesen/commerce-admin.git)
🌐 Admin Live Demo: [Live Demo](https://commerce-admin-roan.vercel.app/8a2df2f4-9303-4feb-8caf-d0869eb9e6fd/products/new)
🛒 Storefront Live Demo: [Live Demo](https://commerce-store-hazel.vercel.app/)

---

> ⭐ "Code is like humor. When you have to explain it, it’s bad."
