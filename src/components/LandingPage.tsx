import Image from "next/image";
import type { Copy, Locale } from "@/content/types";

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
        <JourneyBuilder />
        <PopularExperiences />
        <InterestExplorer />
        <HowItWorks />
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
        <a href={homeHref} className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f26d4f] text-sm text-white">DI</span>
          <span>DE IPOH</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          <a href="#discover" className="hover:text-[#d95336]">Discover</a>
          <a href="#plan" className="hover:text-[#d95336]">Plan Your Trip</a>
          <a href="#experiences" className="hover:text-[#d95336]">Experiences</a>
          <a href="#rewards" className="hover:text-[#d95336]">Rewards</a>
          <a href="#stories" className="hover:text-[#d95336]">Stories</a>
        </nav>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <a href="#experiences" className="hidden hover:text-[#d95336] sm:inline">Search</a>
          <a href={langHref} className="hidden hover:text-[#d95336] md:inline">{langLabel}</a>
          <a href="#plan" className="rounded-full bg-[#171311] px-5 py-2 text-white transition hover:bg-[#d95336]">Plan My Trip</a>
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
          <span className="block text-[#f26d4f]">Your Way.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#4e4039]">
          Hidden places, unforgettable food and local experiences curated around your interests, budget and travel style.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#plan" className="rounded-full bg-[#f26d4f] px-7 py-3 text-base font-bold text-white shadow-[0_14px_35px_rgba(242,109,79,0.28)] transition hover:bg-[#171311]">
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
        <div className="absolute left-1/2 top-1/2 hidden text-4xl text-[#f26d4f] md:block">x</div>
      </div>
    </section>
  );
}

function JourneyBuilder() {
  return (
    <section id="plan" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/70 p-5 shadow-[0_24px_80px_rgba(70,48,34,0.09)] ring-1 ring-[#171311]/10 md:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d95336]">Personalized Journey Builder</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">Your Journey Starts With You</h2>
          <p className="mt-4 text-lg leading-8 text-[#5c5049]">No generic itineraries. Tell us what you enjoy and we will create an Ipoh experience designed around you.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <PlannerSelect label="Duration" value="2 Days" options={["Half Day", "1 Day", "2 Days", "3 Days", "4+ Days"]} />
          <PlannerSelect label="Travellers" value="Friends" options={["Solo", "Couple", "Friends", "Family"]} />
          <PlannerSelect label="Budget" value="RM200 - RM500" options={["Under RM200", "RM200 - RM500", "RM500 - RM1,000", "RM1,000+"]} />
        </div>
        <div className="mt-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em]">What are you interested in?</p>
          <div className="flex flex-wrap gap-3">
            {["Food", "Nature", "Culture & History", "Shopping", "Cafes", "Arts & Creative", "Activities", "Relaxation"].map((interest) => (
              <button key={interest} className="rounded-full border border-[#171311]/15 bg-[#f7f0e8] px-5 py-3 text-sm font-bold transition hover:border-[#f26d4f] hover:bg-[#fff6ef] hover:text-[#d95336]">
                {interest}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-9 flex justify-center">
          <a href="#experiences" className="rounded-full bg-[#171311] px-8 py-4 text-base font-bold text-white transition hover:bg-[#f26d4f]">Plan My Trip</a>
        </div>
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
          <a href="#plan" className="mt-6 inline-flex rounded-full bg-[#f26d4f] px-6 py-3 font-bold text-white">View Rewards</a>
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
          <a href="#plan" className="mt-8 w-fit rounded-full bg-[#f26d4f] px-8 py-4 font-bold text-white">Plan My Trip</a>
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
          <p className="font-display text-xl font-semibold">DE IPOH</p>
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
        <p>Copyright 2026 De Ipoh. All rights reserved.</p>
        <p>Discover. Personalize. Explore. Earn.</p>
      </div>
    </footer>
  );
}

function PlannerSelect({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <label className="block rounded-[1.25rem] bg-[#f7f0e8] p-5 ring-1 ring-[#171311]/10">
      <span className="text-xs font-black uppercase tracking-[0.2em] text-[#5c5049]">{label}</span>
      <select defaultValue={value} className="mt-3 w-full bg-transparent text-2xl font-bold outline-none">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
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
      <a href="#plan" className="w-fit rounded-full border border-[#171311]/25 px-6 py-3 text-sm font-bold transition hover:border-[#f26d4f] hover:text-[#d95336]">{action}</a>
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
