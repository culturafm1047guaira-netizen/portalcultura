# Complete Check-up - Rádio Cultura FM 104.7

Comprehensive audit and refinement of the Rádio Cultura FM 104.7 news portal (V5).

## Overview
This plan addresses the failures identified during the initial master checklist run, focusing on SEO, UX, and Testing environments.

## Project Type
**WEB** (HTML/CSS/JS, Vercel Deploy)

## Success Criteria
- [ ] SEO Audit passes (No missing OG tags, single H1 per page).
- [ ] UX Audit passes (HSL colors, fluid typography, improved accessibility).
- [ ] Test Suite executes successfully (Jest/Playwright).
- [ ] Performance Audit (Lighthouse) score > 90.

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3 (Custom Design System), JS (ES6+).
- **Backend/API**: Vercel Serverless Functions (Node.js).
- **Deployment**: Vercel.
- **Testing**: Jest, Playwright.

## Proposed File Structure
(Existing structure maintained, minor adjustments to CSS and Meta tags)

## Task Breakdown

### Phase 1: SEO Optimization
- **Task 1.1**: Fix multiple H1 tags in `index.html`.
  - **Agent**: `seo-specialist`
  - **Input**: `index.html`
  - **Output**: Single H1 tag.
  - **Verify**: Run `seo_checker.py`.
- **Task 1.2**: Implement Open Graph (OG) tags for social sharing.
  - **Agent**: `seo-specialist`
  - **Input**: `index.html`, `termos.html`, `transparencia.html`.
  - **Output**: Added `<meta property="og:..." />` tags.
  - **Verify**: Run `seo_checker.py`.

### Phase 2: UX & Accessibility
- **Task 2.1**: Refine Color Palette (HSL & Contrast).
  - **Agent**: `frontend-specialist`
  - **Input**: `css/style.css`
  - **Output**: Convert hex to HSL, fix pure white backgrounds (#F9FAFB), adjust colors for "Gastrô/Food" context.
  - **Verify**: Run `ux_audit.py`.
- **Task 2.2**: Implement Fluid Typography (`clamp()`).
  - **Agent**: `frontend-specialist`
  - **Input**: `css/style.css`
  - **Output**: Replace fixed `px` with `clamp()` for responsive font sizes.
  - **Verify**: Run `ux_audit.py`.
- **Task 2.3**: Improve Offline Page UX.
  - **Agent**: `frontend-specialist`
  - **Input**: `offline.html`
  - **Output**: Added brand story, social proof, and tightened typography.
  - **Verify**: Run `ux_audit.py`.

### Phase 3: Technical & Environment
- **Task 3.1**: Fix Test Runner Environment.
  - **Agent**: `backend-specialist`
  - **Input**: `.agent/skills/testing-patterns/scripts/test_runner.py`
  - **Output**: Improved command execution for Windows/PowerShell.
  - **Verify**: Run `test_runner.py`.
- **Task 3.2**: Run and Fix Existing Tests.
  - **Agent**: `test-engineer`
  - **Input**: `tests/` directory.
  - **Output**: All tests passing.
  - **Verify**: `npm test`.

## Phase X: Final Verification
- [ ] Run `python .agent/scripts/verify_all.py .`
- [ ] Manual Audit: No purple colors, no template layouts.
- [ ] Accessibility: Check keyboard navigation and screen readers.
