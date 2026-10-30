// Official-source directory, reviewed 2026-10-30. Contacts are not availability guarantees.
const directorySource = { label: 'Official HPS partner directory', url: 'https://preventhomelessness.org/' };
const source = (label, url) => ({ label, url });
const commonDocuments = ['Ask the agency what is needed for your situation.', 'HPS may request household IDs, a lease, two months of income information, and recent bills.', 'Ask about alternatives if something is missing; do not delay asking for help.'];
const commonFallback = 'Ask for another funding source or a referral. For HPS routing, call (408) 516-5100 or email info@preventhomelessness.org. Mission Basic Needs can help with the next step.';
const commonAfter = 'Ask for an HPS pre-screening appointment. Staff review your situation, explain eligibility and any documents needed, then discuss available help or a referral.';
const base = { program: 'Homelessness Prevention System (HPS)', ages: 'HPS has no published general age cutoff; ask about this agency’s intake rules, especially for minors.', area: 'Santa Clara County for HPS; other agency programs may have narrower service areas.', email: null, actionLabel: 'View intake instructions', visit: 'Call before visiting to confirm the correct location and whether an appointment is needed.', afterContact: commonAfter, documents: commonDocuments, fallback: commonFallback, checked: '2026-10-30' };

export const hpsGuide = {
  title: 'Keep your housing: how HPS works',
  overview: 'HPS is Santa Clara County’s Homelessness Prevention System: temporary financial help, legal support, and case management for eligible individuals and families at risk of losing housing.',
  phone: '(408) 516-5100', email: 'info@preventhomelessness.org', url: 'https://preventhomelessness.org/',
  eligibility: 'A partner agency screens county residents for income and housing risk. The published guideline is currently housed but at risk of losing housing within about 14 days. Contact them before you lose your place; you do not have to wait until rent is 30 days late.',
  immigration: 'HPS says citizenship or legal residency is not required and it does not collect immigration status.',
  steps: [
    { title: 'Contact a partner', text: 'Call an agency directly for screening, or use the HPS phone/email for routing.' },
    { title: 'Tell them what is happening', text: 'A pre-screening interview and questionnaire usually take 1–2 hours.' },
    { title: 'Ask about documents', text: 'Staff explain what they need and possible alternatives for missing paperwork.' },
    { title: 'Review the next step', text: 'Ask what assistance is available, who follows up, and what to try if you cannot receive help.' }
  ],
  documents: ['Identification for household members', 'Lease or other proof of your housing arrangement', 'Income information for the past two months', 'Recent bills; bring any rent notice you received'],
  documentNote: 'Requirements are flexible and agency-specific. Ask before collecting documents or sending anything sensitive. This guide never accepts document uploads.',
  depositNote: 'Some agencies also offer security-deposit assistance. Ask about funding, the proposed unit, approval timing, and landlord paperwork before relying on payment or signing a lease.',
  denialNote: 'If HPS cannot help, ask about the Emergency Assistance Network, other agency funds, legal help, or county shelter/assessment routes. An organization outside the HPS partner network cannot make the final HPS eligibility decision.',
  directoryNote: 'All 21 agency/location entries displayed in the current HPS directory are included below. LifeMoves lists two locations. Program details and available funds can change.',
  sources: [directorySource, source('Current HPS flyer', 'https://preventhomelessness.org/documents/2022/06/homelessness-prevention-system-flyer-english.pdf/'), source('Sacred Heart application steps and deposits', 'https://www.sacredheartcs.org/housing-assistance')],
  checked: '2026-10-30'
};

