---
name: Progressive Dental Studio
description: Precision drawing. A dental lab site that reads like a restoration being designed in CAD.
colors:
  ice: "#edf4fb"
  ice-2: "#dfecf8"
  blue: "#8db6e0"
  blue-2: "#bcd6f0"
  blue-ink: "#3d6ea8"
  navy: "#1f2a7a"
  navy-ink: "#131a4d"
  text: "#1a2250"
  muted: "#47527f"
  paper: "#ffffff"
  grey: "#8c929b"
  error: "#a8323e"
  error-bg: "#fdf3f4"
  on-navy: "#dbe5f5"
  on-navy-muted: "#a9bad6"
  on-navy-link: "#cfdcf0"
  on-navy-faint: "#8fa3c4"
  crown-ivory: "#f3eee4"
  crown-sheen: "#fff8ec"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.4vw, 5.6rem)"
    fontWeight: 680
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  page-title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.4vw, 4.4rem)"
    fontWeight: 680
    lineHeight: 1
    letterSpacing: "-0.03em"
  hero:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4.6rem)"
    fontWeight: 680
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  index-name:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)"
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: "normal"
  h2:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.8vw, 3.25rem)"
    fontWeight: 660
    lineHeight: 1.04
    letterSpacing: "-0.022em"
  h3:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)"
    fontWeight: 640
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist Variable, Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  lede:
    fontFamily: "Geist Variable, Geist, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  measure:
    fontFamily: "Geist Mono Variable, Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
  caption:
    fontFamily: "Geist Variable, Geist, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  small:
    fontFamily: "Geist Variable, Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  ui:
    fontFamily: "Geist Variable, Geist, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 520
    lineHeight: 1.4
    letterSpacing: "normal"
  lead-sm:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "normal"
  tag:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  hairline: "2px"
  control: "3px"
  dot: "50%"
spacing:
  grid-minor: "24px"
  grid-major: "120px"
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(4.5rem, 9vw, 8rem)"
  max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.3rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.navy-ink}"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.3rem"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ice-2}"
  input:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "0.8rem 0.9rem"
    height: "48px"
  sheet:
    backgroundColor: "{colors.paper}"
    rounded: "0"
  strip:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.navy-ink}"
    height: "34px"
---

# Design System: Progressive Dental Studio

## Overview
Precision drawing. Every page sits on a pale ice-blue drafting grid (24px minor, 120px major lines), and content lives on white paper sheets marked with drafting crop ticks at their corners. The signature is a procedural 3D molar crown (three.js) that dentists can rotate, shown in the hero and as the 3Shape workflow demo. Light, calm, measured: a lab dentists trust with precise work. Light mode only: the scene is office staff and dentists at a desk in daylight.

## Colors
### Primary
- **Logo Navy** `#1f2a7a`: all type headings and every action (buttons, links, focus, active nav). **Navy Ink** `#131a4d` for hover and the footer field.
### Secondary
- **Brand Light Blue** `#8db6e0`: structure only. The top strip, full-width bands (digital workflow), completed-step bars, "New" tag. Never a button.
- **Blue Ink** `#3d6ea8`: blue that passes as text on white, for labels, dimension lines and the crown's margin line.
### Neutral
- **Crown ivory** `#f3eee4` / sheen `#fff8ec`: the 3D crown's material only.
- **On navy** `#dbe5f5` body, `#a9bad6` muted, `#cfdcf0` links, `#8fa3c4` faint: text on the navy footer and team band.
- **Ice** `#edf4fb` page ground with the grid; **Ice 2** `#dfecf8` for image wells and hover fills; **Paper** `#fff` sheets; **Text** `#1a2250`; **Muted** `#47527f`.
### Named Rules
- **Navy acts, blue structures.** If it can be clicked, it is navy. Light blue fills regions, never controls.

## Typography
Archivo at 108–112% width for headings (semi-expanded, confident), Geist for body, Geist Mono only for measurements, hours, labels and data (never as costume for prose).
### Hierarchy
display 680 / h2 660 / h3 640, tight negative tracking; body 17px at 1.6; lede in muted. Below body, only these steps exist (CSS vars `--fs-*`): tag 20px, lead-sm 18px, ui 15px, small 14px, measure 13px (mono), caption 12px.
### Named Rules
- **Mono is a measurement.** Use mono where a value is read: specs (400 MPa), hours, labels, captions.

## Layout
Max width 1240px, fluid gutter. 7/5 and 1/1 splits that collapse to one column under 960px. Sections separated by generous space and hairlines, not boxes. Dimension lines (|—— label ——|) carry a real value between sections.

## Elevation & Depth
Mostly flat: 1px hairlines (`rgb(31 42 122 / .16)`). Soft offset shadows only on primary buttons, the scrolled header and hovered gallery tiles.

## Shapes
Near-square: 3px controls, 2px tags, square sheets. Circles only for callout dots and step markers.

## Components
### Buttons
Primary navy, ghost white with navy border, 48px min height, icon left. Pressed: 1px down.
### Cards / Containers
The **sheet**: white, 1px hairline, crop ticks 9px outside each corner. No nested sheets, no icon-card grids.
### Inputs / Fields
Ice fill, strong hairline; focus turns paper with a navy border and blue ring; errors in `#a8323e` with a sentence naming the fix.
### Navigation
White sticky bar under the blue strip. Current page marked by a navy dimension bar under the label. Mobile: menu panel drops from the header with call and email buttons.
### Precision Crown (signature)
`CrownViewer` + `src/scripts/crown.ts`: lazy-loaded three.js, drag to rotate (page scroll stays vertical), zoom buttons, four states (scan point cloud with scan band, design wireframe + margin line + contact map, make milling block, deliver glossy). Always labelled "Illustrative demo" until real scans replace it.

## Do's and Don'ts
### Do:
- Put contact actions (call, email) within one screen on every page.
- Show photos as specimens on paper with crop ticks; keep low-res images at or near native size.
- Label demonstrations as illustrative.
### Don't:
- Don't add eyebrow labels above headings, gradient text, glass cards, or emoji icons.
- Don't invent claims (turnaround numbers, testimonials, case counts).
- Don't use light blue for buttons or body text.
