# Styling rules

Design-system-agnostic. Point the specifics at YOUR system in `design-system.md`.

## Priority order
1. Design-system component props / variants.
2. Design-system tokens (colors, spacing, radius, typography) via your config (e.g. Tailwind theme).
3. Utility classes using token-backed values.
4. Custom CSS — last resort, minimal, and only when nothing above fits.

## Hard rules
- **No hardcoded colors** or arbitrary hex/rgb values. Use theme tokens only. (A lint gate can enforce this — see `.agents/skills/clean-code-gate/scripts/lint-changed.mjs`.)
- No magic numbers for spacing/radius — use the scale.
- Keep CSS minimal and readable: a non-frontender should be able to open it and adjust a value.

## Typography & density
- Respect the type scale and minimum sizes defined in `design-system.md`. No off-scale font sizes or weights.
