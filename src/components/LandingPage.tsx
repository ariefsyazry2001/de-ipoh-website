import Image from "next/image";
import type { Copy, Locale } from "@/content/types";

const appHref = "/app";

const experiences = [
  ["Concubine Lane", "Heritage", "Food", "Old Town lanes, murals and snack stops.", "/images/Concubine%20Lane.jpg"],
  ["Kek Lok Tong", "Nature", "Relaxation", "Limestone gardens and cool cave air.", "/images/Kek%20Lok%20Tong.jpg"],
  ["Lost World of Tambun", "Adventure", "Family", "Hot springs, rides and mountain views.", "/images/Lost%20World.jpg"],
  ["Kong Heng Square", "Food", "Culture", "Coffee, indie shops and Ipoh creative energy.", "/images/Kong%20Heng%20Square.jpg"],
];

const interests = [
  ["Food", "Taste Ipoh", "Noodles, white coffee and local breakfast trails.", "bg-[#f26d4f]"],
  ["Nature", "Slow Down", "Caves, lakes, hills and easy green escapes.", "bg-[#4c8f62]"],
  ["Culture", "Discover The Stories", "Tin heritage, temples, murals and old streets.", "bg-[#d98a39]"],
  ["Shopping", "Bring Something Home", "Markets, local crafts and boutique finds.", "bg-[#9066c4]"],
  ["Activities", "Do Something Different", "Family parks, photo walks and small adventures.", "bg-[#e3b23c]"],
  ["Relax", "Take It Easy", "Quiet cafes, wellness stops and gentle routes.", "bg-[#6aa7bd]"],
];

const steps = [
  ["01", "Tell Us About Your Trip", "Choose your duration, travellers and budget."],
  ["02", "Pick What You Love", "Select food, nature, culture, shopping or anything else you enjoy."],
  ["03", "Get Your Journey", "Receive a personalized Ipoh itinerary curated around your interests."],
  ["04", "Explore And Earn", "Visit partner locations, scan QR codes and collect points."],
];

const appScreens = [
  {
    title: "Home",
    image: "/images/website-1.png",
    label: "Quest+ active",
    headline: "Your Ipoh day at a glance",
    body: "See today's itinerary, nearby picks, active pass status and points progress from one mobile-first dashboard.",
  },
  {
    title: "Explore",
    image: "/images/website-2.png",
    label: "99% match",
    headline: "Personalized places",
    body: "Browse food, heritage, nature and culture recommendations ranked around traveller interests, time and budget.",
  },
  {
    title: "Rewards",
    image: "/images/website-3.png",
    label: "650 pts",
    headline: "Earn and redeem",
    body: "Scan partner QR codes during the trip, collect points and redeem coffee, vouchers or local merchandise.",
  },
];

const appFeatures = [
  ["Personalized Itinerary", "Tell D'Ipoh your interests, trip duration, budget and travel style. The app turns that into a route."],
  ["QR Checkpoints", "Travellers scan verified partner checkpoints to confirm visits and earn points."],
  ["Passes And Rewards", "Explorer, Quest+ and VIP passes unlock different benefits, multipliers, credits and partner perks."],
];

const stories = [
  ["Food & Drink", "10 Ipoh Breakfast Spots Worth Waking Up Early For", "Aug 14, 2026", "6 min read", "/images/hero-kopitiam.jpg"],
  ["Heritage", "The Stories Behind Ipoh Old Town", "Aug 12, 2026", "4 min read", "/images/hero-old-town.jpg"],
  ["Nature", "5 Limestone Caves You Should Explore", "Aug 10, 2026", "5 min read", "/images/hero-cave-temple.jpg"],
  ["Budget", "A Complete RM200 Ipoh Day Trip", "Aug 08, 2026", "7 min read", "/images/hero-limestone-lake.jpg"],
];

