// Decision support, not eligibility screening. Contacts and rules live in the resource modules.
// Answers are kept in browser memory by the caller. This module has no I/O or side effects.
const option = (value, label, description, reply, icon = 'arrow') => ({ value, label, description, reply, icon });
const question = (id, kicker, title, body, options, extra = {}) => ({ id, kicker, title, body, options, ...extra });

export const initialChoices = [
  option('hps', 'I’m worried about rent', 'I want to keep my place or cover a move-in cost.', 'Let’s separate help keeping your current place from help paying a deposit. They have different next steps.', 'home'),
  option('crisis', 'I need a stable place', 'I’m staying temporarily, in a car, outside, or need somewhere tonight.', 'A temporary place can still be unstable. Let’s start with where you can stay and what is urgent.', 'compass'),
  option('affordable', 'I’m looking ahead', 'I want an affordable apartment, a voucher, or my own rental.', 'A property application and a voucher application lead to different things. Let’s choose the route you want.', 'key'),
  option('safety', 'I don’t feel safe at home', 'My housing depends on someone who hurts, controls, or threatens me.', 'You can explore support without deciding whether to leave. You choose what to share.', 'shield'),
  option('unsure', 'I’m not sure where to start', 'Help me sort out what matters first.', 'That’s enough to begin. We can find one useful conversation without needing your whole story.', 'book')
];

