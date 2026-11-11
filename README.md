# LuxuryGold — marketplace prototype

LuxuryGold is an early-stage Next.js marketplace prototype for precious metals and fine jewelry. The repository contains customer-facing pages, authentication scaffolding, database models and several API route foundations.

**This is not production-ready.** Do not accept customer funds, promise shipments, claim KYC/AML compliance, or use it to store real identity documents until the integrations and controls listed below are completed and independently tested.

## Current project status

- Next.js App Router, TypeScript and Tailwind CSS.
- Prisma/PostgreSQL schema and NextAuth scaffolding.
- Development-only sample market prices can be enabled with `USE_MOCK_PROVIDERS=true`; responses are explicitly labelled `DEMO`.
- Bitcoin conversion is disabled by default. No live quote, exchange, payout or settlement provider is integrated.
- Shipment creation returns `503 SHIPMENT_PROVIDER_NOT_CONFIGURED` instead of inventing shipment IDs or pickup tokens.
- KYC flow is a workflow placeholder, not an identity-verification or AML certification.
- Payment processing, custody, vault storage and live video appraisal must not be represented as operational.

## Local development

This repository currently has no committed npm lockfile. Install from the declared dependency ranges:

```sh
npm install
cp .env.example .env.local
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Checks

```sh
npm run lint
npm run type-check
npm test
npm run test:e2e
```

The GitHub Actions workflow also installs Playwright browsers. A Snyk scan runs only when the repository secret `SNYK_TOKEN` is configured; otherwise the workflow reports that the scan was skipped. A skipped scan is not a security pass.

## Before any production launch

- Commit and review a reproducible npm lockfile.
- Complete dependency, type, unit, integration and browser testing.
- Implement server-side order persistence, payment idempotency and signed webhooks.
- Integrate a real market-data/crypto provider and verify quote freshness.
- Implement carrier booking, tracking, insurance and claims workflows.
- Integrate a licensed KYC provider and review AML obligations with qualified counsel.
- Add distributed rate limiting, audit logging, monitoring, backup and incident response.
- Review privacy, data retention, PCI scope, custody and financial-services obligations.
- Verify all claims and service availability before publishing marketing copy.

## Secrets

Never commit `.env.local` or real API credentials. Keep provider secrets in the deployment platform's encrypted environment settings. The committed `.env.example` contains placeholders only.
