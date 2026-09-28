# Elespacio live interaction review — 2026-09-28

Scope: browser inspection after access recovery. Home, Case Studies (/work), Services (/services), Insights (/articles), About → Agency (/agency), Approach (/approach), Contact (/contact). Read-only inspection; no forms submitted. Desktop navigation and mobile menu checked with temporary viewport overrides.

## Observed today
- Home: actual scrolling advances separately colored sticky cards, not text replacement. Blue → orange → pink → ochre. Sticky tops 112/130/148/166px. Earlier cards shrink: observed scales .8982/.9444/.993 while later card rises. Left horse-headed runner is an autoplay loop video, independent of card text.
- Typography: computed Bricolage Grotesque, Arial, sans-serif. Desktop lead heading 72px/300; card headings 44px/700. Strong words provide weight contrast inside oversized editorial statements.
- Navigation: separate page links, not a home-section table of contents. Home rounded dark outlined tag; Case Studies ochre asymmetric corners; Services blue pill; Insights green modest rounded rectangle; About purple rounded rectangle; Contact orange pill. Small rotations ~±1–3 degrees. Active Contact expands vertically (~148px vs ~49px ordinary tags). About exposes Agency and Approach, rather than being a standalone destination. About hovered padding observed 20px 18px.
- Case Studies: a large lead video/project followed by additional image/video projects with compact title/client/category captions. Current visible list contains Victorinox content, Nespresso, Victorinox ecommerce. No filter was established.
- Services: oversized introduction, four selectable service categories. Clicking Brand & Content opens a detailed panel with description, subservice chips, related Ebel case image and CTA. This is an information expansion interaction, not merely a color change.
- Insights: editorial introduction and illustrated article listing; current visible article is the new operating model launch, dated September 2026; newsletter area below.
- Agency: large introductory statement; team names arranged as oversized inline words; name triggers have an associated image. Direct pointer entry (via locator click) changed first portrait from opacity 0/scale .8 through opacity .575/scale .869 to opacity1/scale1. Team principles follow.
- Approach: practical principles, image with source-attributed quotations and previous/next controls, then framework CTA. This is a useful structure for explaining method and grounding brand stories in sources.
- Contact: large title, “How can we help?”, two purpose-specific links (project/team), distinctive honey-related photograph. Contact and Start a project are different destinations; no submission performed.
- Home media: separate desktop/mobile Vimeo hero embeds and a looping native video beside stacked cards. Case Studies also includes looping Vimeo project media.
- Mobile: sidebar becomes a toggle menu; opening it exposes Home, Case Studies, Services, Insights, Agency, Approach, Contact. Card containers remain sticky. Do not copy measured pixel geometry blindly: viewport screenshot output showed capture tiling artifacts and requires normal rendered validation in our own implementation.

## Differences from the supplied screenshots / limits
- Current home no longer exposes the supplied client-name list or the same old sequence of shaped media blocks. The analogous image-on-text-hover is live on Agency and was tested there. Screenshot-specific composition remains a user-supplied reference, not a currently re-observed home section.
- Reference has no Shop navigation destination. CHAEUN Shop is our own adaptation.
- Exact easing durations and reverse-hover timing were not measured in this pass. Do not describe proposed timings as measured facts.

## CHAEUN application decisions
1. Separate Home / About / Contact / Shop / Stories routes, English navigation and English display titles, Korean empathy/counseling copy. Use Bricolage Grotesque with explicit Korean sans-serif fallback; light300 + bold700.
2. Home left: six independently colored topic cards rise and cover previous cards, previous cards scale down; direct topic-specific CTA on each. Right: original topic-specific motion with no overlapping unrelated room photos. Maintain all six topic choices and selected topic through birth entry.
3. Follow empathy with a cream editorial neighborhood statement: “Find a place that feels like you.” Bold “feels like you”; Korean support explains neighborhood match score and personalized room recommendations; inline CTA.
4. Large inline Saju / Five Elements / Feng Shui words reveal an image + concise explanation on hover and keyboard focus. Mobile uses deliberate tap, not hover dependency.
5. Mix a few short loops (light through fabric, ceramic glaze, framed art) with static subject-focused photos. No long mandatory hero intro. Preserve readable CTAs and reduced-motion alternatives.
6. About: editorial explanation, interactive glossary, method. Stories: source-grounded Samsung/Hyundai/SK entries with PNG logos and large media. Shop: premium cute objects using independent generated photographs, material/category filtering. Contact: purpose selection and actual available contact mechanism; no fake success.
7. Replace four object photos individually: crafted lucky cat, premium playful lamp, sculptural glass vase, tactile cushion close-up. Art direction consistent; avoid room photo standing in for a fabric product.
8. Content hierarchy: empathy → neighborhood/interior result promise → personalized artwork → concepts and grounded cases → objects. Do not foreground purchasing before personalized content.
