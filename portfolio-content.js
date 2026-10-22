// Profile copy supplied by Austin, 20 October 2026. H overrides the shared G placeholders.
window.H_PROFILE = {
  ...window.G_PROFILE,
  role: 'Product designer — Sydney',
  summary: '',
  interests: ['Investing in frontier technologies', 'Reducing design to its elements and finding value where it may not be obvious', 'Learning - Connecting dots and understanding ecosystems'],
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
   compact: true → a supporting text entry without a hero image.
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
    projects: ['appointment-booking', 'canwork', 'commsee']
  },
  {
    id: 'nab', name: 'NAB', sector: 'Lending and Open Banking', mark: 'coins',
    partnerBrands: [
      { name: 'Kogan Money', icon: 'kogan-money-icon.svg' },
      { name: 'Bank of Queensland', icon: 'boq-icon.svg' },
      { name: 'Virgin Money', icon: 'virgin-money-icon.svg' },
      { name: 'Suncorp', icon: 'suncorp-icon.svg' },
      { name: 'Citibank', icon: 'citi-icon.svg' }
    ],
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
    projects: ['open-banking', 'expense-capture', 'nabone', 'additional-cardholders', 'credit-limit-increase', 'balance-transfers']
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
    "demoLabel": "NAB AI income",
    "gid": "ai-income",
    "name": "Categorically upending and automating income verification with agents",
    "eyebrow": "NAB AI · Research and prototype (Design lead)",
    "headline": "",
    "highlights": [
      "Designed a proposed workflow from 31 manual clicks to one confirmation.",
      "Targeting around 2,000 hours of repetitive work saved each week.",
      "Consolidate three systems into a single intuitive workflow."
    ],
    "text": "Bankers copied figures between documents, calculators and lending systems to verify income. I designed a way to check an AI-prepared figure against its evidence, then confirm it in one place.",
    "media": {
      "film": "income-film-square.html",
      "embed": true
    },
    "subs": [
      {
        "label": "The problem",
        "title": "Verifying income meant redoing the maths by hand",
        "more": ["Before approving credit, bankers read each payslip, black out tax file numbers, copy figures into a calculator and move between three systems. Variable pay and multiple employers make it slower and easier to get wrong."],
        "bullets": [
          "<strong>Repetitive:</strong> 31 clicks to verify one payslip, as the film shows",
          "<strong>Retyped by hand:</strong> figures and dates copied between documents and systems",
          "<strong>At scale:</strong> the target is around 2,000 hours of this work saved each week"
        ],
        "film": 2
      },
      {
        "label": "Why build it",
        "title": "AI can prepare the figure; bankers need to trust it",
        "more": ["Models can now read payslips and calculate income. The design question was how a banker could check that figure without doing the work again."],
        "bullets": [
          "<strong>Redacts</strong> the tax file number automatically",
          "<strong>Reads</strong> every figure off the payslip",
          "<strong>Checks</strong> eight things, from the name matching to net pay adding up"
        ],
        "film": 3
      },
      {
        "label": "What I learnt",
        "title": "One card per income source, not one per document",
        "more": ["Shadowing a lending consultant and two feedback sessions showed a document-by-document timeline was too slow for experienced bankers. I grouped the evidence around each employer or property instead."],
        "showcase": {
          "theme": "baseline",
          "brand": "NAB AI",
          "number": "01",
          "title": "Less copying. More judgement.",
          "caption": "Concept film: separate documents, copied figures and a calculator. Not the production system.",
          "images": [
            {
              "id": "ai-income-workflow",
              "image": "assets/f/income-workflow-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "The manual workflow · film still",
              "alt": "Explanatory concept film still showing sample income documents beside a calculator, with figures copied between them."
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "AI only helps if bankers can check it without redoing it",
        "more": ["Variable pay and multiple employers made a single total hard to trust. One genuine payslip may still not prove overtime or commission."],
        "bullets": [
          "<strong>See the difference:</strong> declared, AI-assessed and confirmed income side by side",
          "<strong>Understand the calculation:</strong> $3,742.88 × 26 ÷ 12 = $8,109.57 a month, beside its documents",
          "<strong>Know what needs attention:</strong> name each check, surface exceptions, collapse the rest"
        ],
        "film": 4,
        "showcase": {
          "theme": "range",
          "brand": "NAB AI",
          "number": "02",
          "title": "The figure, and how it was reached.",
          "caption": "The assessed monthly income with its calculation. Sample values.",
          "images": [
            {
              "id": "ai-income-evidence",
              "image": "assets/f/income-evidence-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "Calculation and evidence · film still",
              "alt": "Explanatory concept film still with a sample assessed monthly income of $8,109.57, its calculation and a chart of income over time."
            }
          ]
        }
      },
      {
        "label": "Pattern",
        "title": "Automate the preparation, keep the judgement with the banker",
        "more": ["Bankers confirm or exclude each income with a reason and a receipt. A manual calculator covers cases AI can’t assess."],
        "bullets": [
          "<strong>31 clicks to one confirmation</strong> in the proposed workflow, with the evidence still reviewed",
          "<strong>Target of around 2,000 hours a week:</strong> time savings and AI accuracy not yet measured",
          "<strong>Beyond payslips:</strong> multiple jobs, rental income and small businesses"
        ],
        "film": 6,
        "showcase": {
          "theme": "software",
          "brand": "NAB AI",
          "number": "03",
          "title": "Evidence beside the decision.",
          "caption": "The payslip beside the assessed and confirmed figures. Sample values.",
          "images": [
            {
              "id": "ai-income-control",
              "image": "assets/ai-income-story/confirmed-review.webp",
              "position": "main",
              "frame": "board",
              "label": "Evidence reviewed and confirmed · film still",
              "alt": "Concept illustration showing a sample payslip beside an assessed monthly income of $8,109.57, checked supporting figures and a purple Confirmed button, with one confirmation click."
            }
          ]
        }
      },
      {
        "label": "Next step",
        "title": "Show what changing an income does to the loan",
        "more": ["Bankers asked whether reducing or excluding an income would change affordability. The next step connects each income decision to its effect on the application."]
      }
    ],
    "visualStory": true
  },
  'menu-finder': {
    "illustrativeImages": true,
    "gid": "restaurant-discovery",
    "name": "Find the dish, then the restaurant",
    "subtitle": "35,000 restaurants. 800,000 menu items.",
    "eyebrow": "Personal project",
    "headline": "",
    "highlights": [
      "Working prototype: browse dishes, compare nearby options, then explore the restaurant.",
      "Built menu-collecting agents and fine-tuned models to turn menus into searchable data.",
      "82,000+ menu documents collected from websites and photos."
    ],
    "text": "Finding dinner meant opening menu PDFs and zooming in on a phone. Menu Finder starts with the food: search dishes, compare nearby options, then choose the restaurant.",
    "media": {
      "film": "menu-film-square.html",
      "embed": true
    },
    "subs": [
      {
        "label": "The problem",
        "title": "Restaurant apps answer “where”, not “what can I eat”",
        "more": ["Directories list venues, but the food lives in menu PDFs, photos and websites that are hard to read on a phone and impossible to search. You can’t ask for ramen under $20 nearby and compare the dishes."],
        "bullets": [
          "<strong>Hidden:</strong> menus sit in PDFs, photos and web pages, not searchable data",
          "<strong>Hard to read:</strong> a menu photo means pinching, zooming and squinting",
          "<strong>Hard to compare:</strong> no way to line up the same dish, price or diet across places"
        ],
        "film": 0
      },
      {
        "label": "Why build it",
        "title": "Models can finally read messy menus",
        "more": ["In September 2026, extraction became good and cheap enough to run at scale. With every dish and price structured, people could start with the food and choose the restaurant second."],
        "film": 1
      },
      {
        "label": "What I learnt",
        "title": "Agents collect the menus; models turn them into data",
        "more": ["OpenClaw agents collect menus headlessly, and fine-tuned open and closed models extract them. When local hardware hit its limits, I spread the work across models on OpenRouter that check each other’s results."],
        "film": 2,
        "showcase": {
          "theme": "baseline",
          "brand": "MENU FINDER",
          "number": "01",
          "title": "From a menu to a searchable meal.",
          "caption": "Film frames: menus collected from photos and websites, each dish tied to its price. Sources still need verification.",
          "images": [
            {
              "id": "menu-agents-collect",
              "image": "assets/menu-story/film/01-agents-collect.webp",
              "position": "main",
              "label": "Menus collected from photos and websites",
              "alt": "Menu Finder film frame: a grid of real Newtown restaurants whose menus were collected from photos or websites, including Take Sushi and Ramen Bar."
            },
            {
              "id": "menu-dishes-prices",
              "image": "assets/menu-story/film/02-dishes-and-prices.webp",
              "position": "detail",
              "label": "Each dish tied to its price",
              "alt": "Menu Finder film frame: Take Sushi and Ramen Bar's ramen section read into dishes and prices, with hokkaido miso ramen at 14.70 highlighted."
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "Reading a menu takes more than reading the words",
        "more": ["Extraction became workable as models improved and costs fell in September 2026."],
        "bullets": [
          "<strong>Prices in their own column</strong> can be attached to the wrong dish",
          "<strong>Shared size headings</strong> have to be inferred, not just read",
          "<strong>A cheap side</strong> mustn’t make an expensive meal look under budget"
        ],
        "film": 3,
        "showcase": {
          "theme": "software",
          "brand": "MENU FINDER",
          "number": "02",
          "title": "The right dish. The right price.",
          "caption": "The prototype’s real ramen-under-$20 search: the budget applies to the matching dish.",
          "images": [
            {
              "id": "menu-ramen-under-20",
              "image": "assets/menu-story/film/03-ramen-under-20.webp",
              "position": "main",
              "label": "Budget applies to the dish",
              "alt": "Menu Finder film frame: ramen under $20 within 2 km of Newtown. Take Sushi and Ramen Bar, hokkaido miso ramen $14.70 at 174 m; Miyama Japanese Kitchen $14.90; Izakaya Shogun $19; Sushi Jones $12.80."
            }
          ]
        }
      },
      {
        "label": "Scale",
        "title": "82,000+ menu documents, 800,000 menu items and 35,000 restaurants across Australia.",
        "more": ["An app without data offers little, so I built the database first, across every state. The counts include repeated and older menus, not verified current dishes."],
        "film": 4,
        "showcase": {
          "theme": "range",
          "brand": "MENU FINDER",
          "number": "03",
          "title": "A national collection. A local decision.",
          "caption": "Real restaurant locations from the collection, then Newtown’s 823 places (a local query result).",
          "images": [
            {
              "id": "menu-restaurants-australia",
              "image": "assets/menu-story/film/04-restaurants-australia.webp",
              "position": "main",
              "label": "Restaurants with collected menus",
              "alt": "Menu Finder film frame: a map of Australia filled with the locations of restaurants whose menus were collected, densest along the east coast."
            },
            {
              "id": "menu-newtown-up-close",
              "image": "assets/menu-story/film/05-newtown-up-close.webp",
              "position": "phone",
              "label": "Newtown up close",
              "alt": "Menu Finder film frame: the Newtown map with the prototype's clusters, 823 places within 2 km, and Take Sushi and Ramen Bar marked."
            }
          ]
        }
      },
      {
        "label": "Today",
        "title": "Next: scale up with staged extraction and careful budgets",
        "more": ["The working prototype connects dish search, nearby alternatives and menus. I’m scaling it towards Australia’s largest menu database; source quality, current prices and usefulness still need testing."],
        "film": 7,
        "showcase": {
          "theme": "chapters",
          "brand": "MENU FINDER",
          "number": "04",
          "title": "Start with what you want to eat.",
          "caption": "The prototype’s real match. Prices are extracted observations, not confirmed current prices.",
          "images": [
            {
              "id": "menu-your-match",
              "image": "assets/menu-story/film/06-your-match.webp",
              "position": "main",
              "label": "Your match",
              "alt": "Menu Finder film frame: your match, hokkaido miso ramen for $14.70 at Take Sushi and Ramen Bar, 292 King St, 174 m away."
            }
          ]
        }
      }
    ],
    "visualStory": true,
    "demoLabel": "Menu Finder"
  },
  'ev': {
    name: 'Know what to look for in an EV', eyebrow: 'Personal project',
    visualStory: true,
    brandMark: { image: 'assets/ev-story/roadmark-ev.svg', alt: 'Roadmark EV', width: 128, height: 138 },
    headline: '',
    highlights: [
      'Built Roadmark to compare 34 variants across ten vehicle families.',
      'Seven visual chapters connect specifications to everyday ownership.',
      'Exact trims, one fixed baseline and sources beside each claim.'
    ],
    text: "Price is only the start: home charging, trip range and trim-specific features change the decision. Roadmark compares exact versions side by side, with the evidence beside each claim.",
    media: { demo: 'ev', img: 'b:ev-price-first', ground: '#24303a' },
    // Scope and behaviour: ../ev/README.md and ../ev/src/lib/chapters.ts.
    // Evidence handling: ../ev/src/lib/launch-evidence.ts. No buyer testing recorded.
    subs: [
      {
        label: "The problem",
        title: "Spec sheets don’t tell you whether an EV fits your life",
        more: ["Buyers face claimed range, battery sizes, charging speeds and features that change by trim, spread across many sources. The numbers rarely say what owning the car will be like day to day."],
        bullets: [
          "<strong>Hard to compare:</strong> figures use different methods and conditions, and features vary by trim",
          "<strong>Hard to picture:</strong> range and charging speeds don’t translate into a weekly routine or a long trip",
          "<strong>Hard to trust:</strong> sources and dates are rarely shown beside the number"
        ]
      },
      {
        label: "Why build it",
        title: "One place to compare by everyday ownership",
        more: ["It’s an expensive decision, and EVs are new to many buyers. I wanted exact versions side by side, explained in everyday terms, with the evidence beside each claim."]
      },
      { label: 'What I learnt', title: "One baseline car keeps every comparison grounded",
        more: ["A Model Y stays visible as a reference while people explore other cars and trims. The selection carries through all seven chapters, so nobody has to rebuild the comparison."],
        showcase: { theme: 'baseline', number: '01', title: 'One baseline. Every comparison.', caption: "Exact trims stay aligned, with assumptions and evidence beside the decision.", images: [
          { id: 'ev-baseline', image: 'assets/ev-story/01-baseline.webp', position: 'main', label: 'Exact trims, side by side', alt: 'Roadmark’s comparison with a fixed blue Model Y baseline and trim selectors for alternative vehicles.' },
          { id: 'ev-charging-evidence', image: 'assets/ev-story/04-home-charging.webp', position: 'detail', label: 'The assumptions behind the numbers', alt: 'Home-charging estimates with the charging setup, calculation method and dated sources shown beside each figure.' }
        ] } },
      { label: 'Challenge', title: "Make specifications comparable, and show where they come from",
        more: ["Range, home charging and cargo figures depend on conditions and measurement methods. I put sources, dates and assumptions beside each value, and withheld figures I couldn’t verify."],
        bullets: [
          "<strong>New to EVs:</strong> plain-language charging, range and ownership",
          "<strong>Already know EVs:</strong> exact trims, the differences and the evidence",
          "<strong>Petrol drivers with range anxiety:</strong> how charging and long trips fit a routine"
        ],
        showcase: { theme: 'range', number: '02', title: 'Make the unfamiliar feel familiar.', caption: "A route, charging stops and a destination make range easy to picture, on desktop or phone.", images: [
          { id: 'ev-range', image: 'assets/ev-story/03-range-charging.webp', position: 'main', label: 'Range, made visual', alt: 'The range and charging chapter showing a conceptual route from home through charging stops to a destination, with comparison facts beside it.' },
          { id: 'ev-range-mobile', image: 'assets/ev-story/10-mobile-charging.webp', position: 'phone', label: 'The guide on a phone', alt: 'The same charging guide on a narrow phone screen, with the route, chapter explanation and comparison facts stacked vertically.' }
        ] } },
      { label: 'Scale', title: "34 variants, ten vehicle families, 91 details in seven chapters",
        more: ["Price and automated driving come first. People can reorder the rest (range and charging, space and safety, convenience, comfort and driving, software) around their priorities."],
        showcase: { theme: 'chapters', number: '03', title: 'Seven ways into the decision.', caption: "Colour-coded chapters link the overview to visual explanations.", images: [
          { id: 'ev-chapters', image: 'assets/ev-story/02-buyer-priorities.webp', position: 'index', label: 'The seven-chapter overview', alt: 'Roadmark’s seven colour-coded chapters and buyer-priority controls, from price and ownership to software and technology.' },
          { id: 'ev-driving', image: 'assets/ev-story/05-assisted-driving.webp', position: 'left', label: 'Assistance, explained in context', alt: 'The automated-driving chapter with an illustrated street scene, a supervised-driving explanation and conditional feature comparisons.' },
          { id: 'ev-space', image: 'assets/ev-story/06-space-safety.webp', position: 'right', label: 'Space for everyday life', alt: 'The space and safety chapter with an illustrated vehicle and comparisons of front storage and cargo capacity.' }
        ] } },
      { label: 'Today', title: "A working tool; next, test whether it improves decisions",
        more: ["The data comes from dated October 2026 desk research. Prices and specifications need checking against manufacturers, and the effect on buying decisions still needs testing."],
        showcase: { theme: 'software', number: '04', title: 'The full picture, down to the detail.', caption: "Illustrated chapters lead into the detail. October 2026 build.", images: [
          { id: 'ev-software', image: 'assets/ev-story/09-software.webp', position: 'main', label: 'Software and life after delivery', alt: 'The software and technology chapter, with its conceptual illustration and comparison of update availability.' },
          { id: 'ev-energy', image: 'assets/ev-story/07-energy-evidence.webp', position: 'detail', label: 'Evidence behind everyday costs', alt: 'Energy-use comparisons showing label figures, measured consumption, cost assumptions and dated supporting evidence.' }
        ] } }
    ]
  },
  'appointment-booking': {
    "gid": "appointment-booking",
    "name": "Book a home lender directly",
    "eyebrow": "CommBank · Released 2018 (Design lead)",
    "headline": "",
    "highlights": [
      "Designed direct booking against lender availability, replacing a callback request.",
      "One shared pattern supports phone, branch and mobile-lender appointments.",
      "Released nationally in 2018, with bookings arranged in around five minutes."
    ],
    "text": "Customers could request an appointment, then waited for someone to call and arrange it. I designed direct booking: choose how to meet, see lender availability and pick a time.",
    "media": {
      "demo": "booking",
      "img": "a:booking-2-hero-screens",
      "pos": "50% 50%"
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "Ask how to meet, then when",
        "more": ["One combined filter for channel, time and language overwhelmed infrequent users. Splitting it into two familiar questions also let phone customers skip choosing a location."],
        "showcase": {
          "theme": "baseline",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "01",
          "title": "How to meet. Then when.",
          "caption": "Two focused questions replace one crowded filter. Original booking designs.",
          "images": [
            {
              "id": "booking-channel",
              "image": "newassets/appointment booking/appointment triage.webp",
              "position": "phone",
              "label": "Choose how to meet",
              "alt": "CommBank appointment-booking screen asking where the customer would like to meet, with local, other-location and phone options.",
              "frame": "device"
            },
            {
              "id": "booking-time-question",
              "image": "assets/f/booking-time-1440.webp",
              "position": "phone",
              "label": "Choose a time",
              "alt": "Separate appointment-time question in the CommBank booking flow.",
              "frame": "handset"
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "Fit the appointment to someone’s day, without asking everyone everything",
        "more": ["Customers had waited at least 24 hours for a callback. Testing showed lender photos felt personal but led people to choose by appearance rather than availability."],
        "bullets": [
          "<strong>By phone:</strong> a suitable time, with no branch to choose",
          "<strong>At a branch:</strong> local availability, and alternatives when it’s full",
          "<strong>With a mobile lender:</strong> a time and a place that suit them"
        ],
        "showcase": {
          "theme": "range",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "02",
          "title": "A personal choice. A practical time.",
          "caption": "Early lender profiles showed how photos swayed choices; the combined filter was the earlier approach.",
          "images": [
            {
              "id": "booking-profiles",
              "image": "assets/f/booking-faces-1440.webp",
              "position": "main",
              "label": "Early profile exploration",
              "alt": "Three early CommBank booking designs showing lender photographs, profiles and available appointment times."
            },
            {
              "id": "booking-early-filter",
              "image": "assets/f/booking-filter-1440.webp",
              "position": "phone",
              "label": "The earlier combined filter",
              "alt": "Early CommBank appointment filter combining several booking choices in a single screen.",
              "frame": "device"
            }
          ]
        }
      },
      {
        "label": "Pattern",
        "title": "One calendar for three appointment types",
        "more": ["Branch, mobile-lender and phone bookings share one daily calendar. Showing the first nine times, with “+ n more”, keeps quiet and busy days equally manageable."],
        "showcase": {
          "theme": "chapters",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "03",
          "title": "One pattern. Three ways to meet.",
          "caption": "One calendar across all three channels, with more times on demand.",
          "images": [
            {
              "id": "booking-availability",
              "image": "assets/f/booking-pattern-1440.webp",
              "position": "main",
              "label": "A shared availability pattern",
              "alt": "Original CommBank availability study showing branch, mobile-lender and phone times beside the combined daily calendar."
            },
            {
              "id": "booking-more-times",
              "image": "assets/f/booking-times-1440.webp",
              "position": "phone",
              "label": "More times on demand",
              "alt": "Expanded list of appointment times in the CommBank booking experience.",
              "frame": "device"
            }
          ]
        }
      },
      {
        "label": "Outcome",
        "title": "Released nationally in 2018: booked in about five minutes",
        "more": ["A wait of at least 24 hours for a callback became a booking of around five minutes, confirmed on the spot. These are different measures: waiting to arrange versus doing the task."],
        "showcase": {
          "theme": "software",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "04",
          "title": "From availability to confirmed.",
          "caption": "Alternative locations, a review and confirmation keep the next step visible.",
          "images": [
            {
              "id": "booking-alternatives",
              "image": "assets/f/booking-unavailable-1440.webp",
              "position": "phone",
              "label": "Offer another location",
              "alt": "Alternative appointment locations offered when a CommBank branch has no availability.",
              "frame": "device"
            },
            {
              "id": "booking-review",
              "image": "assets/f/booking-book-1440.webp",
              "position": "phone",
              "label": "Review the appointment",
              "alt": "CommBank appointment review screen before confirming the booking.",
              "frame": "device"
            },
            {
              "id": "booking-confirmed",
              "image": "assets/f/booking-confirm-1440.webp",
              "position": "phone",
              "label": "Booking confirmed",
              "alt": "CommBank appointment confirmation with the booked details and next steps.",
              "frame": "device"
            }
          ]
        }
      }
    ],
    "visualStory": true
  },
  'canwork': {
    "gid": "canwork",
    "name": "Connecting staff to shifts across branches",
    "eyebrow": "CommBank · Branch staffing (Design lead)",
    "headline": "",
    "highlights": [
      "Designed one mobile workflow for managers offering shifts and staff looking for additional work.",
      "Organised shift states around attention, waiting and acceptance.",
      "Made shift activity and manager exclusions visible across branches."
    ],
    "text": "Staff wanted more shifts; branch managers needed gaps covered. I designed CanWork to connect them through availability, shift offers and acceptance.",
    "media": {
      "img": "a:work-2-hero-screen",
      "image": "assets/work-2-hero-screen-1600.webp",
      "alt": "CanWork interface collage showing shift creation, staff responses, approvals and shift details."
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "Design both sides of the same shift",
        "more": ["Managers create shifts and track responses; staff set their availability and accept offers. Designing both together meant every notification said what had happened and what to do next."],
        "showcase": {
          "theme": "baseline",
          "brand": "COMMBANK / CANWORK",
          "number": "01",
          "title": "One shift. Two perspectives.",
          "caption": "The manager creates the opportunity; the employee sees the offer and decides.",
          "images": [
            {
              "id": "canwork-create",
              "image": "assets/f/work-create-1440.webp",
              "position": "phone",
              "label": "The manager creates a shift",
              "alt": "CanWork manager screen creating a replacement shift, with the reason and team member being replaced."
            },
            {
              "id": "canwork-offer",
              "image": "assets/f/work-offer-1440.webp",
              "position": "phone",
              "label": "The employee reviews the offer",
              "alt": "CanWork employee screen showing an offered shift and the available response."
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "Shifts were being shared through calls and favours",
        "more": ["Interviews showed staff wanting work while managers juggled gaps and budgets, and existing connections decided who heard about a shift."],
        "bullets": [
          "<strong>Casual and part-time staff:</strong> more work that fits their location and availability",
          "<strong>Branch managers:</strong> gaps covered within budget, with responses tracked",
          "<strong>Regional managers:</strong> shift activity visible across branches"
        ],
        "showcase": {
          "theme": "range",
          "brand": "COMMBANK / CANWORK",
          "number": "02",
          "title": "Make the hidden network visible.",
          "caption": "Interview synthesis: staff seeking work, managers balancing budgets, shifts on unofficial channels.",
          "images": [
            {
              "id": "canwork-research",
              "image": "assets/f/work-research-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "What staff and managers told us",
              "alt": "CanWork interview synthesis: casual and part-time staff seek extra shifts, managers manage staffing budgets and unofficial networks distribute work."
            }
          ]
        }
      },
      {
        "label": "Pattern",
        "title": "Every shift is either needs you, waiting or accepted",
        "more": ["Designing each state separately had made the model drift. Organising around who needs to act gave pending, approved and filled shifts one clear structure."],
        "showcase": {
          "theme": "chapters",
          "brand": "COMMBANK / CANWORK",
          "number": "03",
          "title": "Know what needs you next.",
          "caption": "A shared state model shows progress and the next action.",
          "images": [
            {
              "id": "canwork-states",
              "image": "assets/f/work-states-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "Attention, waiting and acceptance",
              "alt": "Original CanWork state model showing attention in yellow, pending or waiting in blue and accepted shifts in green, with related actions."
            }
          ]
        }
      },
      {
        "label": "Outcome",
        "title": "One workflow from shift to acceptance, with regional reporting",
        "more": ["Reporting made shift creation, acceptance and exclusions visible across branches, so distribution could be inspected. No measured change in fairness or fill rates is claimed."],
        "showcase": {
          "theme": "software",
          "brand": "COMMBANK / CANWORK",
          "number": "04",
          "title": "Follow the shift through.",
          "caption": "Candidate review and employee confirmation in one workflow. Designs, not a measured result.",
          "images": [
            {
              "id": "canwork-candidates",
              "image": "assets/f/work-candidates-1440.webp",
              "position": "phone",
              "label": "Review candidates",
              "alt": "CanWork manager screen reviewing available candidates for a shift."
            },
            {
              "id": "canwork-accepted",
              "image": "assets/f/work-accepted-1440.webp",
              "position": "phone",
              "label": "The employee accepts",
              "alt": "CanWork employee confirmation that a shift has been accepted."
            }
          ]
        }
      }
    ],
    "visualStory": true
  },
  'commsee': {
    name: 'CommSee', eyebrow: 'CommBank · Enterprise platform contribution', brief: true, compact: true,
    highlights: [
      'Researched tax-identification information capture for Common Reporting Standard servicing.',
      'Contributed to home-loan credit-decisioning workflows within CommBank’s staff platform.'
    ]
  },
  'open-banking': {
    gid: 'open-banking', name: 'Open Banking', eyebrow: 'NAB · Research and consent design (Design lead)', brief: true,
    headline: 'Verifying income without hunting for payslips.',
    highlights: [
      'Led research into who receives customer data, why it is needed and how long it is kept.',
      'Reworked consent explanations and questioned toggles that implied a choice when every category was required.',
      'Made NAB’s role clearer in partner-brand journeys and kept manual verification available.'
    ],
    text: 'Sharing bank data could spare applicants from finding payslips. I led design and research into the explanations and choices customers needed before consenting.',
    media: {
      img: 'a:nab-x-2', image: 'assets/open-banking/open-banking-concept.webp',
      alt: 'Conceptual Open Banking illustration: account records connect through a secure consent lock to a verification check.'
    }
  },
  'expense-capture': {
    "gid": "expense-capture",
    "name": "Loan expenses: 16 required fields reduced to two",
    "eyebrow": "NAB · Expense research and design (Design lead)",
    "headline": "",
    "highlights": [
      "Reduced mandatory expense inputs from 16 to two, with guided calculation available when needed.",
      "Used card sorting to make expense categories easier to understand.",
      "Kept explanations beside the fields, informed by eye-tracking observations."
    ],
    "text": "Some customers knew what they spent; others needed help working it out. I designed two routes: enter a known total, or build one with guidance.",
    "media": {
      "img": "f:expense-entry",
      "showcase": {
        "theme": "flow",
        "brand": "NAB · EXPENSE ENTRY",
        "brandLogo": "assets/brands/nab-mark.svg",
        "browserTitle": "NAB · Expense entry",
        "mobileHeader": "NAB",
        "title": "Start with what you know.",
        "images": [
          {
            "id": "expense-hero-total",
            "contentInset": true,
            "image": "assets/f/expense-entry-1440.webp",
            "position": "phone",
            "step": "Your total",
            "label": "Enter a known expense total",
            "alt": "NAB expense entry with amount and frequency fields and an option to calculate expenses."
          },
          {
            "id": "expense-hero-categories",
            "scrollContent": true,
            "image": "assets/expense-story/category-calculation.webp",
            "position": "phone",
            "step": "Your categories",
            "label": "Choose expense categories",
            "alt": "The original NAB guided calculation screen grouping everyday living, self-care, housing and property expenses."
          },
          {
            "id": "expense-hero-detail",
            "contentInset": true,
            "squareTop": true,
            "image": "assets/f/expense-detail-1440.webp",
            "position": "phone",
            "step": "The detail",
            "label": "Add insurance and medical expenses",
            "alt": "The original NAB insurance and medical expense form with amount and frequency fields and contextual guidance."
          }
        ]
      }
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "A route for each level of confidence",
        "more": ["Direct entry is the default for people who know their total, with a guided calculation for anyone who needs it. One task, two paths."],
        "showcase": {
          "theme": "baseline",
          "brand": "NAB",
          "number": "01",
          "mobileHeader": "NAB",
          "title": "A total, or help finding one.",
          "caption": "Direct entry and guided calculation: two ways through one task.",
          "images": [
            {
              "id": "expense-direct",
              "contentInset": true,
              "image": "assets/f/expense-entry-1440.webp",
              "position": "phone",
              "label": "Enter a known total",
              "alt": "NAB expense-entry screen offering a total amount and frequency, with an option to get help calculating expenses."
            },
            {
              "id": "expense-guided",
              "contentInset": true,
              "squareTop": true,
              "image": "assets/f/expense-detail-1440.webp",
              "position": "phone",
              "label": "Build the total with guidance",
              "alt": "NAB guided insurance and medical expense inputs, with amount and frequency fields for each expense type."
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "The bank’s categories weren’t how people thought about spending",
        "more": ["Card sorting showed confusion over car insurance, so insurance moved first and housing sat beside investment property. Wording mattered too: some people read “Netflix” literally, not as a prompt for other subscriptions."],
        "showcase": {
          "theme": "range",
          "brand": "NAB",
          "number": "02",
          "layout": "separated-boards",
          "title": "Categories that make sense to people.",
          "caption": "Research changed the order, grouping and wording of the categories.",
          "images": [
            {
              "id": "expense-categories",
              "image": "assets/f/expense-evolution-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "The category pattern, over time",
              "alt": "Three stages of the NAB expense-category pattern, showing changes from November 2023 to February and April 2024."
            },
            {
              "id": "expense-structure",
              "image": "assets/f/expense-sketch-1440.webp",
              "position": "detail",
              "frame": "board",
              "label": "Working through the structure",
              "alt": "Original sketches exploring the structure of expense entry."
            }
          ]
        }
      },
      {
        "label": "Pattern",
        "title": "Keep the help beside the field",
        "more": ["Eye tracking showed people reading the explanation column as they filled each field, so the layout keeps them together. Separate pages reduced noise; one page made checking easier."],
        "showcase": {
          "theme": "chapters",
          "brand": "NAB",
          "number": "03",
          "title": "Help, close to the decision.",
          "caption": "Field, explanation and summary stay connected.",
          "images": [
            {
              "id": "expense-help",
              "image": "assets/f/expense-language-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "Guidance and the completed answer",
              "alt": "Housing and property expense designs showing explanatory copy beside inputs and a completed expense summary."
            },
            {
              "id": "expense-eye-tracking",
              "image": "assets/f/expense-gaze-1440.webp",
              "position": "detail",
              "frame": "board",
              "label": "The research behind the layout",
              "alt": "Annotated eye-tracking research artefact showing attention moving between expense guidance and the adjacent fields."
            }
          ]
        }
      },
      {
        "label": "Outcome",
        "title": "From 16 required fields to two, with help on hand",
        "more": ["Customers give an amount and frequency, or build it with guidance: 87.5% fewer required fields. Completion time and conversion weren’t measured."],
        "showcase": {
          "theme": "flow",
          "brand": "NAB",
          "brandLogo": "assets/brands/nab-mark.svg",
          "browserTitle": "NAB · Expense entry",
          "mobileHeader": "NAB",
          "number": "04",
          "title": "Less entry. Guidance still within reach.",
          "caption": "Original NAB screens: a known total, categories for help, then individual expenses.",
          "images": [
            {
              "id": "expense-outcome-total",
              "contentInset": true,
              "image": "assets/f/expense-entry-1440.webp",
              "position": "phone",
              "step": "Your total",
              "label": "Enter a known total",
              "alt": "NAB expense entry offering an amount and frequency, with calculation available when needed."
            },
            {
              "id": "expense-outcome-categories",
              "scrollContent": true,
              "image": "assets/expense-story/category-calculation.webp",
              "position": "phone",
              "step": "Your categories",
              "label": "Build a total by category",
              "alt": "NAB expense categories for everyday living, self-care, housing and property expenses."
            },
            {
              "id": "expense-outcome-detail",
              "contentInset": true,
              "squareTop": true,
              "image": "assets/f/expense-detail-1440.webp",
              "position": "phone",
              "step": "The detail",
              "label": "Add the individual expenses",
              "alt": "NAB insurance and medical expense fields with amount, frequency and what-to-include guidance."
            }
          ]
        }
      }
    ],
    "visualStory": true
  },
  'nabone': {
    name: 'nabONE', eyebrow: 'NAB · Enterprise platform (Design lead)', brief: true, compact: true,
    highlights: [
      'Led design delivery for application workflows during migration from Oracle Banking Platform.',
      'Designed reusable review, editing and specialist-referral flows across credit cards, personal loans and transaction accounts.'
    ]
  },
  'additional-cardholders': {
    name: 'Add additional cardholders', eyebrow: 'NAB · Credit card servicing', brief: true, compact: true,
    headline: 'Reduced friction when adding another cardholder.'
  },
  'credit-limit-increase': {
    name: 'Increase credit limit', eyebrow: 'NAB · Credit card servicing', brief: true, compact: true,
    headline: 'Request a credit limit increase directly from the apps.'
  },
  'balance-transfers': {
    name: 'Balance transfers', eyebrow: 'NAB · Credit card servicing', brief: true, compact: true,
    headline: 'Balance transfer flows during origination and as a persistent feature afterwards, supporting ongoing access to capital.'
  },
  'qantas': {
    "gid": "qantas",
    "name": "Choose travel cover with COVID in mind (2021)",
    "eyebrow": "Qantas · Research and concepts, 2022 (Design lead)",
    "headline": "",
    "highlights": [
      "Used interviews, journey analysis and concept testing to investigate uncertainty about travel cover.",
      "Proposed earlier trip questions, visible cover details and clearer optional steps.",
      "Testing identified the coverage examples and language that still needed work."
    ],
    "text": "Travellers needed to understand what they were buying, from medical cover to cancellations. I made the cover clear before commitment: what’s included, what costs extra and what’s optional.",
    "media": {
      "showcase": {
        "theme": "flow",
        "brand": "QANTAS · 2022 CONCEPTS",
        "brandLogo": "assets/brands/qantas-mark.svg",
        "browserTitle": "Qantas Insurance · Travel cover",
        "mobileHeader": "Qantas",
        "title": "Cover, before commitment.",
        "caption": "Original screens from the March 2022 travel-insurance proposal: trip details, frequent-flyer login and cover review.",
        "images": [
          {
            "id": "qantas-hero-trip",
            "image": "assets/qantas-story/trip-details.webp",
            "position": "phone",
            "step": "Trip details",
            "label": "Trip details in the proposal",
            "alt": "Original Qantas quote form with destination, travel dates, traveller age and medical-condition questions."
          },
          {
            "id": "qantas-hero-login",
            "image": "assets/qantas-story/optional-login.webp",
            "position": "phone",
            "step": "Optional sign-in",
            "label": "The frequent-flyer login step",
            "alt": "Original Qantas Frequent Flyer login screen from the travel-insurance research and proposal."
          },
          {
            "id": "qantas-hero-review",
            "image": "assets/qantas-story/review-cover.webp",
            "position": "phone",
            "step": "Review cover",
            "label": "Cover review before checkout",
            "alt": "Original Qantas travel-insurance cover summary showing price, policy details and the cooling-off period."
          }
        ]
      }
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "Confidence breaks down where cover language is vague",
        "more": ["Interviews, journey analysis and concept testing showed people wanted precise wording and concrete examples. That shaped a new set of concepts in 2022."],
        "showcase": {
          "theme": "baseline",
          "brand": "QANTAS",
          "number": "01",
          "title": "Understand the uncertainty first.",
          "caption": "The 2022 research board: customers’ questions about cover and the detail they wanted.",
          "images": [
            {
              "id": "qantas-research-board",
              "image": "assets/f/qantas-research-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "The research findings",
              "alt": "Qantas travel-insurance research board recording coverage concerns, customer language and research signals."
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "Login looked required, cover was hidden, extras looked included",
        "more": ["Interface choices created doubt at several steps, so the design had to answer three questions first."],
        "bullets": [
          "<strong>Can I continue without signing in?</strong>",
          "<strong>What’s covered at this price?</strong>",
          "<strong>Do I need this extra, and can I skip it?</strong>"
        ],
        "showcase": {
          "theme": "range",
          "brand": "QANTAS",
          "number": "02",
          "title": "Find the moments that create doubt.",
          "caption": "Journey analysis links unclear steps to specific misunderstandings.",
          "images": [
            {
              "id": "qantas-journey",
              "frame": "board",
              "image": "assets/evidence/qantas-current-flow.jpg",
              "position": "main",
              "label": "The existing purchase journey",
              "alt": "Annotated Qantas travel-insurance journey showing uncertainty about optional login, coverage information and additional cover."
            }
          ]
        }
      },
      {
        "label": "Pattern",
        "title": "Trip questions first, cover details in view",
        "more": ["I proposed asking trip questions on the landing page, explaining that login was optional, and bringing product and extras selection together."],
        "showcase": {
          "theme": "chapters",
          "brand": "QANTAS",
          "number": "03",
          "title": "The trip first. The cover in view.",
          "caption": "The post-research proposal brings trip details forward.",
          "images": [
            {
              "id": "qantas-proposed-flow",
              "image": "assets/f/qantas-proposal-1440.webp",
              "position": "main",
              "frame": "board",
              "label": "The post-research proposal",
              "alt": "Qantas travel-insurance journey proposal with trip questions earlier in the flow and annotations explaining coverage and optional steps."
            }
          ]
        }
      },
      {
        "label": "Outcome",
        "title": "The quick quote worked; cover wording still needed examples",
        "more": ["In March 2022 testing, the quick quote helped people frame their trip, but hospital stays, PCR tests and cancellation versus delay still confused them. Research and concepts only; no measured sales uplift."],
        "showcase": {
          "theme": "software",
          "brand": "QANTAS",
          "number": "04",
          "title": "Let the testing sharpen the language.",
          "caption": "March 2022 feedback: what worked, and where examples were still needed.",
          "images": [
            {
              "id": "qantas-concept-feedback",
              "image": "assets/evidence/qantas-concept-testing.jpg",
              "position": "main",
              "frame": "board",
              "label": "The concept-testing feedback",
              "alt": "March 2022 Qantas concept-testing board with feedback on the quick quote and medical, cancellation and travel-delay cover language."
            }
          ]
        }
      }
    ],
    "visualStory": true
  },
  'multi-policy-discount': {
    name: 'Multi-policy rewards', eyebrow: 'Qantas · Rewards design and concepts (Design lead)', brief: true,
    headline: 'Making the value of multiple policies clear.',
    highlights: [
      'Reworked paragraph-heavy rewards explanations into tiers based on policy count.',
      'Separated base points, bonus rewards and additional benefits for comparison.',
      'Explored a points calculator alongside research into interest in insurance bundles.'
    ],
    text: 'I explored customer interest in insurance bundles and redesigned how the rewards were explained. Policy tiers, distinct bonus rewards and a calculator made the proposed structure visible; comprehension and conversion gains have not been measured.',
    media: {
      "showcase": {
        "theme": "comparison",
        "brand": "QANTAS · MULTI-POLICY REWARDS",
        "brandLogo": "assets/brands/qantas-mark.svg",
        "browserTitle": "Qantas Insurance · Rewards concepts",
        "title": "Rewards, at a glance.",
        "transition": {
          "beforeTitle": "Rewards, buried in copy.",
          "afterTitle": "Rewards, at a glance.",
          "beforeNote": "Original · imagery and long explanations",
          "afterNote": "Redesign · policy tiers and visible points"
        },
        "caption": "The original rewards artwork flips into the redesigned concepts, showing the move from lengthy explanations to policy tiers, points and additional benefits.",
        "images": [
          {
            "id": "qantas-rewards-original-policy-copy",
            "image": "assets/qantas-story/original-policy-copy.webp",
            "phase": "before",
            "pair": 1,
            "frame": "board",
            "alt": "Original Qantas multi-policy rewards artwork using an illustration and lengthy explanations of health, home and car insurance rewards."
          },
          {
            "id": "qantas-rewards-original-bundle-copy",
            "image": "assets/qantas-story/original-bundle-copy.webp",
            "phase": "before",
            "pair": 2,
            "frame": "board",
            "alt": "Original Qantas rewards artwork explaining combined health, home and car insurance benefits with imagery and paragraphs."
          },
          {
            "id": "qantas-rewards-hero-tiers",
            "image": "assets/qantas-story/policy-tiers.webp",
            "phase": "after",
            "pair": 1,
            "position": "main",
            "frame": "board",
            "label": "Rewards by policy count",
            "alt": "Redesigned Qantas multi-policy rewards concept separating points per dollar, bonus points and other benefits."
          },
          {
            "id": "qantas-rewards-hero-bonus",
            "image": "assets/qantas-story/bonus-rewards.webp",
            "phase": "after",
            "pair": 2,
            "position": "detail",
            "frame": "board",
            "label": "Bonus rewards and the calculator",
            "alt": "Redesigned Qantas rewards concept showing bonus points for two and three policies, a points calculator and further benefits."
          }
        ]
      }
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
    "gid": "nrma",
    "name": "Quotes, claims and policies, one account",
    "eyebrow": "NRMA · Design standards, 2019–2021 (Design lead)",
    "headline": "",
    "highlights": [
      "Defined shared quote and account patterns with product, underwriting, content and platform teams.",
      "Matched validation errors, restrictions and referrals to appropriate next steps.",
      "Brought claims, saved quotes and policies together and designed changes within renewal."
    ],
    "text": "Customers needed one clear way to get a quote, manage a policy and get help when something went wrong. I defined shared patterns across NRMA’s 2019–2021 platform transformation.",
    "media": {
      "showcase": {
        "theme": "workspace",
        "brand": "NRMA · MYACCOUNT",
        "brandLogo": "assets/brands/nrma-mark.svg",
        "browserTitle": "NRMA Insurance · MyAccount",
        "mobileHeader": "NRMA",
        "title": "Your insurance, in one view.",
        "caption": "Original NRMA MyAccount desktop and mobile designs bring claims, saved quotes and policies into one account.",
        "images": [
          {
            "id": "nrma-hero-desktop",
            "image": "assets/f/iag-account-crop-1440.webp",
            "position": "main",
            "label": "Account overview",
            "alt": "Original NRMA MyAccount desktop dashboard showing a claim, saved quote, policies and customer support options."
          },
          {
            "id": "nrma-hero-mobile",
            "image": "assets/f/iag-mobile-1440.webp",
            "position": "phone",
            "label": "MyAccount on mobile",
            "alt": "Original NRMA MyAccount mobile dashboard showing an active claim and the start of the saved quotes section."
          }
        ]
      }
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "Organise the account around what customers manage",
        "more": ["Working across product, underwriting, content and platform teams, I organised MyAccount around claims, saved quotes and policies, with matching desktop and mobile patterns."],
        "showcase": {
          "theme": "baseline",
          "brand": "NRMA",
          "number": "01",
          "title": "The things that matter, in one view.",
          "caption": "Claims, saved quotes and policies on desktop and mobile.",
          "images": [
            {
              "id": "nrma-account-overview",
              "image": "assets/f/iag-account-crop-1440.webp",
              "full": "assets/f/iag-account-1440.webp",
              "position": "main",
              "label": "Claims, quotes and policies",
              "alt": "NRMA MyAccount desktop dashboard showing an active claim, a saved quote and policies due for renewal."
            },
            {
              "id": "nrma-account-mobile",
              "image": "assets/f/iag-mobile-1440.webp",
              "position": "phone",
              "label": "The same account model on mobile",
              "alt": "NRMA MyAccount mobile dashboard showing an active claim with saved quotes below."
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "Every kind of problem needs a different next step",
        "more": ["A pattern framework separates validation, system errors, underwriting restrictions, referrals and special conditions, each explaining what happened and what to do."],
        "bullets": [
          "<strong>Fix an entry:</strong> show what needs to change",
          "<strong>Understand a restriction:</strong> explain the underwriting rule",
          "<strong>Get the right help:</strong> route referrals to assisted service"
        ],
        "showcase": {
          "theme": "range",
          "brand": "NRMA",
          "number": "02",
          "title": "A useful response to each situation.",
          "caption": "One framework for every scenario quote and account teams handle.",
          "images": [
            {
              "id": "nrma-exceptions",
              "frame": "board",
              "image": "assets/iag-2-item-4-1600.webp",
              "position": "main",
              "label": "The exception framework",
              "alt": "NRMA design framework comparing validation errors, system failures, underwriting restrictions, referrals and special conditions."
            }
          ]
        }
      },
      {
        "label": "Pattern",
        "title": "Renewal leads straight into policy review",
        "more": ["Reminders lead into reviewing the policy and adjusting the insured amount and excess without leaving the renewal."],
        "showcase": {
          "theme": "chapters",
          "brand": "NRMA",
          "number": "03",
          "title": "Review. Adjust. Continue.",
          "caption": "Policy details, cover changes and the renewal summary stay together.",
          "images": [
            {
              "id": "nrma-renewal-review",
              "image": "assets/f/iag-renewal-1440.webp",
              "position": "main",
              "label": "Review and adjust the renewal",
              "alt": "NRMA renewal review screen with insured assets, cover details, adjustment options and a renewal summary."
            }
          ]
        }
      },
      {
        "label": "Outcome",
        "title": "Shared foundations that several teams built on",
        "more": ["I contributed the shared patterns and experience design to a multi-team programme: home insurance in September 2020, then account and renewal milestones in 2021, with later iterations building on them."]
      }
    ],
    "visualStory": true
  }
};

// Work history and education transcribed from Austin's ALIN-CV-2025.pdf.
// Role highlights supplied by Austin and refined against the portfolio, 20 October 2026.
window.H_CV = {
  title: 'Product and Interaction Designer',
  summary: '',
  asOf: [2026, 10],
  education: [
    { school: 'The University of Sydney', course: 'Bachelor of Design Computing', minor: 'minor in IT', year: 'Graduated 2013' },
    { school: 'Muirfield High School', course: 'HSC · North Rocks, Sydney', year: 'Graduated 2008' }
  ],
  experience: [
    { company: 'National Australia Bank (NAB)', role: 'Senior Product Designer', team: 'Personal Everyday Banking, Digital and Enterprise', type: 'Contract', dates: 'Jun 2023 — Present', start: [2023, 6], points: [
      'Led design for AI income verification at NAB AI, targeting 2,000 hours of weekly operational waste savings.',
      'Led design for nabONE banker platforms, helping bankers review, manage and verify applications.',
      'Helped simplify credit card and personal loan applications, cutting required expense fields from 16 to two.',
      'Designed Open Banking consent flows for income verification and Consumer Data Right (CDR) compliance.'
    ] },
    { company: 'HSBC', role: 'Senior UX/UI Designer', type: 'Contract', dates: 'Oct 2022 — Jun 2023', points: [
      'Led NPP integration design across HSBC’s payment rails, with fallback routes for customers unable to use NPP.',
      'Contributed to global customer journeys for banking product applications.'
    ] },
    { company: 'Qantas', role: 'Senior Product Designer', team: 'Insurance, Wellbeing, Design System', type: 'Contract', dates: 'Sep 2021 — Sep 2022', points: [
      'Led Qantas Wellbeing and Insurance design, using customer research to clarify travel cover and multi-policy rewards.'
    ] },
    { company: 'Insurance Australia Group (IAG)', role: 'Interaction Designer', team: 'Strategy and Innovation, Design Centre', type: 'Contract', dates: 'Dec 2019 — Sep 2021', points: [
      'Defined shared patterns for NRMA quotes, MyAccount and renewals to support the transition to Guidewire PolicyCenter and ClaimCenter.'
    ] },
    { company: 'Massive Interactive', role: 'UX Designer', team: 'Strategy and Innovation, Design Centre', type: 'Contract', dates: 'Dec 2018 — Mar 2019', points: [
      'Contributed UX design to Mediacorp’s on-demand TV platform in Singapore.'
    ] },
    { company: 'Commonwealth Bank of Australia (CBA)', role: 'UX/UI Designer', team: 'Enterprise Services & Digital', type: 'Contract', dates: 'Aug 2016 — Dec 2018', points: [
      'Led home-lending appointment booking design, replacing a 24-hour callback wait with direct bookings in around five minutes.',
      'Designed CanWork so branch managers could fill shifts and staff could find available work.',
      'Contributed to CommSee workflows for regulatory compliance and home-loan credit decisions.'
    ] },
    { company: 'The University of Sydney', role: 'UX Designer and Development', team: 'Faculty of Architecture', type: 'Contract', dates: 'Jan 2014 — Mar 2016', points: [
      'Redesigned and built the Faculty of Architecture website in HTML, JavaScript and CSS, applying the University’s new design guidelines.'
    ] },
    { company: 'Wunderman Bienalto', role: 'UX/UI Designer', type: 'Permanent full-time', dates: 'Jan 2013 — Nov 2014', points: [
      'Designed digital experiences for Woolworths, Dan Murphy’s and NSW Planning, supporting pitches and client design reviews.'
    ] },
    { company: 'Retail and hospitality', role: 'Part-time roles throughout high school and university', team: 'Telstra, Kmart and hospitality', dates: '2005 — 2013' }
  ]
};
