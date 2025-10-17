# LuxuryGold - Premium Jewelry Marketplace & Secure Shipping

A production-ready platform for buying & selling gold & fine jewelry, with Bitcoin conversion and secure shipping services.

## Features

- Buy & sell precious metals and jewelry
- Bitcoin to cash conversion
- Secure shipping with real-time tracking
- Multi-tier shipping options
- KYC/AML compliance
- Blockchain-backed chain of custody
- Live video appraisals
- Vault storage options

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run database migrations
npm run db:migrate

# Seed demo data
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Technology Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- PostgreSQL with Prisma
- NextAuth.js
- Jest & Playwright for testing

## Development

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint
```

## Security & Compliance

- TLS/HTTPS required
- HSTS enabled
- CSP headers configured
- Rate limiting implemented
- KYC/AML compliant
- Regular security audits
- 2FA supported

## Environment Variables

Required environment variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
COINBASE_API_KEY=...
STORAGE_BUCKET=...
```

## API Documentation

API documentation is available at `/api-docs` when running in development mode.

## License

Copyright © 2025. All rights reserved.
