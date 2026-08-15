# Ipoh Discovery PWA

A local, mobile-first stakeholder MVP for discovering Ipoh, scanning demo QR tokens, earning points, and redeeming local rewards.

## Requirements

- Node.js 20+
- npm

This implementation runs as a local Next.js PWA prototype. Demo state is seeded in TypeScript and persisted in browser `localStorage`, so no cloud services or database setup is required for the local flow.

## Installation

```bash
npm install
npm run dev
```

Open:

- Landing page: `http://localhost:3000`
- Mobile PWA demo: `http://localhost:3000/app`

## Demo Credentials

```text
Email: demo@ipoh.local
Password: demo123
```

## Stakeholder Demo Flow

1. Login with the demo account.
2. Complete onboarding with Friends, Food, Coffee, Nature, and Culture.
3. Review personalized Home recommendations.
4. Open Kek Lok Tong.
5. Tap Scan QR.
6. Use the manual desktop token `IPOH-KLT-001`, or start camera access where supported.
7. Earn points and view the updated wallet.
8. Open Rewards.
9. Select Ipoh Keychain.
10. Redeem and show the generated redemption code.
11. Return to Home and Profile to show stories, posts, visits, points, and redemptions.

## Demo QR Tokens

```text
IPOH-KLT-001
IPOH-CONCUBINE-001
IPOH-PLATFORM-001
IPOH-KONGHENG-001
IPOH-INACTIVE-001
```

Duplicate scans are blocked per browser user state. Clear site data or remove `ipoh-discovery-demo` from localStorage to reset the demo.

## PWA

The app includes `public/manifest.webmanifest` and a basic offline shell service worker at `public/sw.js`.

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```
