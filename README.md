# Dharohar design demonstration

Open `index.html` for the homepage or `timeline.html` for the separate Timeline page. Keep the files together. No build or installation is required. Internet access is required for the images hosted by the original Dharohar website.

`dharohar-demo.html` is the bundled homepage; its Timeline link opens the adjacent `timeline.html` file.

## Timeline design

- Through time: browse curated retrospective newspaper editions using page controls and a period slider.
- By category: open an archive drawer, choose a folder, and inspect its articles on a reading desk.
- Search: search the small demonstration collection and open article details.
- A story's edition can be opened from the article detail panel. Switching modes preserves the selected edition.

The newspaper is a new presentation of selected archive subjects, not an original historical publication. Edition groupings and editorial descriptions are demonstration content. Source links lead to the original website; they are not fabricated document citations.

## Files

| File | Responsibility |
|---|---|
| index.html, styles.css, demo.js | Homepage, collection preview, scripted chatbot |
| timeline.html | Dedicated Timeline page and its three modes |
| timeline.css | Newspaper, cabinet, reading desk, responsive layout |
| timeline.js | Demo content, edition navigation, cabinet interaction and search |

This is a local frontend demonstration. It has no live AI, backend or real archive search service.

## Collections and Katha, 12 November 2026

`collections.html` is a separate archive-first page, styled by `archive.css` and controlled by `archive.js`. It contains three article samples, one video-repository entry and one archival image sample. Video and full-article links open the original repositories; no copied video is hosted locally.

Katha is an optional feature opened from the banner. Select the saved story **A Promise on Paper**, then press Play. Three anime-style AI illustrations accompany a one-minute first-person retelling, with short captions, a narration transcript, pause/replay, scene navigation and a browser voice selector. The story and images are prepared ahead of time; playback makes no model calls. Voice quality depends on installed browser voices and has not been audibly verified. Exact image prompts and provenance are in `assets/katha-image-prompts.md`.

Source: https://mism.org/pointer/indian-stock-market-formative-years, inspected through Playwright on 12 November 2026. Historical context comes from the article; the first-person document narrator is fictional. `assets/early-debt.png` was extracted from the article's embedded image, credited there to RBI. It is an archival illustration, not an AI-generated image. Verify reuse rights before publishing beyond this demo.

Verified through browser DOM events: all repository tabs, search no-results state, image dialog, story selection, play/pause, scene navigation, seeking, completed playback, replay and stop-on-close. Mobile player visually inspected; no horizontal overflow measured. JavaScript syntax check passed. The prior full-page Katha reading experience has been removed.

## Verification, 11 November 2026

- JavaScript syntax: `node --check demo/timeline.js` passed.
- Browser DOM interaction checks passed for edition buttons, slider input, end-of-editions disabled state, all four drawers, folder and desk navigation, article dialog, edition jump, mode state retention, search, category filter and no-result reset.
- Search for BSE returned one sample; reset returned all six records.
- Desktop newspaper and mobile cabinet layouts visually inspected; no horizontal overflow measured in any of the three mobile modes.
- Normal Playwright pointer clicks stalled during actionability checks in this session. The interaction checks above used browser DOM click/input events; physical pointer and keyboard navigation were not fully verified in this iteration.

## Carousel and persona demo (13 November 2026)
Homepage adds carousel.js/css and persona.js/css. Welcome age ranges suggest three changeable guide styles; skip retains the adult guide. Preference stays in page memory only. Four prepared topics per persona; no live AI. Timeline and Collections remain separate. Bundled homepage synchronized.
Verification: JavaScript syntax passed; browser DOM checks passed for 12 sourced responses, unknown-question fallback, welcome, skip, carousel next and pause. Desktop and mobile screenshots inspected; no horizontal overflow at the mobile test viewport. Auto rotation deliberately pauses when the browser tab is hidden. Controls tested via DOM events, not a complete physical pointer/keyboard audit.


## Continuous React Bits-inspired redesign
Replaced the timed cover stack with a continuously curved image ribbon, drag momentum, large navy-and-gold hero and scroll reveals. Plain JavaScript adaptation of React Bits motion patterns; no React dependency. See THIRD_PARTY_NOTICES.md for source attribution and license.
Browser verified: motion continues behind welcome, pause freezes it, next moves it, reduced-motion stops it, desktop/mobile screenshots inspected and no horizontal overflow. Persona chatbot remains intact. Bundled homepage synchronized.


## Document Detective and Archive Puzzle
Collections now opens Document Detective from the image repository. document-detective.js/css provide four observational hotspots, enlargement, mode switching and the existing viewer Close action. archive-puzzle.js/css provide a six-tile click/tap/keyboard swap puzzle using the same image, preview, reset and completion leading back to the document. An optional puzzle invitation appears below repository results. No discovery trail or additional moving wall was integrated; museum-lab.html remains an independent earlier example.
Validation: all changed JavaScript passes syntax checks. Pure puzzle logic passed swap/immutability/solved checks and 1000 unsolved shuffles. DOM simulation passed selection, cancellation, reference toggle, solving, completion focus and restart. HTML IDs, script/style links and module targets passed checks. Real-browser rendering and mobile interaction of this integration have not yet been verified.


