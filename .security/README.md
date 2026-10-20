# Website security checks

Scope: KaoticDan/Titan-Dumpster-Rental-Website; source baseline 7641581c427ebfa67b3a016b65e471df2c7c0323. Production build commands and application code are unchanged.

The required status is **Website security gate**. It fails when a required job fails, skips, lacks a receipt, or reports another revision. CI alone does not enforce merges or production assignment: configure GitHub branch protection and Vercel Deployment Checks separately. Do not force-promote a deployment with a failed required check.

Checks: full-history redacted Gitleaks; four locally tested Semgrep rules; frozen dependency install without lifecycle scripts; high/critical dependency audit including development packages; typecheck; isolated security regressions; production compilation using local/synthetic CMS data. Scheduled scans run weekly as well as on pull requests and main pushes. No repository or deployment secrets are required.

CI removes Supabase/database environment variables and refuses local environment files. Backend form tests use synthetic responses and never submit real leads.

A passing workflow does not certify RLS, provider settings, live authentication, headers, rate limiting, or all application security. Existing advisories remain blockers; do not omit development dependencies or add audit exceptions to turn the gate green.

Dependency metadata audit transfer to registry.npmjs.org approved by the owner on 2026-10-20 for the six package-based websites. No source or secrets are intentionally sent.