const footerGroups = [
  ["Discover", "Places", "Food", "Nature", "Culture", "Activities"],
  ["Plan", "Plan My Trip", "Saved Journeys", "Rewards"],
  ["Community", "Stories", "Traveller Highlights", "Instagram", "TikTok"],
  ["Partners", "Become A Partner", "Merchant Login"],
  ["Company", "About Us", "Contact", "Privacy Policy", "Terms"],
];

const passes = [
  {
    name: "Explorer",
    price: "RM99",
    childPrice: "RM49",
    label: "PLAN MY DAY",
    line: "Explore at your own pace.",
    body: "The DIY-but-better option for travellers who want D'Ipoh to shape the route while they handle transport and tickets.",
    items: ["Curated day itinerary", "Digital map / guide", "RM20 adult F&B credit", "RM10 child F&B credit", "QR check-ins", "1x points"],
  },
  {
    name: "Quest+",
    price: "RM199",
    childPrice: "RM99",
    label: "MOST POPULAR - TAKE ME AROUND",
    line: "Everything you need for the perfect day in Ipoh.",
    body: "For another RM100, travellers get shared transport, a local guide, an included experience and more food credit.",
    items: ["Shared transport", "Shared local guide", "1 included experience", "RM50 adult F&B credit", "RM15 child F&B credit", "1.5x points", "1 itinerary swap"],
    popular: true,
  },
  {
    name: "VIP Explorer",
    price: "RM399",
    childPrice: "RM199",
    label: "LOOK AFTER ME",
    line: "The best of Ipoh, without the hassle.",
    body: "A premium small-group experience with a dedicated guide, flexible itinerary and stronger partner privileges.",
    items: ["Premium transport", "Dedicated guide", "2 selected experiences", "RM80 adult F&B credit", "RM20 child F&B credit", "2x points", "Priority reservations"],
  },
];

const comparison = [
  ["Adult", "RM99/pax", "RM199/pax", "RM399/pax"],
  ["Child (4-12)", "RM49/pax", "RM99/pax", "RM199/pax"],
  ["Transport", "Self-arranged", "Shared", "Premium small-group"],
  ["Guide", "Digital", "Shared local", "Dedicated"],
  ["F&B Credit - Adult", "RM20", "RM50", "RM80"],
  ["F&B Credit - Child", "RM10", "RM15", "RM20"],
  ["Experiences", "Pay-as-you-go", "1 included", "2 included"],
  ["Points Multiplier", "1x", "1.5x", "2x"],
  ["Itinerary Flexibility", "Fixed", "1 swap", "Flexible"],
  ["Rewards", "Standard", "Enhanced", "Premium"],
];

export function LandingPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const homeHref = locale === "ms" ? "/" : "/en";
  const langHref = copy.footer.langSwitchHref;
  const langLabel = copy.footer.langSwitchLabel;
  const privacyHref = locale === "ms" ? "/privacy" : "/en/privacy";

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f0e8] text-[#171311]">
      <Header homeHref={homeHref} langHref={langHref} langLabel={langLabel} />
      <main>
        <Hero />
        <PopularExperiences />
        <InterestExplorer />
        <HowItWorks />
        <AppShowcase />
        <PassSection />
        <RewardsSection />
        <StoriesSection />
        <CommunitySection />
        <FinalCta />
      </main>
      <SiteFooter privacyHref={privacyHref} />
    </div>
  );
}

