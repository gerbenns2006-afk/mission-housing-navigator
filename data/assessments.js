// Public routes, not the much longer HMIS membership list. Reviewed 2026-10-30.
const directory = { label: 'County-linked public assessment directory', url: 'https://scc.bitfocus.com/hmis-participating-agencies' };

export const assessmentProviders = [
  {
    id: 'assessment-bwc',
    name: 'Bill Wilson Center · San José',
    summary: 'A public coordinated-entry assessment route for young adults. The Drop-In Center also offers basic needs and housing referrals.',
    ages: '18–24 for this assessment route and Drop-In Center. Other BWC programs have different requirements.',
    area: 'Santa Clara County; San José location',
    phone: '(408) 243-0222',
    email: null,
    url: 'https://www.billwilsoncenter.org/services/all/drop.html',
    actionLabel: 'View intake instructions',
    address: '693 South 2nd Street, San José, CA 95112',
    addressType: 'Drop-In Center; confirm assessment location before travel',
    visit: 'The county-linked directory lists (408) 243-0222 for assessment routing. Call the Drop-In Center at (408) 925-0231 for current hours and ask when an assessor is available.',
    sources: [directory, { label: 'Bill Wilson Center Drop-In Center', url: 'https://www.billwilsoncenter.org/services/all/drop.html' }],
    checked: '2026-10-30',
    tags: ['assessment', '18-24', 'youth', 'temporary', 'family']
  },
  {
    id: 'assessment-south-county',
    name: 'South County Compassion Center · Gilroy',
    summary: 'Listed by this name in the assessment directory. Now part of South County Community Services after its 2025 merger with St. Joseph’s Family Center.',
    ages: 'No age restriction is published in the assessment listing. Confirm the appropriate route for your age and household when calling.',
    area: 'South Santa Clara County; Gilroy',
    phone: '(408) 763-7120',
    email: null,
    url: 'https://www.sccommunityservices.org/unhoused-services',
    actionLabel: 'View intake instructions',
    address: '7950 Church Street, Suite A, Gilroy, CA 95020',
    addressType: 'Main office / mailing address; not a confirmed assessment walk-in site',
    visit: 'Call for an appointment. Ask for the current assessment location before traveling. The organization identifies (408) 763-7120 as its Unhoused Offices number.',
    sources: [directory, { label: 'Current organization and office contacts', url: 'https://www.sccommunityservices.org/' }, { label: 'Organization merger history', url: 'https://www.sccommunityservices.org/history' }, { label: 'Unhoused services', url: 'https://www.sccommunityservices.org/unhoused-services' }],
    checked: '2026-10-30',
    tags: ['assessment', 'adult', 'family', 'south-county', 'temporary']
  },
  {
    id: 'assessment-lifemoves',
    name: 'LifeMoves · Opportunity Services Center',
    summary: 'A Palo Alto public assessment route with drop-in basic needs services and case management.',
    ages: 'The assessment listing gives no numerical age cutoff. LifeMoves describes the center’s drop-in services as serving single adults; ask about the right route for families or minors.',
    area: 'Santa Clara County; Palo Alto location',
    phone: '(650) 853-8672',
    email: null,
    url: 'https://lifemoves.org/get-help/',
    actionLabel: 'View intake instructions',
    address: '33 Encina Avenue, Palo Alto, CA 94301',
    addressType: 'Opportunity Services Center',
    visit: 'Call to check current hours and assessment availability before visiting. The public directory lists this center for assessment drop-ins/referrals; it does not promise same-day appointments.',
    sources: [directory, { label: 'LifeMoves Get Help', url: 'https://lifemoves.org/get-help/' }, { label: 'Center address and adult services', url: 'https://lifemoves.org/adult-services/' }],
    checked: '2026-10-30',
    tags: ['assessment', 'adult', 'north-county', 'temporary']
  }
];

export const assessmentGuide = {
  title: 'Get assessed and stay connected',
  hmis: 'HMIS means Homeless Management Information System. It is a shared service-record database used by participating providers, not a housing application website for students. Ask a provider whether you already have a record, whether your contact details are current, and how consent and information sharing work.',
  coordinatedEntry: 'Coordinated Entry is the county’s process for assessing housing needs and connecting people experiencing homelessness with suitable programs. The county currently calls its assessment VI-SPDAT. A provider asks about your household and circumstances. If appropriate, you may enter the community queue, where priority reflects need rather than who applied first. An assessment can lead toward supportive housing, rapid rehousing, shelter, or other referrals; it cannot promise a placement.',
  myConnect: 'MyConnectSV is the participant website connected to HMIS. It can help you message your service team, see service information, and keep contact details current. Ask your existing provider to help you connect. You can also contact the county’s peer support team at (650) 209-0653 or use the help form on the official page. A MyConnectSV account is not an application approval.',
  steps: [
    'Ask your current provider whether you have an assessment on file and whether your circumstances or contact details need updating.',
    'If you need an assessment, call a listed route to confirm age requirements, appointment arrangements, location, and anything to bring.',
    'Ask the provider to explain the result and the next contact. Keep exploring other housing options while you wait.',
    'Ask your provider or the MyConnectSV peer support team for help connecting to the participant website.'
  ],
  script: 'I’m a Mission College student. Can you help me understand whether I need a coordinated-entry housing assessment, whether I already have one on file, and how to connect to MyConnectSV?',
  disclaimer: 'A service record, assessment, community-queue entry, or MyConnectSV account does not mean housing has been approved. The three routes below are the current public assessment listings, not every agency that uses HMIS. Requirements and availability must be confirmed with the provider.',
  under18: 'Under 18? The listed BWC assessment route is for ages 18–24. Ask Mission Basic Needs or the county Office of Supportive Housing at (408) 278-6400 to help identify an appropriate route; do not assume adult assessment programs accept minors.',
  outsideCounty: 'Attend Mission but live elsewhere? Ask for the coordinated-entry system in the county where you are experiencing homelessness. Mission enrollment alone does not establish eligibility for Santa Clara County programs.',
  myConnectPhone: '(650) 209-0653',
  myConnectUrl: 'https://osh.santaclaracounty.gov/continuum-care/connect-case-managers-using-myconnectsv',
  myConnectLogin: 'https://portal.clarityhs.com/auth/signin?redirect=%2Fdashboard',
  checked: '2026-10-30',
  sources: [
    { label: 'What HMIS is', url: 'https://scc.bitfocus.com/about-hmis' },
    { label: 'County coordinated-entry guidance', url: 'https://osh.santaclaracounty.gov/housing-and-shelter-support/shelter-and-housing-support/housing-support/coordinated-entry-get' },
    directory,
    { label: 'County MyConnectSV information and help form', url: 'https://osh.santaclaracounty.gov/continuum-care/connect-case-managers-using-myconnectsv' },
    { label: 'Current county assessment forms and household versions', url: 'https://scc.bitfocus.com/forms-manuals' }
  ]
};
