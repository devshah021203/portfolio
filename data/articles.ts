export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  number: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  modifiedAt: string;
  readingTime: string;
  keywords: string[];
  introduction: string[];
  sections: ArticleSection[];
  takeaway: string;
};

export const articles: Article[] = [
  {
    slug: "small-business-website-windsor-guide",
    number: "01",
    title: "What a Small Business Website in Windsor Should Include in 2026",
    description:
      "A practical guide to small business website design in Windsor, Ontario, covering local trust, mobile conversion, SEO, performance and content ownership.",
    excerpt:
      "A useful Windsor business website needs more than a polished homepage. It should make the offer clear, establish local trust and turn mobile visitors into real enquiries.",
    category: "Web Design / Windsor",
    publishedAt: "2026-07-15",
    modifiedAt: "2026-07-15",
    readingTime: "6 min read",
    keywords: [
      "small business website Windsor",
      "web design Windsor Ontario",
      "web developer Windsor",
      "local business website",
      "Windsor website designer",
    ],
    introduction: [
      "A small business website in Windsor should do three jobs quickly: explain what the business offers, show why a local customer should trust it, and create an obvious next step. Beautiful design helps, but clarity and usefulness are what turn attention into calls, quote requests and visits.",
      "I approach local business websites as operating tools rather than digital brochures. The right structure depends on the business, but the following foundations consistently make a site easier to understand, easier to find and easier to act on.",
    ],
    sections: [
      {
        heading: "Start with a locally specific promise",
        paragraphs: [
          "The first screen should say what you do, who you help and where you work. A visitor should not need to search through a navigation menu to learn whether the business serves Windsor, Tecumseh, LaSalle, Amherstburg or the wider Essex County area.",
          "Local context should sound natural. Mentioning real service areas, delivery zones and customer needs is useful; repeating “Windsor” in every sentence is not. Clear writing builds confidence while also giving search engines accurate context.",
        ],
      },
      {
        heading: "Build trust before asking for the sale",
        paragraphs: [
          "Customers compare local providers quickly. Useful trust signals include specific services, real project photos, a clear process, business contact details, relevant credentials and honest answers to common questions.",
        ],
        bullets: [
          "Show real work rather than generic stock imagery whenever possible.",
          "Explain what happens after someone requests a quote or places an order.",
          "Keep phone, email and service-area information consistent across the site.",
          "Use testimonials only when they are genuine and attributable.",
        ],
      },
      {
        heading: "Design the mobile action first",
        paragraphs: [
          "Many local customers discover a business while holding a phone. Buttons need comfortable tap targets, forms should ask only for necessary information, and the most important action should remain easy to find without blocking the content.",
          "A contractor may prioritize a quote request. A seasonal product business may prioritize availability and ordering. A studio may prioritize portfolio discovery. The mobile experience should reflect the actual buying decision.",
        ],
      },
      {
        heading: "Give every important service a clear home",
        paragraphs: [
          "One vague services paragraph makes it difficult for both customers and search engines to understand the offer. Important services deserve enough detail to answer intent: what the service is, who it is for, what the process looks like and what the visitor should do next.",
          "That does not mean creating dozens of thin pages. A smaller number of complete, useful pages is stronger than publishing repetitive content simply to target keywords.",
        ],
      },
      {
        heading: "Treat performance, accessibility and ownership as features",
        paragraphs: [
          "A professional website should load efficiently, work with a keyboard, use readable contrast and include meaningful headings and image descriptions. These decisions improve the experience for real people and create a stronger technical foundation.",
          "The business should also know who owns the domain, where enquiries go, how content can be updated and what happens after launch. A website is more valuable when the owner can confidently operate it.",
        ],
      },
    ],
    takeaway:
      "The best small business website in Windsor is not the one with the most effects. It is the one that communicates the local offer clearly, earns trust quickly and makes the next step feel effortless.",
  },
  {
    slug: "local-seo-checklist-windsor-businesses",
    number: "02",
    title: "A Practical Local SEO Checklist for Windsor Businesses",
    description:
      "An actionable local SEO checklist for Windsor businesses covering search intent, service pages, Google Business Profile consistency, technical foundations and useful content.",
    excerpt:
      "Local SEO works best when your website, business information and real-world offer tell the same clear story. This checklist focuses on the fundamentals that support long-term visibility.",
    category: "SEO / Local Growth",
    publishedAt: "2026-07-15",
    modifiedAt: "2026-07-15",
    readingTime: "7 min read",
    keywords: [
      "local SEO Windsor",
      "Windsor business SEO",
      "SEO services Windsor Ontario",
      "Google Business Profile Windsor",
      "local search Windsor Essex",
    ],
    introduction: [
      "Local SEO helps a nearby customer understand whether a business is relevant, credible and available. It is not one setting or one keyword. It is the combined effect of accurate business information, useful location-aware content, a technically sound website and evidence that the company serves real people in a real market.",
      "For a Windsor business, the goal is not to appear for every broad search. The goal is to become a strong answer for the services, products and areas the business genuinely supports.",
    ],
    sections: [
      {
        heading: "1. Define the searches that match real customer intent",
        paragraphs: [
          "Begin with the language customers use when they are ready to learn, compare or act. A useful keyword map connects one clear intent to the most relevant page instead of forcing every phrase onto the homepage.",
        ],
        bullets: [
          "Service plus location: for example, web design in Windsor, Ontario.",
          "Product plus delivery area: for example, Indian mango delivery in Windsor.",
          "Problem plus solution: for example, improving a slow small business website.",
          "Brand or founder queries that help people verify who is behind a company.",
        ],
      },
      {
        heading: "2. Make business information consistent",
        paragraphs: [
          "Use the same business name, core contact information, website address and service-area description wherever the company is represented. Consistency reduces confusion for customers and helps search platforms connect the right information to the right entity.",
          "The website should also make ownership and responsibility clear. A useful About section, founder information and accurate Organization or Person structured data can reinforce that connection without hiding it in metadata alone.",
        ],
      },
      {
        heading: "3. Complete the pages that support the offer",
        paragraphs: [
          "Each important service or product should have enough original information to be useful on its own. Explain scope, process, location, limitations, common questions and the next step. Avoid copying the same paragraph across several location pages.",
        ],
        bullets: [
          "Write a unique page title and description for each important page.",
          "Use one descriptive main heading and a logical heading hierarchy.",
          "Link related services, case studies and guides together naturally.",
          "Add descriptive alternative text when an image contributes meaning.",
        ],
      },
      {
        heading: "4. Strengthen the technical foundation",
        paragraphs: [
          "Search visibility is harder to earn when pages are slow, duplicated, difficult to crawl or unclear on mobile. Use canonical URLs, a sitemap, indexable server-rendered content and accessible navigation. Test every form, contact action and important internal link.",
          "Structured data can provide explicit information about a person, organization, project or article, but it should describe content that visitors can actually see on the page.",
        ],
      },
      {
        heading: "5. Publish useful local expertise, then maintain it",
        paragraphs: [
          "Helpful articles can answer questions that do not belong on a sales page. Write from direct experience, include concrete examples and update the content when the business or market changes. One complete guide is more valuable than a group of thin posts created only to repeat a keyword.",
          "Review Search Console, enquiry quality and the searches that lead to meaningful visits. Local SEO is an ongoing process of clarifying the offer and improving the experience—not a one-time launch task.",
        ],
      },
    ],
    takeaway:
      "A durable local SEO strategy for a Windsor business starts with truth: accurate information, genuinely useful pages, a fast accessible website and clear evidence of the people and work behind the company.",
  },
  {
    slug: "building-keri-in-windsor-local-mango-brand",
    number: "03",
    title: "Building Keri in Windsor: From Seasonal Mango Idea to Local Brand",
    description:
      "Dev Shah, founder of Keri in Windsor, explains how a seasonal Indian mango business can turn local demand into a clear brand, ordering experience and delivery system.",
    excerpt:
      "Keri in Windsor began with a focused local opportunity: make premium Indian mangoes easier to discover and order during a short, high-demand season.",
    category: "Founder Story / Brand",
    publishedAt: "2026-07-15",
    modifiedAt: "2026-07-15",
    readingTime: "6 min read",
    keywords: [
      "founder of Keri in Windsor",
      "Keri in Windsor founder",
      "Indian mangoes Windsor",
      "mango delivery Windsor Ontario",
      "Kesar mango Windsor",
      "Alphonso mango Windsor",
    ],
    introduction: [
      "I founded Keri in Windsor to make premium Indian mangoes easier to discover and order locally during mango season. The opportunity was simple to describe but demanding to execute: seasonal inventory moves quickly, customers want clear variety and delivery information, and trust matters when the product is available only in limited batches.",
      "Building the brand required more than a logo or an ordering page. It required a system that connected product education, local delivery, shipment communication and the urgency of a short season without making the experience feel chaotic.",
    ],
    sections: [
      {
        heading: "Start with one clear local promise",
        paragraphs: [
          "Keri in Windsor focuses on premium Indian mango varieties such as Kesar, Alphonso and Banganpalli for customers in Windsor–Essex and nearby Ontario communities. That focus gives the brand a specific reason to exist and makes the website easier to understand.",
          "The promise is not simply “mangoes for sale.” It is access to a seasonal product, clear batch information and a practical local delivery experience.",
        ],
      },
      {
        heading: "Design for seasonality and limited batches",
        paragraphs: [
          "A seasonal mango business cannot communicate like an always-in-stock store. The website needs to show what is available, which shipment or batch an order belongs to, where delivery is offered and what customers should expect next.",
        ],
        bullets: [
          "Put current availability and ordering actions near the top of the page.",
          "Explain varieties in simple language without overwhelming first-time buyers.",
          "Make delivery zones and timing visible before checkout or enquiry.",
          "Use shipment updates to reduce uncertainty during the season.",
        ],
      },
      {
        heading: "Build local trust through specificity",
        paragraphs: [
          "Customers want to know who is behind a local seasonal business. Clear founder information, real product photography, straightforward contact details and honest availability create more confidence than generic marketing language.",
          "This is also why the brand consistently identifies itself as Keri in Windsor and connects the business to Windsor, Ontario. The location is part of the service, not a keyword added after the fact.",
        ],
      },
      {
        heading: "Let the brand feel like the product",
        paragraphs: [
          "The visual direction uses warm colour, direct typography and orchard-led imagery to communicate ripeness, season and origin. The goal is to make the experience feel premium while remaining practical enough for quick ordering on a phone.",
          "Good brand design supports recognition, but the order flow, copy and delivery communication are what turn that recognition into a working business.",
        ],
      },
      {
        heading: "What I learned as founder",
        paragraphs: [
          "A local venture teaches you to connect design decisions with operational reality. Every promise on the website creates an expectation that the business must fulfil. Clear copy, accurate availability and consistent follow-up matter as much as the launch creative.",
          "Keri in Windsor continues to be a practical example of how brand, web development and local business thinking can work as one system.",
        ],
      },
    ],
    takeaway:
      "Keri in Windsor works because the brand stays focused: premium Indian mangoes, limited seasonal batches, clear local delivery and a founder-led experience customers can understand.",
  },
  {
    slug: "ai-travel-planner-voyagea-product-lessons",
    number: "04",
    title: "What an AI Travel Planner Should Actually Solve: Lessons from Voyagea",
    description:
      "Dev Shah, founder and developer of Voyagea, shares product lessons for building an AI travel planner around itineraries, maps, budgets and trustworthy user control.",
    excerpt:
      "The value of an AI travel planner is not generating more travel text. It is reducing the work between inspiration and a trip someone can realistically follow.",
    category: "Product / AI Travel",
    publishedAt: "2026-07-15",
    modifiedAt: "2026-07-15",
    readingTime: "7 min read",
    keywords: [
      "AI travel planner",
      "Voyagea founder",
      "founder and developer of Voyagea",
      "AI itinerary planner",
      "day by day travel itinerary",
      "travel planning product",
    ],
    introduction: [
      "I founded and developed Voyagea around a recurring travel problem: inspiration is easy to collect, but turning scattered ideas into a realistic plan takes time. Travellers move between social posts, maps, notes, booking tabs and spreadsheets before a trip begins.",
      "An AI travel planner should reduce that coordination work. The product becomes useful when it connects a generated itinerary to real places, clear timing, understandable costs and enough control for the traveller to make the plan their own.",
    ],
    sections: [
      {
        heading: "Start with the decision, not the generation",
        paragraphs: [
          "A long AI response can look impressive while leaving the traveller with more decisions. A better planning flow asks for the information that materially changes the trip—destination, dates, pace, interests, group needs and budget—then presents an itinerary that can be reviewed and adjusted.",
          "The output should help someone decide what to do next, not simply prove that the system can write about a city.",
        ],
      },
      {
        heading: "Connect every suggestion to place and time",
        paragraphs: [
          "A useful day-by-day travel itinerary needs geographic and temporal logic. Attractions that look close in a list may create unnecessary travel when placed on a map. Opening hours, neighbourhood grouping and the pace of each day all affect whether a plan feels realistic.",
          "Voyagea combines itinerary structure with maps so the traveller can understand the route rather than trusting a block of generated text.",
        ],
      },
      {
        heading: "Make budgets understandable",
        paragraphs: [
          "Travel costs are rarely one number. Accommodation, transport, food, activities and local fees can vary widely. An AI itinerary planner should communicate estimates as guidance, show the currency and make uncertainty visible instead of presenting a false sense of precision.",
          "The goal is not to replace final price verification. It is to help the traveller compare choices and shape a plan that fits their priorities.",
        ],
      },
      {
        heading: "Keep the traveller in control",
        paragraphs: [
          "People need to save places, reorder days, remove suggestions, collaborate and return later. These product details are less dramatic than generation, but they determine whether the plan remains useful after the first interaction.",
        ],
        bullets: [
          "Make the itinerary editable instead of treating it as a final answer.",
          "Explain why a suggestion fits the traveller’s preferences.",
          "Let users preserve meaningful places and trip history.",
          "Use AI to support decisions while keeping important verification visible.",
        ],
      },
      {
        heading: "Build trust as a product feature",
        paragraphs: [
          "Travel planning involves time, money and personal expectations. The interface should identify estimates, avoid overconfident claims and encourage travellers to verify bookings, entry requirements and time-sensitive details with authoritative sources.",
          "For Voyagea, trustworthy product design means being fast without pretending uncertainty does not exist. A plan is valuable when it helps a person move forward with more clarity.",
        ],
      },
    ],
    takeaway:
      "The strongest AI travel planner is not the one that generates the most content. It is the one that turns preferences into a clear, editable and realistic trip while keeping the traveller in control.",
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
