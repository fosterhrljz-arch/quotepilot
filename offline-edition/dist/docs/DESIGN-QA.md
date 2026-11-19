# Design fidelity and visual verification

Reference concepts were generated before implementation and used as design direction:

- `design/v2-analysis-concept.png` — desktop procurement workspace.
- `design/v2-landing-concept.png` — landing, sample preview, workflow band and privacy band.

The actual interface is native HTML, CSS and SVG, not a screenshot backdrop. Its architecture preserves the existing static, double-click deployment model: `engine.js` owns calculations and eligibility, `analyst.js` the evidence contract, `charts.js` visualization, `ui.js` shell/storage, `pages.js` views, `forms.js` review/editing, `reports.js` exports and `v2-app.js` event orchestration.

## Fidelity ledger

| Comparison point | Concept evidence | Render evidence / decision |
|---|---|---|
| Landing copy and section order | “Better buying. Clearly.”; workspace/sample actions; sample preview; three-step workflow; “Your data. Your decision.” | Preserved in that order, with the same primary CTA labels. No invented marketing statistics or decorative hero badges. |
| Dashboard hierarchy | Sidebar, project selection, four-step workflow, four KPIs, comparison chart + decision lens, scatter/sensitivity, shortlist | Preserved. Navigation groups were consolidated into five functional pages so mapping/editing remain steps in quotation import rather than duplicate top-level routes. |
| Typography | Bold dark headline, compact navigation and chart labels, large numeric KPIs | Landing title enlarged after native-width inspection; Segoe UI/system font fallback keeps offline rendering. Desktop metric and lens spacing compacted in final QA. |
| Color and surface | White landing, white panels, cool neutral workspace, blue emphasis, violet/orange chart series | White and cool gray retained; no green-heavy palette or decorative gradients. Shared indigo accent is consistent across both screens. |
| Chart truthfulness | Generated concepts contain illustrative figures and inconsistent lead times/scores | Replaced with verified values, explicit tax/fee components, zero-based cost axes and 0–100 score axes. Actual sample delivery is 3/5/8 days. No invented history is displayed. |
| Component spacing | Bordered rounded panels, table shortlist, sparse landing bands | Preserved; the real dashboard is taller because it exposes reliability, delivery scoring anchors, baseline definitions and evidence guidance. It is intentionally scrollable instead of hiding required controls to fit the concept's single frame. |
| Assets and icons | Simple Q identity and outline utility icons | Native Q mark and a consistent 18px outline icon set. No decorative raster assets required. The sample preview is a live calculation, not an image. |
| Mobile | Same hierarchy must remain usable at narrow width | At 390×844, navigation reflows, panels stack and tables scroll inside their containers. Tiny scaled cost charts were replaced by native labeled bars. Crowded scatter labels moved to a readable legend. Chart clicks still open the same evidence inspector. |
| Behavior and motion | Interactive decision lens and workflow | Buttons, imports, edits, charts, scenarios and export actions are connected. Focus styles and reduced-motion preferences are supported. Only request progress uses a spinner. |

## Above-the-fold copy diff

Preserved: product name, principal landing headline/subtitle, “How it works,” “Your workspace,” “Open your workspace,” “Explore the sample,” analysis headline, workflow labels, four KPI concepts, comparison tabs and chart headings.

Intentional changes: a single “Current project” selector replaces a fictitious multi-organization selector; navigation contains Projects, Quotations, Analysis, AI Advisor and Settings. Added “Fictional sample,” data-readiness explanations, actual reliability controls, effective weights, fee category, quote-spread/baseline definitions, and explicit review/send/record actions because the working procurement process requires them. Generated financial labels/values were corrected. The landing preview shows items after discount rather than inconsistent illustrative subtotal/discount components.

## Verification method and outcome

Used Browser/IAB with real UI interactions, file chooser uploads and download events. Captured desktop at 1536×1024, landing near its native concept dimensions at 1072×1472, the normal browser viewport, and mobile at 390×844. The viewport's available content width can be 15 pixels narrower because of the browser scrollbar. Temporary viewport settings were reset and test tabs closed.

Used `view_image` to inspect **both concept images and the latest rendered screenshots in the same QA pass**. Compared copy, hierarchy, typography, palette, chart axes, icon treatment, spacing, mobile wrapping and asset/native-component treatment. Screenshots are included in `dist/screenshots` and the delivered package's `screenshots` folder.

The implementation was verified against the design direction, with the functional deviations documented above. No unresolved clipped primary content or inert workflow controls remained in the tested paths. This is a faithful adaptation of the design system, not a pixel-for-pixel reproduction of the generated illustrative data or its overly compressed dashboard.