const pathQuestion = question('path', 'YOUR STARTING POINT', 'What would make housing feel more manageable?', 'Choose what feels closest. The next question will follow your answer.', initialChoices);
const rentStage = question('rentStage', 'KEEPING YOUR PLACE', 'What is happening with rent right now?', 'This changes whether we start with prevention, legal help, or move-in assistance.', [
  option('behind', 'I’m behind or won’t be able to pay', 'I still have a place, but keeping it feels uncertain.', 'Let’s focus on prevention screening. You do not need to wait until rent is 30 days late.'),
  option('notice', 'I received a notice or court papers', 'There may be a housing deadline.', 'A deadline needs a legal-help route alongside rent assistance. Let’s work out what support would help you act.'),
  option('deposit', 'I need a deposit or first month’s rent', 'I’m trying to move into a place.', 'Move-in help is a different screening process. The important next question is whether you already found a rental.'),
  option('planning', 'I’m okay now, but worried about next month', 'I want to prepare before it becomes a crisis.', 'We can start with campus navigation and a prevention conversation before the situation gets worse.')
]);
const rentBarrier = a => question('rentBarrier', 'YOUR NEXT CONVERSATION', a.rentStage === 'planning' ? 'What would help you prepare?' : 'What is getting in the way of asking for help?', 'We’ll turn this into a specific question to ask the agency.', [
  option('not-called', 'I haven’t contacted anyone yet', 'I need to know who to call and what to say.', 'Your first step can be a screening call. I’ll give you a short script and a backup contact.'),
  option('documents', 'I’m missing paperwork', 'ID, a lease, income proof, or something else.', 'Ask what alternatives the agency accepts before trying to collect everything. Missing paperwork should not stop the first conversation.'),
  option('waiting', 'I contacted someone and I’m waiting', 'I need to know how to follow up.', 'Let’s make your next step a status check: who owns the request, what is still needed, and when to hear back.'),
  option('denied', 'An agency couldn’t help me', 'I need another route.', 'Ask why that specific route could not help and whether another fund or partner fits. One answer is not the whole network.')
]);
const noticeNeed = question('noticeNeed', 'DON’T LOSE THE NEXT STEP', 'What would help with the notice?', 'You do not need to type dates, upload documents, or describe the legal issue here.', [
  option('understand', 'I need someone to explain it', 'I’m unsure what the notice means.', 'Keep the notice and contact housing legal intake promptly. An advocate can help you understand what applies.'),
  option('papers', 'I have court papers or a deadline', 'I need help taking the next action.', 'Make legal intake your first contact, and tell them there is a deadline. Rent-assistance screening does not pause a legal deadline.'),
  option('rent-help', 'I understand it, but need rent help', 'I want to ask about financial assistance too.', 'Use two tracks: ask legal intake about the notice and an HPS agency about possible rent assistance.'),
  option('support', 'I want someone at Mission beside me', 'Help making a call or organizing what to bring.', 'Mission Basic Needs can help you navigate the next call. The agency or legal provider still decides what it can do.')
]);
const moveStage = a => question('moveStage', 'MOVE-IN HELP', a.housingGoal === 'independent' ? 'How far along is your own rental search?' : 'Have you found a place you want to move into?', 'Deposit programs may need a proposed unit and landlord paperwork. Ask about approval timing before you rely on a payment.', [
  option('looking', 'I’m still looking for a room or apartment', 'No specific rental yet.', 'Start with a realistic monthly budget and ask what a deposit program needs before you find a unit.'),
  option('found', 'I found a place but haven’t committed', 'I want to check help before signing or paying.', 'This is a useful time to ask about eligibility, the proposed unit, required landlord paperwork, and payment timing.'),
  option('signed', 'I signed or already paid something', 'I need to know whether help is still possible.', 'Tell the agency what is already signed or paid. Do not assume it can reimburse costs or pay after the move.')
]);
const crisisPlace = question('crisisPlace', 'FINDING STABILITY', 'Where are things most uncertain?', 'Pick the closest description. Different programs use different definitions; this guide does not decide eligibility.', [
  option('tonight', 'I don’t have a place for tonight', 'Immediate shelter information comes first.', 'Let’s put a same-day shelter conversation first, then keep the longer housing process moving.'),
  option('couch', 'I’m staying with friends or relatives temporarily', 'I can’t count on staying there.', 'Tell intake staff how temporary the arrangement is and when you may have to leave. You can ask for help before sleeping outside.'),
  option('car', 'I’m in a car, outside, or another place not meant for sleeping', 'I want a safer, stable place.', 'Let’s connect immediate support with an assessment route. An assessment is a step in the process, not a promise of a unit.'),
  option('leaving', 'I still have a place, but need to leave soon', 'The arrangement is ending.', 'Describe when and why the arrangement is ending to intake staff. They can help distinguish prevention from other housing routes.')
]);
const assessmentStatus = a => question('assessmentStatus', 'STAY CONNECTED', a.crisisPlace === 'tonight' ? 'While we prioritize tonight, are you already connected to a provider?' : 'Have you talked with a housing provider or had an assessment?', 'This helps avoid starting over if you already have a service record or a person helping you.', [
  option('none', 'No, I’m starting here', 'I need an entry point.', 'We’ll identify an appropriate assessment route and what to ask before visiting.'),
  option('unsure', 'I’ve talked with someone, but I’m not sure', 'I don’t know if there is an assessment on file.', 'Ask the provider to check for an existing HMIS record or assessment. You do not need to know those systems already.'),
  option('existing', 'Yes, I have an assessment or caseworker', 'I want help moving the process forward.', 'Your next step is an update and follow-up conversation: contact details, changed circumstances, next referral, and MyConnectSV.')
]);
const housingGoal = question('housingGoal', 'CHOOSE YOUR HOUSING ROUTE', 'What are you trying to get?', 'These routes can run alongside each other, but their applications do different jobs.', [
  option('property', 'A home in an affordable property', 'For example, a MidPen community.', 'You’ll apply to specific properties and check each one’s rules. That does not put you on a Section 8 interest list.'),
  option('voucher', 'Help paying rent with a voucher', 'I want to understand Section 8.', 'A voucher is rental assistance after selection and approval. We’ll look at the Housing Authority route and what to do while waiting.'),
  option('independent', 'A rental I find myself', 'I may need help covering the move.', 'You can search on your own and ask community organizations about move-in help. Let’s check where you are in the search.'),
  option('compare', 'I want to compare the options', 'I’m not sure what fits yet.', 'We’ll put the property and voucher routes side by side so you can choose a practical first action.')
]);
const housingProgress = a => question('housingProgress', 'MAKE THE APPLICATION USEFUL', a.housingGoal === 'voucher' ? 'Where are you with the voucher process?' : a.housingGoal === 'property' ? 'Where are you with property applications?' : 'Have you started any housing applications?', 'Your next action depends on whether you are starting, waiting, or need an accessible application route.', [
  option('starting', 'I haven’t applied yet', 'I need the correct entry point.', 'We’ll start with the real application instructions and a checklist of questions for that route.'),
  option('waiting', 'I’m on a list or waiting for a response', 'I want to stay active and explore alternatives.', 'Keep your information current with each list separately. Waiting on one route does not stop you from exploring another.'),
  option('access', 'The application is hard to use or understand', 'I need help, language access, or an accommodation.', 'Ask the provider for an accessible way to apply. Mission can help you work through the steps without deciding eligibility.')
]);
const safetyNeed = question('safetyNeed', 'YOUR CHOICE, YOUR PACE', 'What kind of support would feel useful?', 'You do not need to explain what happened or decide to leave to explore help.', [
  option('talk', 'I want to talk through options', 'I may not be ready or able to leave.', 'An advocate can talk through options without requiring you to make a decision now.'),
  option('place', 'I need to ask about a safer place', 'I want shelter or housing options.', 'Ask a confidential advocate about shelter screening and housing alternatives. Availability has to be confirmed directly.'),
  option('plan', 'I need a plan for housing and money', 'Leaving or staying both feel complicated.', 'We’ll connect safety planning with practical housing advocacy. You can ask about finances without sharing your story here.')
]);
const contactSafety = question('contactSafety', 'A SAFE WAY TO CONNECT', 'How would you prefer to make the next contact?', 'No contact information is collected here. A quick exit does not erase history, call logs, or downloads.', [
  option('private', 'I have a private way to call', 'Show the advocate’s contact route.', 'Ask about confidentiality and its limits first, then share only what you choose.'),
  option('not-private', 'I’m not sure this device is private', 'I want to understand options without leaving a saved plan.', 'You can read without saving or downloading anything. If possible, use a device the other person cannot access before contacting support.'),
  option('campus', 'I would like help from someone at Mission', 'Help finding a way to contact an advocate.', 'Mission can help you connect. Ask campus staff about their confidentiality and reporting obligations before sharing identifying details.'),
  option('skip', 'Prefer not to say', 'Keep the options open.', 'You can choose the safest way to make contact later. No personal details are needed to browse.')
], { optional: true });
const unsureNeed = question('unsureNeed', 'ONE THING FIRST', 'Which question sounds most like yours?', 'We can start with a person at Mission and one useful community route.', [
  option('rent', 'Can I keep the place I have?', 'Rent, notices, or an arrangement that may end.', 'Let’s start with prevention screening and campus support.'),
  option('stable', 'Does my temporary place count as a housing crisis?', 'I can’t count on staying where I am.', 'You can ask for help with unstable housing. The provider will apply its own program definition.'),
  option('future', 'How do I find something I can afford?', 'I want to understand housing applications.', 'We’ll compare a property application with the rental-assistance route.'),
  option('safe', 'What if housing is the reason I feel stuck?', 'I’m worried about safety or control.', 'You can ask an advocate about choices without deciding whether to leave.'),
  option('person', 'I just want to talk to someone at Mission', 'I would rather sort it out with a person.', 'Then let’s make that the first step. You don’t need to solve the whole system yourself.')
]);
const locationQuestion = a => question('location', 'THE RIGHT SERVICE AREA', 'Where is the housing situation you’re asking about?', a.path === 'affordable' ? 'This helps separate local assistance from property and voucher applications. Some application rules are different from residency-based emergency help.' : 'The county where you live or experience homelessness can matter more than where you attend class.', [
  option('santa-clara', 'Santa Clara County', 'Including Santa Clara, San José, Sunnyvale, and other county cities.', 'We’ll show Santa Clara County routes. Each program still checks its own service area and requirements.', 'pin'),
  option('outside', 'Outside Santa Clara County', 'I attend Mission but live elsewhere.', 'Mission support stays relevant. For local crisis or rent help, we’ll start with the county where the housing situation is happening.', 'pin'),
  option('skip', 'I’m unsure / prefer not to say', 'Show options without assuming my county.', 'We’ll keep the location question in your call script so staff can check the right service area.', 'compass')
], { optional: true });
const ageQuestion = a => question('age', 'PROGRAMS, NOT ASSUMPTIONS', a.path === 'crisis' ? 'Which age range should the housing route account for?' : 'Would you like age-specific options?', 'Optional. We apply age rules to specific programs, not entire organizations.', [
  option('under18', 'Under 18', 'Include an age-appropriate entry point.', 'Mission can help identify an appropriate route. For confidential services, ask about reporting obligations before identifying yourself.'),
  option('18-24', '18–24', 'Include young-adult and general options.', 'We can include Bill Wilson Center’s college housing route when the housing situation fits its screening purpose.'),
  option('25-54', '25–54', 'Include adult and household support.', 'You still have adult, family, prevention, and affordable-housing routes; housing support is not only for young people.'),
  option('55-61', '55–61', 'Include general support and property age rules.', 'We’ll keep adult options and point you to each property’s actual age requirements.'),
  option('62plus', '62 and older', 'Include general support and senior-property questions.', 'Senior properties have their own rules and openings. General housing support also remains worth exploring.'),
  option('skip', 'Prefer not to say', 'Browse without an age answer.', 'We won’t assume an age-specific program fits. You can ask staff which route is appropriate.')
], { optional: true });
const householdQuestion = a => question('household', 'YOUR HOUSEHOLD', a.path === 'crisis' ? 'Who needs to be included in the housing conversation?' : 'What should the housing search account for?', 'Optional. This helps you ask about household rules and keep people’s needs together.', [
  option('solo', 'Just me', 'I’m looking for support for myself.', 'We’ll make the next questions specific to an individual housing search.'),
  option('family', 'Children or other dependents', 'My household needs to be considered together.', 'Tell intake staff who needs housing together. Family routes and campus parent support can be useful.'),
  option('shared', 'A partner, relatives, or roommates', 'I share housing or plan to.', 'Ask how the program counts household members and income. Don’t assume one application covers everyone.'),
  option('skip', 'Prefer not to say', 'I’ll discuss household details with the provider.', 'Your script will ask about household rules without making an assumption.')
], { optional: true });
const needsQuestion = question('needs', 'ANYTHING ELSE TO ACCOUNT FOR?', 'Add support that matters to you.', 'Choose any, or continue without selecting. No diagnoses, histories, or documents are requested.', [
  option('working', 'I work while attending college', 'Scheduling and an ongoing-rent budget matter.', 'Ask for an intake time that works around your schedule and confirm the rent you would be responsible for.'),
  option('returning', 'I’m returning to school', 'Help reconnecting with campus support.', 'Mission support is relevant for returning students too. Ask for an individual Basic Needs conversation.'),
  option('disability', 'Disability or accessibility needs', 'Ask about accessible housing and accommodations.', 'We can add accessibility questions and disability-related options. Disability alone does not guarantee a voucher.'),
  option('foster', 'Current or past foster-care involvement', 'Explore the appropriate campus support.', 'NextUp has specific age and other eligibility rules. We’ll distinguish that program from general campus support.'),
  option('veteran', 'I’m a veteran', 'Explore veteran housing support.', 'We’ll include a veteran housing-support route and let its staff screen the circumstances.'),
  option('medical', 'I have Medi-Cal', 'Ask my health plan about housing-related support.', 'Your plan can screen for specific housing-related supports. Medi-Cal membership alone is not approval for rent payments.'),
  option('temporary', 'My stay with other people is temporary', 'I need a stable arrangement.', 'Tell the provider how long you can stay and what makes the arrangement uncertain.'),
  option('safety', 'Housing depends on someone and I don’t feel safe', 'Include confidential support options.', 'I’ll add an advocate as a first conversation. You do not need to decide to leave or tell this site what happened.')
], { optional: true, multiple: true });

