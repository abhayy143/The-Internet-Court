# 🏛️ The Internet Court

**Let the Internet Judge You.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat&logo=framer)](https://www.framer.com/motion/)

> **🚀 Live Demo:** https://the-internet-court.vercel.app/

## 📖 The Pitch

The Internet Court is a viral web application built to settle petty disputes, workplace drama, and relationship arguments once and for all. 

Instead of arguing in circles, users submit their cases anonymously. The internet acts as the jury, casting their votes on who is in the wrong. Finally, an unforgiving AI Judge analyzes the public sentiment and drops a brutal, final verdict. 

## ⚙️ How It Works

1. **⚖️ File a Case:** Post relationship drama, a work conflict, or a petty argument anonymously.
2. **👥 The Jury Votes:** The public reads the evidence and votes on exactly who is in the wrong (*Guilty, Not Guilty, Both Clowns, or Needs Therapy*).
3. **🔨 AI Verdict:** A ruthless AI Judge analyzes the votes and drops the final judgment, calculating the Blame Split, Toxicity Score, and Red Flag Count.
4. **📸 Share the Receipt:** A custom, client-side HTML-canvas engine generates a perfectly formatted 1080x1080 square verdict card to download and share on Instagram Stories or X.

## ✨ Technical Highlights

- **Zero-Cost Viral Loop:** Engineered a completely client-side image generator using HTML Canvas. It dynamically measures text width, auto-scales typography, calculates multi-line breaks, and exports high-quality PNGs directly in the browser—costing $0 in server compute.
- **Modern Kinetics:** Tactile UI with Framer Motion spring physics, staggered card drop-ins, and dynamic gradient hover states for a premium dark-mode feel.
- **Edge-Ready:** Built on Next.js 15 App Router utilizing asynchronous dynamic routing and server-side Supabase data fetching.

## 🛠️ The Stack

- **Frontend:** Next.js 15 (React), Tailwind CSS, Framer Motion
- **Database & Auth:** Supabase (PostgreSQL)
- **UI Components:** shadcn/ui & Lucide React
- **Deployment:** Vercel

---

Made with ❤️ by [Abhayy](https://github.com/abhayy143/)