function Header({ homeHref, langHref, langLabel }: { homeHref: string; langHref: string; langLabel: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#171311]/10 bg-[#f7f0e8]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href={homeHref} className="flex items-center gap-3 font-display text-lg font-semibold tracking-wide">
          <span className="flex h-12 w-24 items-center justify-center overflow-hidden rounded-xl bg-[#171717] ring-1 ring-white/40">
            <Image src="/images/depoh logo.webp" alt="Dipoh" width={96} height={96} className="h-20 w-20 object-contain" priority />
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          <a href="#discover" className="hover:text-[#d95336]">Discover</a>
          <a href="#how-it-works" className="hover:text-[#d95336]">Plan Your Trip</a>
          <a href="#experiences" className="hover:text-[#d95336]">Experiences</a>
          <a href="#passes" className="hover:text-[#d95336]">Passes</a>
          <a href="#rewards" className="hover:text-[#d95336]">Rewards</a>
          <a href="#stories" className="hover:text-[#d95336]">Stories</a>
          <a href="#download" className="hover:text-[#d95336]">App</a>
        </nav>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <a href="#experiences" className="hidden hover:text-[#d95336] sm:inline">Search</a>
          <a href={langHref} className="hidden hover:text-[#d95336] md:inline">{langLabel}</a>
          <a href="#download" className="rounded-full bg-[#171311] px-5 py-2 text-white transition hover:bg-[#ff3038]">Plan My Trip</a>
          <a href="#menu" className="lg:hidden" aria-label="Open menu">Menu</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="discover" className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 pb-14 pt-10 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:pb-20 md:pt-16">
      <MapWash />
      <div className="relative z-10 pt-2 md:pt-10">
        <p className="mb-5 w-fit rounded-full border border-[#171311]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d95336]">
          Ipoh, Perak
        </p>
        <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
          Discover Ipoh,
          <span className="block text-[#ff3038]">Your Way.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#4e4039]">
          Hidden places, unforgettable food and local experiences curated around your interests, budget and travel style.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#download" className="rounded-full bg-[#ff3038] px-7 py-3 text-base font-bold text-white shadow-[0_14px_35px_rgba(255,48,56,0.25)] transition hover:bg-[#171311]">
            Plan My Trip
          </a>
          <a href="#experiences" className="rounded-full border border-[#171311]/30 px-7 py-3 text-base font-bold transition hover:border-[#f26d4f] hover:text-[#d95336]">
            Explore Ipoh
          </a>
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-4 pt-4 sm:gap-5 md:pt-0">
        <PhotoCard
          src="/images/hero-old-town.jpg"
          className="aspect-[4/5] translate-y-8 rotate-[-1deg]"
          label="Old Town"
        />
        <PhotoCard
          src="/images/hero-cave-temple.jpg"
          className="aspect-[4/5] rotate-[1deg]"
          label="Caves"
        />
        <PhotoCard
          src="/images/hero-kopitiam.jpg"
          className="aspect-[4/5] translate-y-4 rotate-[1deg]"
          label="Coffee Trail"
        />
        <PhotoCard
          src="/images/hero-limestone-lake.jpg"
          className="aspect-[4/5] -translate-y-4 rotate-[-1deg]"
          label="Nature"
        />
        <div className="absolute -bottom-8 left-8 hidden h-24 w-24 rounded-full border border-dashed border-[#d95336]/60 md:block" />
        <div className="absolute left-1/2 top-1/2 hidden text-4xl text-[#ff3038] md:block">x</div>
      </div>
    </section>
  );
}

