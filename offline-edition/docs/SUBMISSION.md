# QuotePilot v2.1 submission verification

This package contains the verified QuotePilot v2.1 application, developer tests, fictional sample data, bundled dependencies and licenses, operating documentation, and four actual application screenshots. It excludes unrelated workspace projects, temporary QA servers, browser workspaces, credentials, source Git metadata and hosting-account configuration.

## Application integrity

The runtime files, launcher, package metadata, sample generator and test sources are unchanged from release source commit `4726cf4d46818db1b8f8f088a3e91bf462c55543`. Documentation and screenshots are the scope of this submission. No redesign or functionality change was made.

The 70 automated tests passed again in this isolated submission folder using Node.js 24. The entry point's local asset checks and sample cost assertions are part of that suite. The packaged launcher points to `dist/index.html`; no build or dependency installation is needed for users.

## Screenshot provenance

Captured on November 14, 2026 (America/Denver), from the actual v2.1 application running in the Codex in-app Chromium browser with the fictional Office essentials project. The screenshot flow was landing page → Explore the sample → Analysis overview → Quote matrix → AI Advisor. The four files were visually inspected, and the browser reported no console errors or warnings during capture.

| Screen | Relative project path |
| --- | --- |
| Landing page | `docs/screenshots/landing.jpg` |
| Procurement dashboard | `docs/screenshots/procurement-dashboard.jpg` |
| Supplier comparison | `docs/screenshots/supplier-comparison.jpg` |
| AI Advisor | `docs/screenshots/ai-advisor.jpg` |

All four are embedded directly in the root README using relative Markdown image paths. No screenshots contain an API key or real supplier records. The AI Advisor capture is explicitly labeled as the local calculation-backed brief, not an authenticated external AI result. File sizes and SHA-256 hashes are recorded in [SUBMISSION.json](SUBMISSION.json).

## API verification boundary

Authenticated external-provider connections and real-model report generation remain unverified because no live test credential was available. Both supported protocols and failure handling were tested against controlled local responses during v2.1 verification. See [TESTING.md](TESTING.md) for the distinction between those checks and provider-specific behavior. No new external AI request was made for this submission.

## AgentGit publication scope

The submission contains this QuotePilot Codex conversation and the explicitly staged QuotePilot package. Publication uses manual AgentGit import/commit, file staging/file commit and push operations. Automatic upload remains disabled. The default intended visibility is private; a submission URL does not by itself grant access to non-members.

AgentGit stores conversation history separately from ordinary project files. The root README and its screenshot paths must be kept together in the branch's file tree. The ZIP artifact is a convenience copy; it does not replace the individual source and image files.
