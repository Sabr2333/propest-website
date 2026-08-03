"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useLang } from "../context/LanguageContext";

type IngredientsVariant =
  | "bedrijfsautomatisering"
  | "ai-crm"
  | "ai-agents"
  | "app-web-ontwikkeling"
  | "systeemverbetering"
  | "rpa-ai-automatisering"
  | "gpt-op-maat"
  | "webbots"
  | "systeemintegraties";

type IngredientsCard = {
  title: string;
  description: string;
  points: string[];
  cardTone: "green" | "purple" | "yellow";
  iconTone: "green" | "purple" | "yellow";
  iconSrc: string;
  iconAlt: string;
};

type IngredientsContent = {
  title: string;
  description: ReactNode;
  cards: IngredientsCard[];
};

const INGREDIENTS_CONTENT: Record<IngredientsVariant, IngredientsContent> = {
  "bedrijfsautomatisering": {
    title: "", // Will be set by t() in component
    description: "", // Will be set by t() in component
    cards: [
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", "", ""], // Will be set by t() in component
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "Strategie",
      },
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", "", ""], // Will be set by t() in component
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "Optimalisatie",
      },
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", "", ""], // Will be set by t() in component
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "Automatiseren",
      },
    ],
  },
  "ai-crm": {
    title: "", // Will be set by t() in component
    description: "", // Will be set by t() in component
    cards: [
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", ""], // Will be set by t() in component
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "CRM strategie",
      },
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", ""], // Will be set by t() in component
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "CRM optimalisatie",
      },
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", ""], // Will be set by t() in component
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "CRM automatisering",
      },
    ],
  },
  "ai-agents": {
    title: "", // Will be set by t() in component
    description: "", // Will be set by t() in component
    cards: [
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", ""], // Will be set by t() in component
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "Agent strategie",
      },
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", ""], // Will be set by t() in component
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "Agent optimalisatie",
      },
      {
        title: "", // Will be set by t() in component
        description: "", // Will be set by t() in component
        points: ["", "", "", "", ""], // Will be set by t() in component
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "Agent automatisering",
      },
    ],
  },
  "app-web-ontwikkeling": {
    title: "De ingrediënten voor sterke digitale producten",
    description: (
      <>
        Een app of website moet niet alleen mooi zijn, maar vooral converteren en meeschalen. Wij bouwen
        <em> digitale oplossingen op maat</em> die techniek en gebruiksgemak combineren.
      </>
    ),
    cards: [
      {
        title: "Strategie",
        description: "We vertalen bedrijfsdoelen naar een duidelijke productstrategie en structuur.",
        points: [
          "→ Scope en prioriteiten bepalen",
          "→ User flows uitwerken",
          "→ Technische roadmap opstellen",
          "→ MVP-fase definiëren",
          "→ KPI's voor gebruik en conversie",
        ],
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "Product strategie",
      },
      {
        title: "Optimalisatie",
        description: "UX, performance en onderhoudbaarheid worden strak geoptimaliseerd.",
        points: [
          "→ UX/UI verfijning",
          "→ Snelheidsoptimalisatie",
          "→ Responsive verbeteringen",
          "→ Codekwaliteit en structuur",
          "→ Continu doorontwikkelen",
        ],
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "Product optimalisatie",
      },
      {
        title: "Automatiseren",
        description: "Slimme koppelingen en flows zorgen dat jouw product operationeel minder werk vraagt.",
        points: [
          "→ API-koppelingen",
          "→ Formulier- en dataflows",
          "→ Notificaties en triggers",
          "→ CMS en contentautomatisering",
          "→ Minder handmatig beheer",
        ],
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "Product automatisering",
      },
    ],
  },
  "systeemverbetering": {
    title: "De ingrediënten voor betere bestaande systemen",
    description: (
      <>
        Jij hoeft niet opnieuw te beginnen om sneller te werken. Met <em>systeemverbetering</em> halen we meer uit jouw
        huidige software en maken we processen weer schaalbaar.
      </>
    ),
    cards: [
      {
        title: "Strategie",
        description: "We onderzoeken waar jouw huidige systeem vertraagt en waar verbetering direct loont.",
        points: [
          "→ Huidige architectuur doorlichten",
          "→ Frictiepunten prioriteren",
          "→ Verbeterplan per afdeling",
          "→ Impactanalyse vooraf",
          "→ Realistische fasering",
        ],
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "Systeemstrategie",
      },
      {
        title: "Optimalisatie",
        description: "We maken bestaande workflows sneller, stabieler en gebruiksvriendelijker.",
        points: [
          "→ Performance verbeteren",
          "→ Processtappen verkorten",
          "→ Gebruikerservaring aanscherpen",
          "→ Foutkansen verlagen",
          "→ Inzicht via duidelijke dashboards",
        ],
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "Systeemoptimalisatie",
      },
      {
        title: "Automatiseren",
        description: "AI en slimme koppelingen nemen repetitieve systeemtaken structureel over.",
        points: [
          "→ Geautomatiseerde datastromen",
          "→ Trigger-based acties",
          "→ Integraties zonder vervanging",
          "→ Minder handmatig beheer",
          "→ Meetbare tijdswinst per team",
        ],
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "Systeemautomatisering",
      },
    ],
  },
  "rpa-ai-automatisering": {
    title: "De ingrediënten voor sterke RPA + AI automatisering",
    description: (
      <>
        Repetitief werk vertraagt groei en verhoogt foutkans. Met <em>RPA + AI</em> automatiseren we processen van begin
        tot eind, zodat jouw team zich focust op waardevol werk.
      </>
    ),
    cards: [
      {
        title: "Strategie",
        description: "We bepalen welke processen als eerste geautomatiseerd moeten worden, met focus op maximale ROI.",
        points: [
          "→ Processelectie op impact",
          "→ Volumemeting en businesscase",
          "→ Risico-inschatting vooraf",
          "→ SLA-doelen bepalen",
          "→ Fasering per team",
        ],
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "RPA strategie",
      },
      {
        title: "Optimalisatie",
        description: "We stroomlijnen processtappen zodat bots stabiel en foutarm kunnen draaien.",
        points: [
          "→ Uitzonderingen afvangen",
          "→ Datavelden standaardiseren",
          "→ Procesvarianten reduceren",
          "→ Controlepunten automatiseren",
          "→ Monitoring en alerts inbouwen",
        ],
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "RPA optimalisatie",
      },
      {
        title: "Automatiseren",
        description: "Bots nemen de uitvoering over, terwijl AI beslissingen versnelt bij complexere situaties.",
        points: [
          "→ End-to-end botflows",
          "→ AI-classificatie van input",
          "→ 24/7 verwerking",
          "→ Minder fouten en wachttijd",
          "→ Schaalbaar naar nieuwe processen",
        ],
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "RPA automatisering",
      },
    ],
  },
  "gpt-op-maat": {
    title: "De ingrediënten voor GPT op maat",
    description: (
      <>
        Een goede assistent geeft niet zomaar antwoorden, maar antwoorden in jouw context. Met GPT op maat trainen we AI op je data, processen en tone of voice.
      </>
    ),
    cards: [
      {
        title: "Strategie",
        description: "We definiëren voor welke vragen en taken jouw GPT de meeste impact levert.",
        points: [
          "→ Use-cases en doelgroepen bepalen",
          "→ Databronnen selecteren",
          "→ Tone of voice vastleggen",
          "→ Governance en toegangsniveaus",
          "→ KPI's voor kwaliteit en snelheid",
        ],
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "GPT strategie",
      },
      {
        title: "Optimalisatie",
        description: "We verbeteren antwoord kwaliteit met feedback, evaluaties en duidelijke kaders.",
        points: [
          "→ Prompt- en contextoptimalisatie",
          "→ Hallucinaties beperken",
          "→ Kennisupdates stroomlijnen",
          "→ Kwaliteitscontrole op output",
          "→ Continue finetuning",
        ],
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "GPT optimalisatie",
      },
      {
        title: "Automatiseren",
        description: "Jouw GPT ondersteunt support, sales en interne teams automatisch en schaalbaar.",
        points: [
          "→ Antwoorden op veelgestelde vragen",
          "→ Interne kennisassistent",
          "→ AI-ondersteunde content",
          "→ Integratie met bestaande systemen",
          "→ Snellere service met minder werkdruk",
        ],
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "GPT automatisering",
      },
    ],
  },
  "webbots": {
    title: "De ingrediënten voor krachtige webbots",
    description: (
      <>
        Handmatig klikwerk kost tijd en maakt processen foutgevoelig. Met <em>webbots</em> automatiseren we online taken
        zoals data ophalen, formulieren invullen en controles uitvoeren.
      </>
    ),
    cards: [
      {
        title: "Strategie",
        description: "We bepalen welke webtaken het meest tijdrovend zijn en waar automatisering direct impact maakt.",
        points: [
          "→ Webtaken in kaart brengen",
          "→ Frequentie en impact analyseren",
          "→ Prioriteiten per team",
          "→ Input/output definiëren",
          "→ KPI's op snelheid en kwaliteit",
        ],
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "Webbot strategie",
      },
      {
        title: "Optimalisatie",
        description: "We maken botflows robuust, zodat ze omgaan met variatie in websites, data en uitzonderingen.",
        points: [
          "→ Foutafhandeling bij wijzigingen",
          "→ Validatie van opgehaalde data",
          "→ Slimme retries en timeouts",
          "→ Logging en kwaliteitschecks",
          "→ Beheerbaar onderhoud",
        ],
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "Webbot optimalisatie",
      },
      {
        title: "Automatiseren",
        description: "Webbots voeren taken 24/7 uit zonder vertraging, met consistente output.",
        points: [
          "→ Data scraping en monitoring",
          "→ Formulierautomatisering",
          "→ Realtime updates verwerken",
          "→ Minder handmatige klikken",
          "→ Snellere operationele uitvoering",
        ],
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "Webbot automatisering",
      },
    ],
  },
  "systeemintegraties": {
    title: "De ingrediënten voor naadloze systeemintegraties",
    description: (
      <>
        Losse tools zorgen voor dubbele input en gemiste informatie. Met <em>systeemintegraties</em> verbinden we uw
        software tot één werkend ecosysteem met realtime datastromen.
      </>
    ),
    cards: [
      {
        title: "Strategie",
        description: "We ontwerpen een integratie-architectuur die past bij uw huidige stack en groeiplannen.",
        points: [
          "→ Systeemlandschap analyseren",
          "→ Datastromen modelleren",
          "→ Integratieprioriteiten bepalen",
          "→ Security en rechtenstructuur",
          "→ Roadmap voor uitrol",
        ],
        cardTone: "green",
        iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg",
        iconAlt: "Integratie strategie",
      },
      {
        title: "Optimalisatie",
        description: "We verbeteren bestaande koppelingen zodat data betrouwbaar en foutarm doorstroomt.",
        points: [
          "→ API performance verbeteren",
          "→ Mapping en validatie aanscherpen",
          "→ Foutdetectie automatiseren",
          "→ Dataconsistentie verhogen",
          "→ Monitoring op kritieke flows",
        ],
        cardTone: "purple",
        iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg",
        iconAlt: "Integratie optimalisatie",
      },
      {
        title: "Automatiseren",
        description: "Gegevens synchroniseren automatisch tussen systemen zonder handmatige tussenstappen.",
        points: [
          "→ Realtime synchronisatie",
          "→ Trigger-based updates",
          "→ Middleware op maat",
          "→ Minder dubbele invoer",
          "→ Betrouwbare rapportages",
        ],
        cardTone: "yellow",
        iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg",
        iconAlt: "Integratie automatisering",
      },
    ],
  },
};

