import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "21",
    title: "LAPO Microfinance Bank: Enterprise Internet Banking",
    subHeader: "Enterprise FinTech Web Application",
    categories: ["FinTech", "Web Development"],
    period: "2025–2026",
    company: "Appcoy Technologies",
    role: ["Frontend Engineer", "Lead Design Engineer"],
    summary:
      "An enterprise internet banking platform organized around financial operations, role-based access, and structured transaction approvals.",
    description:
      "Product design and frontend work for an enterprise banking platform spanning account operations, payments, transaction reviews, and administrative configuration.",
    technologies: [],
    theme: "fintech",
    featured: true,
    caseStudy: {
      overview:
        "The platform supports banking operations for business users, with interfaces shaped around assigned roles and a multi-step approval model. The experience brings day-to-day account and payment tasks together with administrative controls.",
      challenge:
        "The core interface challenge is making a broad set of banking tasks and approval responsibilities understandable without obscuring who can initiate, verify, approve, or authorize a transaction.",
      contributions: [
        "Led design engineering and implemented frontend experiences.",
        "Designed interface patterns for role-specific banking workflows.",
        "Translated product requirements into structured screens and reusable interface patterns.",
      ],
      process: [
        {
          title: "Map the operating model",
          description:
            "Organized the experience around the stated user roles and the sequence of transaction approvals.",
        },
        {
          title: "Design and implement",
          description:
            "Connected banking tasks, review states, and administrative settings through a consistent interface.",
        },
      ],
      features: [
        {
          title: "Role-based access",
          description:
            "Separate responsibilities for administrators, initiators, verifiers, approvers, and authorizers.",
        },
        {
          title: "Accounts and payments",
          description:
            "Account management, beneficiaries, fund and bulk transfers, and bill payments.",
        },
        {
          title: "Operations and oversight",
          description:
            "Transaction history, analytics, reports, notifications, invoices, and audit logs.",
        },
        {
          title: "Workflow controls",
          description:
            "Workflow configuration, user permissions, and transaction limits.",
        },
      ],
      learnings: [
        "Financial interfaces benefit from making transaction ownership, status, and approval responsibility explicit.",
      ],
    },
  },
  {
    id: "2",
    title: "LAPO Retail Internet Banking",
    subHeader: "Retail Internet Banking Portal",
    categories: ["FinTech", "Web Development", "Product Design"],
    period: "2025",
    role: ["Frontend Engineer", "UI/UX Designer"],
    summary:
      "A modern, user-centric retail internet banking portal designed to provide customers of Loans and Mortgages Bank Plc (LAPO) with secure, intuitive, and comprehensive digital banking services — accessible anytime and anywhere.",
    description:
      "A retail internet banking experience for LAPO customers, represented by the existing analytics, settings, and banking interface screens.",
    technologies: ["Figma", "Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    image:
      "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173745/Portfolio/striped-background-m3-macbook-pro_1_kndbuu.png",
    gallery: [
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782172135/Portfolio/Analytics_vsgzrs.png",
        alt: "LAPO retail internet banking analytics screen",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782172135/Portfolio/Settings_r7vgbv.png",
        alt: "LAPO retail internet banking settings screen",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782172126/Portfolio/lapo_jxdpgw.png",
        alt: "LAPO retail internet banking screen",
      },
    ],
    theme: "fintech",
    caseStudy: {
      overview:
        "A digital banking portal designed for LAPO customers to access banking services online. The available portfolio materials include analytics, settings, and banking interface screens.",
      challenge:
        "The experience needs to present banking information and account settings clearly in a customer-facing web portal.",
      contributions: [
        "Contributed to frontend engineering and UI/UX design.",
        "Worked on the banking portal interface represented in the existing project screens.",
      ],
      features: [
        {
          title: "Analytics",
          description:
            "A banking analytics screen is included in the existing project gallery.",
        },
        {
          title: "Settings",
          description:
            "Account settings and the broader banking portal interface are represented in the supplied screens.",
        },
      ],
      technicalDetails: [
        "Next.js, TypeScript, Tailwind CSS, and Recharts are listed in the existing project stack.",
        "Figma is listed for the design work.",
      ],
      learnings: [
        "Customer-facing banking portals need to balance quick access to account information with clear settings and navigation.",
      ],
    },
  },
  {
    id: "9",
    title: "LAPO Mobile Banking",
    subHeader: "Mobile Banking Experience",
    categories: ["FinTech", "Mobile", "Product Design"],
    company: "Appcoy Technologies",
    role: ["Mobile UI/UX Designer", "Frontend Contributor"],
    summary:
      "A mobile-first banking experience spanning customer verification, account support, and everyday financial journeys.",
    description:
      "Mobile banking interface work covering identity verification, account information, fixed deposits, statements, and account recovery journeys.",
    technologies: [],
    theme: "mobile-banking",
    caseStudy: {
      overview:
        "This mobile banking experience brings customer onboarding and account-support tasks into a focused phone-first flow.",
      challenge:
        "The experience needs to present sensitive banking steps clearly on a small screen, particularly when a journey moves between identity details, one-time verification, and account access.",
      contributions: [
        "Contributed to mobile UI/UX and frontend experiences.",
        "Worked on the presentation of customer verification and account-support journeys.",
      ],
      features: [
        {
          title: "Customer verification",
          description:
            "A BVN-based verification journey using the GetCustomerDetailsByBVN integration, including phone, email, referral, and KYC tier information.",
        },
        {
          title: "Account services",
          description:
            "Fixed deposit experience and research, plus downloadable PDF account statements.",
        },
        {
          title: "Account recovery",
          description:
            "Password recovery and OTP verification flows.",
        },
      ],
      learnings: [
        "Verification and recovery steps need concise guidance and clear transitions to help customers understand what information is being requested.",
      ],
    },
  },
  {
    id: "10",
    title: "Influencer Haven",
    subHeader: "Creator Marketplace",
    categories: ["Web3", "Marketplace", "Product Design", "Web Development"],
    role: ["Product Designer", "UI/UX Designer", "Frontend Developer"],
    summary:
      "A crypto-influencer marketplace concept connecting brands with influencers and content creators through distinct user journeys.",
    description:
      "Marketplace design and frontend work for brand purchasing and influencer participation, with separate needs for each user type.",
    technologies: [],
    theme: "creator",
    featured: true,
    caseStudy: {
      overview:
        "Influencer Haven brings brands seeking creator services and influencers offering packages into one marketplace experience.",
      challenge:
        "The product serves two user types with different goals: brands need to discover and purchase packages, while influencers need to present their work and manage marketplace activity.",
      contributions: [
        "Designed product and UI/UX flows for brands and influencers.",
        "Contributed frontend development for the marketplace experience.",
      ],
      features: [
        {
          title: "Brand journey",
          description:
            "Explore brand packages and influencer listings, use filters, make offers, place orders, and review analytics.",
        },
        {
          title: "Influencer journey",
          description:
            "Manage listings, referrals, reviews, messages, content uploads, and dashboards.",
        },
        {
          title: "Influencer-mode deposit",
          description:
            "Users switching to influencer mode are required to make a $100 security deposit.",
        },
        {
          title: "Marketplace transactions",
          description:
            "Payment experiences and related marketplace interactions for the two user types.",
        },
      ],
      learnings: [
        "A two-sided marketplace benefits from making each user type's next action clear without blending their distinct workflows.",
      ],
    },
  },
  {
    id: "11",
    title: "Digital Kookies AI Assistant",
    subHeader: "AI Assistant Web Application",
    categories: ["AI & SaaS", "Web Development", "Product Design"],
    company: "Digital Kookies International",
    role: ["UI/UX Designer", "Frontend Engineer"],
    summary:
      "An AI assistant web application focused on a clear interface, considered hierarchy, and reusable frontend patterns.",
    description:
      "Interface design and frontend engineering for an AI assistant product, with attention to the application's structure and responsive experience.",
    technologies: [],
    theme: "ai",
    caseStudy: {
      overview:
        "The project is an AI assistant web application. The available brief establishes the product type and design/engineering focus, but does not document specific model capabilities or integrations.",
      challenge:
        "The interface needs a clear application structure and hierarchy while leaving the assistant's capabilities grounded in the product rather than implying unsupported AI behavior.",
      contributions: [
        "Designed the user interface and information hierarchy.",
        "Implemented responsive frontend layouts and reusable interface components.",
      ],
      features: [
        {
          title: "Assistant application",
          description:
            "A web application centered on an AI assistant. Specific capabilities are not documented in the available project materials.",
        },
        {
          title: "Application structure",
          description:
            "Dashboard and interface organization designed to make the product's main areas clear.",
        },
      ],
      learnings: [
        "AI product interfaces should communicate only capabilities that are actually available to the user.",
      ],
    },
  },
  {
    id: "12",
    title: "Createen",
    subHeader: "Learning Platform",
    categories: ["EdTech", "Product Design"],
    role: ["Product Designer", "UI/UX Designer"],
    summary:
      "Product design for a learning platform, with a focus on organizing digital learning content and making the student-facing experience easier to navigate.",
    description:
      "An education product design project centered on learning information architecture, course organization, and consistent navigation patterns.",
    technologies: [],
    theme: "learning",
    caseStudy: {
      overview:
        "Createen is a learning platform concept focused on organizing the digital learning experience for students.",
      challenge:
        "Learning content needs a clear structure so students can understand how courses and materials are organized and where to go next.",
      contributions: [
        "Worked on product design and UI/UX for the student-facing experience.",
        "Organized course and learning-content information architecture.",
        "Developed consistent navigation and interface patterns.",
      ],
      features: [
        {
          title: "Learning content organization",
          description:
            "Course and content structure for the digital learning experience.",
        },
        {
          title: "Student-facing navigation",
          description:
            "Navigation and usability patterns designed around student access to learning materials.",
        },
      ],
      learnings: [
        "A learning platform's navigation should help students orient themselves in the content without adding unnecessary complexity.",
      ],
    },
  },
  {
    id: "13",
    title: "Intellipath Properties",
    subHeader: "Real Estate Corporate Website",
    categories: ["Real Estate", "Product Design"],
    role: ["UI/UX Designer"],
    summary:
      "A corporate real estate website experience organized around the needs of property owners, tenants, and residents.",
    description:
      "UI/UX design for a real estate corporate website, covering its information architecture, page hierarchy, and responsive layouts.",
    technologies: [],
    theme: "real-estate",
    caseStudy: {
      overview:
        "Intellipath Properties is a corporate real estate website designed to direct visitors to company information, services, and audience-specific content.",
      challenge:
        "The site needs to organize information for distinct audiences while keeping the main navigation and page hierarchy coherent.",
      contributions: [
        "Designed the website's information architecture and page hierarchy.",
        "Worked on navigation, responsive layouts, and visual consistency.",
        "Prepared design handoff.",
      ],
      features: [
        {
          title: "Corporate pages",
          description: "Home, About, Services, and Contact.",
        },
        {
          title: "Audience-specific pages",
          description: "Dedicated Property Owners and Tenants / Residents pages.",
        },
      ],
      learnings: [
        "Audience-specific navigation can clarify a corporate service offering when visitor needs differ.",
      ],
    },
  },
  {
    id: "14",
    title: "MEMEX Capital",
    subHeader: "Crypto & Investment Platform",
    categories: ["Web3", "FinTech", "Web Development"],
    company: "Digital Kookies International",
    role: ["Frontend Engineer", "Design Contributor"],
    summary:
      "Frontend engineering and design contribution to a crypto and investment platform.",
    description:
      "The available project brief identifies MEMEX Capital as a crypto/investment platform. More detailed product flows and implementation specifics were not supplied.",
    technologies: [],
    theme: "memex",
    caseStudy: {
      overview:
        "MEMEX Capital is a crypto/investment platform project. This case study is intentionally limited to the project type and contribution areas confirmed in the available information.",
      challenge:
        "Financial and crypto-related interfaces need a clear information hierarchy, but the platform's specific functionality is not documented in the available materials.",
      contributions: [
        "Contributed to frontend engineering and design.",
      ],
      learnings: [
        "Clear project documentation is important when presenting financial product work; unsupported trading, wallet, and investment claims should be avoided.",
      ],
    },
  },
  {
    id: "15",
    title: "Leonardo Memecoin Platform",
    subHeader: "Web3 & Crypto Platform",
    categories: ["Web3", "Gaming", "Web Development"],
    role: ["Design and frontend contribution (scope to confirm)"],
    summary:
      "A memecoin-related Web3 project; the available brief does not describe its specific product flows.",
    description:
      "The supplied project information identifies Leonardo as a Web3/memecoin-related platform, but does not provide specific screens or functionality.",
    technologies: [],
    theme: "leonardo",
    caseStudy: {
      overview:
        "Leonardo is identified as a memecoin-related Web3 platform. Its product concept and exact implementation scope need confirmation before more detailed claims can be made.",
      challenge:
        "The available materials do not document the interface, product journeys, or technical implementation.",
      contributions: [
        "The project brief describes design and frontend contribution, subject to confirmation; no more specific responsibilities are established here.",
      ],
      learnings: [
        "More project materials are needed to document specific product decisions or engineering work accurately.",
      ],
    },
  },
  {
    id: "16",
    title: "Girl Pocket",
    subHeader: "Mobile Savings & Investment Product",
    categories: ["FinTech", "Mobile", "Product Design"],
    role: ["Product Designer", "Mobile UI/UX Designer"],
    summary:
      "Mobile product design for a financial experience focused on savings and investment.",
    description:
      "A mobile FinTech design project shaped around the financial product experience, its workflows, and a clear visual interface.",
    technologies: [],
    theme: "girl-pocket",
    caseStudy: {
      overview:
        "Girl Pocket is a mobile financial product focused on savings and investment. The available information confirms the product direction and design contribution, but not specific financial instruments or transaction behavior.",
      challenge:
        "Financial journeys need to communicate choices clearly and present sensitive information in a way that feels understandable on mobile.",
      contributions: [
        "Worked on product design and mobile UI/UX.",
        "Focused on financial workflow presentation and visual design.",
      ],
      learnings: [
        "Savings and investment interfaces should make the meaning of each choice clear without implying unsupported product terms.",
      ],
    },
  },
  {
    id: "17",
    title: "PESS Group Website",
    subHeader: "Corporate Website",
    categories: ["Corporate", "Web Development"],
    period: "2024",
    company: "PESS Group",
    role: ["Frontend Engineer"],
    summary:
      "A corporate marketing website with billboard search functionality connected to a search endpoint.",
    description:
      "Frontend engineering for a corporate website, including the integration of a billboard search experience.",
    technologies: [],
    theme: "pess",
    featured: true,
    caseStudy: {
      overview:
        "The PESS Group project combines a corporate marketing website with a searchable billboard experience.",
      challenge:
        "The search experience needed to connect the website interface to an existing search endpoint while fitting into the wider corporate site.",
      contributions: [
        "Built the corporate website frontend.",
        "Integrated billboard search with a search endpoint.",
      ],
      features: [
        {
          title: "Corporate website",
          description: "Frontend implementation for the marketing website.",
        },
        {
          title: "Billboard search",
          description:
            "Search functionality connected to a search endpoint.",
        },
      ],
      learnings: [
        "Search interactions work best when their entry point and results experience are integrated into the site's wider navigation.",
      ],
    },
  },
  {
    id: "5",
    title: "EventFlow",
    subHeader: "Event Web Application",
    categories: ["Web Development", "Full Stack"],
    period: "2024",
    role: ["Full-Stack Developer"],
    summary:
      "A web application for discovering events, registering, and engaging with event experiences.",
    description:
      "A personal full-stack event project built with Next.js, Tailwind CSS, and Firebase. The available project summary describes event discovery and registration.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Firebase",
      "Redux",
      "TanStack Query",
    ],
    image:
      "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173090/Portfolio/Screenshot_2026-06-23_at_01-04-11_EventFlow_byqszy.png",
    gallery: [
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173090/Portfolio/Screenshot_2026-06-23_at_01-04-11_EventFlow_byqszy.png",
        alt: "Event Flow application screen",
      },
    ],
    theme: "event",
    featured: true,
    caseStudy: {
      overview:
        "Event Flow is a personal event web application intended to help people discover events and register for them.",
      challenge:
        "The available project details establish the event discovery and registration use cases, but do not describe the deeper application architecture or additional event workflows.",
      contributions: [
        "Built the project as a full-stack developer.",
        "Implemented the application using the technologies listed for the project.",
      ],
      features: [
        {
          title: "Event discovery",
          description: "A web experience for finding events.",
        },
        {
          title: "Registration",
          description: "An event registration journey.",
        },
      ],
      technicalDetails: [
        "Next.js and Tailwind CSS for the web application.",
        "Firebase, Redux, and TanStack Query are listed in the project stack.",
      ],
      learnings: [
        "The repository currently contains portfolio materials rather than the Event Flow source, so further architectural or feature details need project-source confirmation.",
      ],
    },
  },
  {
    id: "18",
    title: "Task Management REST API",
    subHeader: "Backend API",
    categories: ["Backend"],
    role: ["Backend Developer"],
    summary:
      "A task management REST API with authentication, protected routes, and CRUD operations.",
    description:
      "Backend development for a task management API using Node.js, Express.js, and MongoDB.",
    technologies: ["Node.js", "Express.js", "MongoDB"],
    theme: "api",
    caseStudy: {
      overview:
        "The API provides task-management operations behind authenticated and protected routes.",
      challenge:
        "The service needs to separate public authentication flows from protected task operations and persist changes to task data.",
      contributions: [
        "Developed the backend API.",
        "Implemented authentication and protected route handling.",
        "Built CRUD operations for task management.",
      ],
      features: [
        {
          title: "Authentication",
          description: "Authentication for API users.",
        },
        {
          title: "Protected routes",
          description:
            "Access control for task operations that require an authenticated user.",
        },
        {
          title: "Task CRUD",
          description:
            "Create, read, update, and delete operations for task records.",
        },
      ],
      technicalDetails: [
        "Node.js runtime with Express.js for HTTP routes.",
        "MongoDB for data storage.",
      ],
      learnings: [
        "Protected API routes make authentication boundaries explicit before task operations are handled.",
      ],
    },
  },
  {
    id: "19",
    title: "North Capital",
    subHeader: "Crypto & Financial Platform",
    categories: ["Web3", "FinTech", "Web Development"],
    company: "Digital Kookies International",
    role: ["Frontend Engineer", "Design Contributor"],
    summary:
      "Frontend engineering and design contribution to a crypto and financial platform.",
    description:
      "The available project brief identifies North Capital as a crypto/financial platform. Product functionality and implementation details were not supplied.",
    technologies: [],
    theme: "north",
    caseStudy: {
      overview:
        "North Capital is a crypto/financial platform project, separate from MEMEX Capital. The available details establish the category and contribution area only.",
      challenge:
        "The specific product journeys are not documented, so this case study avoids attributing trading, wallet, investment, or analytics capabilities.",
      contributions: [
        "Contributed to frontend engineering and design.",
      ],
      learnings: [
        "Keeping North Capital's record separate from other projects preserves the distinction between independently scoped products.",
      ],
    },
  },
  {
    id: "20",
    title: "Casino Web Application",
    subHeader: "Gaming Web Application",
    categories: ["Gaming", "Web Development"],
    company: "Digital Kookies International",
    role: ["Frontend Engineer", "Design Contributor"],
    summary:
      "Frontend engineering and design contribution to a casino web application.",
    description:
      "The available project information confirms the product category and contribution area, but does not document game types, payment providers, or specific user flows.",
    technologies: [],
    theme: "casino",
    caseStudy: {
      overview:
        "A casino web application project completed with Digital Kookies International. Details beyond the project category and contribution area are not available in the supplied materials.",
      challenge:
        "The application interface and functionality are not described in the available project information.",
      contributions: [
        "Contributed to frontend engineering and design.",
      ],
      learnings: [
        "Further project materials are needed to accurately describe the product's specific interface and functionality.",
      ],
    },
  },
  {
    id: "1",
    title: "AfricarbiMart",
    subHeader: "Mobile Marketplace",
    categories: ["Mobile", "Marketplace", "Product Design"],
    period: "2026",
    role: ["Mobile Designer", "Mobile Developer"],
    summary:
      "A React Native marketplace bringing African and Caribbean vendors and shoppers together in one mobile application.",
    description:
      "Mobile design and development for an African and Caribbean goods marketplace, with onboarding and sign-up screens represented in the existing project gallery.",
    technologies: ["React Native", "Expo", "TypeScript", "Figma", "Tailwind"],
    image:
      "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173601/Portfolio/iphone-14-pro-max-concrete-background_nohq39.png",
    gallery: [
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173446/Portfolio/Sign_up_mw9rqt.jpg",
        alt: "AfricarbiMart sign-up screen",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173444/Portfolio/Onboarding_cqtgkc.jpg",
        alt: "AfricarbiMart onboarding screen",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173446/Portfolio/Onboarding-2_axspbj.jpg",
        alt: "AfricarbiMart onboarding screen",
      },
    ],
    theme: "marketplace",
    caseStudy: {
      overview:
        "AfricarbiMart connects vendors selling African and Caribbean goods with shoppers through a single mobile application.",
      challenge:
        "The product brings vendor and shopper needs into one app, while its onboarding and sign-up experience introduces the marketplace to new users.",
      contributions: [
        "Worked across mobile design and development.",
        "Built the mobile application with React Native and Expo.",
      ],
      features: [
        {
          title: "Vendor and shopper marketplace",
          description:
            "A shared application for vendors and shoppers of African and Caribbean goods.",
        },
        {
          title: "Onboarding and sign-up",
          description:
            "The supplied project screens show the introduction and account registration experience.",
        },
      ],
      technicalDetails: [
        "React Native and Expo for mobile development.",
        "TypeScript, Figma, and Tailwind are listed in the existing project stack.",
      ],
      learnings: [
        "A shared marketplace app needs a clear introduction to its vendor and shopper roles.",
      ],
    },
  },
  {
    id: "3",
    title: "FGs Creatives",
    subHeader: "Creative Agency Landing Page",
    categories: ["Web Development", "Product Design"],
    period: "2026",
    role: ["UI/UX Designer", "Web Developer"],
    summary:
      "An editorial landing page for a marketing agency, with responsive layouts and interactive transitions.",
    description:
      "Design and web development for a creative agency landing experience that presents its content across desktop and mobile.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Figma",
    ],
    image:
      "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782170918/Portfolio/ChatGPT_Image_Jun_2_2026_01_39_20_AM_s7erqt.png",
    gallery: [
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782175309/Portfolio/hero1_j8ztn2.png",
        alt: "FGs Creatives landing page hero",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782175308/Portfolio/how-it-works_ef7crk.png",
        alt: "FGs Creatives how-it-works section",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782175306/Portfolio/faq_f0gmgr.png",
        alt: "FGs Creatives FAQ section",
      },
    ],
    theme: "creative",
    caseStudy: {
      overview:
        "FGs Creatives is a marketing-agency landing experience designed to present the brand with an editorial, modern visual direction.",
      challenge:
        "The landing page needed to carry its visual direction across desktop and mobile while using movement to connect content sections.",
      contributions: [
        "Worked on UI/UX design and web development.",
        "Implemented responsive layouts and interactive transitions.",
      ],
      features: [
        {
          title: "Editorial landing experience",
          description:
            "A marketing-agency presentation with a distinct visual direction.",
        },
        {
          title: "Responsive content",
          description:
            "Layouts designed for desktop and mobile, including the sections shown in the project gallery.",
        },
      ],
      technicalDetails: [
        "Next.js and TypeScript for the web project.",
        "Tailwind CSS and Framer Motion for styling and interaction.",
        "Figma is listed in the project stack.",
      ],
      learnings: [
        "Interactive transitions can support a strong editorial direction when they remain connected to the content flow.",
      ],
    },
  },
  {
    id: "4",
    legacyIds: ["6", "7", "8"],
    title: "LAPO Admin Dashboard",
    subHeader: "Banking Administration Dashboard",
    categories: ["FinTech", "Product Design"],
    period: "2025",
    company: "LAPO Microfinance Bank",
    role: ["UI/UX Designer"],
    summary:
      "A banking administration dashboard design for overseeing operations and managing customer data.",
    description:
      "A LAPO dashboard design focused on administrative operations, customer data, and system oversight.",
    technologies: ["Figma"],
    image:
      "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782173744/Portfolio/concrete-stand-m2-macbook-air_rbfqin.png",
    gallery: [
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782172136/Portfolio/Customer_r9rcc3.png",
        alt: "LAPO admin dashboard customer screen",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782172136/Portfolio/CustomerRR_duuhpt.png",
        alt: "LAPO admin dashboard customer record screen",
      },
      {
        src: "https://res.cloudinary.com/dmvwjmy23/image/upload/v1782172136/Portfolio/DashboardD_qi4k9d.png",
        alt: "LAPO admin dashboard overview",
      },
    ],
    theme: "admin",
    caseStudy: {
      overview:
        "The admin dashboard is designed to give LAPO administrators a place to oversee operations and manage user data.",
      challenge:
        "Administrative screens need to make operational information and customer records accessible while maintaining a consistent banking interface.",
      contributions: [
        "Designed the dashboard experience and its user-facing interface.",
        "Focused on customer management and operational oversight screens.",
      ],
      features: [
        {
          title: "Operations overview",
          description:
            "Dashboard views for administrators overseeing bank operations.",
        },
        {
          title: "Customer management",
          description:
            "Customer records and user-data management screens.",
        },
      ],
      technicalDetails: [
        "Figma is the only technology listed for this design project.",
      ],
      learnings: [
        "Operational dashboards need clear hierarchy to help administrators move between high-level views and customer records.",
      ],
    },
  },
];

export function getProjectById(id: string) {
  return projects.find(
    (project) => project.id === id || project.legacyIds?.includes(id),
  );
}
