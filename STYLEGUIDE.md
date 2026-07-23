# onno landing style guide

Use this guide when adding or revising any page, section, or component in this repository. It captures the visual language of the hero specification without tying new work to a particular page, image, or piece of copy.

## Design direction

The site should feel editorial, calm, and technically credible. Prefer large type, generous space, restrained color, soft translucent surfaces, and one strong product visual over dense decoration.

- Use precise, quiet styling rather than ornamental UI.
- Let typography and spacing establish hierarchy.
- Keep most controls pill-shaped and most panels softly rounded.
- Use dark gray instead of pure black and muted gray instead of low-contrast body text.
- Use blur, shadows, and motion sparingly to create depth, not spectacle.
- Give each section one clear message and one primary action.

## Technology

- React and TypeScript
- Tailwind CSS 3 for component styling
- `lucide-react` for interface icons
- Custom CSS only for shared animation, browser quirks, or behavior that is awkward to express with utilities
- No additional UI library unless the project explicitly adopts one

## Typography

The primary font stack is already configured in `tailwind.config.js` and `src/index.css`:

```css
'Nimbus Sans TW01', 'Helvetica Neue', Helvetica, Arial, sans-serif
```

Apply antialiasing on `html`. Do not introduce a second display font.

### Type scale

- Hero heading: `text-[40px] min-[400px]:text-[44px] sm:text-6xl lg:text-[64px] xl:text-[76px]`
- Section heading: approximately `text-3xl sm:text-4xl lg:text-5xl`
- Card heading: approximately `text-lg sm:text-xl`
- Lead copy: `text-base sm:text-lg lg:text-xl`
- Body copy: `text-sm sm:text-base`
- Navigation and buttons: `text-[13px]` to `text-sm`
- Eyebrows and metadata: `text-[10px]` to `text-xs`, often uppercase with wider tracking

Headings use `font-normal` or `font-medium`, tight tracking, and compact line height (`leading-[1.02]` to `leading-[1.1]`). Avoid heavy bold display text. Body copy uses relaxed line height and a readable maximum width (`max-w-md` to `max-w-xl`).

## Color and surfaces

Use Tailwind gray as the neutral foundation:

- Primary text and dark controls: `gray-900`
- Secondary text: `gray-600` or `gray-700`
- Tertiary text: `gray-400` or `gray-500`
- Hairlines: `gray-200`, `gray-300`, or low-opacity `gray-900`
- Light warm panel: `#f6f5f1`
- Dark product surface: approximately `#1a1a1c` to `#242427`
- Brand/accent teal: `#238e85`

For glass surfaces, start with `bg-white/60 backdrop-blur-md ring-1 ring-gray-200`. Floating navigation may use `bg-white/90 backdrop-blur-xl` with a subtle shadow and ring.

Use opaque surfaces when clarity matters. Glass effects require a background with enough variation to make the depth visible and must retain readable contrast.

## Layout and spacing

- Full-viewport heroes use `min-h-[100svh]`, not `100vh`.
- Standard horizontal page padding is `px-5 sm:px-8 lg:px-10`.
- Standard maximum content width is `max-w-7xl mx-auto`.
- Use responsive flex spacers in cinematic compositions when content must balance within a viewport: `flex-1 min-h-8 sm:min-h-12 lg:min-h-16 shrink-0`.
- Use `gap-3` for compact control groups, `gap-6` to `gap-8` for normal groups, and `gap-12` or more for major columns.
- Keep decorative layers absolutely positioned with explicit `z-index`; keep interactive content above them.
- Decorative images use `pointer-events-none select-none` and an empty `alt` attribute.

Start mobile-first. A section may become a two-column composition at `lg`, but its reading order must remain logical on narrow screens.

## Corners, borders, and shadows

- Buttons and compact inputs: `rounded-full`
- Menus and small panels: `rounded-2xl`
- Feature cards and large content panels: `rounded-2xl` or `rounded-3xl`
- Prefer a one-pixel translucent ring over a heavy border.
- Use shadows to separate floating elements, not on every card.
- Product mockups may use a stronger directional shadow, such as `shadow-[0_-20px_80px_rgba(0,0,0,0.35)]`.

## Buttons and controls

Primary action:

```txt
inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3
text-sm font-medium text-white transition-[background-color,box-shadow]
hover:bg-gray-800 hover:shadow-lg
```

Secondary action:

```txt
inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium
text-gray-700 ring-1 ring-gray-300 transition-colors hover:bg-white/50
```

