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
    "text": "Bankers moved between documents, calculators and lending systems to verify income. An AI-generated total would only help if they could check its evidence without doing the work again.<br><br><strong>Start with the decision:</strong> compare declared and assessed income, inspect the supporting evidence, then confirm or exclude each source in one place.",
    "media": {
      "film": "income-film-square.html",
      "embed": true
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "Built an interactive prototype in Cursor to move income verification from copying figures across systems to reviewing evidence around each income source.",
        "more": [
          "Shadowing a lending consultant and two prototype feedback sessions changed the structure of the experience. A document-by-document timeline was understandable, but too slow for experienced bankers. I moved to one card per income source, grouping supporting documents around recognisable employers and properties.",
        ],
        "showcase": {
          "theme": "baseline",
          "brand": "NAB AI",
          "number": "01",
          "title": "Less copying. More judgement.",
          "caption": "The explanatory film shows the starting problem: separate documents, copied figures and a calculator. This is a concept illustration, rather than a screenshot of the production system.",
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
        "title": "AI only helps if bankers can check its work without repeating it. A genuine document is not always enough evidence for the income being claimed.",
        "more": [
          "Variable income and multiple employers made a single assessed total difficult to trust. Bankers needed to understand how the figure was reached and whether the evidence supported it. One authentic payslip, for example, might not be sufficient for overtime or commission."
        ],
        "bullets": [
          "<strong>See the difference:</strong> keep customer-declared, AI-assessed and banker-confirmed income distinct, so the banker can compare rather than mentally reconcile figures across systems.",
          "<strong>Understand the calculation:</strong> put the method and supporting documents beside the assessed figure.",
          "<strong>Know what needs attention:</strong> describe the checks explicitly, surface exceptions and collapse routine checks. A broad label such as “Pass” did not explain what had been verified."
        ],
        "showcase": {
          "theme": "range",
          "brand": "NAB AI",
          "number": "02",
          "title": "The figure, and how it was reached.",
          "caption": "An explanatory film frame makes the assessed monthly income, calculation and supporting income pattern visible. All amounts are sample values.",
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
        "title": "Automate the preparation. Keep the banker’s judgement visible, traceable and supported when AI cannot complete the assessment.",
        "more": [
          "The banker confirms or excludes each income, with reasons and a receipt that make the decision traceable. A manual calculator provides a fallback when AI cannot assess a case. I extended the prototype to multiple jobs, rental income and small businesses, so the interaction model could handle more than a simple payslip.",
          "The film illustrates 31 manual clicks becoming one confirmation in the proposed workflow. Bankers still review the evidence. Around 2,000 hours saved each week is a target; production time savings and AI accuracy have not been measured.",
        ],
        "showcase": {
          "theme": "software",
          "brand": "NAB AI",
          "number": "03",
          "title": "Evidence beside the decision.",
          "caption": "The updated concept illustration places the source payslip beside the assessed monthly income and confirmed figures. Explanatory film still with sample values.",
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
        "title": "Show what changing an income means for the loan before the banker confirms it.",
        "more": [
          "Bankers wanted to understand whether reducing or excluding an income would change the customer’s ability to afford the loan. That feedback identified the next product opportunity: connect the income decision to its consequence for the application."
        ]
      }
    ],
    "visualStory": true
  },
  'menu-finder': {
    "illustrativeImages": true,
    "gid": "restaurant-discovery",
    "name": "Find the dish. Then the restaurant.",
    "subtitle": "35,000 restaurants. 800,000 menu items.",
    "eyebrow": "Personal project",
    "headline": "",
    "highlights": [
      "Working prototype: browse dishes, compare nearby options, then explore the restaurant.",
      "Built menu-collecting agents and fine-tuned models to turn menus into searchable data.",
      "82,000+ menu documents collected from websites and photos."
    ],
    "text": "Finding dinner means searching restaurants, opening menu PDFs and zooming in on your phone.<br><br><strong>Start with the food:</strong> browse dishes, compare similar meals at nearby restaurants, then explore the restaurant.",
    "media": {
      "film": "menu-film-square.html",
      "embed": true
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "Built OpenClaw agents to collect menus anywhere we could find them, then fine-tuned open and closed models to turn whole menus into a structured database.",
        "more": [
          "I created an entire backend operation that ran headlessly and autonomously. I tried many different approaches to extracting menus with local models running on local hardware. Computing bottlenecks forced me to distribute much of the workload through OpenRouter and orchestrate multiple models for validation and error correction.",
        ],
        "showcase": {
          "theme": "baseline",
          "brand": "MENU FINDER",
          "number": "01",
          "title": "From a menu to a searchable meal.",
          "caption": "Real prototype screens show the extracted dishes, descriptions and prices, with the search match carried into the restaurant detail. Source observations still need verification.",
          "images": [
            {
              "id": "menu-extracted-menu",
              "image": "assets/menu-story/product/03-extracted-menu.jpg",
              "position": "main",
              "label": "A menu, structured into dishes",
              "alt": "Menu Finder’s real restaurant detail showing the expanded Ramen section with dish names, descriptions and prices beside the restaurant map."
            },
            {
              "id": "menu-matching-dish",
              "image": "assets/menu-story/product/02-matching-dish-detail.jpg",
              "position": "detail",
              "label": "The matching dish stays in view",
              "alt": "The real Take Sushi and Ramen Bar detail screen with the hokkaido miso ramen search match and its observed $14.70 price above the menu."
            }
          ]
        }
      },
      {
        "label": "Challenge",
        "title": "Menus come in every shape, layout and size. Understanding them takes more than reading the words.",
        "more": [
          "Many menus rely on human reasoning to infer intent and relationships. Dishes and prices can sit in separate columns, with shared headings for small and large portions. A model might read the right price but attach it to the wrong dish.",
          "A workable approach emerged as models improved and costs fell this year, specifically in late September 2026. Search brought another trap: a cheap side could make an expensive meal look within budget, so the food and price constraints need to apply to the same offering.",
        ],
        "showcase": {
          "theme": "software",
          "brand": "MENU FINDER",
          "number": "02",
          "title": "The right dish. The right price.",
          "caption": "The working prototype makes diet and per-item budget controls explicit. Reading a menu correctly and verifying its current prices remain separate source-quality challenges.",
          "images": [
            {
              "id": "menu-budget-filter",
              "image": "assets/menu-story/product/04-budget-filter.jpg",
              "position": "main",
              "label": "Budget applies to the item",
              "alt": "Menu Finder’s real filter dialog with dietary options and an Under $20 budget per item; the preview action shows six matching places."
            }
          ]
        }
      },
      {
        "label": "Scale",
        "title": "82,000+ menu documents, 800,000 menu items and 35,000 restaurants across Australia.",
        "more": [
          "I realised early on that you can build an app, but without data, it offers very little value. So I immediately pivoted to creating a large database of menu items and restaurants, with coverage across Australia’s states and cities.",
          "The collection includes repeated menus and older versions. Those source records are different from verified current dishes or unique restaurant locations; the prototype screens show a local Newtown search within that broader collection.",
        ],
        "showcase": {
          "theme": "range",
          "brand": "MENU FINDER",
          "number": "03",
          "title": "A national collection. A local decision.",
          "caption": "Desktop and phone views connect nearby places to an attributed map. The 823 source identities shown in this Newtown preview are a local query result, not a count of verified unique restaurants.",
          "images": [
            {
              "id": "menu-neighbourhood",
              "image": "assets/menu-story/product/06-neighbourhood-discovery.jpg",
              "position": "main",
              "label": "Nearby places on the map",
              "alt": "Menu Finder’s real desktop discovery screen for Newtown with a nearby restaurant list and clusters on an attributed greyscale map."
            },
            {
              "id": "menu-neighbourhood-phone",
              "image": "assets/menu-story/product/07-neighbourhood-phone.jpg",
              "position": "phone",
              "label": "The neighbourhood on a phone",
              "alt": "A real phone-sized Menu Finder prototype capture showing the Newtown map, a list switch, the nearby-place count and the beginning of the restaurant list."
            }
          ]
        }
      },
      {
        "label": "Today",
        "title": "The next step is to scale the product, with staged extraction and carefully allocated budgets.",
        "more": [
          "We are still carefully building out what I want to become Australia’s largest database of menu items. In the next few weeks, I will be building out the product to scale.",
          "The working prototype already connects dish search, nearby alternatives and restaurant menus. Source quality, current prices and usefulness with diners still need validation.",
        ],
        "showcase": {
          "theme": "chapters",
          "brand": "MENU FINDER",
          "number": "04",
          "title": "Start with what you want to eat.",
          "caption": "A real ramen-under-$20 search in the internal prototype. Prices shown are extracted observations with unconfirmed source dates, rather than a promise of current availability.",
          "images": [
            {
              "id": "menu-dish-search",
              "image": "assets/menu-story/product/05-dish-budget-search.jpg",
              "position": "main",
              "label": "Dishes, prices and nearby alternatives",
              "alt": "Menu Finder’s real ramen search with an Under $20 filter, matching dishes and observed prices in a nearby restaurant list beside an attributed map."
            }
          ]
        }
      }
    ],
    "visualStory": true,
    "demoLabel": "Menu Finder"
  },
  'ev': {
    name: 'Know what to look for in an EV.', eyebrow: 'Personal project',
    visualStory: true,
    brandMark: { image: 'assets/ev-story/roadmark-ev.svg', alt: 'Roadmark EV', width: 128, height: 138 },
    headline: '',
    highlights: [
      'Built Roadmark to compare 34 variants across ten vehicle families.',
      'Seven visual chapters connect specifications to everyday ownership.',
      'Exact trims, one fixed baseline and sources beside each claim.'
    ],
    text: 'Price is only the start. Charging at home, range on longer trips and features tied to a specific trim all change the decision.<br><br><strong>Start with everyday ownership:</strong> compare exact versions side by side, with the evidence beside each claim.',
    media: { demo: 'ev', img: 'b:ev-price-first', ground: '#24303a' },
    // Scope and behaviour: ../ev/README.md and ../ev/src/lib/chapters.ts.
    // Evidence handling: ../ev/src/lib/launch-evidence.ts. No buyer testing recorded.
    subs: [
      { label: 'What I learnt', title: 'Built Roadmark to turn scattered EV specifications into one comparison of everyday ownership. Exact trims, a fixed baseline and seven visual chapters keep the differences in view.',
        more: ['I kept one Model Y visible as a reference while people explore other cars and change trims. The selection carries through each chapter, so there is no need to rebuild the comparison when moving from price to charging, space or software.'],
        showcase: { theme: 'baseline', number: '01', title: 'One baseline. Every comparison.', caption: 'Exact trims stay aligned, with the assumptions and evidence close to the decision.', images: [
          { id: 'ev-baseline', image: 'assets/ev-story/01-baseline.webp', position: 'main', label: 'Exact trims, side by side', alt: 'Roadmark’s comparison with a fixed blue Model Y baseline and trim selectors for alternative vehicles.' },
          { id: 'ev-charging-evidence', image: 'assets/ev-story/04-home-charging.webp', position: 'detail', label: 'The assumptions behind the numbers', alt: 'Home-charging estimates with the charging setup, calculation method and dated sources shown beside each figure.' }
        ] } },
      { label: 'Challenge', title: 'The hard part was making specifications comparable across exact trims, different measurements and conditional features.',
        more: ['Claimed range needs context, home-charging estimates depend on the setup, and cargo figures can use different measurement methods. I put sources, dates and assumptions beside the relevant values, made conditions explicit and withheld figures where supporting evidence could not be verified.',
          'The comparison also needs to support people with different starting points:'],
        bullets: [
          '<strong>People new to EVs:</strong> need plain-language explanations of charging, range and everyday ownership, without assuming they already understand the terminology.',
          '<strong>People who already know EVs:</strong> want to compare exact trims, understand the differences and check the evidence behind each claim.',
          '<strong>Petrol drivers with range anxiety:</strong> need to understand how charging fits into their routine, what a longer trip involves and how claimed range relates to real-world use.'
        ],
        showcase: { theme: 'range', number: '02', title: 'Make the unfamiliar feel familiar.', caption: 'A route, charging stops and a destination make range easier to picture. The same guide adapts to a phone.', images: [
          { id: 'ev-range', image: 'assets/ev-story/03-range-charging.webp', position: 'main', label: 'Range, made visual', alt: 'The range and charging chapter showing a conceptual route from home through charging stops to a destination, with comparison facts beside it.' },
          { id: 'ev-range-mobile', image: 'assets/ev-story/10-mobile-charging.webp', position: 'phone', label: 'The guide on a phone', alt: 'The same charging guide on a narrow phone screen, with the route, chapter explanation and comparison facts stacked vertically.' }
        ] } },
      { label: 'Scale', title: '34 variants across ten vehicle families, with 91 comparison details organised into seven visual chapters.',
        more: ['The chapters cover price and ownership, automated driving, range and charging, space and safety, daily convenience, comfort and driving, and software. Price and automated driving stay first; people can reorder the remaining chapters around their priorities.'],
        showcase: { theme: 'chapters', number: '03', title: 'Seven ways into the decision.', caption: 'A colour-coded chapter system connects the overview to visual explanations of driving, space and everyday use.', images: [
          { id: 'ev-chapters', image: 'assets/ev-story/02-buyer-priorities.webp', position: 'index', label: 'The seven-chapter overview', alt: 'Roadmark’s seven colour-coded chapters and buyer-priority controls, from price and ownership to software and technology.' },
          { id: 'ev-driving', image: 'assets/ev-story/05-assisted-driving.webp', position: 'left', label: 'Assistance, explained in context', alt: 'The automated-driving chapter with an illustrated street scene, a supervised-driving explanation and conditional feature comparisons.' },
          { id: 'ev-space', image: 'assets/ev-story/06-space-safety.webp', position: 'right', label: 'Space for everyday life', alt: 'The space and safety chapter with an illustrated vehicle and comparisons of front storage and cargo capacity.' }
        ] } },
      { label: 'Today', title: 'Roadmark is a working comparison tool. The next step is to test whether it helps people understand the trade-offs and make a clearer buying decision.',
        more: ['The current build uses dated October 2026 desk research. Prices and specifications need to be checked against current manufacturer information, and the effect on buying decisions still needs to be tested.'],
        showcase: { theme: 'software', number: '04', title: 'The full picture, down to the detail.', caption: 'Illustrated chapters lead into the supporting detail. Screens shown are from the October 2026 build.', images: [
          { id: 'ev-software', image: 'assets/ev-story/09-software.webp', position: 'main', label: 'Software and life after delivery', alt: 'The software and technology chapter, with its conceptual illustration and comparison of update availability.' },
          { id: 'ev-energy', image: 'assets/ev-story/07-energy-evidence.webp', position: 'detail', label: 'Evidence behind everyday costs', alt: 'Energy-use comparisons showing label figures, measured consumption, cost assumptions and dated supporting evidence.' }
        ] } }
    ]
  },
  'appointment-booking': {
    "gid": "appointment-booking",
    "name": "Book a home lender directly.",
    "eyebrow": "CommBank · Released 2018 (Design lead)",
    "headline": "",
    "highlights": [
      "Designed direct booking against lender availability, replacing a callback request.",
      "One shared pattern supports phone, branch and mobile-lender appointments.",
      "Released nationally in 2018, with bookings arranged in around five minutes."
    ],
    "text": "Customers could ask for an appointment, but they still had to wait for someone to call and arrange it. I designed a way to choose how to meet, see lender availability and book a time directly.",
    "media": {
      "demo": "booking",
      "img": "a:booking-2-hero-screens",
      "pos": "50% 50%"
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "I turned a callback request into a booking customers could complete themselves. Two clear questions made the first step easier.",
        "more": [
          "The first filter combined channel, time and language. Infrequent users struggled to work through it. I split the decision into how they wanted to meet, then when, using a familiar question pattern. Choosing the channel first also meant phone customers could skip location.",
        ],
        "showcase": {
          "theme": "baseline",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "01",
          "title": "How to meet. Then when.",
          "caption": "Two focused questions replace one crowded filter. These are original booking designs.",
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
        "title": "A useful appointment has to fit someone’s day. The design needed to work across different ways of meeting, without making every customer answer every question.",
        "more": [
          "Customers had previously waited at least 24 hours for a callback to arrange an appointment. I needed to bring the practical choices into the booking journey, while keeping the path clear for people who rarely use it.",
          "Testing also exposed a trade-off: lender photos felt personal, but participants sometimes chose by appearance rather than suitable availability. The right time and place needed to remain easy to compare."
        ],
        "bullets": [
          "<strong>Customers who prefer a phone call:</strong> need a suitable time without being asked to choose a branch.",
          "<strong>Customers visiting a branch:</strong> need to see local availability and alternatives when their preferred branch has no times.",
          "<strong>Customers meeting a mobile lender:</strong> need to arrange a time and meeting location that work for them."
        ],
        "showcase": {
          "theme": "range",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "02",
          "title": "A personal choice. A practical time.",
          "caption": "Early lender-profile designs revealed how photographs could influence selection. The combined filter shows the earlier approach.",
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
        "title": "One daily calendar worked across three appointment types. Show the first nine times, then reveal more when needed.",
        "more": [
          "I designed a shared availability pattern for branch, mobile-lender and phone appointments. An initial limit of nine times kept each day manageable, with “+ n more” opening the remaining options. The same structure could handle a quiet branch or a much longer list of available appointments.",
        ],
        "showcase": {
          "theme": "chapters",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "03",
          "title": "One pattern. Three ways to meet.",
          "caption": "The availability study connects all three appointment channels to one calendar, with additional times available on demand.",
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
        "title": "Released nationally in 2018. Customers could arrange a booking in around five minutes, with the appointment confirmed at the end.",
        "more": [
          "I worked with developers and analysts on limited availability and alternative branches, then refined the content and responsive interfaces across screen sizes.",
          "The change replaced a wait of at least 24 hours for a callback with a direct booking task taking around five minutes. Those figures describe the wait to arrange an appointment and the new booking task; they are different measures.",
        ],
        "showcase": {
          "theme": "software",
          "brand": "COMMBANK / APPOINTMENT BOOKING",
          "number": "04",
          "title": "From availability to confirmed.",
          "caption": "Alternative locations, a booking review and confirmation make the next step visible throughout the journey.",
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
    "name": "Connecting staff to shifts across branches.",
    "eyebrow": "CommBank · Branch staffing (Design lead)",
    "headline": "",
    "highlights": [
      "Designed one mobile workflow for managers offering shifts and staff looking for additional work.",
      "Organised shift states around attention, waiting and acceptance.",
      "Made shift activity and manager exclusions visible across branches."
    ],
    "text": "Staff wanted more work. Branch managers needed people to cover gaps. I designed CanWork to connect those needs through availability, shift offers and acceptance, with a clear next step for both sides.",
    "media": {
      "img": "a:work-2-hero-screen",
      "image": "assets/work-2-hero-screen-1600.webp",
      "alt": "CanWork interface collage showing shift creation, staff responses, approvals and shift details."
    },
    "subs": [
      {
        "label": "What I learnt",
        "title": "I designed both sides of the same shift. A manager’s invitation and an employee’s response had to make sense together.",
        "more": [
          "Managers create shifts and track responses. Staff set their location and availability, then review and accept offers. I designed these journeys together so notifications and status changes told each person what had happened and what they could do next.",
        ],
        "showcase": {
          "theme": "baseline",
          "brand": "COMMBANK / CANWORK",
          "number": "01",
          "title": "One shift. Two perspectives.",
          "caption": "The manager creates an opportunity. The employee sees the offer and decides whether to accept.",
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
        "title": "Calls, messages and informal networks were connecting people to work. A shared workflow needed to make opportunities visible beyond an individual branch.",
        "more": [
          "Interviews with branch staff and managers showed a mismatch: people wanted additional shifts, while managers were trying to cover gaps within staffing budgets. Existing connections often determined who heard about the work.",
        ],
        "bullets": [
          "<strong>Casual and part-time staff:</strong> want additional work at other branches, with offers that fit their location and availability.",
          "<strong>Branch managers:</strong> need to cover staffing gaps, find suitable people and keep track of responses within their budget.",
          "<strong>Regional managers:</strong> need visibility of shift activity, acceptance and exclusions across branches."
        ],
        "showcase": {
          "theme": "range",
          "brand": "COMMBANK / CANWORK",
          "number": "02",
          "title": "Make the hidden network visible.",
          "caption": "Original interview synthesis describes staff seeking more work, managers balancing budgets and shifts shared through unofficial channels.",
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
        "title": "I stepped back from individual screens and gave every shift a consistent language: needs attention, waiting or accepted.",
        "more": [
          "Designing each shift state separately had made the architecture drift. I reorganised the model around whether someone needed to act, was waiting on another person, or had an accepted shift.",
          "That model connected the visual treatment to the action available in each state. A pending response, an approval and a filled shift could share a structure while keeping their different meanings clear."
        ],
        "showcase": {
          "theme": "chapters",
          "brand": "COMMBANK / CANWORK",
          "number": "03",
          "title": "Know what needs you next.",
          "caption": "A shared state model gives managers and staff a consistent way to read progress and find the next action.",
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
        "title": "The design brought shift creation, responses and acceptance into a shared workflow, with reporting beyond the branch.",
        "more": [
          "I connected the staff and manager experiences, from creating a shift and reviewing candidates to accepting the offer. Regional reporting made shift creation, acceptance and manager exclusions visible across branches.",
          "This provided a way to inspect how opportunities were distributed. The available evidence does not establish a measured change in fairness or shift-fill rates.",
        ],
        "showcase": {
          "theme": "software",
          "brand": "COMMBANK / CANWORK",
          "number": "04",
          "title": "Follow the shift through.",
          "caption": "Candidate review and employee confirmation are two points in the same shared workflow. These screens show the design, rather than a measured staffing result.",
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
    "name": "Loan expenses: 16 required fields reduced to two.",
    "eyebrow": "NAB · Expense research and design (Design lead)",
    "headline": "",
    "highlights": [
      "Reduced mandatory expense inputs from 16 to two, with guided calculation available when needed.",
      "Used card sorting to make expense categories easier to understand.",
      "Kept explanations beside the fields, informed by eye-tracking observations."
    ],
    "text": "Some customers knew how much they spent. Others needed help working it out.<br><br><strong>Start with their confidence:</strong> enter a known total, or build one with guidance through everyday expenses.",
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
        "title": "Some people knew their monthly total. Others needed help working it out. I designed a path for each.",
        "more": [
          "I made direct entry the starting point for customers who already knew their expenses, with a guided calculation route for those who needed support. The same task could accommodate both levels of confidence.",
        ],
        "showcase": {
          "theme": "baseline",
          "brand": "NAB",
          "number": "01",
          "mobileHeader": "NAB",
          "title": "A total, or help finding one.",
          "caption": "Direct entry and guided calculation provide two ways to complete the same task.",
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
        "title": "The bank’s categories did not always match the way people thought about their spending.",
        "more": [
          "Card sorting exposed uncertainty about where car insurance belonged. I presented insurance first and kept housing and investment-property expenses close together to reduce revisiting. The wording needed the same care: some participants read “Netflix” literally, rather than as a prompt to recall other subscriptions.",
        ],
        "showcase": {
          "theme": "range",
          "brand": "NAB",
          "number": "02",
          "layout": "separated-boards",
          "title": "Categories that make sense to people.",
          "caption": "Research changed the order, grouping and wording of expense categories.",
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
        "title": "Kept explanations beside the fields, where eye tracking showed people looking for help.",
        "more": [
          "Customers referred to the explanatory column as they completed adjacent fields. I kept that relationship in the layout. Separate pages reduced visual noise, while a single page made comparison and correction easier; the design had to accommodate both needs.",
        ],
        "showcase": {
          "theme": "chapters",
          "brand": "NAB",
          "number": "03",
          "title": "Help, close to the decision.",
          "caption": "The field, its explanation and the completed summary remain connected.",
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
        "title": "16 mandatory expense inputs became two, with guided calculation available when needed.",
        "more": [
          "The direct route reduced required inputs by 87.5%. Customers could provide an amount and frequency, or use the guided route to build their estimate. That figure describes the number of required fields; completion time and conversion were not quantified.",
        ],
        "showcase": {
          "theme": "flow",
          "brand": "NAB",
          "brandLogo": "assets/brands/nab-mark.svg",
          "browserTitle": "NAB · Expense entry",
          "mobileHeader": "NAB",
          "number": "04",
          "title": "Less entry. Guidance still within reach.",
          "caption": "Original NAB screens: enter a known total, choose categories when help is needed, then add individual expenses.",
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
    "name": "Choose travel cover with COVID in mind (2021).",
    "eyebrow": "Qantas · Research and concepts, 2022 (Design lead)",
    "headline": "",
    "highlights": [
      "Used interviews, journey analysis and concept testing to investigate uncertainty about travel cover.",
      "Proposed earlier trip questions, visible cover details and clearer optional steps.",
      "Testing identified the coverage examples and language that still needed work."
    ],
    "text": "Travellers needed to understand what they were buying, from medical cover to cancellation and delay.<br><br><strong>Make the cover clear before commitment:</strong> explain what is included, what costs extra and which steps are optional.",
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
        "title": "I used interviews, journey analysis and concept testing to understand where confidence in travel cover broke down.",
        "more": [
          "People wanted precise coverage language and concrete examples. I connected those concerns to the purchase journey, from finding cover information to deciding whether an extra was needed. The research shaped a new set of concepts in 2022.",
        ],
        "showcase": {
          "theme": "baseline",
          "brand": "QANTAS",
          "number": "01",
          "title": "Understand the uncertainty first.",
          "caption": "The 2022 research board records customers’ questions about travel cover and the detail they looked for.",
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
        "title": "Login looked required, cover details were hidden, and optional extras could look like protection already included.",
        "more": [
          "Journey analysis showed how interface decisions created uncertainty at several points in the purchase. The design needed to answer specific questions before asking people to move on."
        ],
        "bullets": [
          "<strong>Can I continue without signing in?</strong> The optional login step needed to be clear.",
          "<strong>What is covered at this price?</strong> Travellers needed visible cover details and examples they could understand.",
          "<strong>Do I need this extra?</strong> Additional luggage cover could be mistaken for included protection, while the option to skip extras was easy to miss."
        ],
        "showcase": {
          "theme": "range",
          "brand": "QANTAS",
          "number": "02",
          "title": "Find the moments that create doubt.",
          "caption": "Journey analysis links unclear steps and hidden information to specific comprehension problems.",
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
        "title": "Moved trip questions earlier and proposed showing cover details by default.",
        "more": [
          "I proposed moving trip questions onto the landing page, explaining optional login and bringing product and extras selection together. The aim was to give people the context they needed to understand their cover before committing.",
        ],
        "showcase": {
          "theme": "chapters",
          "brand": "QANTAS",
          "number": "03",
          "title": "The trip first. The cover in view.",
          "caption": "The post-research proposal brings trip details forward and clarifies choices across the journey.",
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
        "title": "The quick quote helped people think about their trip. Testing showed the coverage language still raised questions.",
        "more": [
          "In March 2022 concept testing, the quick-quote widget helped people think about where and when they were travelling. Medical-expense wording still prompted questions about hospital stays and PCR tests, and participants struggled to distinguish cancellation from trip delay. The next improvement was more concrete coverage examples. This work remained research and concepts, with no measured sales or conversion uplift.",
        ],
        "showcase": {
          "theme": "software",
          "brand": "QANTAS",
          "number": "04",
          "title": "Let the testing sharpen the language.",
          "caption": "March 2022 concept feedback records what worked and where coverage examples still needed to improve.",
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
    "name": "Quotes, claims and policies. One account.",
    "eyebrow": "NRMA · Design standards, 2019–2021 (Design lead)",
    "headline": "",
    "highlights": [
      "Defined shared quote and account patterns with product, underwriting, content and platform teams.",
      "Matched validation errors, restrictions and referrals to appropriate next steps.",
      "Brought claims, saved quotes and policies together and designed changes within renewal."
    ],
    "text": "Customers needed a clear way to get a quote, manage a policy and deal with the moments that needed extra help.<br><br><strong>Make the experience consistent:</strong> shared patterns connected quote and MyAccount work across NRMA’s platform transformation from 2019 to 2021.",
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
        "title": "I brought quote and MyAccount teams around shared patterns for everyday tasks and the moments when something goes wrong.",
        "more": [
          "I worked across product, underwriting, content and platform teams to define a shared reference for the experience. In MyAccount, that meant organising around the things customers needed to manage: claims, saved quotes and policies, with consistent desktop and mobile patterns.",
        ],
        "showcase": {
          "theme": "baseline",
          "brand": "NRMA",
          "number": "01",
          "title": "The things that matter, in one view.",
          "caption": "Claims, saved quotes and policies form the account model on desktop and mobile.",
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
        "title": "A mistyped answer, a system problem and an underwriting restriction all need a different next step.",
        "more": [
          "I helped define a pattern framework that distinguished validation, system errors, underwriting restrictions, referrals and special conditions. Each response needed to explain the situation and guide the customer towards the appropriate action."
        ],
        "bullets": [
          "<strong>Correct an entry:</strong> show what needs to change when the customer can fix the problem.",
          "<strong>Understand a restriction:</strong> explain when an underwriting rule affects what can happen next.",
          "<strong>Get the right help:</strong> provide an assisted-service route when a case needs referral."
        ],
        "showcase": {
          "theme": "range",
          "brand": "NRMA",
          "number": "02",
          "title": "A useful response to each situation.",
          "caption": "A shared framework distinguishes the different scenarios quote and account teams need to handle.",
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
        "title": "Connected renewal reminders to policy review, with cover details available to adjust within the journey.",
        "more": [
          "I worked on the renewal experience so customers could review their policy and adjust cover-related details, including insured amount and excess, within the flow. The reminder, account and renewal screens needed to lead naturally into the same task.",
        ],
        "showcase": {
          "theme": "chapters",
          "brand": "NRMA",
          "number": "03",
          "title": "Review. Adjust. Continue.",
          "caption": "Policy details, cover changes and the renewal summary stay together in the journey.",
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
        "title": "Created design foundations that multiple teams could build on across the wider transformation.",
        "more": [
          "My contribution was the shared patterns and experience design within a programme delivered by several teams. The programme timeline records home insurance in September 2020 and account and renewal milestones during 2021. Later iterations built on those foundations; the work shown reflects that wider delivery effort.",
        ]
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
