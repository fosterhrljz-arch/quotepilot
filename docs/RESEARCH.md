# Research before implementation

Research date: 2026-11-14 (America/Denver). Public primary documentation and product pages were reviewed; no trial account was created and no vendor claims were treated as independently measured performance.

| Product / primary source | Observed workflow and interface pattern | Adaptation for QuotePilot |
|---|---|---|
| [Precoro RFP workflow](https://help.precoro.com/how-to-create-a-request-for-proposal) | Define currency and delivery needs, add items/suppliers, review proposals, compare coverage and totals, award items. The matrix distinguishes unquoted items and additional supplier lines. | Project-first purchasing, explicit basket coverage, review gate, separate full-basket and split-order scenarios. No automatic supplier communication. |
| [Precoro dashboards](https://help.precoro.com/dashboards) | Task-oriented entry points, separate analytical tabs, hover values, drill-down, spend-versus-budget and savings with an explicit baseline. | Clickable cost bars and scatter points open the underlying quote evidence. Quote spread is labeled separately from savings against the project's user-entered baseline. |
| [Odoo Purchase 19](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/purchase/manage_deals/calls_for_tenders.html) | Linked alternative RFQs, a product-grouped comparison table, quantities and unit/total prices, and explicit line selection before confirming orders. | Product matrix, consistent units/quantities, manual split allocation with recalculated supplier freight. No claim that picking each cheapest line guarantees the cheapest order. |
| [Procurify Spend Insights](https://success.procurify.com/en/articles/11072318-spend-insights-overview) | Vendor documentation describes interactive views by dimension and purchasing/budget dashboards. Correct source URL: https://success.procurify.com/en/articles/11072318-spend-insights-overview . [Analytics product page](https://www.procurify.com/procure-to-pay/procurement/analytics/) also describes data validation and change histories. | Consistent project filters, named metric definitions, traceable decision snapshots and separate quoted-versus-observed delivery evidence. No fabricated spend histories. |
| [Spendesk request management](https://helpcenter.spendesk.com/en/articles/9730064-procurement-create-and-manage-procurement-requests) | Filtered in-progress requests, an explicit create action, request detail sections and a change trail. | Searchable project register, archive/restore, guided workflow and a local activity log. Avoid pretending a single-user local app has team approvals. |
| [Apple Mac](https://www.apple.com/mac/) | Restrained navigation, prominent product-focused headings and progressive content hierarchy. | Minimal landing page with a real sample comparison, concise actions and a separate dense application workspace. No copied Apple assets or commercial claims. |

Visual evidence: the public Precoro RFP screenshot was downloaded and inspected, showing a compact document-oriented item table and explicit supplier assignment. Odoo documentation describes and illustrates the product-grouped compare view; its direct browser page was unavailable during one visual retrieval. Procurify/Spendesk patterns are grounded in their public help descriptions, not hands-on logged-in use.

## Decisions arising from the audit

- Financial precision is an invariant: decimal inputs become integer minor units, using half-up rounding. Supported currency precision is explicit.
- Import percentage-point versus decimal-fraction interpretation is selected, never guessed from a value below one.
- Cost score is proportional (`lowest eligible total / supplier total × 100`), avoiding the extreme min–max score for a tiny price gap. Delivery uses user-visible target and zero-score thresholds. Reliability uses supplied evidence, not cohort min–max scaling.
- Missing data required by an active criterion excludes that quotation from ranking; it does not silently remove that criterion for every supplier. Unknown reliability remains unknown.
- Quote validity, data review, basket match, quantity/unit match, MOQ, minimum order value and delivery requirements are explicit eligibility rules. Budget can be advisory or a hard cap.
- Model recommendations reference deterministic facts and validated opportunity IDs. Free-form model amounts or factual claims are never inserted into reports. Offline evidence-based advice remains available.

## API references

[Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create) and [Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) define the two supported request/response formats. Custom endpoints must implement one of these formats and permit browser CORS. A session-memory credential is sent only to the endpoint the user explicitly selects; procurement data requires a separate preview-and-send action.