## Inline homepage activities
Document Detective and the six-piece puzzle now render directly after the moving gallery, with no feature launch dialog or mode switch. homepage-museum.css applies the ivory, charcoal, copper and sage palette. All interactions stay on the homepage. Static integration, JavaScript syntax, puzzle simulation and served HTTP checks passed. Browser rendering has not been verified in this session.


## Typography, chat entry and saved stories update

`reading-type.css` pairs Instrument Serif headings with DM Sans body text and larger question controls. Google Fonts needs internet access; system fonts are fallbacks. The age/style chooser appears only on first chat entry, with Close and Skip. Children begin with shares and paper promises, adults with the cotton boom and business funding, and experienced readers with institutions, transferable debt and archival evidence. Styles remain switchable.

`katha-story.js` and `katha-story.css` contain the saved story player. Syntax and simulated interaction checks passed for persona routing, entry/close/skip, pending questions, Katha captions, scene changes, completion/replay and stopping on close. Current browser rendering and audible narration remain unverified.

## Two homepage puzzles and revised captions
Document Detective captions describe visible printing, pen strokes and borders only. The homepage puzzle selector offers Early debt instruments and the Journey of the BSE article image. The latter uses the existing Dharohar-hosted gallery asset and needs internet access. Switching clears selection, moves, completion and reference visibility. Each puzzle has its own completion destination. Syntax and simulated interaction checks passed for solving and restarting both puzzles. Browser rendering remains unverified.

## Local review: image slideshow and floating chat, 14 November 2026
The homepage begins with three original records from the Dharohar image repository, inspected in Chrome. Each slide has a catalogue-based caption, source link and credit. Controls include automatic 12-second advance, pause, manual navigation, reduced-motion support and hidden-tab pause. Document Detective has been removed from the page. Both puzzles remain; completion links to the original article.

chat-widget.js/css provide a shared corner launcher and panel on Home, Timeline and Collections. persona.js supplies existing prepared persona examples. Age selection is requested only when opening chat. These changes are local only; output/github-pages remains the previous prepared deployment.

Architecture slideshow revision: homepage now uses two full-width architecture images (East India House and the Bombay view in RR01DD10), with lower-image captions, eight-second automatic advance and a discreet pause control. No numbered navigation. Original images visually inspected in Chrome. Portuguese reference inspected: https://www.museusemonumentos.pt/en and its National Tile Museum page. This replaces the initial document slideshow direction. No commit or deployment.

Expanded to five slides at user request: architecture first, followed by the 1813 debt security, 1623 Dutch bond and Madras Irrigation and Canal Company certificate. Each links to its original catalogue record. Paper images use contain sizing so document edges are preserved. Chat checked in Chrome on all three pages; no initial age prompt, persona answers and Close passed. Mobile homepage inspected with no horizontal overflow.

## Homepage feature integration
Katha now opens directly from the homepage below the moving archive wall. The existing saved story player is reused, with scoped katha-home.css. Talk to Dharohar is a coming-soon button in the shared chatbot: no microphone access or voice API. The homepage slideshow now follows SEBI milestones in 1988, 1992, 2006, 2013 and 2025. Its year slider and selectable dates update the image, caption and source together; manual selection pauses autoplay. Contextual images are labelled and each image has its own credit/source. The separate Timeline page remains unchanged.

## Broader history and voice design
The homepage now presents ten periods: 1700s, 1813, 1860s, 1875, 1988, 1992, 2006, 2013, 2025 and 2026. It is labelled Indian market history rather than implying SEBI existed in the eighteenth century. The 2026 source is SEBI’s official Samvad symposium programme; its visual is the official identity, explicitly credited as such. All ten images loaded in Chrome and year controls and mobile overflow checks passed.

Voice uses a compact waveform button beside Send, retaining its coming-soon status without microphone or API access. Katha has a new section heading: Katha: There’s a story in every document. Katha and puzzle simulations passed. No commit or deployment performed.

## Katha narration tuning, 15 November 2026
Prefer Microsoft Heera (Indian English), then Google UK English Female, then Zira/Samantha when available. Speech rate 0.94, pitch 1.04; shortened narration lines create more room within each scene. Explicit voice choices, including Browser default, survive voice-list refreshes. Browser configuration checks confirmed Heera and the delivery settings; playback simulation passed. Audible sweetness/expressiveness has not been verified. Output deployment files are synchronized; no publication performed.

## Live Ask Dharohar voice, 16 November 2026
The waveform button now opens a Vapi voice panel with Start, Mute and End controls. A dedicated Dharohar assistant uses Naina, GPT-4.1 and Soniox, with curated museum notes and the chosen guide style. Calls have a two-minute limit. Only a restricted public key is present in the frontend. Typed chat stays as prepared answers, and Katha narration is separate. Audio recording is disabled in the assistant; transcripts/logs may still be retained. See `../scripts/VAPI-DEMO.md` for configuration and verification limits. Simulated controls pass; the live browser attempt awaited microphone permission and timed out. No audible reply is claimed and no GitHub deployment was performed.