/** The returned list is the active route. Recompute after every answer. */
export function getJourneyQuestions(answers = {}) {
  const a = answers && typeof answers === 'object' ? answers : {};
  const questions = [pathQuestion];
  if (a.path === 'hps') {
    questions.push(rentStage);
    questions.push(a.rentStage === 'notice' ? noticeNeed : a.rentStage === 'deposit' ? moveStage(a) : rentBarrier(a));
  } else if (a.path === 'crisis') questions.push(crisisPlace, assessmentStatus(a));
  else if (a.path === 'affordable') questions.push(housingGoal, a.housingGoal === 'independent' ? moveStage(a) : housingProgress(a));
  else if (a.path === 'safety') questions.push(safetyNeed, contactSafety);
  else if (a.path === 'unsure') questions.push(unsureNeed);
  return [...questions, locationQuestion(a), ageQuestion(a), householdQuestion(a), needsQuestion];
}

const branchIds = ['rentStage', 'rentBarrier', 'noticeNeed', 'moveStage', 'crisisPlace', 'assessmentStatus', 'housingGoal', 'housingProgress', 'safetyNeed', 'contactSafety', 'unsureNeed'];
const dependents = {
  path: branchIds,
  rentStage: ['rentBarrier', 'noticeNeed', 'moveStage'],
  crisisPlace: ['assessmentStatus'],
  housingGoal: ['housingProgress', 'moveStage'],
  safetyNeed: ['contactSafety'],
  unsureNeed: []
};

/**
 * Call after replacing an answer: pruneJourneyAnswers({...old,[id]:value}, id).
 * Descendant branch answers are cleared; independent profile choices stay intact.
 * Call with no changedId to sanitize an existing record without clearing valid answers.
 */
export function pruneJourneyAnswers(answers = {}, changedId = '') {
  const next = answers && typeof answers === 'object' ? { ...answers } : {};
  for (const id of dependents[changedId] || []) delete next[id];
  // Validation follows active-question order so a rejected parent cannot keep a stale child.
  const valid = {};
  for (const q of getJourneyQuestions(next)) {
    const allowed = new Set(q.options.map(o => o.value));
    if (q.multiple) {
      if (Array.isArray(next[q.id])) valid[q.id] = [...new Set(next[q.id].filter(v => allowed.has(v)))];
    } else if (allowed.has(next[q.id])) valid[q.id] = next[q.id];
  }
  const active = new Set(getJourneyQuestions(valid).map(q => q.id));
  for (const id of Object.keys(valid)) if (!active.has(id) || (branchIds.includes(id) && !valid.path)) delete valid[id];
  return valid;
}

export function getJourneyAnswerTrail(answers = {}) {
  const a = pruneJourneyAnswers(answers);
  return getJourneyQuestions(a).filter(q => a[q.id] !== undefined).map(q => ({
    id: q.id, title: q.title,
    label: q.multiple ? q.options.filter(o => a[q.id].includes(o.value)).map(o => o.label).join(' · ') || 'No extra support selected' : q.options.find(o => o.value === a[q.id])?.label || '',
    reply: q.multiple ? '' : q.options.find(o => o.value === a[q.id])?.reply || ''
  }));
}

