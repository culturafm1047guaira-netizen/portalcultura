# Homepage Hero Redesign Implementation Plan

> **Goal:** Implement the new distinctive, non-generic visual identity for the Rádio Cultura FM 104.7 homepage hero section.

**Architecture:** 
- Use a specialized `HeroWave` component for the animated frequency visualization.
- Implement a new `CategoryNav` for informative, color-coded navigation.
- Update `globals.css` with the defined token system (colors and fluid typography).
- Integration into `src/app/page.tsx` and `src/app/HomePage.tsx`.

**Tech Stack:** Next.js, Tailwind CSS, SVG/CSS Animations, Google Fonts.

---

## File Mapping

- **New Files:**
    - `src/components/HeroWave.tsx`: Animated SVG frequency visualization.
    - `src/components/CategoryNav.tsx`: Color-coded navigation for categories.
- **Modified Files:**
    - `src/app/globals.css`: Addition of the new design token system.
    - `src/app/layout.tsx`: Font configuration (Bebas Neue & IBM Plex Sans).
    - `src/app/page.tsx` & `src/app/HomePage.tsx`: Integration of new components and layout changes.

---

## Tasks

### Task 1: Design Token Setup
**Files:** `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1.1: Update `globals.css` with the new color palette.**
    - Define CSS variables for `sintonia-azul`, `cerrado-verde`, `entardecer-laranja`, `vinil-preto`, `papel-jornal`, and `estatica-branco`.
    - Add fluid typography scale using `clamp()`.
- [ ] **Step 1.2: Configure fonts in `layout.tsx`.**
    - Import `Bebas Neue` and `IBM Plex Sans` via `next/font/google`.
    - Assign font variables to the body and specific utility classes.
- [ ] **Step 1.3: Commit.**
    - `git commit -m "style: implement design token system and typography"`

### Task 2: HeroWave Component Development
**Files:** Create `src/components/HeroWave.tsx`

- [ ] **Step 2.1: Create the SVG structure for the wave.**
    - Implement the path that forms "104.7" and the ambient noise lines.
- [ ] **Step 2.2: Implement "Tuning" animation.**
    - Use CSS animations or `stroke-dashoffset` to simulate the digits forming upon page load.
- [ ] **Step 2.3: Implement pulse/idle animation.**
    - Add subtle amplitude oscillation for the "alive" feeling.
- [ ] **Step 2.4: Handle accessibility.**
    - Add `aria-label` and respect `prefers-reduced-motion`.
- [ ] **Step 2.5: Commit.**
    - `git commit -m "feat: add HeroWave animated frequency component"`

### Task 3: CategoryNav Implementation
**Files:** Create `src/components/CategoryNav.tsx`

- [ ] **Step 3.1: Build the navigation structure.**
    - Create a horizontal list of categories (Local, Regional, Brasil, Agro, etc.).
- [ ] **Step 3.2: Implement color coding.**
    - Assign specific colors from the token system to each category.
- [ ] **Step 3.3: Add interaction states.**
    - Implement the animated underline for active items and scale/color changes on hover.
- [ ] **Step 3.4: Commit.**
    - `git commit -m "feat: add color-coded CategoryNav component"`

### Task 4: Homepage Integration
**Files:** `src/app/page.tsx`, `src/app/HomePage.tsx`

- [ ] **Step 4.1: Remove old hero content.**
    - Clean up the existing hero section to make room for the new design.
- [ ] **Step 4.2: Integrate `HeroWave` and `CategoryNav`.**
    - Position the `HeroWave` at the top with the new tagline and action bar (Live/Listen Now).
- [ ] **Step 4.3: Adjust Page Layout.**
    - Implement the "Featured + Grid" layout for news cards.
- [ ] **Step 4.4: Commit.**
    - `git commit -m "feat: integrate new hero and navigation into homepage"`

### Task 5: Final Polishing & A11y
**Files:** `src/app/globals.css`, `src/app/page.tsx`

- [ ] **Step 5.1: Verify contrast and focus states.**
    - Ensure all interactive elements have visible focus rings using `entardecer-laranja`.
- [ ] **Step 5.2: Test responsiveness.**
    - Verify layouts for Mobile, Tablet, and Desktop breakpoints.
- [ ] **Step 5.3: Final commit.**
    - `git commit -m "style: final polish and accessibility audit"`

---
## Self-Review
- [x] Spec coverage: All items from the design proposal are mapped to tasks.
- [x] No placeholders: Every step has clear technical requirements.
- [x] Consistency: Variable names and component names are consistent.
