// Official sources reviewed October 30, 2026. Availability is confirmed by each provider.
const source = (label, url) => ({ label, url });
const campusAddress = '3000 Mission College Boulevard, Santa Clara, CA 95054';
const checked = '2026-10-30';

export const resources = [
  {
    id: 'mission', name: 'Mission College Basic Needs', category: 'campus',
    summary: 'Start with a person at Mission. The team can help you navigate housing, food, benefits, and community referrals.',
    serves: 'Mission College students, including working adults, parents, returning students, and dual-enrollment students.', ages: 'No age restriction listed for Basic Needs navigation.', area: 'Campus support; community programs have their own residency rules.',
    phone: '(408) 855-5340', email: null, url: 'https://missioncollege.formstack.com/forms/mission_support_app', actionLabel: 'Open Mission Support Form',
    address: `${campusAddress} — Campus Center, first floor`, addressType: 'Campus support office', visit: 'Call for current office hours. The Mission Support Form requires college sign-in; contact the office if you cannot sign in.',
    afterContact: 'Ask for an individual Basic Needs appointment and help making a community referral. Program representatives follow up on support requests.', documents: ['No documents are needed to explore this guide.', 'Ask the campus team what is needed for the specific support you request.'],
    fallback: 'Use community intake routes directly, or call the campus Information Desk at (408) 855-5408.',
    sources: [source('Mission Basic Needs', 'https://missioncollege.edu/student-services/basic-needs/'), source('Mission Support Form information', 'https://missioncollege.edu/student-services/')], checked, tags: ['campus','all','under18','18-24','25-54','55-61','62plus','outside','working','returning','family']
  },
  {
    id: 'bwc-college', name: 'Bill Wilson Center · College Student Housing', category: 'housing',
    summary: 'College Engaged Youth Rapid Rehousing supports eligible students without stable nighttime housing, including some students about to lose housing.',
    serves: 'Eligible Santa Clara County college students experiencing homelessness or imminent housing loss; staff assess the circumstances.', ages: '18–24 for this specific program.', area: 'Santa Clara County',
    phone: '(408) 243-0222', email: 'ymolina@billwilsoncenter.org', url: 'https://www.billwilsoncenter.org/services/all/college-student-housing.html', actionLabel: 'View referral instructions',
    address: '3490 The Alameda, Santa Clara, CA 95050', addressType: 'General BWC office; not a confirmed college intake appointment site', visit: 'Contact Mission Basic Needs or campus BWC outreach for a referral. Email the program before visiting; the phone is BWC’s general line.',
    afterContact: 'Request a college-program referral and ask about screening, current capacity, and the documents required.', documents: ['Ask which enrollment and housing-situation documents are needed.'], fallback: 'If you are 25 or older, explore HPS, county assessments, Abode, and affordable property applications. Other BWC services have different rules.',
    sources: [source('BWC college housing', 'https://www.billwilsoncenter.org/services/all/college-student-housing.html')], checked, tags: ['18-24','homeless','couch','student']
  },
  {
    id: 'bwc-minors', name: 'Bill Wilson Center · Safety Net Shelter', category: 'urgent',
    summary: 'Short-term emergency shelter for young people who are homeless, have run away, or need a safe place.',
    serves: 'Youth needing a safe place; an intake counselor determines the appropriate response.', ages: '12–17 for this shelter.', area: 'Santa Clara County; call to confirm service eligibility.',
    phone: '(408) 243-0222', email: 'BWCmail@billwilsoncenter.org', url: 'https://www.billwilsoncenter.org/services/all/runaway.html', actionLabel: 'View shelter intake instructions',
    address: '3490 The Alameda, Santa Clara, CA 95050', addressType: 'General BWC office; call for shelter intake location', visit: 'Call and ask for the Safety Net Shelter Intake Counselor. Do not assume a bed is available.',
    afterContact: 'The counselor discusses safety and shelter options. Ask about confidentiality and any reporting requirements before sharing details.', documents: ['Ask the intake counselor; missing documents should not stop you from making the call.'], fallback: 'Mission Basic Needs can help find an age-appropriate alternative. For immediate danger, call 911.',
    sources: [source('BWC Safety Net Shelter', 'https://www.billwilsoncenter.org/services/all/runaway.html')], checked, tags: ['under18','safety','homeless','urgent']
  },
  {
    id: 'abode', name: 'Abode · Santa Clara County', category: 'housing',
    summary: 'Abode works with single adults, families, and seniors. Its county page directs people seeking housing to Coordinated Entry and immediate shelter help.',
    serves: 'Individuals and families; criteria vary by housing or service program.', ages: 'Program-specific; Abode is not a youth-only organization.', area: 'Santa Clara County; other Abode regions have separate routes.',
    phone: '(408) 385-2400', email: 'info@abode.org', url: 'https://abode.org/county/santa-clara-county', actionLabel: 'View county intake routes',
    address: '40849 Fremont Boulevard, Fremont, CA 94538', addressType: 'Administrative office; not Santa Clara County shelter intake', visit: 'Use the county referral route. The listed phone is the shelter hotline Abode recommends, not an Abode caseworker.',
    afterContact: 'Ask about a coordinated-entry assessment and the referral process for suitable programs. Availability and selection are separate from being assessed.', documents: ['Ask the receiving provider what to bring and whether an existing assessment can be updated.'], fallback: 'Contact Mission Basic Needs or another public assessment provider.',
    sources: [source('Abode Santa Clara County', 'https://abode.org/county/santa-clara-county'), source('Abode regional help', 'https://abode.org/resources/get-help')], checked, tags: ['adult','family','senior','homeless','couch','25-54','55-61','62plus']
  },
  {
    id: 'midpen', name: 'MidPen Housing · Find a property', category: 'affordable',
    summary: 'Browse affordable communities and apply to each property using that property’s instructions. A property waiting list is separate from the Housing Authority voucher interest lists.',
    serves: 'Households meeting the selected property’s income, occupancy, and other requirements.', ages: 'Varies: family, supportive, and senior communities. Check each listing; senior properties may use 55+ or 62+.', area: 'Bay Area and other Northern California communities.',
    phone: null, email: null, url: 'https://www.midpen-housing.org/find-housing/', actionLabel: 'Find properties and applications',
    address: null, addressType: 'Property-specific leasing offices', visit: 'Contact the selected property’s leasing office. There is no single application that places you on every MidPen list.',
    afterContact: 'Check opening status, rent, income limits, household size, accessibility, and how to update your application.', documents: ['Request the property’s application checklist before sending personal records.'], fallback: 'Apply to more than one suitable property and explore SCCHA separately.',
    sources: [source('MidPen Find Housing', 'https://www.midpen-housing.org/find-housing/'), source('MidPen contact instructions', 'https://www.midpen-housing.org/about-midpen/contact-us/')], checked, tags: ['affordable','solo','family','senior','disability','working','returning','55-61','62plus']
  },
  {
    id: 'sccha', name: 'SCCHA · Section 8 interest lists', category: 'affordable',
    summary: 'Register interest in Housing Choice Voucher rental assistance. When assistance is available, SCCHA selects applicants randomly, then checks eligibility.',
    serves: 'Eligible low-income individuals and households; SCCHA determines eligibility, including applicable citizenship or immigration-status rules.', ages: 'Applicants must be 18 or older; households may include children.', area: 'Santa Clara County rental assistance. You need not live in the county to apply; preference applies to people who lived or worked here within the past five years.',
    phone: '(408) 275-8770', email: null, url: 'https://portal.scchousingauthority.org/', actionLabel: 'Open Applicant Portal',
    address: '505 West Julian Street, San Jose, CA 95110', addressType: 'Housing Authority office', visit: 'Registration is online. Call if you need help or an accessible application route.',
    afterContact: 'Keep your contact and household information current. Log in at least annually to remain active. Registration is not a voucher award.', documents: ['Portal registration requests household names and birth dates, and the head of household’s Social Security number. Ask SCCHA if you need help with this requirement.'], fallback: 'Explore affordable properties and immediate support while waiting.',
    sources: [source('SCCHA Applicant Portal guidance', 'https://www.scchousingauthority.org/section-8/for-participants/for-new-applicants/applicant-portal/'), source('SCCHA participant overview', 'https://www.scchousingauthority.org/section-8/for-participants/')], checked, tags: ['affordable','adult','family','senior','disability','longterm']
  },
  {
    id: 'mainstream', name: 'Ask SCCHA about disability-related options', category: 'affordable',
    summary: 'Mainstream vouchers serve households that include a person with a qualifying disability who is at least 18 and under 62 at admission. Other housing options have different rules.',
    serves: 'Households meeting the specific voucher’s disability, income, and other eligibility rules.', ages: 'Mainstream: qualifying member 18–61 at admission; not an age rule for all disability housing.', area: 'Ask SCCHA about current local availability and admission routes.',
    phone: '(408) 275-8770', email: null, url: 'https://www.scchousingauthority.org/home/adminplan/', actionLabel: 'View current SCCHA policies',
    address: '505 West Julian Street, San Jose, CA 95110', addressType: 'Housing Authority office', visit: 'Call before visiting. Ask which list or referral process applies and how to request a reasonable accommodation.',
    afterContact: 'Ask whether Mainstream or another program fits your household, what verification is accepted, and whether a referral is needed.', documents: ['Provide disability verification only through the provider’s secure process when requested.'], fallback: 'General affordable housing and campus Basic Needs remain options at any adult age.',
    sources: [source('HUD Mainstream basics', 'https://files.hudexchange.info/resources/documents/Mainstream-Vouchers-The-Basics.pdf'), source('SCCHA current administrative plan', 'https://www.scchousingauthority.org/home/adminplan/')], checked, tags: ['disability','18-24','25-54','55-61','affordable']
  },
  {
    id: 'medical', name: 'Medi-Cal · Ask your plan about housing supports', category: 'benefits',
    summary: 'Ask about housing navigation, deposits, tenancy support, and whether you meet the additional criteria for Transitional Rent. Being enrolled in Medi-Cal alone does not qualify you for rent payments.',
    serves: 'Eligible members of Medi-Cal managed care plans; each requested service requires screening.', ages: 'Service-specific; ask your plan.', area: 'Use your own Medi-Cal health plan, including if you live outside Santa Clara County.',
    phone: null, email: null, url: 'https://www.dhcs.ca.gov/calaim-transforming-medi-cal/enhanced-care-management-and-community-supports/community-supports-search-tool/', actionLabel: 'Find supports by health plan',
    address: null, addressType: 'Phone or provider referral', visit: 'Call Member Services on your insurance card or ask your health care provider for a Community Supports referral.',
    afterContact: 'The plan screens eligibility and authorizes services. Ask what happens if the request is denied and what other help is available.', documents: ['Have your plan/member information available.', 'Ask for the specific service’s documentation requirements.'], fallback: 'Continue HPS, campus, and county housing routes while your plan reviews the request.',
    sources: [source('DHCS Community Supports search', 'https://www.dhcs.ca.gov/calaim-transforming-medi-cal/enhanced-care-management-and-community-supports/community-supports-search-tool/'), source('DHCS housing policy resources', 'https://www.dhcs.ca.gov/services/housing-for-health-dhcs-strategies-to-assist-members-experiencing-homelessness/')], checked, tags: ['medical','disability','deposit','homeless','outside']
  },
  {
    id: 'scfhp', name: 'Santa Clara Family Health Plan · Community Supports', category: 'benefits',
    summary: 'SCFHP members can request screening for housing navigation, move-in costs, tenancy services, and Transitional Rent for eligible target populations.',
    serves: 'SCFHP Medi-Cal members; DualConnect members should use (877) 723-4795.', ages: 'Eligibility depends on the service and member circumstances.', area: 'SCFHP members',
    phone: '(800) 260-2055', email: null, url: 'https://www.scfhp.com/healthcare-plans/medi-cal/programs/community-supports/', actionLabel: 'View Community Supports instructions',
    address: '6201 San Ignacio Avenue, San Jose, CA 95119', addressType: 'Plan office; call for referrals', visit: 'Medi-Cal Member Services: Monday–Friday, 8:30 a.m.–5 p.m.; TTY 711. Request a referral by phone or through your provider.',
    afterContact: 'SCFHP reviews referrals and sends eligible, authorized members a letter with their assigned provider’s information.', documents: ['Ask about member identification and service-specific evidence.'], fallback: 'If you have a different plan, call the number on that plan’s card.',
    sources: [source('SCFHP Community Supports', 'https://www.scfhp.com/healthcare-plans/medi-cal/programs/community-supports/')], checked, tags: ['medical','deposit','disability']
  },
  {
    id: 'nextdoor', name: 'Next Door Solutions · Safety and housing support', category: 'safety',
    summary: 'If housing depends on staying with someone who hurts, threatens, controls, or pressures you, an advocate can help you consider options. You can ask for help while still in the relationship.',
    serves: 'People affected by intimate partner violence; support across genders and identities.', ages: 'Ask about the right service and confidentiality limits for minors.', area: 'Santa Clara County',
    phone: '(408) 279-2962', email: 'info@nextdoor.org', url: 'https://www.nextdoorsolutions.org/help', actionLabel: 'View confidential support options',
    address: '1400 Parkmoor Avenue, Suite 120, San Jose, CA 95126', addressType: 'Community office; not shelter address', visit: '24/7 hotline. Office visits: confirm with (408) 501-7550. Shelter locations are not published here.',
    afterContact: 'An advocate checks whether it is safe to talk and discusses safety planning, shelter screening, and referrals. You decide what to share.', documents: ['Ask about documents later; you can call to discuss your situation first.'], fallback: 'Try YWCA’s support line. For immediate danger, call 911.',
    sources: [source('Next Door Solutions help', 'https://www.nextdoorsolutions.org/help')], checked, tags: ['safety','family','adult','under18','urgent']
  },
  {
    id: 'ywca-support', name: 'YWCA · 24/7 bilingual support line', category: 'safety',
    summary: 'Free support for survivors of domestic violence, sexual assault, and human trafficking, including safety planning and emergency-housing screening.',
    serves: 'Survivors seeking support; you may choose to remain anonymous.', ages: 'Ask the advocate about age-specific services and reporting obligations.', area: 'Golden Gate Silicon Valley; ask about the appropriate local route.',
    phone: '(800) 572-2782', email: null, url: 'https://yourywca.org/support-line/', actionLabel: 'View support-line information',
    address: '375 South Third Street, San Jose, CA 95112', addressType: 'Main office; not shelter location', visit: 'Call the 24/7 support line for help. The main office’s business hours are separate.',
    afterContact: 'A trained advocate discusses immediate needs and possible next steps. Ask about confidentiality limits before identifying yourself.', documents: ['No identifying information is required to speak anonymously on the support line.'], fallback: 'Next Door Solutions offers another local route. Immediate danger: 911.',
    sources: [source('YWCA support line', 'https://yourywca.org/support-line/')], checked, tags: ['safety','urgent','family','under18']
  },
  {
    id: 'sacred-deposit', name: 'Sacred Heart · Deposit assistance', category: 'deposit',
    summary: 'Ask about emergency deposit and first-month rent help for a move. This is a separate screening process, with funding and service-area requirements.',
    serves: 'Low-income Santa Clara County residents with an emergency reason to move and a new lease or letter of intent.', ages: 'No age cutoff published on the program page; ask intake.', area: 'Currently housed applicants: ZIP-code rules apply. Unhoused/displaced applicants: ask about a secured unit in Santa Clara County.',
    phone: '(408) 709-2364', email: 'housinginfo@sacredheartcs.org', url: 'https://www.sacredheartcs.org/deposit-assistance/', actionLabel: 'View deposit intake instructions',
    address: '1381 South First Street, San Jose, CA 95110', addressType: 'Agency office; appointment required for deposit screening', visit: 'Call or email to request an appointment. Ask whether your ZIP code is served and whether funding is currently available.',
    afterContact: 'Staff screen the move, income, and proposed housing. Confirm approval and payment timing before relying on assistance.', documents: ['New lease or landlord letter of intent.', 'Ask for the current income and residency checklist.'], fallback: 'Ask for the agency assigned to your area or contact HPS routing.',
    sources: [source('Sacred Heart deposit assistance', 'https://www.sacredheartcs.org/deposit-assistance/')], checked, tags: ['deposit','solo','family','rent']
  },
  {
    id: 'svdp', name: 'St. Vincent de Paul · Local parish assistance', category: 'deposit',
    summary: 'A direct community route for rent, utility, food, and other help. Local parish volunteer groups cover different neighborhoods; ask specifically whether they can help with a deposit.',
    serves: 'People needing assistance in the local conference’s service area.', ages: 'No general age cutoff published; local assistance varies.', area: 'Santa Clara County, by parish conference boundaries.',
    phone: '(408) 249-2853', email: null, url: 'https://www.svdp.org/if-you-need-help/', actionLabel: 'Find your local parish contact',
    address: null, addressType: 'Local conference-specific; call first', visit: 'Use the parish directory for your ZIP code. The main office can help when you cannot find coverage.',
    afterContact: 'Volunteers may return your message, discuss your needs, and arrange a home visit or referral. Deposit funding is not promised.', documents: ['Ask what your local conference needs and how to share documents safely.'], fallback: 'Ask for another local agency or explore HPS and Sacred Heart deposit screening.',
    sources: [source('SVdP assistance instructions', 'https://www.svdp.org/if-you-need-help/')], checked, tags: ['solo','deposit','rent','community']
  },
  {
    id: 'lawfoundation', name: 'Law Foundation · Housing legal help', category: 'legal',
    summary: 'Ask for help with an eviction, lockout, housing discrimination, or other housing legal problem. If you receive court papers, seek legal help promptly.',
    serves: 'Santa Clara County residents; staff screen the matter and service eligibility.', ages: 'Ask about the appropriate intake for your circumstances.', area: 'Santa Clara County',
    phone: '(408) 280-2424', email: null, url: 'https://www.lawfoundation.org/housingresources', actionLabel: 'View legal intake instructions',
    address: null, addressType: 'Confirm the current intake location on the official contact page', visit: 'Call Monday at 9 a.m.; official pages differ on whether phone intake closes at 11 or 11:30 a.m. For the Thursday 1 p.m. eviction clinic, instructions say arrive by 12:30 p.m.; space is limited. Confirm current details.',
    afterContact: 'Staff determine whether they can advise, represent, or refer you. A contact request is not acceptance of a case.', documents: ['Have notices, court papers, lease, and important landlord communications available; ask what intake needs.'], fallback: 'Ask for another legal-aid referral and tell Mission Basic Needs that there is a deadline.',
    sources: [source('Law Foundation intake', 'https://www.lawfoundation.org/contactus'), source('Housing intake and clinic instructions', 'https://www.lawfoundation.org/housingresources')], checked, tags: ['legal','rent','eviction','disability']
  },
  {
    id: 'nextup', name: 'Mission College · NextUp', category: 'campus',
    summary: 'Campus support for eligible current and former foster youth, including counseling and financial-resource navigation.',
    serves: 'Current/former foster youth with dependency or wardship established or continued on/after age 13; enrollment conditions also apply.', ages: 'Under 26 at the start of the academic year.', area: 'Mission College students',
    phone: '(408) 855-5227', email: null, url: 'https://missioncollege.edu/student-services/next-up/index.html', actionLabel: 'View NextUp application steps',
    address: `${campusAddress} — Student Engagement Center, Office 148`, addressType: 'Campus NextUp office', visit: 'Call to arrange an intake. Students below nine units are encouraged by the program to inquire.',
    afterContact: 'Staff review eligibility and connect you with a counselor. Ask about housing referrals and any available financial assistance.', documents: ['Ask what foster-care and enrollment verification is required.'], fallback: 'Basic Needs is available as a navigation route even if you do not meet NextUp rules.',
    sources: [source('Mission NextUp', 'https://missioncollege.edu/student-services/next-up/index.html')], checked, tags: ['foster','campus','18-24','under18']
  },
  {
    id: 'veterans', name: 'VA · Housing help for veterans', category: 'housing',
    summary: 'Veterans facing homelessness can ask about local shelter, housing programs, and prevention assistance. The national call center connects callers with their local VA.',
    serves: 'Veterans experiencing homelessness or at risk; each assistance program screens eligibility.', ages: 'Veteran/program eligibility, rather than college age categories.', area: 'National routing with VA Palo Alto local services.',
    phone: '(877) 424-3838', email: null, url: 'https://www.va.gov/palo-alto-health-care/health-services/homeless-veteran-care/', actionLabel: 'View VA housing-help instructions',
    address: null, addressType: 'Phone routing; confirm assigned local service location', visit: 'National housing call center: 24/7. VA Palo Alto homeless services: (800) 848-7254, weekdays 9 a.m.–noon and 1–3 p.m.',
    afterContact: 'Ask for the local homeless-services team and which prevention or housing options fit your situation, including whether a HUD-VASH referral is appropriate.', documents: ['Ask which service and income records are needed; call even if you do not have everything.'], fallback: 'Mission Veterans Resource Center: (408) 855-5418, Campus Center 240. General county housing routes are also available.',
    sources: [source('VA Palo Alto housing help', 'https://www.va.gov/palo-alto-health-care/health-services/homeless-veteran-care/'), source('VA national housing line', 'https://department.va.gov/homeless/resource-links/'), source('Mission Veterans Resource Center', 'https://missioncollege.edu/student-services/veterans/index.html')], checked, tags: ['veteran','adult','family','homeless']
  },
  {
    id: 'dsps', name: 'Mission College · Disability Support', category: 'campus',
    summary: 'DSPS supports academic access and accommodations. Basic Needs can work with you on housing navigation; campus disability approval is separate from housing eligibility.',
    serves: 'Mission students seeking disability-related academic accommodations.', ages: 'No general age cutoff listed.', area: 'Mission College',
    phone: '(408) 855-5085', email: null, url: 'https://missioncollege.edu/student-services/disability-support-programs/', actionLabel: 'View DSPS application steps',
    address: `${campusAddress} — Campus Center, Office 240`, addressType: 'Campus DSPS office', visit: 'Call for support applying or arranging an appointment.',
    afterContact: 'DSPS reviews verification and schedules academic-access intake. Ask Basic Needs separately for housing-resource help.', documents: ['DSPS requests disability verification for its services; do not submit it to this guide.'], fallback: 'Ask Basic Needs or the housing provider directly for accessible communication and application support.',
    sources: [source('Mission DSPS', 'https://missioncollege.edu/student-services/disability-support-programs/')], checked, tags: ['disability','campus','all']
  },
  {
    id: 'parents', name: 'Mission EOPS / CARE / CalWORKs', category: 'campus',
    summary: 'Student parents can ask about campus CalWORKs and CARE support. Families receiving CalWORKs should also ask their county worker about Homeless Assistance and the Housing Support Program.',
    serves: 'Eligible Mission students; campus and county programs have separate rules.', ages: 'Program and household eligibility apply.', area: 'Mission College; county benefits depend on the household’s case.',
    phone: '(408) 855-5223', email: null, url: 'https://missioncollege.edu/student-services/eops/', actionLabel: 'View student-parent support',
    address: campusAddress, addressType: 'Campus; call to confirm office and appointment', visit: 'Call the EOPS/CARE/CalWORKs office; existing CalWORKs recipients can also contact their assigned county worker.',
    afterContact: 'Ask which campus services and county housing referrals fit your family. HSP can include housing navigation and rental help for eligible CalWORKs families.', documents: ['Ask the office or county worker for the relevant program checklist.'], fallback: 'Basic Needs and HPS serve other household types as well.',
    sources: [source('Mission EOPS and CalWORKs', 'https://missioncollege.edu/student-services/eops/'), source('California HSP overview', 'https://www.ca.gov/departments/178/services/1312/')], checked, tags: ['family','children','campus','working']
  },
  {
    id: 'outside', name: 'Live outside Santa Clara County? Start locally, too.', category: 'navigation',
    summary: 'Mission can help you navigate support, but campus attendance does not establish county residency for housing programs. Ask 211 for housing services where you live.',
    serves: 'Students living in another county or unsure which county program applies.', ages: 'Ask for an age-appropriate program.', area: 'Your county of residence',
    phone: '211', email: null, url: 'https://www.usa.gov/emergency-housing', actionLabel: 'View local housing-help routes',
    address: null, addressType: 'Phone referral; location depends on provider', visit: 'Ask about your county’s prevention system, shelter access, and Coordinated Entry assessment routes.',
    afterContact: 'Get the receiving agency’s direct number, eligibility instructions, and a backup contact.', documents: ['Ask about residency rules and acceptable evidence if you are staying temporarily with others.'], fallback: 'Contact Mission Basic Needs for help making the connection.',
    sources: [source('USAGov emergency housing', 'https://www.usa.gov/emergency-housing')], checked, tags: ['outside','all','homeless']
  }
];

