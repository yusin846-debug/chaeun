# Landing iteration v4

## Approved direction

- Elespacio-inspired English display typography (Bricolage Grotesque), independent shaped Home / About / Contact / Shop / Stories navigation.
- Relatable small Korean apartment photography, clear Korean value proposition and topic-specific CTAs.
- Six empathy cards rise from below and cover preceding cards while their animated right-hand artwork changes; scroll must work both directions and after jumping from later sections.
- Large editorial neighborhood compatibility/interior statement; hover/focus/tap Saju / Five Elements / Feng Shui explanations.
- Samsung, Hyundai, SK PNG logos lead to attributed case explanations, without implying endorsement.
- Four individually generated premium-cute objects with cream, burgundy and sage palette: ceramic cat, opal lamp, olive glass vase, bouclé cushion. Preserve complete silhouettes, separate cards, readable copy. Regenerated matching room photography.
- Topic CTAs preserve selection through birth input. Generic entry keeps all six choices.

## Scope and limits

This iteration implements the brand landing and separate page shells. Birth entry and topic greeting are a clearly labeled local prototype. Real saju calculation, AI pet counseling, neighborhood scores, generated personal rooms, checkout, sharing rewards and short video assets remain future pipeline work. No scores, purchases or generated readings are fabricated.

## Validation

Production build, TypeScript and scoped ESLint; existing reading tests. Browser review covers the responsive menu, topic selection, glossary and object gallery. Static anchors replace sticky-element scroll targets so jumping back into the story stack selects the correct scene. Generated assets inspected individually and in their actual card crops. Prompts: image-prompts-v4.md.

## Final review

- Standards review: one intake issue found and fixed. Lunar dates use a dedicated YYYY-MM-DD field allowing a 30th day in month two rather than Gregorian date validation. Calendar conversion remains outside this prototype.
- Spec review: no source-level violations found against this iteration's scope.
- Browser: collection filter selects only lighting; all four object photos load and preserve silhouettes. Responsive menu links to Shop; glossary switches to Feng Shui content; lunar input proceeds to the selected love greeting. Existing two tests pass (they cover earlier reading reset/scroll helpers, not the new visual stack).