type DienstIngredientsProps = {
  variant?: IngredientsVariant;
};

const INGREDIENTS_CONTENT_EN: Partial<Record<IngredientsVariant, IngredientsContent>> = {
  "app-web-ontwikkeling": {
    title: "The ingredients for strong digital products",
    description: (
      <>
        An app or website should not only look good, but above all convert and scale. We build
        <em> custom digital solutions</em> that combine technology and usability.
      </>
    ),
    cards: [
      {
        title: "Strategy",
        description: "We translate business goals into a clear product strategy and structure.",
        points: [
          "→ Define scope and priorities",
          "→ Work out user flows",
          "→ Create technical roadmap",
          "→ Define MVP phase",
          "→ KPIs for usage and conversion",
        ],
        cardTone: "green", iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg", iconAlt: "Product strategy",
      },
      {
        title: "Optimization",
        description: "UX, performance and maintainability are tightly optimized.",
        points: [
          "→ UX/UI refinement",
          "→ Speed optimization",
          "→ Responsive improvements",
          "→ Code quality and structure",
          "→ Continuous development",
        ],
        cardTone: "purple", iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg", iconAlt: "Product optimization",
      },
      {
        title: "Automation",
        description: "Smart integrations and flows ensure your product requires less operational work.",
        points: [
          "→ API integrations",
          "→ Form and data flows",
          "→ Notifications and triggers",
          "→ CMS and content automation",
          "→ Less manual management",
        ],
        cardTone: "yellow", iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg", iconAlt: "Product automation",
      },
    ],
  },
  "systeemverbetering": {
    title: "The ingredients for better existing systems",
    description: (
      <>
        You don&apos;t need to start over to work faster. With <em>system improvement</em> we get more from your
        current software and make processes scalable again.
      </>
    ),
    cards: [
      {
        title: "Strategy",
        description: "We research where your current system slows down and where improvement pays off immediately.",
        points: [
          "→ Review current architecture",
          "→ Prioritize friction points",
          "→ Improvement plan per department",
          "→ Impact analysis upfront",
          "→ Realistic phasing",
        ],
        cardTone: "green", iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg", iconAlt: "System strategy",
      },
      {
        title: "Optimization",
        description: "We make existing workflows faster, more stable and user-friendly.",
        points: [
          "→ Improve performance",
          "→ Shorten process steps",
          "→ Sharpen user experience",
          "→ Reduce error chances",
          "→ Insight via clear dashboards",
        ],
        cardTone: "purple", iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg", iconAlt: "System optimization",
      },
      {
        title: "Automation",
        description: "AI and smart integrations structurally take over repetitive system tasks.",
        points: [
          "→ Automated data flows",
          "→ Trigger-based actions",
          "→ Integrations without replacement",
          "→ Less manual management",
          "→ Measurable time savings per team",
        ],
        cardTone: "yellow", iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg", iconAlt: "System automation",
      },
    ],
  },
  "rpa-ai-automatisering": {
    title: "The ingredients for strong RPA + AI automation",
    description: (
      <>
        Repetitive work slows growth and increases error rates. With <em>RPA + AI</em> we automate processes from start
        to finish, so your team focuses on valuable work.
      </>
    ),
    cards: [
      {
        title: "Strategy",
        description: "We determine which processes should be automated first for maximum ROI.",
        points: [
          "→ Process selection on impact",
          "→ Volume measurement and business case",
          "→ Risk assessment upfront",
          "→ Define SLA targets",
          "→ Phasing per team",
        ],
        cardTone: "green", iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg", iconAlt: "RPA strategy",
      },
      {
        title: "Optimization",
        description: "We streamline process steps so bots can run stably and with fewer errors.",
        points: [
          "→ Handle exceptions",
          "→ Standardize data fields",
          "→ Reduce process variants",
          "→ Automate checkpoints",
          "→ Build in monitoring and alerts",
        ],
        cardTone: "purple", iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg", iconAlt: "RPA optimization",
      },
      {
        title: "Automation",
        description: "Bots take over execution while AI accelerates decisions in complex cases.",
        points: [
          "→ End-to-end bot flows",
          "→ AI classification of input",
          "→ 24/7 processing",
          "→ Fewer errors and wait time",
          "→ Scalable to new processes",
        ],
        cardTone: "yellow", iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg", iconAlt: "RPA automation",
      },
    ],
  },
  "gpt-op-maat": {
    title: "The ingredients for Custom GPT",
    description: (
      <>
        A good assistant doesn&apos;t just give answers, but answers in your context. With <em>Custom GPT</em>
        we train AI on your data, processes and tone of voice.
      </>
    ),
    cards: [
      {
        title: "Strategy",
        description: "We define for which questions and tasks your GPT delivers the most impact.",
        points: [
          "→ Define use cases and target groups",
          "→ Select data sources",
          "→ Establish tone of voice",
          "→ Governance and access levels",
          "→ KPIs for quality and speed",
        ],
        cardTone: "green", iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg", iconAlt: "GPT strategy",
      },
      {
        title: "Optimization",
        description: "We improve answer quality with feedback, evaluations and clear frameworks.",
        points: [
          "→ Prompt and context optimization",
          "→ Reduce hallucinations",
          "→ Streamline knowledge updates",
          "→ Quality control on output",
          "→ Continuous fine-tuning",
        ],
        cardTone: "purple", iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg", iconAlt: "GPT optimization",
      },
      {
        title: "Automation",
        description: "Your GPT supports support, sales and internal teams automatically and scalably.",
        points: [
          "→ Answers to frequently asked questions",
          "→ Internal knowledge assistant",
          "→ AI-supported content",
          "→ Integration with existing systems",
          "→ Faster service with less workload",
        ],
        cardTone: "yellow", iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg", iconAlt: "GPT automation",
      },
    ],
  },
  "webbots": {
    title: "The ingredients for powerful webbots",
    description: (
      <>
        Manual clicking costs time and makes processes error-prone. With <em>webbots</em> we automate online tasks
        such as retrieving data, filling forms and performing checks.
      </>
    ),
    cards: [
      {
        title: "Strategy",
        description: "We determine which web tasks are most time-consuming and can be automated immediately.",
        points: [
          "→ Map web tasks",
          "→ Analyze frequency and impact",
          "→ Priorities per team",
          "→ Define input/output",
          "→ KPIs on speed and quality",
        ],
        cardTone: "green", iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg", iconAlt: "Webbot strategy",
      },
      {
        title: "Optimization",
        description: "We make bot flows robust against variation in websites, data and exceptions.",
        points: [
          "→ Error handling on changes",
          "→ Validation of retrieved data",
          "→ Smart retries and timeouts",
          "→ Logging and quality checks",
          "→ Manageable maintenance",
        ],
        cardTone: "purple", iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg", iconAlt: "Webbot optimization",
      },
      {
        title: "Automation",
        description: "Webbots execute tasks 24/7 without delay, with consistent output.",
        points: [
          "→ Data scraping and monitoring",
          "→ Form automation",
          "→ Process real-time updates",
          "→ Fewer manual clicks",
          "→ Faster operational execution",
        ],
        cardTone: "yellow", iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg", iconAlt: "Webbot automation",
      },
    ],
  },
  "systeemintegraties": {
    title: "The ingredients for seamless system integrations",
    description: (
      <>
        Separate tools cause double input and missed information. With <em>system integrations</em> we connect your
        software into one working ecosystem with real-time data flows.
      </>
    ),
    cards: [
      {
        title: "Strategy",
        description: "We design an integration architecture that fits your current stack and growth plans.",
        points: [
          "→ Analyze system landscape",
          "→ Model data flows",
          "→ Determine integration priorities",
          "→ Security and access structure",
          "→ Roadmap for rollout",
        ],
        cardTone: "green", iconTone: "green",
        iconSrc: "/DEF_Doublesmart_iconenstijl_Strategie_2.svg", iconAlt: "Integration strategy",
      },
      {
        title: "Optimization",
        description: "We improve existing connections so data flows reliably and with fewer errors.",
        points: [
          "→ Improve API performance",
          "→ Sharpen mapping and validation",
          "→ Automate error detection",
          "→ Increase data consistency",
          "→ Monitor critical flows",
        ],
        cardTone: "purple", iconTone: "purple",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEO_2.svg", iconAlt: "Integration optimization",
      },
      {
        title: "Automation",
        description: "Data synchronizes automatically between systems without manual intermediate steps.",
        points: [
          "→ Real-time synchronization",
          "→ Trigger-based updates",
          "→ Custom middleware",
          "→ Less double entry",
          "→ Reliable reports",
        ],
        cardTone: "yellow", iconTone: "yellow",
        iconSrc: "/DEF_Doublesmart_iconenstijl_SEA_2.svg", iconAlt: "Integration automation",
      },
    ],
  },
};

