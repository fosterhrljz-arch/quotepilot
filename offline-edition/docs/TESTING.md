# QuotePilot 2.1 verification

Version 2.1 retains the v2 interface and static architecture. Verification used fictional procurement data, Node 24 and the Codex in-app Chromium browser on Windows. No external provider key or real quotation was used.

## Results

70 automated tests pass: 41 retained v2 tests plus 29 targeted regression tests. Run `node --test tests/*.test.cjs` from the source checkout. JavaScript syntax checks also passed. Sample totals remain $1,783.19, $1,636.42 and $1,755.00.

| Area | Finding and fix | Verification |
| --- | --- | --- |
| Excel dates | Display-formatted dates previously failed ISO validation. Numeric cells now use the correct 1900/1904 epoch; text ambiguity requires a choice. | Serialized XLSX fixtures in both epochs; invalid serial/date rejection; browser expiry displayed as 2026-12-31. |
| Numeric precision | Display formatting could change 1.2345 into 1.23 before calculation. Raw numeric values are retained and the matrix displays four-decimal unit prices. | Actual Excel import, saved quote, downloaded workbook reopened with 1.2345 and $24.69 line subtotal. |
| CSV import | SheetJS type inference could alter codes/dates. Plain-text parsing is now deferred until mapping. | Leading-zero 00123 preserved; ambiguous 03/04/2027 blocks at H2, choosing day-first produces 2027-04-03. |
| Matching | Name-only matching conflated specifications and SKUs. A shared conservative identity rule now governs all comparison surfaces. | A cheaper 100-sheet pack is excluded for a 500-sheet requirement despite equal name and SKU; matrix shows no corresponding price. Same SKU/spec with different display names remains comparable. |
| Split cost | Quantity-mismatched allocations could show a misleading partial total. | Missing or mismatched lines now yield no comparable total. Freight, minimums and partial-order constraints remain enforced. |
| API key lifecycle | Session keys were not explicitly endpoint-bound and stale consent was insufficiently guarded. | Key absent from localStorage/backups; endpoint changes clear it; mismatched endpoint refused; changed connection invalidates consent; edited settings cannot test an old endpoint. |
| API transport | Responses were bounded only after reading and Chat lacked an output budget. | Streaming cap, key header injection rejection, 401/403/429/500, malformed output, cancel and timeout tests; both supported protocols verified through browser fetch to a CORS-enabled loopback fixture. |
| Recommendations | Alternative selection could inherit the weighted leader's budget actions and export figures. | Atlas alternative shows $1,783.19, $16.81 headroom and $73.39/day conditional speed threshold in UI and HTML/XLSX reports. Recording defaults to the displayed supplier. |
| Setup and review | Initial form exposed advanced requirements; edits could retain review confirmation. | Name/currency-only creation succeeds; optional fields remain available; item edits/add/remove invalidate review. |
| Stale results | Old AI actions could appear under a current local leader. | Current local actions are used when a saved AI report is stale or invalid. |

## Browser workflow performed

Created a new project without advanced requirements → uploaded an XLSX with formatted dates/prices and conflicting pack specifications → reviewed both supplier quotes → confirmed only the matching quote is eligible → imported CSV with an ambiguous date → corrected the date-order option → saved the quote → inspected comparison/advice → exported and reopened the actual downloaded workbook.

A separate fictional provider fixture exercised connection probes and full report generation for Chat Completions and Responses. It deliberately selected an eligible alternative, then returned invalid invented output and authentication errors. The app accepted the supported alternative, rejected unsupported output, preserved local analysis, and displayed actionable errors. Changing endpoints cleared a dummy key. An unsaved edited endpoint could not be tested until saved. A purchasing decision was recorded and a readable report downloaded with the chosen supplier and amount.

English desktop and Chinese mobile interfaces were checked, including the simplified creation dialog. The mobile viewport was 390 × 844; document content and scroll width were both 375 px (the scrollbar consumes the remainder), with no horizontal page overflow. Page identity, nonblank content, absence of an error overlay, control interactions and screenshots were verified. Console checks on the inspected test tabs reported no application errors or warnings. Browser controls used the available CUA in-app browser; no external Playwright browser was installed.

## Live provider boundary

**Authenticated external AI connection and real model generation remain unverified.** The user could not complete credential configuration during this session. Local fixture and transport tests establish app behavior, not compatibility with every provider, model, CORS policy or billing account. No real-provider success is claimed.

To verify your provider: enter the complete endpoint, protocol, model and restricted test key in Settings; save; run the connection test; then generate a report from the fictional sample after reviewing the outgoing snapshot. A connection probe alone does not verify the full report contract. The model must accept the documented token-limit parameter and return the evidence-ID JSON contract. Production credentials should be held by a user-managed authenticated backend, not treated as protected merely because they are memory-only in a browser.

## Remaining practical limits

Matching is deliberately conservative: different vendor codes or equivalent differently worded specifications need buyer review; no automatic conversion or synonym inference occurs. Existing projects without separate SKU/specification fields need those details added if names alone are insufficient. Spreadsheet formulas are not recalculated. Multiple supplier revisions in one mapped supplier group are rejected when terms conflict. Browser-local storage is not multi-user synchronization or a tamper-proof audit log. Cross-browser tests beyond the supplied Chromium environment and exhaustive accessibility testing were not performed.
