/* G / Cards — content.
   Every line is drawn from ../content/projects/*.md and EDITORIAL.md limits.
   Images: "f:name" → assets/f/name-{480,960,1440}.webp · "a:name" → assets/name-{720,1600}.webp
   Profile lines are placeholders until Austin supplies them. */

window.G_PROFILE = {
  name: 'Austin Lin',
  role: 'Product designer, Sydney',
  photo: 'assets/img-profile-720.webp',
  interests: ['Interest one', 'Interest two', 'Interest three'],
  lookingFor: ['Looking for one', 'Looking for two', 'Looking for three'],
  // [label, url] — an empty url renders as a placeholder
  contact: [['Email', ''], ['LinkedIn', ''], ['CV', '']],
  placeholder: true
};

window.G_PROJECTS = [
  {
    id: 'ai-income',
    client: 'NAB', name: 'AI Income Verification', stage: 'Prototype', type: 'spark',
    rarity: 'full', // flagship: full-art card. Remove for the standard window layout.
    art: 'a:nab-x-1', artPos: '50% 40%',
    meta: 'Experience design and live prototyping',
    moves: [
      ['Source cards', 'One card per income source, the way experienced bankers think.'],
      ['Visible decision', 'Declared, AI-assessed and confirmed income, side by side.']
    ],
    stats: [['Role', 'Design · prototype'], ['Status', 'Prototype'], ['Built in', 'Cursor']],
    line: 'Helping bankers review AI without repeating its work.',
    theme: { mode: 'dark', bg: '#050505', bg2: '#2a0605', ink: '#f4eee8', acc: '#ff3b2a', dot: '#ff4433', p1: '#3a0d0b', p2: '#0c0404', cink: '#f6e9e2', scape: 'track' },
    subs: [
      { label: 'Problem', title: 'AI only helps if checking it beats redoing it.',
        more: ['Bankers moved between systems to read documents, copy figures, calculate income and reconcile changes. Variable income and multiple employers made it harder.'] },
      { label: 'Finding', title: 'Experts think in income sources, not document timelines.',
        more: ['We shadowed a lending consultant on live cases and ran two prototype feedback sessions.', 'The first design stepped through documents in a timeline. Understandable, but slow for experienced bankers. The prototype moved to one card per income source.'] },
      { label: 'Design', title: 'Keep the machine’s assessment and the human’s decision apart.',
        more: ['Declared, AI-assessed and banker-confirmed income sit side by side. Checks needing attention surface; routine ones collapse. Decision reasons and a receipt make each review traceable.'],
        film: 'nab-film-10.html' },
      { label: 'Open question', title: 'Show the effect on affordability before confirming.',
        more: ['Bankers wanted to see whether changing an income would affect the applicant’s ability to afford the loan. That remains a product opportunity.', 'The film illustrates 31 manual clicks becoming one confirmation in a proposed workflow. The banker still reviews the evidence. Production time savings and AI accuracy are unmeasured.'] }
    ]
  },
  {
    id: 'open-banking',
    client: 'NAB', name: 'Open Banking', stage: 'Research', type: 'swap',
    art: 'a:nab-x-2', artPos: '50% 45%',
    meta: 'Led design and consent research',
    moves: [
      ['Explain the exchange', 'Who receives the data, why, and for how long.'],
      ['Name the bank', 'Behind a partner brand, customers still looked for NAB.']
    ],
    stats: [['Role', 'Design · research lead'], ['Focus', 'Consent'], ['Status', 'Research']],
    line: 'Verifying income without hunting for payslips.',
    theme: { mode: 'dark', bg: '#03100d', bg2: '#073528', ink: '#ecf6f1', acc: '#5fe0b5', dot: '#5fe0b5', p1: '#d9f3e9', p2: '#8fd3bd', cink: '#0f241d', scape: 'ripple' },
    subs: [
      { label: 'Problem', title: 'The payslip is on a work laptop.',
        more: ['A conditional credit-card outcome could send customers looking for payslips, downloading files and waiting for review.', 'Open Banking offered another route: consent to data being shared from another institution.'] },
      { label: 'Finding', title: 'Convenience didn’t answer: who gets my data?',
        more: ['Customers still asked who received their data, why it was needed and how long it would remain available.', 'A five-day deletion message in the prototype made the limit concrete.'] },
      { label: 'Finding', title: 'Recognising the brand isn’t knowing the bank.',
        more: ['In Qantas Money research, recognising the consumer brand didn’t settle who provided the financial service. Co-branding and clearer identification of NAB did.'] },
      { label: 'Design', title: 'A toggle means little when every option is required.',
        more: ['Participants questioned toggles when every category appeared necessary. The design used concise explanations with expandable detail, and kept manual upload available.'] }
    ]
  },
  {
    id: 'expense-capture',
    client: 'NAB', name: 'Expense Capture', stage: 'Unsecured lending', type: 'coins',
    figure: ['16→2', 'inputs'],
    art: 'a:nab-x-4', artPos: '50% 30%',
    meta: 'Research and expense-entry design',
    moves: [
      ['Two paths', 'Enter a known total, or get help building one.'],
      ['Plain categories', 'Card sorting reshaped how expenses are grouped.']
    ],
    stats: [['Role', 'Research · design'], ['Method', 'Card sort · eye tracking'], ['Inputs', '16 → 2']],
    line: 'Fewer expense inputs, with guidance when needed.',
    theme: { mode: 'dark', bg: '#100608', bg2: '#3a1216', ink: '#fbefea', acc: '#ff8a6b', dot: '#ff8a6b', p1: '#ffe0d4', p2: '#f59a7f', cink: '#2a0f0b', scape: 'bars' },
    subs: [
      { label: 'Outcome', title: '16 required inputs became two.', img: 'f:expense-entry', pos: '50% 8%',
        more: ['Customers can enter a known total or get guided calculation: 87.5% fewer required inputs.', 'This measures inputs, not time. Completion time and conversion aren’t quantified.'],
        media: ['f:expense-entry', 'f:expense-detail', 'f:expense-routes'] },
      { label: 'Finding', title: 'Car insurance: insurance, or transport?', img: 'f:expense-detail', pos: '50% 6%',
        more: ['Card sorting showed the bank’s categories weren’t self-explanatory. Presenting insurance first resolved it. Grouping housing and investment-property expenses meant fewer revisits.'],
        media: ['f:expense-evolution', 'f:expense-language'] },
      { label: 'Finding', title: 'One example can shrink the answer.', img: 'f:expense-sketch', pos: '50% 30%',
        more: ['We expected “Netflix” to prompt people to recall similar subscriptions. Some read it literally and narrowed their answer.', 'So: explain the category, without letting one example define it.'] },
      { label: 'Evidence', title: 'Help belongs beside the field.', img: 'f:expense-gaze', pos: '50% 40%',
        more: ['Eye tracking showed customers referring to the explanatory column while completing adjacent fields. The layout kept them together.'],
        media: ['f:expense-gaze'] }
    ]
  },
  {
    id: 'appointment-booking',
    client: 'CommBank', name: 'Appointment Booking', stage: 'Home lending', type: 'home',
    figure: ['2018', 'released'],
    art: 'a:fp-2-hero', artPos: '50% 50%',
    meta: 'End-to-end product design',
    moves: [
      ['Book, not request', 'Direct booking against real lender availability.'],
      ['Two questions', 'Channel, then time. Phone customers skip location.']
    ],
    stats: [['Role', 'End-to-end design'], ['Released', '2018, national'], ['Before', '24h+ callback']],
    line: 'Booking a lender without waiting for a callback.',
    theme: { mode: 'light', bg: '#f5f0e4', bg2: '#f3dc8a', ink: '#1b1a17', acc: '#b88a00', dot: '#d9a900', p1: '#fff6cf', p2: '#ffd447', cink: '#1d1a10', scape: 'domes' },
    subs: [
      { label: 'Before', title: 'A request was not yet an appointment.', img: 'f:booking-form', pos: '50% 0%',
        more: ['Customers submitted a form and waited at least 24 hours for a callback to arrange a time.', 'Afterwards, arranging an appointment took about five minutes. That compares access to booking, not active task time.'] },
      { label: 'Finding', title: 'One filter asked too much of occasional users.', img: 'f:booking-filter', pos: '50% 10%',
        more: ['The first filter combined channel, time and language. Splitting it into two questions reused a familiar pattern and resolved the friction.'],
        media: ['f:booking-filter', 'f:booking-question', 'f:booking-time'] },
      { label: 'Trade-off', title: 'Photos felt personal. People picked by face.', img: 'f:booking-faces', pos: '80% 20%',
        more: ['Lender photos made profiles feel personal, but participants also chose by appearance rather than suitable availability.'],
        media: ['f:booking-faces'] },
      { label: 'Outcome', title: 'Released nationally in 2018.', img: 'f:booking-confirm', pos: '50% 0%',
        more: ['Phone, branch and mobile-lender appointments. I worked with developers on limited availability and alternative branches, then refined content and CSS across viewports.'],
        media: ['f:booking-book', 'f:booking-unavailable', 'f:booking-confirm'] }
    ]
  },
  {
    id: 'restaurant-discovery',
    client: 'Personal', name: 'Restaurant Discovery', stage: 'In development', type: 'bowl',
    art: 'gen:lights',
    meta: 'Product, pipeline and review tools',
    moves: [
      ['Evidence first', 'Every price traces back to its source menu.'],
      ['Human review', 'Side-by-side outputs, small batches, versioned checks.']
    ],
    stats: [['Role', 'Product · build'], ['Stack', 'Python · Next.js'], ['Status', 'In development']],
    line: 'Making dishes and prices searchable, and trustworthy.',
    theme: { mode: 'dark', bg: '#080604', bg2: '#3a2208', ink: '#f7efe2', acc: '#ffb547', dot: '#ffb547', p1: '#3d2711', p2: '#110a04', cink: '#fbeedb', scape: 'lights' },
    subs: [
      { label: 'Problem', title: 'A venue directory can’t answer the food question.',
        more: ['I wanted people to find food by dish, price and location. That needs menu evidence from websites, PDFs and photographs, with every price tied to the right dish, size and option.'] },
      { label: 'Setback', title: 'Inspect what the model actually receives.',
        more: ['Early extraction returned few usable items. The sampled PDFs had text but rendered blank as images, so no prompt could fix it.', 'I moved to native text and layout first, with local models repairing difficult structures.'] },
      { label: 'Finding', title: 'A cheap side could qualify a pricey result.',
        more: ['A budget search could match a restaurant through an unrelated cheap item while showing a more expensive dish. Search had to validate the link between query, item and price.'] },
      { label: 'Film', title: 'Every menu, in one camera move.',
        more: ['Collection, extraction and review, as a short film.'],
        film: 'crawler-film-2.html' }
    ]
  },
  {
    id: 'canwork',
    client: 'CommBank', name: 'CanWork', stage: 'Branch staffing', type: 'clock',
    art: 'a:work-2-hero', artPos: '50% 40%',
    meta: 'End-to-end product design',
    moves: [
      ['Two sides', 'Managers create shifts. Staff accept them.'],
      ['Two states', 'Needs attention, or waiting on someone else.']
    ],
    stats: [['Role', 'End-to-end design'], ['Research', 'Staff · managers'], ['Network', '900+ branches']],
    line: 'Filling branch shifts without phone chains.',
    theme: { mode: 'dark', bg: '#050505', bg2: '#2b2400', ink: '#f5f2e6', acc: '#ffd400', dot: '#ffd400', p1: '#fff4b0', p2: '#ffd400', cink: '#1a1600', scape: 'lanes' },
    subs: [
      { label: 'Problem', title: 'Extra shifts depended on who you knew.', img: 'f:work-research', pos: '50% 20%',
        more: ['Casual and part-time staff wanted work at other branches. Managers needed gaps filled. Calls, messages and informal networks connected them.'],
        media: ['f:work-research'] },
      { label: 'Design', title: 'One shift, two journeys.', img: 'f:work-create', pos: '50% 0%',
        more: ['Managers create shifts and track progress. Staff set location and availability, then accept offers. Notifications keep both sides informed.'],
        media: ['f:work-create', 'f:work-candidates', 'f:work-offer', 'f:work-accepted'] },
      { label: 'Insight', title: 'A consistent language for action and waiting.', img: 'f:work-states', pos: '50% 0%',
        more: ['Early iterations treated each shift state on its own, and the architecture drifted. The design distinguished work needing attention from work waiting on someone else, with accepted shifts represented separately. That model set the visual treatment and actions across the app.'],
        media: ['f:work-states'] }
    ]
  },
  {
    id: 'nrma',
    client: 'NRMA · IAG', name: 'Quote & MyAccount', stage: 'Insurance', type: 'shield',
    art: 'a:fp-2-iag', artPos: '50% 62%',
    meta: 'Pattern standards across teams',
    moves: [
      ['Shared patterns', 'One reference for quote and account teams.'],
      ['Exception framework', 'Each failure gets its own next step.']
    ],
    stats: [['Role', 'Pattern standards'], ['With', 'Product · underwriting'], ['Programme', 'Home, 2020']],
    line: 'Shared insurance patterns for everyday tasks and exceptions.',
    theme: { mode: 'light', bg: '#eef0ea', bg2: '#bfdcdd', ink: '#10202a', acc: '#1a6f8f', dot: '#2a85a3', p1: '#e3f3f4', p2: '#93c8d3', cink: '#0d1f27', scape: 'swell' },
    subs: [
      { label: 'Principle', title: 'Different failures need different next steps.', img: 'a:iag-2-item-4', pos: '50% 50%',
        more: ['Validation, system errors, underwriting restrictions, referrals and special conditions each got a distinct response: correct an entry, explain a restriction, or move to assisted service.', 'One generic error could not say all of that.'],
        media: ['a:iag-2-item-4'] },
      { label: 'Design', title: 'Claims, quotes and policies in one view.', img: 'f:iag-account-crop', pos: '50% 0%',
        more: ['Dashboard studies brought claims, saved quotes and policies together.'],
        media: ['f:iag-account', 'f:iag-mobile'] },
      { label: 'Design', title: 'Renew without leaving the journey.', img: 'f:iag-renewal', pos: '50% 0%',
        more: ['Customers review their details and adjust cover-related information within renewal.'],
        media: ['f:iag-renewal', 'f:iag-bills'] }
    ]
  },
  {
    id: 'qantas',
    client: 'Qantas', name: 'Travel Insurance', stage: 'Research · 2022', type: 'plane',
    art: 'a:qantas-hero', artPos: '50% 50%',
    meta: 'Research, journey analysis and concepts',
    moves: [
      ['Cover up front', 'Coverage shown by default, not behind a control.'],
      ['Plainly optional', 'Login and extras clearly marked as optional.']
    ],
    stats: [['Role', 'Research · concepts'], ['Year', '2022'], ['Status', 'Concept']],
    line: 'Making cover clear before customers commit.',
    theme: { mode: 'dark', bg: '#0a0303', bg2: '#420808', ink: '#fbeeea', acc: '#ff5a4a', dot: '#ff5a4a', p1: '#ffe1d9', p2: '#f0725f', cink: '#2a0905', scape: 'drift' },
    subs: [
      { label: 'Finding', title: 'Customers couldn’t tell what was optional.', img: 'a:qantas-myExperience', pos: '50% 50%',
        more: ['Journey analysis found people unsure whether login was required, missing hidden cover detail and overlooking the option to skip extras. Extra luggage cover was mistaken for included protection.'] },
      { label: 'Signal', title: '67% of 76 read the PDS before buying.', figure: '67%',
        more: ['As reported on the research board. Participants wanted precise coverage language and concrete examples.'],
        media: ['f:qantas-research'] },
      { label: 'Proposal', title: 'Trip questions first. Cover shown by default.', img: 'f:qantas-proposal', pos: '50% 30%',
        more: ['Move trip questions onto the landing page, explain optional login, and combine product and extras selection.', 'It remained a concept. The next test: do customers understand their cover more accurately?'],
        media: ['f:qantas-proposal'] }
    ]
  }
];