function PopularExperiences() {
  return (
    <section id="experiences" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Discover" title="Popular Experiences" action="Explore all experiences" />
        <div className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
          {experiences.map(([title, tagA, tagB, body, src]) => (
            <article key={title} className="min-w-[72%] snap-start md:min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-[#e8dbcf]">
                <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 72vw" className="object-cover" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="text-sm font-semibold text-[#d95336]">{tagA} - {tagB}</p>
              <p className="mt-2 text-sm leading-6 text-[#5c5049]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InterestExplorer() {
  return (
    <section className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d95336]">Explore By Interest</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">What Are You In The Mood For?</h2>
          <p className="mt-4 text-lg leading-8 text-[#5c5049]">Whether you are chasing good food, quiet nature, local stories or something completely different, there is an Ipoh experience waiting for you.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map(([label, title, body, color]) => (
            <article key={label} className="rounded-[1.5rem] bg-white/70 p-6 ring-1 ring-[#171311]/10">
              <span className={`mb-8 block h-3 w-16 rounded-full ${color}`} />
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5c5049]">{label}</p>
              <h3 className="mt-2 text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-[#5c5049]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
          From &quot;Where Should We Go?&quot; <span className="block text-[#f26d4f]">To Your Perfect Ipoh Day.</span>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map(([number, title, body]) => (
            <article key={number} className="border-t border-[#171311]/20 pt-6">
              <p className="font-display text-5xl font-semibold text-[#f26d4f]">{number}</p>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-[#5c5049]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppShowcase() {
  return (
    <section id="download" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#171311] p-6 text-white md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb39f]">Mobile App</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">Plan, Explore, Scan And Redeem In One App.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
              D&apos;Ipoh is the traveller companion for personalized Ipoh discovery. It helps visitors choose a pass, follow a curated route, discover recommended stops, scan QR checkpoints and redeem rewards from local partners.
            </p>
            <div className="mt-8 grid gap-4">
              {appFeatures.map(([title, body]) => (
                <article key={title} className="border-t border-white/15 pt-4">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-2 leading-7 text-white/68">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={appHref} className="rounded-full bg-[#ff3038] px-6 py-3 text-sm font-black text-white shadow-[0_18px_38px_rgba(255,48,56,0.28)] transition hover:bg-white hover:text-[#171311]">
                Try Web App
              </a>
              <a href="#download" aria-label="Google Play coming soon" className="rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white/90 transition hover:border-white hover:bg-white hover:text-[#171311]">
                Google Play Coming Soon
              </a>
              <a href="#download" aria-label="App Store coming soon" className="rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white/90 transition hover:border-white hover:bg-white hover:text-[#171311]">
                App Store Coming Soon
              </a>
            </div>
          </div>
          <div className="no-scrollbar flex gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {appScreens.map((screen, index) => (
              <AppScreenshot key={screen.title} screen={screen} raised={index === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AppScreenshot({ screen, raised }: { screen: { title: string; image: string; label: string; headline: string; body: string }; raised?: boolean }) {
  return (
    <article className={`relative min-w-[62%] overflow-hidden rounded-[2rem] border-[10px] border-[#fffdfb] bg-[#fffdfb] shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:min-w-[14rem] lg:min-w-0 ${raised ? "lg:-translate-y-8" : ""}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.35rem] bg-[#f4f0ed]">
        <Image src={screen.image} alt={`${screen.title} app screenshot`} fill sizes="(min-width: 1024px) 18vw, 62vw" className="object-cover object-top" />
      </div>
    </article>
  );
}

function PassSection() {
  return (
    <section id="passes" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Day Passes" title="Choose Your Way To Explore Ipoh" action="Choose your pass" />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {passes.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[1.65rem] p-6 ring-1 ${
                plan.popular
                  ? "bg-[linear-gradient(135deg,#ff5f7e,#ff8f70)] text-white ring-[#ff5f7e] shadow-[0_24px_70px_rgba(242,109,79,0.24)]"
                  : "bg-white/70 ring-[#171311]/10"
              }`}
            >
              <p className={`text-xs font-black uppercase tracking-[0.2em] ${plan.popular ? "text-white/75" : "text-[#d95336]"}`}>
                {plan.label}
              </p>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-4xl font-semibold">{plan.name}</h3>
                  <p className={`mt-1 text-sm font-bold ${plan.popular ? "text-white/80" : "text-[#5c5049]"}`}>{plan.line}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">{plan.price}</p>
                  <p className={`mt-1 text-xs font-black ${plan.popular ? "text-white/75" : "text-[#5c5049]"}`}>Child {plan.childPrice}</p>
                </div>
              </div>
              <p className={`mt-5 leading-7 ${plan.popular ? "text-white/85" : "text-[#5c5049]"}`}>{plan.body}</p>
              <ul className="mt-6 space-y-3 text-sm font-bold">
                {plan.items.map((item) => (
                  <li key={item} className={`rounded-full px-4 py-2 ${plan.popular ? "bg-white/14" : "bg-[#f7f0e8]"}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-white/70 ring-1 ring-[#171311]/10">
          <div className="grid grid-cols-4 bg-[#171311] px-4 py-4 text-xs font-black uppercase tracking-[0.14em] text-white">
            <span>Feature</span>
            <span>Explorer</span>
            <span>Quest+</span>
            <span>VIP</span>
          </div>
          {comparison.map(([feature, explorer, quest, vip]) => (
            <div key={feature} className="grid grid-cols-4 gap-2 border-t border-[#171311]/10 px-4 py-4 text-sm">
              <b>{feature}</b>
              <span>{explorer}</span>
              <span className="font-bold text-[#d95336]">{quest}</span>
              <span>{vip}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href={appHref} className="rounded-full bg-[#171311] px-8 py-4 text-base font-bold text-white transition hover:bg-[#f26d4f]">
            Choose Your Pass
          </a>
        </div>
      </div>
    </section>
  );
}

function RewardsSection() {
  return (
    <section id="rewards" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#171311] p-6 text-white md:grid-cols-[1fr_0.85fr] md:p-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb39f]">Rewards</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">Explore Ipoh. Earn While You Are At It.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Visit participating cafes, restaurants, attractions and local businesses. Scan their QR codes, complete experiences and collect points along the way.</p>
          <div className="mt-8 grid grid-cols-4 gap-2 text-center text-sm font-black uppercase tracking-[0.12em] text-[#ffb39f]">
            {["Visit", "Scan", "Earn", "Redeem"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="rounded-[1.6rem] bg-[#f7f0e8] p-6 text-[#171311]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d95336]">Your Ipoh Points</p>
          <p className="mt-4 font-display text-6xl font-semibold">1,250</p>
          <p className="text-sm font-bold text-[#5c5049]">points collected today</p>
          <div className="mt-6 space-y-3">
            {[
              ["Concubine Lane", "+50"],
              ["Platform Coffee", "+80"],
              ["Kek Lok Tong", "+100"],
            ].map(([place, pts]) => (
              <div key={place} className="flex items-center justify-between rounded-full bg-white px-4 py-3 text-sm font-bold">
                <span>{place}</span>
                <span className="text-[#4c8f62]">{pts}</span>
              </div>
            ))}
          </div>
          <a href="#rewards" className="mt-6 inline-flex rounded-full bg-[#f26d4f] px-6 py-3 font-bold text-white">View Rewards</a>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-7xl rounded-[1.5rem] bg-white/70 p-6 ring-1 ring-[#171311]/10 md:flex md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold">Are You An Ipoh Business?</h3>
          <p className="mt-2 text-[#5c5049]">Join the experience network and help travellers discover what makes Ipoh special.</p>
        </div>
        <a href="#partners" className="mt-5 inline-flex rounded-full border border-[#171311]/25 px-6 py-3 font-bold md:mt-0">Become A Partner</a>
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section id="stories" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Read" title="Stories From Ipoh" action="Read more articles" />
        <div className="mt-8 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <article>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem]">
              <Image src={stories[0][4]} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#d95336]">{stories[0][0]}</p>
            <h3 className="mt-2 text-2xl font-bold">{stories[0][1]}</h3>
            <p className="mt-2 text-sm text-[#5c5049]">{stories[0][2]} - {stories[0][3]}</p>
          </article>
          <div className="space-y-5">
            {stories.slice(1).map(([category, title, date, read, src]) => (
              <article key={title} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="relative aspect-square overflow-hidden rounded-[1rem]">
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d95336]">{category}</p>
                  <h3 className="mt-1 font-bold leading-snug">{title}</h3>
                  <p className="mt-2 text-sm text-[#5c5049]">{date} - {read}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d95336]">Traveller Highlights</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">Journeys From The Community</h2>
          <div className="mt-8 max-w-xl">
            <p className="font-bold">Aina, Kuala Lumpur</p>
            <p className="mt-2 text-[#e3b23c]">*****</p>
            <blockquote className="mt-4 text-xl leading-9 text-[#4e4039]">
              Honestly did not know Ipoh had this much to explore. We selected food and nature, and the itinerary took us to places we would have missed otherwise.
            </blockquote>
            <a href="#stories" className="mt-7 inline-flex rounded-full border border-[#171311]/25 px-6 py-3 font-bold">See More Journeys</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <PhotoCard src="/images/hero-kopitiam.jpg" className="aspect-[4/5]" label="2 days" />
          <PhotoCard src="/images/hero-cave-temple.jpg" className="mt-12 aspect-[4/5]" label="650 pts" />
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 py-14 md:px-8 md:py-20">
      <div className="relative mx-auto min-h-[420px] max-w-7xl overflow-hidden rounded-[2rem] bg-[#171311] p-8 text-white md:p-14">
        <Image src="/images/hero-limestone-lake.jpg" alt="" fill sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171311]/78 via-[#171311]/35 to-transparent" />
        <div className="relative z-10 flex min-h-[320px] max-w-2xl flex-col justify-center">
          <h2 className="font-display text-5xl font-semibold leading-tight sm:text-7xl">Your Ipoh Story Starts Here.</h2>
          <p className="mt-5 text-lg leading-8 text-white/80">Tell us what you love and we will take care of the rest.</p>
          <a href="#download" className="mt-8 w-fit rounded-full bg-[#f26d4f] px-8 py-4 font-bold text-white">Plan My Trip</a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ privacyHref }: { privacyHref: string }) {
  return (
    <footer id="menu" className="bg-[#fffaf4] px-5 pt-14 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_repeat(5,1fr)]">
        <div>
          <span className="flex h-16 w-28 items-center justify-center overflow-hidden rounded-xl bg-[#171717] ring-1 ring-[#171311]/10">
            <Image src="/images/depoh logo.webp" alt="Dipoh" width={112} height={112} className="h-24 w-24 object-contain" />
          </span>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#5c5049]">Your journey, curated around you. Discover the Ipoh you would not find on your own.</p>
        </div>
        {footerGroups.map(([heading, ...links]) => (
          <div key={heading}>
            <h3 className="text-sm font-black uppercase tracking-[0.16em]">{heading}</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#5c5049]">
              {links.map((link) => (
                <li key={link}><a href={link === "Privacy Policy" ? privacyHref : "#discover"} className="hover:text-[#d95336]">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-[#171311]/10 py-6 text-xs text-[#5c5049] md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 Dipoh. All rights reserved.</p>
        <p>Discover. Personalize. Explore. Earn.</p>
      </div>
    </footer>
  );
}

function PhotoCard({ src, className, label }: { src: string; className: string; label: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.65rem] bg-[#e8dbcf] shadow-[0_22px_60px_rgba(70,48,34,0.16)] ${className}`}>
      <Image src={src} alt="" fill sizes="(min-width: 768px) 40vw, 80vw" className="object-cover" priority />
      <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#171311] backdrop-blur">{label}</span>
    </div>
  );
}

function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action: string }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d95336]">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-6xl">{title}</h2>
      </div>
      <a href="#download" className="w-fit rounded-full border border-[#171311]/25 px-6 py-3 text-sm font-bold transition hover:border-[#f26d4f] hover:text-[#d95336]">{action}</a>
    </div>
  );
}

function MapWash() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[620px] max-w-5xl opacity-45">
      <div className="absolute left-[16%] top-[12%] h-56 w-72 rounded-[45%] border border-[#d7c8ba]" />
      <div className="absolute right-[14%] top-[8%] h-64 w-80 rounded-[48%] border border-[#d7c8ba]" />
      <div className="absolute left-[38%] top-[30%] h-36 w-60 rounded-[50%] border border-[#d7c8ba]" />
      <div className="absolute left-[28%] top-[54%] h-px w-72 rotate-12 border-t border-dashed border-[#d95336]/50" />
    </div>
  );
}