export const hpsPartners = [
  {
    ...base, id: 'sacred-heart', name: 'Sacred Heart Community Service',
    summary: 'HPS screening plus separate emergency rent, deposit, and housing-stability funds.',
    serves: 'Low-income individuals and families. HPS is countywide; some other funds depend on ZIP code and county residency history.',
    phone: '(408) 709-2364', email: 'housinginfo@sacredheartcs.org',
    url: 'https://www.sacredheartcs.org/housing-assistance',
    address: '1381 South First Street, San Jose, CA 95110', addressType: 'Agency office; phone screening first',
    visit: 'Create membership, then call or email housing staff. Staff can help with membership by phone. Screening is by phone; request an in-person accommodation if needed.',
    afterContact: 'Staff check initial eligibility, schedule screening, and give a document list. If approved, assistance is paid to the landlord or other third party. Ask for a case manager’s follow-up contact.',
    sources: [directorySource, source('Housing assistance and intake', 'https://www.sacredheartcs.org/housing-assistance'), source('Register with Sacred Heart (membership, not housing approval)', 'https://shcs.my.site.com/IntakePortal/s/intake?language=en_US')], tags: ['rent','deposit','adults','family']
  },
  {
    ...base, id: 'aaci', name: 'AACI — Asian Women’s Home',
    program: 'Survivor HPS, housing advocacy and emergency shelter screening',
    summary: 'Confidential help for domestic-violence and human-trafficking survivors; all communities welcome.',
    serves: 'Survivors of domestic violence or human trafficking, including individuals and families. Ask about age-specific arrangements.',
    phone: '(408) 975-2739', url: 'https://aaci.org/wellness/womens-home/',
    address: '2400 Moorpark Avenue, Suite 300, San Jose, CA 95128', addressType: 'Corporate office; not a shelter address or confirmed HPS walk-in location',
    visit: 'Call the 24/7 hotline for confidential screening and safe arrangements. Do not travel to the corporate office expecting shelter.',
    afterContact: 'An advocate discusses safety, housing needs, and available shelter or support options. Ask about survivor-specific HPS.',
    documents: ['Ask the advocate what is needed and how to share it safely.', 'Missing paperwork should not stop you from contacting the hotline.'],
    sources: [directorySource, source('Asian Women’s Home services and HPS', 'https://aaci.org/wellness/womens-home/')], tags: ['safety','rent','family']
  },
  {
    ...base, id: 'amigos', name: 'Amigos de Guadalupe',
    program: 'Rental & Deposit Assistance / HPS', summary: 'Help to secure or keep housing, with a community-based entry point in East San José.',
    serves: 'Low-income individuals and families at risk of losing housing; ask about rental and deposit funding.',
    phone: '(408) 341-6080', email: 'info@amigosdeguadalupe.org',
    url: 'https://www.amigoscenter.com/rentalanddepositassistance',
    address: '1897 Alum Rock Avenue, Suite 35, San Jose, CA 95116', addressType: 'Agency office',
    sources: [directorySource, source('Rental & deposit assistance', 'https://www.amigoscenter.com/rentalanddepositassistance')], tags: ['rent','deposit','family','adults']
  },
  {
    ...base, id: 'bach', name: 'Bay Area Community Health',
    summary: 'HPS assistance alongside health and community-support programs.',
    serves: 'Low-income Santa Clara County individuals and families facing housing loss. Street-health services are a separate program.',
    phone: '(510) 290-9297', email: 'info.hps@bach.health', url: 'https://bach.health/homeless-programs',
    address: '40910 Fremont Boulevard, Fremont, CA 94538', addressType: 'Administrative office outside Santa Clara County; not a confirmed HPS intake site',
    visit: 'Call the HPS-listed number or email the HPS team for the correct appointment route; do not assume a medical appointment is housing intake.',
    sources: [directorySource, source('BACH HPS contact', 'https://bach.health/homeless-programs')], tags: ['rent','adults','family','health']
  },
  {
    ...base, id: 'bwc-hps', name: 'Bill Wilson Center',
    summary: 'HPS is separate from Bill Wilson Center’s age-limited college housing and youth programs.',
    serves: 'Its HPS page invites low-income Santa Clara County individuals and families facing housing loss. Ask which program fits your household.',
    phone: '(408) 243-0222', email: 'bwcmail@billwilsoncenter.org',
    url: 'https://www.billwilsoncenter.org/services/all/hps-program.html',
    address: '3490 The Alameda, Santa Clara, CA 95050', addressType: 'Main office',
    visit: 'Call the main office and request HPS intake; its HPS page also routes through (408) 516-5100. This is not the 18–24 college-program application.',
    afterContact: 'Ask an intake counselor which housing program can screen you. The organization has programs for children, adults, and families; each has its own rules.',
    sources: [directorySource, source('BWC HPS program', 'https://www.billwilsoncenter.org/services/all/hps-program.html'), source('Intake instructions and main office', 'https://www.billwilsoncenter.org/about/faqs.html')], tags: ['rent','adults','family','youth']
  },
  {
    ...base, id: 'csa', name: 'Community Services Agency of Mountain View and Los Altos',
    summary: 'HPS partner and local emergency financial assistance, with support for individuals, families, and seniors.',
    serves: 'Ask for HPS screening. Separate local programs focus on Mountain View, Los Altos, and Los Altos Hills.',
    phone: '(650) 968-0836', url: 'https://www.csacares.org/', actionLabel: 'Visit agency website',
    address: '204 Stierlin Road, Mountain View, CA 94043', addressType: 'Agency service site, listed by City of Mountain View',
    visit: 'Call first for housing intake and current appointment instructions. The agency website could not be fully retrieved during this review.',
    sources: [directorySource, source('City of Mountain View provider directory', 'https://www.mountainview.gov/our-city/departments/housing/programs-and-resources/community-service-providers')], tags: ['rent','adults','family','senior']
  },
  {
    ...base, id: 'community-solutions', name: 'Community Solutions',
    program: 'Survivor HPS and crisis support', summary: 'Housing and safety support for survivors of domestic violence, sexual assault, or human trafficking.',
    serves: 'Survivors and their families. Organization serves Santa Clara and San Benito counties; Santa Clara HPS has its own county rules.',
    phone: '(877) 363-7238', email: 'info@communitysolutions.org', url: 'https://www.communitysolutions.org/need-help/',
    address: '9015 Murray Avenue, Suite 100, Gilroy, CA 95020', addressType: 'Headquarters and mailing address; ask for the appropriate service site',
    visit: 'Use the 24/7 crisis line for support and screening. General email is not secure; do not email confidential details.',
    afterContact: 'Ask an advocate about safety, survivor housing support, and HPS screening; arrange the appropriate site or appointment.',
    documents: ['Ask the advocate about safe document-sharing and any housing assistance requirements.'],
    sources: [directorySource, source('Current HPS flyer: survivor programs', 'https://preventhomelessness.org/documents/2022/06/homelessness-prevention-system-flyer-english.pdf/'), source('Help', 'https://www.communitysolutions.org/need-help/'), source('Contact locations', 'https://www.communitysolutions.org/contact-us/')], tags: ['safety','rent','family']
  },
  {
    ...base, id: 'family-supportive', name: 'Family Supportive Housing',
    summary: 'Family-focused shelter and support organization participating in HPS.',
    serves: 'Organization focuses on single- and two-parent families with children. Its HPS page describes assistance for eligible individuals and families; ask staff to confirm the right route.',
    phone: '(408) 926-8885', url: 'https://familysupportivehousing.org/programs-and-services/homeless-prevention-system-covid-19-financial-assistance-program/',
    address: '692 North King Road, San Jose, CA 95133', addressType: 'Organization / family shelter location; HPS appointment must be confirmed',
    visit: 'Call for HPS screening instructions. For adult/family emergency shelter referrals, use Here4You at (408) 385-2400; do not assume a walk-in bed.',
    sources: [directorySource, source('HPS program', 'https://familysupportivehousing.org/programs-and-services/homeless-prevention-system-covid-19-financial-assistance-program/'), source('Families and contact location', 'https://familysupportivehousing.org/')], tags: ['rent','family','children']
  },
  {
    ...base, id: 'homefirst', name: 'HomeFirst',
    summary: 'HPS partner within a broader network of prevention, outreach, shelter, and housing programs.',
    serves: 'Individuals and families; ask for Santa Clara County HPS. Other HomeFirst programs have their own referrals and eligibility.',
    phone: '(408) 786-8538', email: 'hpsinfo@homefirstscc.org', url: 'https://www.homefirstservices.org/get-help',
    address: null, addressType: 'HPS intake street address not confirmed',
    visit: 'Call the HPS directory number first. If it does not connect, ask the main office at (408) 539-2100 for HPS. Confirm an intake address; the published donation drop-off is not housing intake.',
    sources: [directorySource, source('HomeFirst help routes', 'https://www.homefirstservices.org/get-help'), source('General contact', 'https://www.homefirstservices.org/about/contact'), source('City of Gilroy HPS email and phone', 'https://www.cityofgilroy.org/973/Unhoused-Resources-Efforts')], tags: ['rent','adults','family','veteran']
  },
  {
    ...base, id: 'housing-choices', name: 'Housing Choices',
    summary: 'HPS partner with specialized housing expertise for people with developmental disabilities.',
    serves: 'Ask about HPS and disability-related housing coordination separately. Its other services focus on people with developmental disabilities.',
    phone: '(408) 498-5777', email: 'info@housingchoices.org', url: 'https://www.housingchoices.org/homelessness-prevention',
    address: '20 Great Oaks, Suite 205, San Jose, CA 95119', addressType: 'Santa Clara County office',
    visit: 'Call to request HPS screening and confirm an appointment. The service-referral form on the agency website is not a housing award or apartment application.',
    sources: [directorySource, source('HPS and local office', 'https://www.housingchoices.org/homelessness-prevention'), source('Specialized services', 'https://www.housingchoices.org/'), source('Request Housing Choices services (interest form)', 'https://housingchoices.my.site.com/interestform/s/')], tags: ['rent','disability','adults','family']
  },
  {
    ...base, id: 'ican', name: 'International Children Assistance Network (ICAN)',
    summary: 'HPS support for individuals and families; the organization’s name does not limit this program to children.',
    serves: 'Low-income Santa Clara County households at housing risk; HPS has no county ZIP-code restriction.',
    phone: '(408) 480-5502', email: 'hps.renthelp@ican2.org', url: 'https://www.ican2.org/homelessness-prevention-system',
    address: '890 Hillview Court, Suite 100, Milpitas, CA 95035', addressType: 'Headquarters, appointment only',
    visit: 'Call the HPS team before visiting. ICAN also lists a Family Resource Center at 2072 Lucretia Avenue, San Jose; ask which location your appointment uses.',
    sources: [directorySource, source('ICAN HPS intake and locations', 'https://www.ican2.org/homelessness-prevention-system')], tags: ['rent','deposit','family','adults']
  },
  {
    ...base, id: 'latinas-contra-cancer', name: 'Latinas Contra Cancer',
    summary: 'HPS support and patient-resource navigation, including housing concerns during illness.',
    serves: 'Its HPS page invites eligible low-income county individuals and families. Cancer-specific services and the Prescribed Housing pilot have separate requirements.',
    phone: '(408) 280-0811', email: 'office@latinascontracancer.org', url: 'https://www.latinascontracancer.org/homelessness-prevention-system',
    address: '25 North 14th Street, Suite 900, San Jose, CA 95112', addressType: 'Agency office',
    visit: 'Call or email for housing screening; ask for a Patient Resources Navigator and confirm the appointment before visiting.',
    sources: [directorySource, source('HPS eligibility and navigator contacts', 'https://www.latinascontracancer.org/homelessness-prevention-system'), source('Current office and services', 'https://www.latinascontracancer.org/patient-caregiver-services')], tags: ['rent','health','family','adults']
  },
  {
    ...base, id: 'law-foundation', name: 'Law Foundation of Silicon Valley',
    program: 'Housing legal assistance / HPS legal partner', summary: 'Free housing legal advice and possible representation. This is not a rental-payment program.',
    serves: 'Low-income Santa Clara County individuals and families with housing legal issues; case acceptance depends on the issue and capacity.',
    phone: '(408) 280-2424', url: 'https://www.lawfoundation.org/housingresources',
    address: '4 North Second Street, Suite 1300, San Jose, CA 95113', addressType: 'Legal-services office',
    visit: 'Check intake instructions before visiting. Published phone hours are Monday mornings; website pages differ on closing time (11 vs 11:30). Emergency eviction clinic is Thursday; arrive by 12:30 for the 1pm start. Space is limited.',
    afterContact: 'Staff screen the legal issue and explain whether they can help or refer you. If you have court papers, do not wait for a financial-assistance decision to seek legal help.',
    documents: ['Have any eviction notice, court papers, lease, rent ledger, and relevant messages available; confirm what staff need.'],
    fallback: 'For rent funding, ask an HPS financial-assistance agency or (408) 516-5100. For urgent court matters, use the court self-help resources linked on the legal intake page.',
    sources: [directorySource, source('Housing intake and urgent alternatives', 'https://www.lawfoundation.org/housingresources'), source('Office and clinic hours', 'https://www.lawfoundation.org/contactus')], tags: ['legal','rent','disability','adults','family']
  },
  {
    ...base, id: 'lifemoves-opportunity', name: 'LifeMoves — Opportunity Center',
    summary: 'A separately listed HPS route in Palo Alto. Opportunity Services Center also offers drop-in basic needs and navigation.',
    serves: 'HPS: eligible county individuals and families. The drop-in center primarily serves single adults; other LifeMoves programs vary.',
    phone: '(650) 537-2921', url: 'https://lifemoves.org/get-help/',
    address: '33 Encina Avenue, Palo Alto, CA 94301', addressType: 'Opportunity Services Center; confirm HPS appointment location',
    visit: 'Call the HPS-listed number for screening. For drop-in center hours, LifeMoves lists (650) 853-8672. Confirm which service and appointment you need.',
    sources: [directorySource, source('LifeMoves help and HPS', 'https://lifemoves.org/get-help/'), source('Opportunity Services Center', 'https://lifemoves.org/directory/opportunity-services-center/'), source('City of Palo Alto address directory', 'https://www.cityofpaloalto.org/files/assets/public/v/1/community-services/human-services/programs-resources/services-for-unhoused-resident-updated-1-24.pdf')], tags: ['rent','adults','family']
  },
  {
    ...base, id: 'lifemoves-georgia', name: 'LifeMoves — Georgia Villa',
    summary: 'The second LifeMoves location separately listed by HPS; contact it directly about screening.',
    serves: 'Eligible low-income Santa Clara County individuals and families at risk of housing loss. Other LifeMoves funds may be ZIP-code restricted.',
    phone: '(650) 600-4390', url: 'https://lifemoves.org/get-help/',
    address: '184 South 11th Street, San Jose, CA 95112', addressType: 'Location listed by Sacred Heart; call to reconfirm before travel',
    visit: 'Use the current HPS directory number first. Sacred Heart also lists (408) 271-0685 ext. 641; the sources differ. Confirm the current intake location and appointment.',
    sources: [directorySource, source('LifeMoves HPS instructions', 'https://lifemoves.org/get-help/'), source('Sacred Heart location notice', 'https://www.sacredheartcs.org/housing-assistance')], tags: ['rent','adults','family']
  },
  {
    ...base, id: 'next-door', name: 'Next Door Solutions',
    program: 'Survivor HPS, safety planning and housing advocacy', summary: 'Support when a partner uses housing, money, threats, or other control against you.',
    serves: 'People experiencing intimate-partner violence in Santa Clara County, including families. Help is available while deciding whether or how to leave.',
    phone: '(408) 279-2962', email: 'info@nextdoor.org', url: 'https://www.nextdoorsolutions.org/help',
    address: '1400 Parkmoor Avenue, Suite 120, San Jose, CA 95126', addressType: 'Community office, not confidential shelter',
    visit: 'Call the 24/7 hotline for safety and housing screening. Community-office walk-in support is also listed; call (408) 501-7550 for current hours.',
    afterContact: 'An advocate checks whether it is safe to talk and discusses the help you want. Ask about safe housing options and survivor HPS without needing to make a decision about leaving first.',
    documents: ['Ask what information is needed and how to share it safely. You can call to discuss options before collecting paperwork.'],
    sources: [directorySource, source('Help, hotline and current office', 'https://www.nextdoorsolutions.org/help')], tags: ['safety','rent','family']
  },
  {
    ...base, id: 'roots', name: 'Roots Community Health',
    summary: 'HPS partner with navigation and wraparound support for people and families experiencing hardship.',
    serves: 'Ask for Santa Clara County HPS screening; Roots has separate Oakland and South Bay programs.',
    phone: '(510) 777-1177', url: 'https://rootscommunityhealth.org/our-work/health-wellness-services/medical-services/locations/', actionLabel: 'View contact locations',
    address: '1811 South 7th Street, Suite E, San Jose, CA 95112', addressType: 'South Bay headquarters; HPS intake location must be confirmed',
    visit: 'The HPS directory lists the main number above. South Bay headquarters also lists (408) 905-9054. Ask where housing screening happens before visiting; a clinic visit is not housing intake.',
    sources: [directorySource, source('South Bay headquarters and contact', 'https://rootscommunityhealth.org/our-work/health-wellness-services/medical-services/locations/')], tags: ['rent','health','adults','family']
  },
  {
    ...base, id: 'south-county', name: 'South County Community Services',
    summary: 'Emergency rent and utility help, case management, and links to legal and household support.',
    serves: 'Individuals and families facing housing loss. Ask about South County service coverage and HPS.',
    phone: '(408) 842-6662 ext. 122', email: 'housinginfo@sccommunityservices.org', url: 'https://www.sccommunityservices.org/homelessness-prevention',
    address: '7950 Church Street, Suite A, Gilroy, CA 95020', addressType: 'Mailing address; confirm appointment location',
    visit: 'Call the housing-program extension 122 listed on its current program page. The central HPS directory still lists extension 21. Confirm the current route and location.',
    sources: [directorySource, source('Current prevention-program contact', 'https://www.sccommunityservices.org/homelessness-prevention')], tags: ['rent','adults','family']
  },
  {
    ...base, id: 'sunnyvale', name: 'Sunnyvale Community Services',
    summary: 'HPS screening plus separate local financial assistance and case management.',
    serves: 'HPS serves eligible Santa Clara County households without a county ZIP-code restriction. Other SCS assistance may have location rules.',
    phone: '(408) 738-4321', email: 'info@svcommunityservices.org', url: 'https://svcommunityservices.org/hps/',
    address: '1160 Kern Avenue, Sunnyvale, CA 94085', addressType: 'Current agency office',
    visit: 'Call and ask to speak with a caseworker about HPS. Confirm whether a housing appointment is needed before visiting.',
    sources: [directorySource, source('HPS requirements', 'https://svcommunityservices.org/hps/'), source('Current contact and office', 'https://svcommunityservices.org/contact-us/')], tags: ['rent','adults','family','senior']
  },
  {
    ...base, id: 'west-valley', name: 'West Valley Community Services',
    summary: 'HPS and emergency rent/utility assistance; additional basic-needs and housing referrals.',
    serves: 'HPS: eligible county households. Other services focus on Cupertino, Los Gatos, Monte Sereno, Saratoga, and West San José.',
    phone: '(408) 255-8033', url: 'https://www.wvcommunityservices.org/support',
    address: '10104 Vista Drive, Cupertino, CA 95014', addressType: 'Agency office',
    visit: 'Call for an HPS screening appointment. WVCS does not offer emergency housing or shelter; ask for referrals if you need somewhere tonight.',
    sources: [directorySource, source('Rent assistance and HPS', 'https://www.wvcommunityservices.org/support'), source('Housing and shelter limits', 'https://www.wvcommunityservices.org/housing')], tags: ['rent','adults','family','senior']
  },
  {
    ...base, id: 'ywca', name: 'YWCA Golden Gate Silicon Valley',
    program: 'Survivor HPS and housing services', summary: 'Temporary rental help, shelter screening, safety planning, and housing support for survivors.',
    serves: 'Survivors of domestic violence, sexual assault, or human trafficking and their families in Santa Clara County.',
    phone: '(800) 572-2782', email: 'info@yourywca.org', url: 'https://yourywca.org/our-services/housing-continuum-for-survivors/',
    address: '375 South Third Street, San Jose, CA 95112', addressType: 'Main office, not a confidential shelter address',
    visit: 'Call the 24/7 English/Spanish support line for housing help. General email is for information, with a stated 1–2 business-day response; it is not crisis intake.',
    afterContact: 'An advocate discusses safety and housing needs, screens for available services, and can connect you with housing case management and related support.',
    documents: ['Ask the advocate about housing-program documents and a safe way to provide them.'],
    sources: [directorySource, source('Housing program intake', 'https://yourywca.org/our-services/housing-continuum-for-survivors/'), source('Main office and email guidance', 'https://yourywca.org/')], tags: ['safety','rent','family']
  }
];
