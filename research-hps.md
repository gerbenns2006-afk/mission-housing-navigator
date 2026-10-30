# HPS research notes — checked October 30, 2026

The user requested the full current partner list. `data/hps.js` contains all 21 agency/location cards displayed at https://preventhomelessness.org/. The page introduction says 19 organizations but the displayed list contains 20 names plus LifeMoves' second location. Use the counted locations, not the stale prose count.

## Material distinctions

- HPS currently describes housing loss risk within approximately **14 days**. Do not say someone must first be **30 days late** on rent. Sacred Heart's separate financial-assistance page mentions 30 days of county residence, which is a different criterion.
- HPS serves eligible individuals/families, not only youth. Bill Wilson Center's HPS page is separate from its age-limited college housing program.
- Only HPS partners determine HPS eligibility. Direct partner contact is allowed; central routing remains (408) 516-5100 / info@preventhomelessness.org.
- Four HPS survivor routes are AACI, Community Solutions, Next Door Solutions, and YWCA. Their numbers are crisis/support intake lines. Do not describe their office addresses as shelter locations.
- Law Foundation supplies legal services and explicitly says it does not provide financial assistance to renters.
- Agency-wide locations, household focus and age restrictions do not always define a specific HPS program's eligibility. Records distinguish these and ask for screening rather than preemptively excluding people.
- General HPS paperwork can include household IDs, lease, recent bills, and two months of income information. Missing documents can have alternatives. Agency-specific lists are confirmed after screening.

## Source discrepancies handled transparently

- South County Community Services' current prevention page lists **408-842-6662 ext. 122**, whereas central HPS lists ext. 21. Use ext. 122 and display discrepancy.
- Georgia Villa central HPS phone: **650-600-4390**. Sacred Heart location notice: 184 South 11th Street, San Jose / **408-271-0685 ext. 641**. Keep central directory number and call-first caveat.
- HomeFirst's website has moved from homefirstscc.org to homefirstservices.org. Its HPS phone is still confirmed by current HPS list and City of Gilroy. No public HPS intake street address was confirmed. Do not repurpose its donation drop-off address. City of Gilroy verifies **hpsinfo@homefirstscc.org**.
- Next Door's current community office is **1400 Parkmoor Avenue, Suite 120**, not older North First Street listings.
- Sunnyvale Community Services' contact page gives **1160 Kern Avenue**, while stale newsletter boilerplate elsewhere gives Kifer Road.
- Law Foundation's housing intake page says Monday 9–11am; contact page says 9–11:30am. Current data directs users to check the intake page, flags the discrepancy, and notes Thursday eviction clinic with arrival by 12:30pm. Do not promise voicemail callbacks: their housing page says they no longer accept voicemail.
- CSA website returns 403 through research tool. Current City of Mountain View directory confirms 204 Stierlin Road and 650-968-0836. No current program email invented from older COVID documents.

## Implementation notes

`hpsGuide.steps` is an array of `{title,text}`. Each partner contains all requested fields; `email` is null when no appropriate public email was verified. HomeFirst `address` is null, with an explicit call-first explanation. Some addresses are offices or mailing addresses; always display `addressType` and `visit`. General-contact emails should not be presented as secure document portals. Source links and last-checked dates belong in detail panels.

The initial directory is a reviewed snapshot, not a live feed. Recheck the official source periodically and before making availability statements.
