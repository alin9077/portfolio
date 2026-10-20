// Profile copy supplied by Austin, 20 October 2026. H overrides the shared G placeholders.
window.H_PROFILE = {
  ...window.G_PROFILE,
  role: 'Product designer — Sydney',
  interests: ['Investing in frontier technologies', 'Reducing design to its elements and finding value where it may not be obvious', 'Learning - Connecting Dots and Understanding Ecosystems'],
  lookingFor: ['Surrounding myself with like-minded people', 'Projects where we can use frontier AI to push the boundaries of product and design'],
  contact: [['Email', 'mailto:alin9077@gmail.com'], ['LinkedIn', 'https://au.linkedin.com/in/austin-lin-2a179643'], ['CV', '#cv']],
  placeholder: false
};

/* H / Print — brands and their projects.
   Copy is condensed from ../content/LANDING.md and ../content/projects/*.md (EV from ../../ev/README.md).
   Overview highlights were supplied and refined with Austin on 20 October 2026.
   Sub-page insights still come from project-details.js, through each project's `gid`.

   Media keys:  "a:name" → assets/name-{720,1600}.webp   "f:name" → assets/f/name-{480,960,1440}.webp
                "b:name" → assets/brands/name-{960,1600}.webp
   A project's media is { img, pos }, { img, ground } (a screen set on a coloured ground) or { film, poster }.
   demo: "booking" or "ev" renders a product demo; image renders supplied artwork; other media stays a placeholder.
   highlights: concise dot points below the optional overview headline.
   brief: true  → an overview row without a sub-page.
   later: true  → brand still to be curated; shown as carried over.

   deck: the brand's trading card. Supplied complete prints use image metadata and public/cards/;
   otherwise its art is generated (scripts/h-cards/art.js → assets/h/cards/{art}-*.webp).
   moves are the card's "attacks". Company figures come from each company's latest full-year reports and are
   about the company, not project reach. The first card introduces Austin, condensed from ../content/LANDING.md. */

window.H_BRANDS = [
  {
    id: 'ai', name: 'AI Projects', sector: 'NAB and personal work', mark: 'pen',
    card: { bg: '#1c2b6b', ink: '#f6f2e6', acc: '#f6c400' },
    // Supplied complete Austin card; the earlier generated full-art configuration remains as a fallback.
    deck: {
      layout: 'full', name: 'Austin Lin', kicker: 'Product designer', sub: 'Based in Sydney',
      art: 'austin-full', variants: ['photo', 'illustrated'], foil: 'silver', etch: 'swirl',
      image: { file: 'austin', width: 1061, height: 1482, alt: 'Designer — Austin Lin. An anime portrait in a chef hat, holding a pencil over design sketches, with a cat by the window. Reduce: Remove all unnecessary noise. Ultra Think: Zoom out and question requirements and understand how everything connects.' },
      moves: [
        { name: 'Reduction', text: 'Remove all unnecessary noise and increase signal', cost: 2 },
        { name: 'Optimise', text: 'Rearrange information for maximum clarity', cost: 2 }
      ]
    },
    projects: ['ai-income', 'menu-finder', 'ev']
  },
  {
    id: 'commbank', name: 'CommBank', sector: 'Home lending and branch staffing', mark: 'home',
    card: { bg: '#f5c400', ink: '#161616', acc: '#161616' },
    deck: {
      name: 'CommBank', kicker: 'Bank', hp: ['Est.', '1911'], art: 'commbank', etch: 'diamond',
      image: { file: 'cba', width: 1061, height: 1483, alt: 'CommBank — The Golden Key. A hand holds a gold key bearing the CommBank diamond. Unlock Home: Find your way to a place of your own.' },
      moves: [
        { name: 'Customers', value: '18m+', text: 'Australia’s largest bank' },
        { name: 'Home loans', value: '$749bn', text: 'Balances at 30 June 2026' },
        { name: 'Branches', value: '646', text: 'Branches and service centres in Australia' }
      ],
      source: 'CBA 2026 Annual Review and FY26 results'
    },
    projects: ['appointment-booking', 'canwork']
  },
  {
    id: 'nab', name: 'NAB', sector: 'Lending and Open Banking', mark: 'coins',
    card: { bg: '#161616', ink: '#f2efe8', acc: '#e2231a' },
    deck: {
      name: 'NAB', kicker: 'Bank', hp: ['Est.', '1858'], art: 'nab', etch: 'star',
      image: { file: 'nab', width: 1061, height: 1482, alt: 'NAB — Personal Lending. A hand holds a gold compass with the NAB star and logo. Next Move: Find a clearer path for your next big purchase.' },
      moves: [
        { name: 'Customers', value: '~10m', text: 'Across Australia and New Zealand' },
        { name: 'Business lending', value: '21.7%', text: 'Australian market share, September 2025' },
        { name: 'Home lending', value: '14.2%', text: 'Australian market share, September 2025' }
      ],
      source: 'NAB 2025 Annual Report and FY25 results'
    },
    projects: ['open-banking', 'expense-capture']
  },
  {
    id: 'qantas', name: 'Qantas', sector: 'Travel insurance and loyalty', mark: 'plane',
    card: { bg: '#d22a1e', ink: '#fbf4ea', acc: '#fbf4ea' },
    deck: {
      name: 'Qantas', kicker: 'Airline', hp: ['Est.', '1920'], art: 'qantas', etch: 'rings',
      image: { file: 'qantas', width: 1061, height: 1483, alt: 'Qantas holographic card. A Qantas aircraft climbs through a glowing orange and rose sky.' },
      moves: [
        { name: 'Frequent Flyers', value: '18.9m', text: 'Members at June 2026' },
        { name: 'Passengers', value: '55.9m', text: 'Carried by the Group in FY26' },
        { name: 'Insurance', value: '+16%', text: 'Growth in Qantas Insurance customers, FY26' }
      ],
      source: 'Qantas 2026 Annual Report and FY26 results'
    },
    projects: ['qantas', 'multi-policy-discount']
  },
  {
    id: 'iag', name: 'IAG', sector: 'NRMA quote and MyAccount', mark: 'shield',
    card: { bg: '#7db7de', ink: '#0f2340', acc: '#0f2340' },
    deck: {
      name: 'IAG', kicker: 'Insurer', hp: ['Est.', '2000'], art: 'iag', etch: 'tiles',
      image: { file: 'iag', width: 1050, height: 1498, alt: 'NRMA holographic card for IAG. A storm, crashing waves and lightning. A thousand year flood.' },
      moves: [
        { name: 'Premiums', value: '$18.4bn', text: 'Gross written premium, FY26' },
        { name: 'Claims paid', value: '$12.4bn', text: 'Approximately, in FY26' },
        { name: 'Most trusted', value: '#1', text: 'NRMA Insurance, Roy Morgan 2025' }
      ],
      source: 'IAG FY26 results'
    },
    projects: ['nrma']
  }
];

