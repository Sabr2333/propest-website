# Propest.ai — Website

Next.js website voor [propest.ai](https://www.propest.ai).

> **Gebouwd met [Cursor](https://cursor.com)** — AI-powered code editor.  
> Deze site is ontwikkeld en onderhouden via Cursor (Next.js, React, TypeScript).

## Bestanden downloaden

Alle sitebestanden staan in deze repository. De klant kan:

1. **Downloaden als ZIP** — op GitHub: groene knop **Code** → **Download ZIP**
2. **Clonen** — `git clone https://github.com/Sabr2333/propest-ai-website.git`
3. **Openen in Cursor** — map openen in [Cursor](https://cursor.com) om verder te bewerken met AI-assistentie

## Vereisten

- Node.js 20+
- npm
- [Cursor](https://cursor.com) (aanbevolen voor bewerken)

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul secrets in
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Belangrijke mappen

| Map | Inhoud |
|-----|--------|
| `app/` | Pagina's, layouts, API-routes |
| `app/components/` | Herbruikbare React-componenten |
| `app/diensten/` | Dienstpagina's (AI Shoots, CRM, etc.) |
| `public/` | Statische bestanden (afbeeldingen, video's, `elara.html`) |
| `lib/` | Utilities (HubSpot, chatbot, etc.) |
| `app/context/LanguageContext.tsx` | NL/EN vertalingen |

## Environment variables

Zie `.env.example`. Zonder `OPENAI_API_KEY` werkt de chatbot niet; zonder HubSpot-variabelen werkt het Elara-wachtlijstformulier niet.

## Deploy (Vercel)

De site draait op Vercel. Na wijzigingen:

```bash
npm run build          # lokaal testen
vercel deploy --prod   # productie (Vercel CLI + login vereist)
```

Of koppel deze GitHub-repo aan Vercel voor automatische deploys bij elke push.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
```

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Taal:** TypeScript + React
- **Styling:** CSS Modules + globals.css
- **Hosting:** Vercel
- **Ontwikkeling:** Cursor
