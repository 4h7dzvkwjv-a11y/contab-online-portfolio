# Contab Online — Product & Engineering Portfolio

**Live product:** https://contab-online.ro  
**Technology:** Next.js, React, TypeScript, Node.js, automated tests  
**Focus:** Search and information architecture, fiscal/editorial content, tax utilities, responsive UX and release quality.

This public repository is a **curated source-code snapshot** of a real accounting information platform. It is provided for technical portfolio review, not as a complete production deployment or as a licensed accounting service.

## What the product does

Contab Online organizes accounting and tax information into an article library with categories, search, editorial updates, interactive utility pages and contact journeys. Its responsive UI is designed to help Romanian users find relevant information quickly.

## Engineering areas to review

| Area | Code |
| --- | --- |
| Navigation, responsive views and SEO | [src/app](src/app) |
| Search, article data and domain logic | [src](src) |
| Tax utilities | [src/app/calculator-taxe](src/app/calculator-taxe) |
| Automated regression checks | [tests](tests) |
| Developer tooling and route checks | [scripts](scripts) |
| Contact service example | [services/contact](services/contact) |

## My responsibilities

I led product discovery and requirements, feature prioritization, acceptance criteria, UI/UX decisions, QA reviews and release decisions. I worked with AI-assisted coding agents to deliver implementations and reviewed their behavior against the intended product rules. This is a **product-builder / technical-delivery** portfolio, not a claim that I manually typed every line of code.

## Engineering principles

- Design for discoverability, accessibility and mobile-first usability.
- Keep content data separated from presentation and routing.
- Treat frontend validation as user experience; sensitive enforcement belongs on the server.
- Verify routing, search and calculator behavior with repeatable tests.
- Apply human review to AI-generated implementations before release decisions.

## Local exploration

Node.js and npm are required. Standard scripts in package.json include npm ci, npm run dev, npm run typecheck and npm test. Some integration paths require separate deployment configuration and are intentionally not included.

## Publication scope

- Exported to a **new Git history**, separate from the private working repository.
- Operational reports, research evidence, private deployment metadata, logs and credentials are intentionally excluded.
- No direct CI/CD connection to the live product is configured.
- Public business contact details may appear in the application source; no private customer database or financial records are included.
- Shared for portfolio review; not a license to resell or impersonate the product.

**Portfolio snapshot:** 9 November 2026.