window.H_PROJECTS = {
  'ai-income': {
    gid: 'ai-income', name: 'AI income verification', eyebrow: 'NAB · AI Fast Release Project (Design lead)',
    headline: '',
    highlights: [
      'Reduce verification friction by 30×.',
      'Automate around 2,000 hours of repetitive work each week.',
      'Bring three major systems into one workflow.'
    ],
    text: 'Bankers needed to check AI-calculated income without redoing every calculation. I built an interactive prototype in Cursor to test how they compare figures, inspect evidence and confirm a decision.',
    media: { film: 'income-film-square.html', embed: true },
    // Source: ../content/projects/ai-income-verification.md. Film frames illustrate the concept.
    subs: [
      { label: '01 · Workflow', title: 'Design around the way experts think.',
        more: ['Shadowing a lending consultant and two prototype feedback sessions changed the structure of the experience. A document-by-document timeline was understandable, but too slow for experienced bankers. I moved to one card per income source, with supporting documents grouped around employers and properties.'],
        media: [{ key: 'f:income-workflow', alt: 'Explanatory film still: a banker moves figures from separate income documents into a calculator.', caption: 'The starting problem: documents, copied figures and separate systems. Explanatory film still.' }] },
      { label: '02 · Evidence', title: 'Make AI easy to check, without doing its work twice.',
        more: ['Customer-declared, AI-assessed and banker-confirmed income remain distinct. Bankers can compare the figures, inspect the calculation and open the evidence behind it. Checks needing attention are surfaced; routine checks can be collapsed. A genuine payslip is not always sufficient evidence for variable income.'],
        media: [{ key: 'f:income-evidence', alt: 'Explanatory film still: an assessed monthly income is shown with its calculation and supporting income chart.', caption: 'Show how the assessed figure was reached. Explanatory film still; sample values.' }] },
      { label: '03 · Control', title: 'Automate the preparation. Keep the banker’s judgement.',
        more: ['The banker confirms or excludes each income, with reasons and a receipt that make the decision traceable. When AI cannot assess a case, a manual calculator provides a fallback. I built the interactive prototype entirely in Cursor and extended it to multiple jobs, rental income and small businesses.', 'Consultant feedback shaped this prototype; production time savings and AI accuracy have not been measured.'],
        media: [{ key: 'f:income-control', alt: 'Explanatory film still: a payslip and its assessed figures appear side by side for a banker to review before confirming income.', caption: 'Evidence beside the decision, with confirmation in human hands. Explanatory film still.' }] }
    ]
  },
  'menu-finder': {
    gid: 'restaurant-discovery', name: 'Menu finder', eyebrow: 'Personal project · In development',
    headline: 'Making dishes and prices searchable, and trustworthy.',
    highlights: [
      'Indexed 35,000 Australian restaurants with full menus.',
      'Used OpenCrawl runners to collect menu photos from the web.',
      'Trained a model to read menus across different shapes, layouts and sizes, and sent menu photos to OpenRouter for conversion into structured data.'
    ],
    text: 'Menu information is scattered across PDFs and photographs. I’m building collection, AI extraction and review tools so search can connect a dish to its correct price, option and source.',
    media: { film: 'menu-film-square.html', embed: true }
  },
  'ev': {
    name: 'Compare an electric vehicle', eyebrow: 'Personal project',
    headline: '',
    highlights: [
      'Used ChatGPT (autonomous bot) to gather and organise a large database of EV specifications.',
      'Used Claude to create motion that explains key EV differences.',
      'Help buyers understand what to compare and consider before choosing an EV.'
    ],
    text: 'Every maker presents its EV on its own terms: its own trims, measurement bases and fine print. I built an independent comparison that sets them against one baseline, with every figure dated and sourced.',
    media: { demo: 'ev', img: 'b:ev-price-first', ground: '#24303a' },
    // the project page: three reasons, with shots from the screen recording (scripts/booking-demo/ev_shots.py)
    subs: [
      { label: 'Baseline', title: 'One fixed baseline. Nine rivals, one at a time.',
        more: ['Model Y stays put as the reference while nine alternative EV families take turns beside it. Choose the exact trim and every chapter lines up in matching columns.'],
        media: ['f:ev-baseline'] },
      { label: 'Scenes', title: 'Differences you can see, not just read.',
        more: ['Seven buyer chapters, from price to software. Each opens on a scene that shows what a difference means: a paid driving option, the same charge at home or on the road, luggage in the boot.'],
        media: ['f:ev-scene-driving', 'f:ev-scene-charging', 'f:ev-scene-boot'] },
      { label: 'Evidence', title: 'Every figure dated, sourced and honest about gaps.',
        more: ['Built from dated desk research covering 34 variants across ten families. Each value carries a numbered source and a checked date; weak evidence is labelled Conditional, Not published or Not confirmed, never guessed.'],
        media: ['f:ev-evidence-energy', 'f:ev-evidence-cargo'] }
    ]
  },
  'appointment-booking': {
    gid: 'appointment-booking', name: 'Appointment booking', eyebrow: 'CommBank · Released 2018 (Design lead)',
    headline: 'Booking a lender without waiting for a callback.',
    highlights: [
      'Replaced a 24-hour callback wait with direct bookings in around five minutes.',
      'Made “Book appointment” the main entry point for customers to connect with a lender.',
      'Released nationally in 2018; unchanged in 2026.'
    ],
    text: 'Customers requested an appointment, then waited for a callback. I designed direct booking against lender availability, from research and testing to responsive interfaces. Released nationally in 2018.',
    media: { demo: 'booking', img: 'a:booking-2-hero-screens', pos: '50% 50%' },
    // Original case study: scalable availability pattern; ../content/projects/appointment-booking.md.
    subs: [
      { label: 'Before', title: 'A request was not yet an appointment.',
        more: ['Customers waited at least 24 hours for a callback. The new flow let them book directly.'] },
      { label: 'Finding', title: 'One filter became two questions.',
        more: ['Testing showed that channel, time and language were too much to decide at once.'],
        mediaLayout: 'comparison',
        media: [
          { key: 'f:booking-filter', label: 'Before', frame: 'filter' },
          { key: 'f:booking-question', image: 'newassets/appointment booking/appointment triage.webp', alt: 'Complete meeting-channel screen in the CommBank appointment flow.', label: 'Channel', frame: 'channel' },
          { key: 'f:booking-time', label: 'Time', frame: 'time' }
        ] },
      { label: 'Trade-off', title: 'Photos felt personal. People picked by face.',
        more: [],
        mediaLayout: 'profiles',
        media: [
          { key: 'f:booking-faces', image: 'newassets/appointment booking/profile images used for appointments.webp', frame: 'lenders', label: 'Lenders', alt: 'Early design showing lender profiles and available appointment times.' },
          { key: 'f:booking-faces', image: 'newassets/appointment booking/profile images used for appointments.webp', frame: 'lender-times', label: 'Times', alt: 'Early design showing appointment times grouped by lender.' },
          { key: 'f:booking-faces', image: 'newassets/appointment booking/profile images used for appointments.webp', frame: 'lender-profile', label: 'Profile', alt: 'Early lender profile with a photo, branch and appointment details.' }
        ] },
      { label: 'Pattern', title: 'Up to nine times. More on demand.',
        more: ['One daily calendar for branch, mobile-lender and phone appointments. “+ n more” reveals additional times.'],
        mediaLayout: 'availability',
        media: [
          { key: 'f:booking-pattern', image: 'newassets/appointment booking/scalable appointment patterns.webp', frame: 'calendar', label: 'Availability', alt: 'Shared appointment calendar showing branch, mobile-lender and phone availability.' },
          { key: 'f:booking-times', frame: 'more-times', label: 'More times' }
        ] },
      { label: 'Outcome', title: 'Released nationally in 2018.',
        more: [],
        mediaLayout: 'journey',
        media: [
          { key: 'f:booking-unavailable', label: 'Alternatives' },
          { key: 'f:booking-book', label: 'Review' },
          { key: 'f:booking-confirm', label: 'Confirmed' }
        ] }
    ]
  },
  'canwork': {
    gid: 'canwork', name: 'CanWork', eyebrow: 'CommBank · Branch staffing (Design lead)', brief: true,
    headline: 'Filling branch shifts without phone chains.',
    highlights: [
      'Enabled branch managers to adjust staffing as needs changed.',
      'Helped branch staff find and take on additional shifts.',
      'Created a fully integrated mobile app for on-demand shift sharing.'
    ],
    text: 'I designed the employee and manager experiences around availability, offers and acceptance.',
    media: { img: 'a:work-2-hero-screen', image: 'assets/work-2-hero-screen-1600.webp',
      alt: 'CanWork interface collage showing shift creation, staff responses, approvals and shift details.' }
  },
  'open-banking': {
    gid: 'open-banking', name: 'Open Banking', eyebrow: 'NAB · Research and consent design (Design lead)', brief: true,
    headline: 'Verifying income without hunting for payslips.',
    highlights: [
      'Designed for instant, accurate verification of financial details.',
      'Researched when customers prioritise speed and convenience over privacy.',
      'Younger participants found Open Banking more appealing, while older participants were more sceptical.'
    ],
    text: 'Sharing bank data could spare applicants from finding payslips. I led design and research into the explanations and choices customers needed before consenting.',
    media: {
      img: 'a:nab-x-2', image: 'assets/open-banking/open-banking-concept.webp',
      alt: 'Conceptual Open Banking illustration: account records connect through a secure consent lock to a verification check.'
    }
  },
  'expense-capture': {
    gid: 'expense-capture', name: 'Expense capture', eyebrow: 'NAB · Unsecured lending (Design lead)', brief: true,
    headline: 'Fewer expense inputs, with guidance when needed.',
    highlights: [
      '60% of customers needed help categorising expenses, while 40% preferred an express path.',
      'Designed category prompts to help customers recall their spending.',
      'Added a single-total entry option, reducing inputs by up to 13×.'
    ],
    text: 'Mandatory inputs went from 16 to two, with guided calculation kept for those who need it.',
    media: {
      img: 'f:expense-entry', image: 'assets/f/expense-routes-1440.webp', fit: 'contain', ground: '#000',
      alt: 'Three NAB expense-entry screens: enter a total, calculate expenses by category, and enter insurance and medical costs.'
    }
  },
  'qantas': {
    gid: 'qantas', name: 'Travel insurance', eyebrow: 'Qantas · Research and concepts (Design lead)', brief: true,
    headline: 'Making cover clear before customers commit.',
    highlights: [
      'Researched what travellers wanted from insurance during COVID.',
      'Travel insurance purchases rose 400% during COVID.',
      'Clarified COVID cover across the landing page and quote journey to build purchase confidence.'
    ],
    text: 'Travellers struggled to find coverage details and understand optional steps. I used interviews and concept testing to propose a clearer purchase journey.',
    media: {
      img: 'a:qantas-hero', image: 'assets/qantas-hero-1600.webp', fit: 'contain', ground: '#e9f4f3',
      alt: 'Illustrated travel suitcase with a COVID vaccination card and Qantas branding.'
    }
  },
  'multi-policy-discount': {
    name: 'Multi policy discount', eyebrow: 'Qantas · Loyalty and insurance (Design lead)', brief: true,
    headline: 'Making the value of multiple policies clear.',
    highlights: [
      'Applied learnings from the loyalty flywheel and product stacking.',
      'Tested customer interest in bundling insurance policies.',
      'Redesigned visuals to explain multi-policy rewards.'
    ],
    text: 'Applied learnings from the loyalty flywheel and product stacking, tested interest in insurance bundles, and redesigned the rewards visuals.',
    media: {
      image: 'newassets/qantas/multipolicy qantasinsurance designed.webp',
      alt: 'Two Qantas multi-policy rewards designs comparing points and benefits across policy bundles.',
      comparison: [
        { image: 'newassets/qantas/multipolicy qantas insurance undesigned.webp', label: 'Old', alt: 'Old Qantas multi-policy designs using imagery and paragraphs to explain rewards.' },
        { image: 'newassets/qantas/multipolicy qantasinsurance designed.webp', label: 'New', alt: 'New Qantas multi-policy designs comparing points and benefits visually.' }
      ]
    },
    subs: [
      { label: 'Visuals', title: 'Exploring how to explain multi-policy rewards.', more: [],
        mediaLayout: 'rewards',
        media: [
          { image: 'newassets/qantas/multipolicy qantas insurance undesigned.webp', label: 'Messaging explorations', alt: 'Two Qantas multi-policy rewards concepts using imagery and text to explain rewards across health, home and car insurance.' },
          { image: 'newassets/qantas/multipolicy qantasinsurance designed.webp', label: 'Redesigned visuals', alt: 'Two redesigned Qantas rewards cards showing points by policy count, a points calculator and additional benefits.' }
        ] }
    ]
  },
  'nrma': {
    gid: 'nrma', name: 'Quote and MyAccount', eyebrow: 'NRMA · Digital transformation (Design lead)', brief: true,
    headline: '',
    highlights: [
      'Redesigned the quote and MyAccount experiences.',
      'Researched renewals and refined the journey to help customers complete them.',
      'Laid the groundwork for future iterations that came to fruition years later (after I had left).'
    ],
    text: 'I redesigned the quote and MyAccount experiences and researched how to improve the renewal journey. This work laid the groundwork for future iterations that came to fruition years later, after I had left.',
    media: {
      img: 'f:iag-account-crop', image: 'assets/f/iag-account-crop-1440.webp', fit: 'contain', ground: '#f6f6f6',
      alt: 'NRMA MyAccount dashboard showing claims, a saved quote and policies due for renewal.'
    }
  }
};

