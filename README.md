# DevHQ React Portfolio

This is the React migration of the original HTML/CSS/GSAP portfolio. It preserves the original content, visual system, responsive layout, Three.js particle background, GSAP/ScrollTrigger animations, custom cursor, typing headline, floating navigation, tilt/magnetic interactions, skills filtering, resume modal, and Vercel/Resend contact form.

## Stack

- React
- TypeScript (strict mode)
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js
- Vite
- Vercel serverless API + Resend

## Architecture

```text
src/
├── components/        # UI sections and interactive components
├── data/              # data-driven portfolio content
├── hooks/             # typing, motion preferences, GSAP and pointer effects
├── styles/            # Tailwind entry + preserved visual/effect CSS
├── types/             # strict TypeScript models
├── App.tsx
└── main.tsx
api/
└── submit.ts          # typed Vercel contact endpoint
public/
└── assets/            # resume and future static assets
```

## Why `legacy.css` is intentionally retained

The source design contains many animation-specific, pseudo-element, glassmorphism, transform, custom-property, and breakpoint rules. Keeping those rules intact minimizes visual drift during the framework migration. Tailwind is fully configured and used for appropriate utility styling, while the complex source visual system remains in CSS as allowed by the migration specification.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

### Contact API locally

The frontend runs with Vite, but `/api/submit` is a Vercel function. For the complete app including the contact endpoint:

```bash
npm install
cp .env.example .env
npm run vercel:dev
```

Set:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Production build

```bash
npm run build
```

## Customize

Update portfolio content in `src/data/portfolio.ts` and the remaining personal placeholders in the section components. Add your resume as:

```text
public/assets/resume.pdf
```

## Migration notes

- No global CDN GSAP or Three.js scripts are used anymore; both are imported as npm modules.
- GSAP animations are scoped with `gsap.context()` and reverted on unmount.
- Three.js buffers, materials, renderer, event listeners and animation frames are disposed/cleaned up.
- DOM-based tilt and magnetic effects are scoped to the React root and cleaned up.
- Repeated portfolio entries are data-driven and typed.
- The Vercel API was converted from CommonJS JavaScript to TypeScript.
- Reduced-motion behavior and semantic accessibility are preserved/improved without redesigning the UI.