export default function DienstIngredients({ variant = "bedrijfsautomatisering" }: DienstIngredientsProps) {
  const { t, lang } = useLang();
  const contentNl = INGREDIENTS_CONTENT[variant];
  const contentEn = INGREDIENTS_CONTENT_EN[variant];
  const content = (lang === 'en' && contentEn) ? contentEn : contentNl;

  // Use translations for AI-agents, AI-CRM, and Bedrijfsautomatisering variants
  const isAiAgents = variant === "ai-agents";
  const isAiCrm = variant === "ai-crm";
  const isBedrijfsautomatisering = variant === "bedrijfsautomatisering";
  const useTranslations = isAiAgents || isAiCrm || isBedrijfsautomatisering;
  
  const title = useTranslations ? (
    isAiAgents ? t(`ingredients.ai-agents.title`) : 
    isAiCrm ? t(`ingredients.ai-crm.title`) : 
    t(`ingredients.bedrijfsautomatisering.title`)
  ) : content.title;
  
  const description = useTranslations ? (
    isAiAgents ? (
      <>
        {t(`ingredients.ai-agents.desc`).split('<em>').map((part, i) => 
          i === 1 ? <em key={i}>{lang === 'en' ? 'custom AI agents' : 'AI-agents op maat'}</em> : part
        )}
      </>
    ) : 
    isAiCrm ? t(`ingredients.ai-crm.desc`) : 
    t(`ingredients.bedrijfsautomatisering.desc`)
  ) : content.description;
  
  const ctaText = t('ingredients.cta');

  const getCardContent = (cardIndex: number) => {
    if (!useTranslations) return content.cards[cardIndex];
    
    const prefix = isAiAgents ? 'ai-agents' : 
    isAiCrm ? 'ai-crm' : 
    'bedrijfsautomatisering';
    
    return {
      ...content.cards[cardIndex],
      title: t(`ingredients.${prefix}.card${cardIndex + 1}.title`),
      description: t(`ingredients.${prefix}.card${cardIndex + 1}.desc`),
      points: [
        t(`ingredients.${prefix}.card${cardIndex + 1}.points.1`),
        t(`ingredients.${prefix}.card${cardIndex + 1}.points.2`),
        t(`ingredients.${prefix}.card${cardIndex + 1}.points.3`),
        t(`ingredients.${prefix}.card${cardIndex + 1}.points.4`),
        t(`ingredients.${prefix}.card${cardIndex + 1}.points.5`),
      ],
    };
  };

  return (
    <section className="ingredients-section">
      <div className="ingredients-layout">
        <div className="ingredients-text">
          <h2 className="ingredients-title">{title}</h2>
          <p className="ingredients-desc">{description}</p>
          <a href="#" className="ingredients-cta open-contact-modal">{ctaText}</a>
        </div>
        <div className="ingredients-cards">
          {content.cards.map((card, index) => {
            const cardContent = getCardContent(index);
            return (
              <div key={`card-${index}`} className={`ingredients-card ingredients-card-${card.cardTone}`}>
                <div className={`ingredients-card-icon ingredients-icon-${card.iconTone}`}>
                  <Image src={card.iconSrc} alt={card.iconAlt} width={50} height={50} className="ingredients-card-icon-img" />
                </div>
                <h3>{cardContent.title}</h3>
                <p>{cardContent.description}</p>
                <ul className="ingredients-card-points">
                  {cardContent.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