// Work history and education transcribed from Austin's ALIN-CV-2025.pdf.
// Workplace bullet points and skills sections omitted at Austin’s request.
window.H_CV = {
  title: 'Product and Interaction Designer',
  summary: 'I design and prototype complex banking, insurance and AI products.',
  asOf: [2026, 10],
  education: [
    { school: 'The University of Sydney', course: 'Bachelor of Design Computing, minor in IT', year: 'Graduated 2013' },
    { school: 'Muirfield High School', course: 'HSC · North Rocks, Sydney', year: 'Graduated 2008' }
  ],
  experience: [
    { company: 'National Australia Bank (NAB)', role: 'Senior Product Designer', team: 'Personal Everyday Banking, Digital and Enterprise', type: 'Contract', dates: 'Jun 2023 — Present', start: [2023, 6] },
    { company: 'HSBC', role: 'Senior UX/UI Designer', type: 'Contract', dates: 'Oct 2022 — Jun 2023' },
    { company: 'Qantas', role: 'Senior Product Designer', team: 'Insurance, Wellbeing, Design System', type: 'Contract', dates: 'Sep 2021 — Sep 2022' },
    { company: 'Insurance Australia Group (IAG)', role: 'Interaction Designer', team: 'Strategy and Innovation, Design Centre', type: 'Contract', dates: 'Dec 2019 — Sep 2021' },
    { company: 'Massive Interactive', role: 'UX Designer', team: 'Strategy and Innovation, Design Centre', type: 'Contract', dates: 'Dec 2018 — Mar 2019' },
    { company: 'Commonwealth Bank of Australia (CBA)', role: 'UX/UI Designer', team: 'Enterprise Services & Digital', type: 'Contract', dates: 'Aug 2016 — Dec 2018' },
    { company: 'The University of Sydney', role: 'UX Designer and Development', team: 'Faculty of Architecture', type: 'Contract', dates: 'Jan 2014 — Mar 2016' },
    { company: 'Wunderman Bienalto', role: 'UX/UI Designer', type: 'Permanent full-time', dates: 'Jan 2013 — Nov 2014' },
    { company: 'Retail and hospitality', role: 'Part-time roles throughout high school and university', team: 'Telstra, Kmart and hospitality', dates: '2005 — 2013' }
  ]
};