- Use one primary action per local group.
- Icon-only controls must have an accessible label and at least a `36px` square hit target.
- Hover styles must not be the only indication of meaning.
- Preserve visible keyboard focus states.
- External links use `target="_blank"` with `rel="noreferrer"`.

## Navigation

Desktop navigation is visually light: small text, ample gaps, and a single compact CTA. Below `md`, replace central links with a menu button and a deliberate mobile panel rather than squeezing the desktop layout.

For a fixed navbar:

- Keep the transparent state over the hero.
- After scrolling, introduce a translucent light surface, blur, subtle ring, and shadow.
- Lock body scrolling while a modal mobile menu is open.
- Close the menu on Escape and expose correct `aria-expanded`, dialog, and label attributes.

## Hero composition

A hero should contain:

1. A short headline, ideally split into intentional visual lines.
2. One compact paragraph explaining the value.
3. One primary CTA and, when useful, one secondary CTA.
4. One dominant product or brand visual.

Use the largest type only in the hero. Animate headline lines independently with a small stagger. Keep the visual below or beside the copy; do not let decorative layers obscure interactive content.

Background photography or illustration should use `bg-cover bg-center`. Treat remote asset URLs as page-level constants and provide a stable local asset when long-term availability matters.

## Product mockups

Product mockups should communicate product maturity without pretending to be functional UI.

- Use a dark neutral chrome so it remains distinct from the landing page.
- Keep internal hierarchy realistic: title bar, navigation, header, summary data, and detailed content.
- Use tiny labels, restrained status colors, and consistent internal spacing.
- Set `aria-hidden="true"` when a mockup is purely illustrative; otherwise provide a concise accessible description instead of exposing dozens of fake controls.
- If a detailed mockup has a fixed design width, scale the entire canvas proportionally with a `ResizeObserver` and reserve its scaled height to avoid overflow.
- Confirm that scaled text remains useful on mobile. Hide or simplify detail when it becomes illegible.

## Motion

The shared entrance motion lives in `src/index.css`:

- `animate-fade-down` for navigation entering from above
- `animate-fade-up` for headline, copy, and actions
- `animate-hero-rise` for the main product visual

Use the easing curve `cubic-bezier(0.22, 1, 0.36, 1)` for expressive entrances. A normal sequence is:

```txt
headline line 1  60ms
headline line 2  140ms
description      240ms
actions          340ms
product visual   620ms
```

Keep entrance animations below roughly `1.1s`. Interaction feedback should be much faster, usually `120–300ms`. Do not animate every element. Never add motion without disabling or simplifying it inside `@media (prefers-reduced-motion: reduce)`.

## Responsive rules

- Design for `320px` and wider.
- Use the standard Tailwind breakpoints; add a narrow arbitrary breakpoint only when typography genuinely needs it, such as `min-[400px]`.
- Navigation changes at `md`.
- Major layout changes happen at `lg`.
- Large display type may receive its final size at `xl`.
- Avoid fixed heights for text-bearing components.
- Verify long Russian and English copy; neither language should rely on manual line breaks that fail in the other.
- Test overlays, negative margins, and viewport-height sections on mobile Safari-sized viewports.

## Accessibility and quality bar

- Use semantic landmarks and heading order.
- Give meaningful images useful alt text and decorative images empty alt text.
- Maintain keyboard access for menus, dialogs, and controls.
- Use `aria-live` for dynamic status only when the status is important.
- Respect reduced-motion preferences.
- Maintain readable contrast on translucent surfaces.
- Avoid layout shifts by reserving image and mockup space.
- Verify at mobile, tablet, desktop, and wide desktop sizes before considering a section complete.

## Reusable implementation brief

When asking an agent or contributor to build a new section, specify only what varies and reference this guide for the rest:

```md
Build [section/page name] for the onno landing page.

Follow `STYLEGUIDE.md` for typography, spacing, surfaces, controls,
motion, responsive behavior, and accessibility.

Purpose: [single job of the section]
Content: [final or representative copy]
Composition: [stacked, split, grid, etc.]
Primary action: [label and destination]
Visual: [asset, product state, diagram, or none]
Special behavior: [interaction or animation unique to this section]
Acceptance criteria: [observable requirements not covered by the guide]
```

Avoid restating generic Tailwind classes in every prompt. Add a rule here when it should govern multiple parts of the project; keep one-off decisions beside the component that uses them.
