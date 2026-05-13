---
version: 1.0
name: OD Intelligence Center
description: A research intelligence dashboard for AI-era organization design. The interface should feel like a calm command center: dense enough for daily scanning, quiet enough for executive reading, and explicit about evidence quality. It borrows the DESIGN.md discipline from awesome-design-md, but defines its own visual language rather than copying a brand skin.
---

# OD Intelligence Center Design System

## 1. Visual Theme

The product is a dark research cockpit for OD and HR strategy work. It should feel precise, trustworthy, and continuously updated.

- Prefer restrained product UI over marketing composition.
- Prioritize scannability, source quality, and reading comfort.
- Treat color as semantic signal, not decoration.
- Keep cards compact, flat, and information-rich.
- Avoid decorative gradient blobs, oversized hero sections, and one-off visual effects.

## 2. Color Roles

| Token | Hex | Role |
| --- | --- | --- |
| `canvas` | `#0f1117` | App background |
| `surface` | `#171a24` | Primary cards and panels |
| `surface-raised` | `#202434` | Expanded readers, nested evidence blocks |
| `surface-control` | `#252a3a` | Filters, tabs, inputs |
| `hairline` | `#31374b` | Default borders |
| `hairline-strong` | `#46506a` | Focus and active borders |
| `ink` | `#eef2fb` | Primary text |
| `ink-muted` | `#b2bad0` | Secondary text |
| `ink-subtle` | `#8f98ae` | Tertiary metadata |
| `accent-blue` | `#7c92ff` | Primary navigation, links, report emphasis |
| `accent-violet` | `#b197fc` | Secondary accent and cross-topic highlights |
| `accent-green` | `#34d399` | Selected/open states and verified progress |
| `accent-amber` | `#fbbf24` | Knowledge base, warnings, high-trust signals |
| `accent-red` | `#f87171` | Risk, conflict, error |

## 3. Typography

Use system fonts optimized for Chinese and English mixed reading:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Noto Sans SC", sans-serif;
```

| Role | Size | Weight | Line Height | Usage |
| --- | ---: | ---: | ---: | --- |
| App title | 22px | 700 | 1.2 | Header identity |
| Page title | 22-24px | 700 | 1.35 | Section hero titles |
| Card title | 16-17px | 600 | 1.45 | Report and source titles |
| Body | 14-15px | 400 | 1.65-1.8 | Summaries and insights |
| Metadata | 12-13px | 400/500 | 1.4 | Dates, sources, badges |
| Micro label | 11px | 600 | 1.3 | Badges and evidence labels |

Rules:
- Do not use viewport-based font sizing.
- Letter spacing should be `0` for Chinese body copy.
- Only micro labels may use small positive tracking.
- Keep paragraphs readable: roughly 60-75 Chinese/English mixed characters per line when possible.

## 4. Components

### Header

- Sticky, translucent dark surface with a thin bottom hairline.
- Product identity left, stats right, segmented tabs underneath.
- Active tabs use semantic colors: information blue, reports blue, topic projects green, knowledge amber.

### Cards

- Background `surface`, border `hairline`, radius `10-12px`.
- Hover may change border color, but should not depend on large shadows or vertical movement.
- Expanded/selected state uses green border and subtle green glow.
- Avoid cards inside cards except repeated report/evidence items.

### Filters And Inputs

- Minimum touch target: 40-44px.
- Focus border uses `accent-blue`.
- Tags are pills because they are filters, but dense and restrained.

### Evidence Blocks

- Use a consistent four-to-six column evidence map.
- Always label source type: official/primary, media/consulting, company case, academic/research, recruiting/pay, social/workplace signal, internal knowledge base.
- Social and workplace signals must visually read as lower-confidence leads.

### Topic Project Page

- Must show the four research tracks as separate cards:
  1. Flat organization and middle-layer reduction
  2. Talent density and compound talent
  3. Job family and career architecture
  4. Promotion system
- Daily outputs should link to the latest overview and each topic report.
- Weekly outputs should link to the aggregate weekly report and latest summary.

## 5. Layout

- Main content max width: `1080px`.
- Reading cards max width: `760px`.
- Topic project and knowledge grids may use the full `1080px`.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48.
- Use responsive grids with `minmax(220px, 1fr)`.

## 6. Interaction

- Clickable cards should have visible hover and active states.
- Avoid layout shift on hover.
- Expanded readers should animate height/opacity but remain fast.
- Buttons and links must have clear accessible focus states.

## 7. Do

- Make evidence quality visible.
- Keep long research text readable.
- Use restrained color for meaning.
- Prefer stable component patterns over one-off styling.
- Keep daily and weekly research outputs easy to locate.

## 8. Do Not

- Do not add decorative orbs or bokeh backgrounds.
- Do not make the interface dominated by a single purple or blue gradient.
- Do not use huge marketing heroes for operational screens.
- Do not bury source quality behind pretty cards.
- Do not use unverified social signals as confident conclusions.

## 9. Agent Prompt Guide

When improving the UI:

1. Read this file first.
2. Preserve the dashboard's information density.
3. Improve one surface at a time.
4. Prefer CSS variable changes and scoped overrides before rewriting structure.
5. Verify desktop and mobile rendering before pushing.