export const explainers = [
  {
    id: 'housing-crisis', title: '“Does my situation count?”',
    body: 'You can ask for help before you are sleeping outdoors. Housing instability can mean couch surfing because you have nowhere stable to stay, moving between temporary places, falling behind on rent, living in a car, or depending on someone unsafe for shelter. Each program uses its own eligibility definition.',
    bullets: ['Describe where you sleep, how long you can stay, and what is making the arrangement unstable.', 'Do not wait for a particular number of days of overdue rent to ask for screening.', 'A program saying you do not fit its rules does not mean your need is unimportant. Ask for another route.'],
    sources: [source('Mission housing support', 'https://missioncollege.edu/student-services/basic-needs/'), source('BWC student housing criteria', 'https://www.billwilsoncenter.org/services/all/college-student-housing.html'), source('HPS screening', 'https://preventhomelessness.org/')]
  },
  {
    id: 'voucher', title: 'What a voucher actually does',
    body: 'A Housing Choice Voucher is rental assistance administered by a housing authority. After you are selected, found eligible, and issued a voucher, you search for a qualifying rental. The authority approves the tenancy and pays a subsidy toward rent; you pay your required share. It is not cash handed to you and it is not a reservation for an apartment.',
    bullets: ['SCCHA describes a typical household share as roughly 30% of income; the actual amount depends on program calculations and the approved rent.', 'The landlord, unit, rent, and required inspection must meet program rules.', 'SCCHA’s interest list is the first step toward possible selection. It does not promise a voucher or a date.'],
    sources: [source('SCCHA voucher overview', 'https://www.scchousingauthority.org/section-8/for-participants/'), source('SCCHA applicant process', 'https://www.scchousingauthority.org/section-8/for-participants/for-new-applicants/')]
  },
  {
    id: 'waitlists', title: 'A MidPen list and a Section 8 list are different',
    body: 'An affordable property application asks to be considered for a home at that property. A tenant-based voucher application asks to be considered for rent assistance. You may explore both routes, but joining one does not automatically join the other.',
    bullets: ['Property rules: ask about income limits, household size, student rules, age restrictions, rent, and availability.', 'Some apartments have project-based assistance tied to the unit. Ask the property which subsidy, if any, applies.', 'Keep separate records for each application and update every provider when your safe contact details change.'],
    sources: [source('MidPen application listings', 'https://www.midpen-housing.org/find-housing/'), source('SCCHA separates property and voucher routes', 'https://www.scchousingauthority.org/section-8/for-participants/')]
  },
  {
    id: 'disability', title: 'Disability can open a different route—not an automatic award',
    body: 'Ask about Mainstream vouchers, other disability-related housing, accessible units, and reasonable accommodations. A diagnosis or a long documented disability history by itself does not guarantee a voucher, priority, or an immediate home.',
    bullets: ['Mainstream generally requires a qualifying household member age 18–61 at admission, plus other voucher rules.', 'Permanent supportive housing can have different disability, homelessness, assessment, and referral requirements.', 'Ask which verification is needed, who can complete it, and whether the program can help obtain missing records.'],
    sources: [source('HUD Mainstream criteria', 'https://files.hudexchange.info/resources/documents/Mainstream-Vouchers-The-Basics.pdf'), source('SCCHA current policies', 'https://www.scchousingauthority.org/home/adminplan/')]
  },
  {
    id: 'medical-supports', title: 'What to ask your Medi-Cal plan',
    body: '“Can you screen me for housing-related Community Supports?” Housing navigation, deposit assistance, and tenancy support are different services. Transitional Rent can cover up to six months for people who meet additional eligibility criteria; it is not ongoing rent support for every Medi-Cal member.',
    bullets: ['Start with Member Services on your plan card, your provider, or a care manager.', 'Ask about the specific service, qualifying circumstances, referral, and authorization steps.', 'A referral is not approval. Ask how you will receive the decision and who will deliver approved services.'],
    sources: [source('DHCS Community Supports', 'https://www.dhcs.ca.gov/calaim-transforming-medi-cal/enhanced-care-management-and-community-supports/community-supports-search-tool/'), source('SCFHP member instructions', 'https://www.scfhp.com/healthcare-plans/medi-cal/programs/community-supports/')]
  },
  {
    id: 'solo', title: 'Finding a rental yourself, with help for the move',
    body: 'You can search for a room or apartment yourself and ask a community organization about move-in help. A church or local nonprofit may offer limited assistance or a referral. Ask before committing to a rental, because funds, service boundaries, and approval timing vary.',
    bullets: ['Check the ongoing rent, utilities, transportation, and move-in costs against a budget you can sustain.', 'Ask: “Do you fund security deposits or first-month rent? Do I need a lease or letter of intent? Must you approve it before I sign or pay?”', 'Ask whether assistance is paid to the landlord, what the landlord must provide, and when payment could happen.', 'Keep a backup plan. A conversation or application is not a funding commitment.'],
    sources: [source('Sacred Heart deposit requirements', 'https://www.sacredheartcs.org/deposit-assistance/'), source('SVdP community assistance', 'https://www.svdp.org/if-you-need-help/')]
  },
  {
    id: 'safety', title: 'Housing dependence does not make abuse your fault',
    body: 'You can talk with an advocate even if you are unsure whether to leave. Explain that your housing depends on the person and ask about a safe plan, confidential shelter screening, and practical alternatives.',
    bullets: ['If possible, contact support from a device the other person cannot access.', 'A quick-exit button does not erase browser history, downloads, call logs, or device monitoring.', 'Ask about confidentiality and its limits before sharing identifying details, especially if you are under 18.', 'For immediate danger, call 911.'],
    sources: [source('Next Door safety and housing support', 'https://www.nextdoorsolutions.org/help'), source('YWCA confidentiality information', 'https://yourywca.org/support-line/')]
  }
];