const unique = list => [...new Set(list)];
const pathwayFor = a => a.path === 'unsure' ? ({ rent: 'hps', stable: 'crisis', future: 'affordable', safe: 'safety' }[a.unsureNeed] || 'unsure') : a.path || 'unsure';
const ageFits = (id, a) => {
  if (['bwc-college', 'assessment-bwc'].includes(id)) return a.age === '18-24';
  if (id === 'bwc-minors') return a.age === 'under18';
  if (id === 'sccha') return a.age !== 'under18';
  if (id === 'nextup') return !['55-61', '62plus'].includes(a.age);
  if (id === 'mainstream') return a.age !== 'under18' && !(a.age === '62plus' && a.household === 'solo');
  return true;
};

/** Every returned resource ID refers to an existing public resource record. */
export function getJourneyOutcome(answers = {}) {
  const a = pruneJourneyAnswers(answers);
  const path = pathwayFor(a);
  const needs = new Set(a.needs || []);
  const outside = a.location === 'outside';
  const unknownCounty = !a.location || a.location === 'skip';
  const minor = a.age === 'under18';
  const youngAdult = a.age === '18-24';
  const family = a.household === 'family';
  const hasSafety = path === 'safety' || needs.has('safety');
  const reason = {};
  const why = [];
  const steps = [];
  let ids = [];
  let title = 'Start with a person at Mission.';
  let summary = 'You can begin with one conversation and work out the right route together.';
  let route = path === 'unsure' ? 'directory' : path;
  let urgency = null;
  let script = 'I’m a Mission College student and I would like help understanding my housing options. Can we work out one practical next step together?';
  let alternate = 'If the first program cannot help, ask which specific agency or fund to contact next and whether someone can help make that connection.';
  const add = (id, text) => { ids.push(id); if (!reason[id]) reason[id] = text; };
  const step = (title, body, resourceIds) => steps.push({ title, body, resourceIds });
  const assessmentId = youngAdult ? 'assessment-bwc' : a.household === 'solo' ? 'assessment-lifemoves' : 'assessment-south-county';

  if (path === 'hps' && a.rentStage === 'deposit') {
    title = a.moveStage === 'found' ? 'Check move-in help before you commit.' : a.moveStage === 'signed' ? 'Ask what help is still possible for this move.' : 'Set up your move before choosing a rental.';
    summary = 'You asked about a deposit, so your first route is move-in assistance rather than a rent-arrears application.';
    route = 'solo';
    why.push('You selected a deposit or first month’s rent. Those programs screen the proposed move and have their own funding rules.');
    add('sacred-deposit', 'You need move-in help; this resource explains deposit screening, proposed-unit paperwork, and appointment instructions.');
    add('hps-amigos', 'Amigos lists rental and deposit assistance. Ask which funding route could fit this move.');
    step(a.moveStage === 'signed' ? 'Explain what is already signed or paid' : 'Ask about approval before signing or paying', a.moveStage === 'signed' ? 'Tell intake staff exactly which commitments have already been made. Ask if assistance can still apply; reimbursement is not assumed.' : 'Ask whether the program needs a lease or letter of intent, serves the proposed unit, and must approve costs before you commit.', ['sacred-deposit']);
    step(a.moveStage === 'looking' ? 'Build the ongoing-rent budget' : 'Confirm the landlord paperwork and timing', a.moveStage === 'looking' ? 'Include monthly rent, utilities, transportation, and other regular costs. Ask what evidence a deposit program will need once you find a unit.' : 'Ask who receives any approved payment, what the landlord must provide, and when it could be paid. Do not rely on an application as a commitment.', ['hps-amigos']);
    script = `I’m a Mission College student looking for move-in assistance. ${a.moveStage === 'signed' ? 'I have already signed or paid something.' : a.moveStage === 'found' ? 'I found a rental but want to check support before committing.' : 'I am still looking for a rental.'} Can you explain deposit eligibility, the service area, required landlord paperwork, and when approval has to happen?`;
  } else if (path === 'hps') {
    const notice = a.rentStage === 'notice';
    const denied = a.rentBarrier === 'denied';
    const waiting = a.rentBarrier === 'waiting';
    const documents = a.rentBarrier === 'documents';
    title = notice ? 'Put the notice and rent help on two tracks.' : denied ? 'Try the next door with a specific question.' : waiting ? 'Turn the waiting into a clear follow-up.' : documents ? 'Ask about missing documents before you stop.' : 'Start a prevention conversation.';
    summary = notice ? 'You mentioned a notice. Housing legal intake can address that issue while HPS separately screens possible financial help.' : 'You want to keep your current place. HPS screening is a conversation about your situation, documents, and available assistance.';
    why.push(notice ? 'You selected a housing notice or court papers, so legal intake is placed ahead of a routine rent-assistance search.' : a.rentStage === 'planning' ? 'You said rent is manageable now but may become difficult. An early navigation conversation can help you prepare.' : 'You said you are behind or worried about paying rent, so prevention is the first route.');
    if (notice) {
      add('lawfoundation', 'You mentioned a notice or court papers; ask housing legal intake about the issue and any deadline.');
      urgency = 'If there are court papers or a deadline, seek legal help promptly. A rent-help request does not pause a deadline.';
      if (a.noticeNeed === 'support') {
        title = 'Ask Mission to help you make the next call.';
        summary = 'You want a person at Mission beside you. Start with campus navigation while keeping legal intake and any deadline in view.';
        step('Ask Mission to help organize the legal-intake call', 'Tell Basic Needs that there is a notice and you want help connecting to legal intake. Bring the notice to the receiving provider through its own process.', ['mission']);
      } else step(a.noticeNeed === 'papers' ? 'Tell legal intake there are court papers or a deadline' : a.noticeNeed === 'understand' ? 'Ask legal intake to help you understand the notice' : 'Keep the notice on the legal-help track', a.noticeNeed === 'papers' ? 'Keep the papers and contact legal intake promptly. Explain the deadline before discussing a routine financial-help request.' : a.noticeNeed === 'understand' ? 'Ask what the notice means for your situation and what action or referral is appropriate. Keep the lease and related landlord messages available.' : 'Keep the notice, lease, and related messages. Tell intake staff if there is a deadline. They decide whether they can advise or refer you.', ['lawfoundation']);
    }
    add('hps-sacred-heart', documents ? 'You are missing paperwork; ask this HPS intake team what alternatives they can accept before collecting documents.' : waiting ? 'You have already reached out; use the intake instructions to confirm the next person and follow-up process.' : 'This HPS partner provides screening and explains documents, available funds, and next steps.');
    add('hps-amigos', denied ? 'Another agency could not help; Amigos offers a separate contact to ask about rental-assistance screening and referrals.' : 'Amigos is another community-based HPS and rental-assistance entry point.');
    step(waiting ? 'Ask for a clear status and next contact' : denied ? 'Ask why the first route could not help' : documents ? 'Ask what can replace missing paperwork' : 'Request HPS screening', waiting ? 'Ask who is handling the request, which items are outstanding, how urgent changes should be reported, and when to follow up.' : denied ? 'Was the issue service area, eligibility, funding, or missing documents? Ask about another fund or agency, and request a warm referral if available.' : documents ? 'Explain what you do and do not have. Ask about alternative verification and a safe way to submit it; do not upload records to this guide.' : 'Describe the risk to your current housing and ask for screening. You do not have to wait for rent to be 30 days late.', ['hps-sacred-heart']);
    if (!notice) step('Keep a second route available', 'If the agency cannot help, ask about another partner or funding source. Confirm any appointment and location before traveling.', ['hps-amigos']);
    script = `I’m a Mission College student worried about keeping my housing. ${notice ? a.noticeNeed === 'support' ? 'I received a notice and would like help from Mission making a legal-intake call.' : a.noticeNeed === 'papers' ? 'I have court papers or a deadline and need to ask about the next action promptly.' : a.noticeNeed === 'rent-help' ? 'I received a notice and want to understand both legal help and financial-assistance screening.' : 'I received a notice and need someone to help me understand what it means and what to do next.' : documents ? 'I am missing some documents and need to ask what alternatives are accepted.' : denied ? 'Another agency could not help me; can you explain whether a different fund or referral might fit?' : waiting ? 'I have already requested help and want to check the status, missing items, and who follows up.' : 'Can you screen me for HPS and explain what happens after the first call?'} Please confirm your service area and what I should bring.`;
  } else if (path === 'crisis') {
    const tonight = a.crisisPlace === 'tonight';
    const existing = a.assessmentStatus === 'existing';
    const unsureRecord = a.assessmentStatus === 'unsure';
    title = tonight ? 'Start with tonight. Keep the next step open.' : existing ? 'Build on the connection you already have.' : a.crisisPlace === 'couch' ? 'Explain the uncertainty behind the temporary stay.' : 'Connect a housing conversation to an assessment.';
    summary = tonight ? 'Immediate shelter information comes before longer-term applications. Availability must be confirmed by intake staff.' : existing ? 'An existing assessment or caseworker changes your next action: ask for an update and a specific follow-up rather than starting over.' : 'Your housing situation is worth discussing even when you are staying with someone. Each program applies its own rules.';
    why.push(tonight ? 'You selected no place for tonight, so a shelter conversation is first.' : a.crisisPlace === 'couch' ? 'You selected a temporary stay with others; describe how long you can stay and what is making it unstable.' : a.crisisPlace === 'car' ? 'You selected a car, outside, or another place not intended for sleeping, so immediate support and an assessment are relevant questions.' : 'You want a stable place, so the next steps connect immediate needs with the housing-assessment process.');
    if (existing) why.push('You already have an assessment or caseworker, so your plan starts with updating that connection.');
    const first = minor ? 'bwc-minors' : 'abode';
    add(first, minor ? 'You selected under 18. This specific shelter publishes ages 12–17; ask the intake counselor for an appropriate route if you are outside that range.' : tonight ? 'This county page lists the shelter hotline for immediate shelter information. The hotline is not an Abode caseworker.' : 'Abode serves adults, families, and seniors through program-specific county referral routes.');
    if (tonight) {
      urgency = 'Ask about shelter information for today. Do not travel to an administrative office expecting an available bed.';
      step('Ask about a place for tonight', 'Use the listed intake contact to describe who needs a place and ask about availability, the correct intake location, and what to do if no space is available.', [first]);
    } else if (existing) step('Contact your current provider first', 'Ask whether your assessment and safe contact information are current, what has changed, and who owns the next referral. Ask for help connecting to MyConnectSV.', ['mission']);
    else step('Explain the actual living arrangement', 'Describe where you sleep, whether you can stay there, and what may end the arrangement. You do not need to pick the official program definition yourself.', [first]);
    if (!minor) {
      add(assessmentId, youngAdult ? 'You selected ages 18–24; this public assessment route is listed for that age range.' : a.household === 'solo' ? 'You selected a one-person household. The Opportunity Services Center describes its drop-in services as serving single adults; call about assessment availability.' : 'You need a public assessment route; call to confirm household eligibility, the appointment, and the actual location.');
      if (youngAdult) add('bwc-college', 'You are 18–24 and seeking stable housing; ask campus or BWC staff about the specific college-program screening and referral.');
      step(existing ? 'Confirm the next referral and how to stay connected' : unsureRecord ? 'Check for an existing assessment before starting again' : 'Arrange an appropriate housing assessment', existing ? 'Ask the provider what the assessment currently leads to, how to report changes, and how MyConnectSV can help you keep contact details current.' : unsureRecord ? 'Ask the provider to check whether you already have an HMIS record or assessment. If it is outdated, ask how to update it.' : 'Call before visiting. Ask about age and household requirements, appointment arrangements, location, and what to bring. An assessment does not approve housing.', [assessmentId]);
    } else step('Ask Mission to help with an age-appropriate route', 'The adult assessment directory should not be treated as a minors’ service list. Ask the campus team to help you connect and explain confidentiality limits.', ['mission']);
    route = 'assessment';
    script = `I’m a Mission College student. ${tonight ? 'I need shelter information for tonight.' : a.crisisPlace === 'couch' ? 'I am staying with other people temporarily and cannot count on staying there.' : a.crisisPlace === 'car' ? 'I am staying in a car, outside, or another place not intended for sleeping.' : 'My housing arrangement is unstable.'} ${existing ? 'I already have an assessment or caseworker. Can we update my situation, confirm the next referral, and connect to MyConnectSV?' : unsureRecord ? 'Can you check whether I already have an assessment on file and explain how to update it?' : 'Can you explain whether I need a housing assessment and the right intake route for my age and household?'}`;
  } else if (path === 'affordable') {
    const goal = a.housingGoal || 'compare';
    const waiting = a.housingProgress === 'waiting';
    const access = a.housingProgress === 'access';
    const independent = goal === 'independent';
    title = independent ? 'Your search, with a plan for the move.' : goal === 'voucher' ? 'Follow the rental-assistance route.' : goal === 'property' ? 'Find a property, then follow its own application.' : 'Keep the property and voucher routes separate.';
    summary = independent ? 'You can find a rental yourself and ask about help with the move. Approval and ongoing affordability need separate attention.' : waiting ? 'You already started an application. The next step is to keep it active and explore alternatives while you wait.' : access ? 'You asked for application help. Start by requesting an accessible or supported way to complete the provider’s process.' : 'An affordable property application asks for a home at that property. A voucher interest list asks for possible rental assistance.';
    why.push(independent ? 'You want to find a rental yourself, so move-in questions come before a voucher application.' : goal === 'voucher' ? 'You selected help paying rent, so SCCHA’s voucher process is the main route.' : goal === 'property' ? 'You selected a home at an affordable property, so property-specific applications come first.' : 'You asked to compare options, so both application routes are shown with their different purposes.');
    if (independent) {
      route = 'solo';
      add('sacred-deposit', 'You are arranging your own rental; ask whether deposit assistance can fit your proposed move and timing.');
      add('svdp', 'You wanted a direct community route. Local parish groups may offer help or referrals; ask about the exact neighborhood and deposit funding.');
      add('midpen', 'You can also compare affordable properties while doing your own housing search.');
      step(a.moveStage === 'signed' ? 'Explain any existing commitment' : 'Ask what help must be approved first', a.moveStage === 'signed' ? 'Tell the program if a lease is signed or money was already paid. Ask whether its rules still allow help; reimbursement is not assumed.' : 'Before relying on assistance, ask about the proposed rental, service boundaries, required documents, and whether approval must come before signing or paying.', ['sacred-deposit']);
      step(a.moveStage === 'looking' ? 'Compare the full monthly cost' : 'Confirm payment and landlord requirements', a.moveStage === 'looking' ? 'Budget for rent, utilities, transportation, and other regular costs. Deposit help does not make ongoing rent affordable by itself.' : 'Ask the agency who gets paid, what the landlord must provide, and when payment could happen. Keep a backup plan until approval is confirmed.', ['svdp']);
      script = `I’m a Mission College student finding a rental myself. ${a.moveStage === 'signed' ? 'I have already signed or paid something.' : a.moveStage === 'found' ? 'I found a place and have not committed yet.' : 'I am still searching.'} Do you help with deposits or first-month rent, which neighborhoods do you serve, and what must happen before I sign or pay?`;
    } else {
      if (goal !== 'voucher') add('midpen', 'You selected an affordable property or a comparison of routes. MidPen provides property-specific listings and application instructions.');
      if (goal !== 'property' && !minor) add('sccha', 'You want to understand rental assistance. The SCCHA interest list is separate from property applications and does not guarantee a voucher.');
      if (goal === 'voucher') add('midpen', 'A voucher is not immediate housing; property applications are a separate route you can explore while waiting.');
      const lead = goal === 'voucher' && !minor ? 'sccha' : 'midpen';
      step(access ? 'Request an accessible application route' : waiting ? 'Check your application and contact details' : goal === 'voucher' ? 'Understand the interest-list registration' : 'Choose a property and read its instructions', access ? 'Tell the provider what help makes the process accessible: language access, an alternate format, or an accommodation. Ask Mission to help if useful.' : waiting ? goal === 'voucher' ? 'Log in to the SCCHA Applicant Portal and keep your details current; its guidance requires at least annual login to remain active. Joining a list is not an award.' : 'Check the instructions for each property list you joined, confirm safe contact details, and ask how to update the application.' : goal === 'voucher' ? 'Review the actual applicant rules and portal instructions. Selection, eligibility review, and issuing a voucher are separate steps.' : 'Check the listing’s income, household, student, age, accessibility, rent, and application requirements. Each property manages its own process.', [lead]);
      step('Keep a second route moving', 'Track each application separately and continue exploring suitable properties or rental-assistance options. A waiting list cannot supply a move-in date.', minor ? ['mission'] : [goal === 'property' ? 'midpen' : 'sccha', 'midpen']);
      script = `I’m a Mission College student ${waiting ? 'already on an application or interest list' : 'exploring housing applications'}. ${goal === 'voucher' ? 'Can you explain the voucher interest-list process, how to keep my record active, and the next step after selection?' : 'Can you explain this property’s eligibility rules, application status, rent, and how to keep my information current?'}${access ? ' I also need help with an accessible way to complete the application.' : ''}`;
    }
  } else if (path === 'safety') {
    title = a.contactSafety === 'not-private' ? 'Keep the next contact on your terms.' : a.safetyNeed === 'place' ? 'Ask an advocate about a safer place.' : 'Talk through options without pressure.';
    summary = a.safetyNeed === 'place' ? 'You asked about a safer place. A confidential advocate can discuss shelter screening and housing alternatives without a promise of availability.' : 'Housing dependence can make choices complicated. You can talk with an advocate even if you are unsure about leaving.';
    why.push(a.safetyNeed === 'place' ? 'You want to ask about a safer place, so confidential shelter screening and housing advocacy come first.' : 'You selected safety concerns, so an advocate’s support comes before housing-application tasks.');
    add('nextdoor', 'You want to discuss housing and safety together; Next Door offers safety planning, shelter screening, and housing advocacy.');
    add('ywca-support', 'This is another confidential support route, including the option to speak anonymously and ask about reporting limits.');
    step(a.contactSafety === 'campus' ? 'Ask Mission for help making a safe connection' : a.contactSafety === 'not-private' ? 'Choose a safer way to contact support' : 'Start a conversation with an advocate', a.contactSafety === 'campus' ? 'Ask campus staff how they can help you reach an advocate, and ask about their confidentiality and reporting obligations before sharing identifying details.' : a.contactSafety === 'not-private' ? 'If possible, use a device the other person cannot access. You can browse this guide without saving, printing, or downloading a plan. Quick exit does not remove history or call logs.' : 'Ask about confidentiality and its limits, and explain what kind of help you want. You do not need to commit to leaving or share identifying information here.', a.contactSafety === 'campus' ? ['mission'] : ['nextdoor']);
    step(a.safetyNeed === 'place' ? 'Ask about shelter screening and alternatives' : 'Ask about a practical housing-and-money plan', a.safetyNeed === 'place' ? 'Discuss who needs a place, current options, and a safe follow-up method. Never travel to a published office expecting it to be a confidential shelter.' : 'Discuss safe housing options, finances, people who depend on you, and how to follow up safely. Your choices can change as you learn more.', ['nextdoor', 'ywca-support']);
    script = `I depend on someone for housing and I don’t feel safe. ${a.safetyNeed === 'place' ? 'I want to ask about shelter screening or a safer place.' : a.safetyNeed === 'plan' ? 'I want to understand housing and money options.' : 'I may not be ready or able to leave, but I want to talk through options.'} Can you first explain confidentiality and its limits, then help me plan a safe next contact?`;
    urgency = 'If there is immediate danger, call 911. A guide or saved plan is not emergency response.';
    alternate = 'If one support line is unavailable, try the other listed advocate route. If you choose campus support, ask about confidentiality before sharing identifying details.';
  } else {
    why.push('You want help working out where to start. A person at Mission can help sort the options without an application here.');
    step('Ask for an individual Basic Needs conversation', 'Use the Mission Support Form with your college sign-in, or call the office. Ask for help understanding one practical housing step.', ['mission']);
    step('Bring a question, not a complete file', 'You can begin by explaining what feels uncertain and asking what information would be useful. Do not gather or send sensitive documents until the receiving provider explains what it needs.', ['mission']);
  }

  // A county answer changes the intake route; it never changes access to Mission support.
  if (outside && path !== 'affordable') {
    why.push('You attend Mission but the housing situation is outside Santa Clara County. Local crisis and rent-help routes should start in that county.');
    ids = ids.filter(id => ['nextdoor', 'ywca-support'].includes(id));
    add('outside', 'You selected another county. This route helps find the relevant local housing and coordinated-entry system.');
    ids = ['outside', ...ids.filter(id => id !== 'outside')];
    if (reason.nextdoor) reason.nextdoor = 'You selected safety support outside Santa Clara County. Ask the advocate whether it can assist in your location or connect you with a local service.';
    if (path !== 'safety') {
      title = 'Connect Mission support with your own county.';
      summary = 'Your campus support remains available. Start local rent, shelter, and assessment questions with the county where the housing situation is happening.';
      steps.splice(0, steps.length,
        { title: 'Ask for the right county intake route', body: 'Use the other-counties resource to ask about rent assistance, shelter, or coordinated entry where you live or experience homelessness. Explain any immediate need or deadline.', resourceIds: ['outside'] },
        { title: 'Ask Mission to help you make the connection', body: 'The campus team can help navigate the referral. Attending Mission alone does not establish eligibility for Santa Clara County assistance.', resourceIds: ['mission'] }
      );
      script = script.replace(/\bHPS\b/g, 'local homelessness-prevention assistance');
      script += ' My housing situation is outside Santa Clara County. Can you connect me to the correct local program instead of assuming campus location establishes eligibility?';
    }
  } else if (outside) {
    why.push('You selected another county. MidPen has property-specific locations; SCCHA states that county residence is not required to apply, although preference rules apply. Emergency assistance still uses its own service boundaries.');
    if (a.housingGoal === 'independent') {
      ids = ids.filter(id => !['sacred-deposit', 'svdp'].includes(id));
      add('outside', 'Your move is outside Santa Clara County; ask about local deposit funds in the relevant service area.');
      steps.forEach(s => { s.resourceIds = ['outside']; });
    }
  } else if (unknownCounty) {
    why.push('You did not confirm the county. Ask each provider to verify its service area before treating a listing as an intake route.');
    script += ' Please check which county and service-area rules apply to my situation.';
  }

  // Keep the first result short. Optional profile answers below can add relevant refinements.
  ids = unique(ids).slice(0, 2);
  if (youngAdult && path === 'crisis' && !outside) add('bwc-college', 'You selected ages 18–24 and need stable housing. Ask campus or BWC staff about the college-program screening and referral.');

  if (minor) {
    why.push('You selected under 18. Adult applications and assessment routes are not automatically appropriate; ask Mission for an age-appropriate connection.');
    if (path === 'affordable') {
      if (a.housingGoal === 'independent') {
        steps[0] = {
          title: a.moveStage === 'signed' ? 'Ask Mission to help with your next move-in step' : a.moveStage === 'found' ? 'Check your rental options before committing' : 'Plan your rental search with Mission',
          body: `You selected under 18 and are finding a rental yourself. Ask Mission to help check applicant, lease, and deposit-program requirements for your age. ${steps[0].body}`,
          resourceIds: ['mission']
        };
      } else if (a.housingGoal === 'property') {
        steps[0] = {
          title: a.housingProgress === 'waiting' ? 'Ask Mission to help check your property application' : a.housingProgress === 'access' ? 'Get help with an accessible property application' : 'Explore property application rules with Mission',
          body: `You selected under 18 and want an affordable property. Ask Mission to help you check that property's applicant and household rules. ${steps[0].body}`,
          resourceIds: ['mission', 'midpen']
        };
      } else {
        steps[0] = { title: 'Ask Mission about an age-appropriate application route', body: 'SCCHA applicants must be 18 or older. Ask campus support how your housing goals can be addressed now and which provider can explain household or applicant rules. Property applications have their own rules and are separate from the voucher route.', resourceIds: ['mission'] };
      }
    }
  }
  if (family) {
    why.push('You have children or dependents. Tell intake staff who needs housing together and ask about household-specific requirements.');
    add('parents', 'You selected children or dependents. Mission EOPS / CARE / CalWORKs can explain relevant campus and family-support routes.');
    script += ' I have children or other dependents; please explain the household requirements and whether everyone can be considered together.';
  } else if (a.household === 'shared') script += ' I share housing with others; please explain how your program counts household members and income.';
  if (needs.has('medical')) {
    add('medical', 'You selected Medi-Cal. Ask your own health plan for screening for the specific housing-related service; coverage alone is not approval.');
    why.push('You have Medi-Cal, so your own health plan is an additional screening route for housing-related Community Supports.');
  }
  if (needs.has('disability')) {
    add('dsps', 'You selected accessibility needs. Campus DSPS can help with college-related accessibility and support navigation.');
    if (!minor && !(a.age === '62plus' && a.household === 'solo')) add('mainstream', 'You selected disability-related needs. Ask about Mainstream and other options; Mainstream requires a qualifying household member age 18–61 and additional criteria.');
    if (!ids.includes('midpen')) add('midpen', 'Ask each property about accessible units, accommodations, and its actual eligibility rules.');
    why.push(a.age === '62plus' && a.household === 'solo' ? 'You are 62 or older and live alone. The Mainstream age rule does not fit that household description, so accessible-property and campus routes are shown instead.' : 'Accessibility needs add accommodation questions and specific housing options; they do not establish automatic voucher eligibility.');
    script += ' I would like to ask about accessible options and reasonable accommodations. What verification is needed through your secure process?';
  }
  if (needs.has('foster')) {
    if (['under18', '18-24'].includes(a.age)) add('nextup', 'You selected foster-care involvement and an age range below 26. Ask NextUp to check its foster-care and enrollment rules.');
    else if (a.age === '25-54' || !a.age || a.age === 'skip') add('nextup', 'You selected foster-care involvement. NextUp requires being under 26 at the start of the academic year; ask only if that exact age rule fits. General Basic Needs support remains available.');
    why.push('NextUp has an under-26 age rule and other requirements. General campus support is still a route if that program does not fit.');
  }
  if (needs.has('veteran')) add('veterans', 'You selected veteran status. Ask veteran housing intake about its program-specific screening and service area.');
  if (needs.has('working')) {
    why.push('You work while attending college. Ask about appointment times and document-submission options that fit your schedule.');
    script += ' I work while attending college. Can we discuss appointment or submission options that fit my schedule?';
  }
  if (needs.has('returning')) why.push('You are returning to school. Mission Basic Needs remains a useful starting point regardless of whether you recently used campus services.');
  if (needs.has('temporary') && path !== 'crisis') {
    why.push('You also said your stay with other people is temporary. Tell intake staff that, because it may change which housing route applies.');
    if (!outside && !minor) add(assessmentId, 'You said your stay is temporary. Ask whether a coordinated-entry assessment is appropriate for the actual arrangement.');
    script += ' My current stay with other people is temporary; please help determine which program definition applies.';
  }
  if (hasSafety && path !== 'safety') {
    add('nextdoor', 'You also selected housing-related safety concerns. An advocate can help you consider safe options alongside the main housing route.');
    ids = ['nextdoor', ...ids.filter(id => id !== 'nextdoor')];
    why.unshift('You also selected safety concerns, so a confidential advocate is included before ordinary housing tasks.');
    steps.unshift({ title: 'Choose a safe way to talk about options', body: 'You can speak with an advocate while still deciding what to do. Ask about confidentiality limits and a safe contact method before sharing identifying details.', resourceIds: ['nextdoor'] });
    urgency = 'If there is immediate danger, call 911. Only save or download a plan if doing so is safe for you.';
  }

  add('mission', 'Mission Basic Needs can help you work through this specific next step, including making a community connection. The support form uses college sign-in.');
  // Keep each step actionable even when a later profile answer excludes a proposed route.
  ids = unique(ids).filter(id => ageFits(id, a));
  const permitted = new Set(ids);
  for (const s of steps) {
    s.resourceIds = unique(s.resourceIds).filter(id => permitted.has(id));
    if (!s.resourceIds.length) s.resourceIds = ['mission'];
  }
  if (steps.length < 3) step('Confirm one follow-up and a backup', 'Ask who to contact next, when to check back, and what to try if the first program cannot help. Save only the contacts you actually want to use.', ['mission']);
  // Optional context must affect an action the student can see, not just card ranking.
  let refinement = null;
  if (needs.has('medical')) refinement = { title: 'Ask your Medi-Cal plan about housing supports', body: 'You selected Medi-Cal. Call Member Services on your own plan card and ask for screening for housing navigation, deposits, or other applicable Community Supports. Coverage alone is not approval.', resourceIds: ['medical'] };
  else if (needs.has('disability')) refinement = { title: 'Ask for accessible options and accommodations', body: a.age === '62plus' && a.household === 'solo' ? 'You selected accessibility needs and a one-person household age 62 or older. Ask properties about accessible units and accommodations; the Mainstream age rule does not match that household description.' : 'You selected accessibility needs. Ask about accessible units, an accessible application process, and what verification the specific provider needs. Disability-related options have their own criteria.', resourceIds: [permitted.has('mainstream') ? 'mainstream' : 'midpen', 'dsps'] };
  else if (needs.has('veteran')) refinement = { title: 'Add a veteran housing-support conversation', body: 'You selected veteran status. Ask veteran housing intake about screening, current capacity, and how its services can work alongside your main housing route.', resourceIds: ['veterans'] };
  else if (needs.has('foster')) refinement = { title: permitted.has('nextup') ? 'Check the specific NextUp requirements' : 'Ask Mission about support after foster-care involvement', body: permitted.has('nextup') ? 'You selected foster-care involvement. NextUp requires being under 26 at the start of the academic year, plus foster-care and enrollment requirements. Ask staff to check those exact rules; Basic Needs remains an option if they do not fit.' : 'You selected foster-care involvement. The NextUp age rule does not fit the age range you selected; ask Basic Needs about other support and community referrals.', resourceIds: [permitted.has('nextup') ? 'nextup' : 'mission'] };
  else if (family) refinement = { title: 'Ask about support for your whole household', body: 'You selected children or dependents. Ask intake staff who can be considered together, and ask Mission EOPS / CARE / CalWORKs about campus and county family-support routes that may apply.', resourceIds: ['parents'] };
  else if (youngAdult && path === 'crisis' && !outside) refinement = { title: 'Ask about the specific college housing program', body: 'You selected ages 18–24. Ask Mission or Bill Wilson Center about the college-program referral, housing-situation criteria, and current capacity. The age range alone does not establish eligibility.', resourceIds: ['bwc-college'] };
  else if (needs.has('working')) refinement = { title: 'Make the intake fit your work schedule', body: 'You work while attending college. Ask about appointment times, remote intake where offered, and how to submit documents securely. Mission can help you organize the follow-up.', resourceIds: ['mission'] };
  else if (needs.has('returning')) refinement = { title: 'Reconnect with campus support', body: 'You are returning to school. Ask Mission Basic Needs for an individual conversation and help keeping track of your next housing contact.', resourceIds: ['mission'] };
  if (refinement && !hasSafety) steps[2] = refinement;
  if (a.contactSafety === 'not-private') steps[2] = { title: 'Leave without creating a saved plan if needed', body: 'You said this device may not be private. You can leave this guide without copying, printing, or downloading anything. Quick exit changes the page but does not clear browser history or device records.', resourceIds: ['nextdoor'] };
  return {
    title, summary, urgency, why: unique(why), steps: steps.slice(0, 3), resourceIds: ids,
    reasons: Object.fromEntries(ids.map(id => [id, reason[id]])), script, alternate, route,
    avoidSaving: a.contactSafety === 'not-private',
    disclaimer: 'These are questions and routes to explore, not an eligibility decision or approval. Programs confirm their own rules and availability.'
  };
}
