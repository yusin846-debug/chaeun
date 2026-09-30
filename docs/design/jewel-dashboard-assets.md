# Jewel dashboard assets

Built-in image generation tool. Saved in public/images/consultation/jewels/.

- element-beads.png: five-color glass bead atlas, displayed once per actual chart element count; uncertain count ranges use translucent beads.
- warm-studio.png: studio concept photograph.
- pearl-living.png: separate living-room concept photograph.
- objects.png: five-category product concept atlas (lamp, plant, fabric, art, tray).

Room images are curated by room layout, not generated anew for each person; label identifies them as AI interior concepts. Product images illustrate categories, not exact available products. Personalized reasons remain based on the existing generated dashboard.

Neighborhood index uses cited neighborhood text keywords mapped to traditional element symbols. Formula: 50 + 40 × matched recommended elements / recommended elements. No score when unverified or no environmental keywords; clearly labeled editorial interpretation, never a measured probability.

## Prompts

### beadPrompt

Create a premium UI asset: exactly FIVE identical-size spherical 3D glass marbles arranged in a single horizontal row, perfectly evenly spaced within FIVE equal square cells on a 5:1 transparent canvas. Each marble occupies 76% of its square cell with generous transparent margin, same center and height. Left to right translucent sage jade green, rose peach pink, honey champagne gold, pearly clear silver, pale watery sky blue. Polished blown glass with thick glossy edges, beautiful internal refraction, tiny soft glints, subtle caustic shadows contained in each cell. Chic cute Korean boutique jewelry aesthetic, soft daylight, restrained luxury, no glitter explosion. No text, no labels, no stands, no jewelry holes, no background, genuine transparent PNG. Perfect spheres, not squashed. Isolated objects for repeated bead counters in an app.

### roomPrompt

Premium editorial interior photograph for CHAEUN, a Korean women's personal feng shui design web app. Wide 3:2 composition. Believable beautiful compact Seoul studio apartment 23 square meters, for a woman in her late twenties. Full thoughtfully composed room: ivory linen bed on right, petite curved cream bouclé loveseat on left with scalloped pale blush cushion, slim honey oak shelving softly separating sleep from compact oak desk beside daylight window, small frosted opal mushroom lamp with burgundy base, organically shaped sage translucent glass vase with one leafy stem, small abstract art with peach circle and pale green curves, modest pale wool rug, little chrome tray with pearl-like glass beads. Realistic apartment window looks onto soft out-of-focus urban rooftops, not luxury skyline. Objects have correct scale, desks have usable legroom, daylight and warm practical lighting balanced. This is refined attainable Korean boutique interior, cute details for 20s/30s taste, architectural magazine quality, tactile, photo real, softly luminous, sophisticated cream sage peach palette. No people, no cats, no text, no logos, no captions, no collage. Show the entire room with generous foreground, crisp beautiful furniture details.

### coolRoomPrompt

Create a wide 3:2 photorealistic editorial interior photograph, second coherent look in a premium Korean women's interior brand. Small realistic separate living room in a Seoul apartment, cream curved two-seat sofa with pale icy blue linen cushions, polished chrome-legged light ash desk tucked neatly at far left wall, round frosted glass table, a sculptural clear bubbly glass vase, small opal globe lamp, little ivory ceramic catch-all tray, gauzy linen curtains and soft indirect daylight, restrained silver pearly white mist blue with tiny sage accents. Cute exquisite tabletop details and inviting tactile rug, attainable stylish Korean late twenties woman's home not a palace, not a showroom, no giant windows or penthouse luxury. Quiet fresh airy afternoon, beautiful camera composition entire room and objects sharp, harmonious proportion, no human, no text, no logos. Main focus room furnishing not desk, photographer quality.

### objectPrompt

A premium product photography contact sheet, exactly FIVE equally wide vertical panels in one horizontal row. 3:1 landscape image. Each panel has ONE standalone perfectly centered product with full object visible, equal visual scale, softly lit pastel ivory studio background. Panels left to right: (1) small opal glass mushroom bedside lamp with glossy cherry-burgundy stem and warm glowing dome (2) very small healthy leafy indoor plant in a pale sage ceramic wavy pot (3) cute scallop shell-shaped blush pink velvet cushion (4) small light oak tabletop picture frame holding minimalist sage and peach abstract circular art (5) exquisite translucent pale blue wavy glass jewelry catch-all tray with tiny pearl resting in it. Realistic luxury e-commerce editorial photos, Korean women twenties/thirties boutique taste, adorable and refined, no kitsch. Crisp material detail, delicate grounding shadows, no extra accessories except one pearl in tray, no text, no brand, no dividers. Generous margins in every panel so each panel can be used as a separate product card by CSS cropping.
