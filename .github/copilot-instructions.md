# Luxury Gold Marketplace & Secure Shipping Service

This is a Next.js 14 application for a premium service that buys & sells gold & fine jewelry and converts Bitcoin to cash, with an integrated secure shipping concierge service.

## Project Structure Guidelines

- Use TypeScript for type safety
- Follow Next.js 14 App Router conventions
- Implement security best practices
- Maintain test coverage ≥80%
- Follow accessibility guidelines (WCAG 2.1 AA)

## Development Rules

- All API endpoints must include error handling
- Implement rate limiting for public endpoints
- Use prepared statements for database queries
- Include audit logging for sensitive operations
- Maintain comprehensive E2E test coverage

## Security Requirements

- Implement TLS, HSTS, and CSP headers
- Use parameterized queries for database operations
- Implement RBAC for admin functions
- Include audit logging for sensitive operations
- Follow KYC/AML compliance requirements

## Testing Requirements

- Unit tests with Jest
- E2E tests with Playwright
- Load testing to 100 RPS baseline
- Security scanning with Snyk
