# Nexura | Technical Documentation

Nexura is a high-performance portfolio website built for a digital engineering agency. The project emphasizes a "Deep Tech" aesthetic, smooth interactivity, and professional-grade software architecture.

---

## 🚀 Core Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) - Utilizing the latest React 19 features and Turbopack for lightning-fast builds.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Ensuring type safety and robust architecture across the application.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Leveraging the new `@theme` engine for custom brand variables.
- **Animations:** [Framer Motion 12](https://www.framer.com/motion/) - Powering complex UI transitions, spring physics, and scroll-linked animations.

---

## 🎨 Design & UI/UX

### Visual Identity (Graphic Charter)
- **Primary Color:** Electric Cyan (`#00D7D7`) - Neon highlight.
- **Background:** Midnight Navy (`#051221`) - Deep space aesthetic.
- **Typography:**
  - **Montserrat:** Headlines and Wordmark (Geometric Sans).
  - **JetBrains Mono:** Technical data, code snippets, and labels.

### Custom UI Components
- **Neural Particle Network:** Custom **HTML5 Canvas API** implementation for background connectivity effects.
- **Holographic Navbar:** Dynamic background opacity, glowing logo hover effects, and animated link underlines.
- **3D Tilt System:** Reusable `TiltCard` component for perspective-shifting interactivity.
- **Hacker Text Effect:** Scramble/Decryption algorithm for the Hero headline.
- **System Boot Preloader:** Cinematic splash screen simulating a technical initialization.
- **Holographic Toggle:** Custom-built language switcher with sliding neon highlights.
- **Interactive Cursor:** "Target" cursor with spring-physics lag and mix-blend-mode effects.

---

## 🌍 Localization (i18n)

The site features a lightweight, custom-built internationalization system:
- **Default Language:** French (FR).
- **Secondary Language:** English (EN).
- **Architecture:** `LanguageContext` provider using React Context API for instant, no-refresh UI updates.
- **Dictionaries:** Centrally managed translation files in `src/locales/`.

---

## 🛠️ Tools & Libraries

| Tool | Purpose |
| :--- | :--- |
| **Lucide React** | Scalable vector icons for technical clarity. |
| **Clsx & Tailwind-Merge** | Efficient management of dynamic CSS classes. |
| **ESLint** | Code quality and standard enforcement. |
| **Git** | Version control with semantic commit messages. |

---

## 📁 Directory Structure

```text
src/
├── app/            # Next.js App Router (Layouts & Pages)
├── components/     # High-level section components (Hero, Services...)
│   └── ui/         # Atomic interactive components (Particles, Toggles...)
├── context/        # React Context Providers (Language state)
├── locales/        # Translation dictionaries (FR/EN)
└── public/         # Static assets (Logos, SVGs, Grids)
```

---

## 🔧 Technical Implementation Details

- **Spring Physics:** Used `useSpring` and `useMotionValue` for the Custom Cursor and 3D Tilt effects to ensure "weight" and "inertia" in UI interactions.
- **Hydration Management:** Implemented `useEffect` guards for `Math.random()` and window-dependent logic (Cursor/Particles) to prevent Next.js hydration mismatches.
- **Class Merging:** Employed `tailwind-merge` and `clsx` patterns for clean, conflict-free dynamic styling.
- **Asset Optimization:** Leveraged `next/image` for automatic WebP conversion and layout stability of the brand logo.
- **Infinite Marquee:** Handled using CSS-transform-based animations in Framer Motion for hardware-accelerated performance.

---

## ⚡ Getting Started

1. **Install:** `npm install`
2. **Dev:** `npm run dev`
3. **Build:** `npm run build`
