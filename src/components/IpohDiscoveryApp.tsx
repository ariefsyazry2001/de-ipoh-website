"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type View = "home" | "explore" | "scan" | "rewards" | "wallet" | "profile" | "place" | "reward";
type Budget = "budget" | "moderate" | "premium";
type TxType = "EARN" | "REDEEM" | "ADJUSTMENT";

type Location = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string;
  tags: string[];
  travellerTypes: string[];
  budgetLevel: Budget;
  estimatedDuration: string;
  address: string;
  openingHours: string;
  rating: number;
  rewardEnabled: boolean;
  pointsReward: number;
  featured?: boolean;
};

type Reward = {
  id: string;
  name: string;
  category: string;
  description: string;
  pointsRequired: number;
  stock: number;
  image: string;
};

type UserState = {
  loggedIn: boolean;
  onboarded: boolean;
  travellerType: string;
  interests: string[];
  budget: Budget;
  scannedTokens: string[];
  pointTransactions: { id: string; type: TxType; amount: number; label: string; date: string }[];
  redemptions: { id: string; rewardId: string; code: string; date: string }[];
  rewardStock: Record<string, number>;
};

const interests = ["Food", "Coffee", "Nature", "Culture", "History", "Shopping", "Activities", "Photography", "Relaxation"];
const travellers = ["Solo", "Couple", "Friends", "Family", "Local Explorer"];
const budgets: Budget[] = ["budget", "moderate", "premium"];

const places: Location[] = [
  {
    id: "klt",
    name: "Kek Lok Tong",
    slug: "kek-lok-tong",
    shortDescription: "A limestone cave temple with gardens and dramatic karst views.",
    fullDescription: "Wander through cooling limestone chambers before stepping into a quiet garden framed by Ipoh's cliffs. It is one of the easiest wins for nature, culture, and photography lovers.",
    image: "linear-gradient(135deg,#7cc7b7,#f6d483 55%,#f07f72)",
    category: "Nature",
    tags: ["Nature", "Culture", "Photography", "Relaxation"],
    travellerTypes: ["Family", "Couple", "Friends", "Solo"],
    budgetLevel: "budget",
    estimatedDuration: "75-90 mins",
    address: "Pesiaran Sepakat 3, Gunung Rapat",
    openingHours: "7:00 AM - 5:00 PM",
    rating: 4.8,
    rewardEnabled: true,
    pointsReward: 100,
    featured: true,
  },
  {
    id: "concubine",
    name: "Concubine Lane",
    slug: "concubine-lane",
    shortDescription: "A heritage lane packed with snacks, murals, and old-town charm.",
    fullDescription: "A compact walk through Ipoh's heritage shoplots, local snacks, murals, and souvenir stops. Best visited early before the lane gets busy.",
    image: "linear-gradient(135deg,#f7b267,#f79d65 48%,#4a2d24)",
    category: "Culture",
    tags: ["Food", "Culture", "History", "Shopping", "Photography"],
    travellerTypes: ["Friends", "Family", "Couple", "Local Explorer"],
    budgetLevel: "moderate",
    estimatedDuration: "45-60 mins",
    address: "Lorong Panglima, Ipoh Old Town",
    openingHours: "10:00 AM - 6:00 PM",
    rating: 4.5,
    rewardEnabled: true,
    pointsReward: 80,
    featured: true,
  },
  {
    id: "platform",
    name: "Platform Coffee",
    slug: "platform-coffee",
    shortDescription: "A photogenic coffee stop for slow afternoons in the city.",
    fullDescription: "A cafe-style pause with polished interiors, espresso, desserts, and easy access to nearby old-town walks.",
    image: "linear-gradient(135deg,#b08968,#ede0d4 48%,#3f2f2a)",
    category: "Coffee",
    tags: ["Coffee", "Food", "Photography", "Relaxation"],
    travellerTypes: ["Solo", "Couple", "Friends", "Local Explorer"],
    budgetLevel: "moderate",
    estimatedDuration: "45 mins",
    address: "Ipoh city centre",
    openingHours: "9:00 AM - 10:00 PM",
    rating: 4.6,
    rewardEnabled: true,
    pointsReward: 80,
  },
  {
    id: "tasik",
    name: "Tasik Cermin",
    slug: "tasik-cermin",
    shortDescription: "Mirror lake scenery surrounded by limestone walls.",
    fullDescription: "A scenic nature attraction built around calm water, boat rides, and cliff views that photograph beautifully in soft morning light.",
    image: "linear-gradient(135deg,#75b8c8,#d9ed92 52%,#44633f)",
    category: "Nature",
    tags: ["Nature", "Photography", "Activities", "Relaxation"],
    travellerTypes: ["Friends", "Couple", "Family"],
    budgetLevel: "moderate",
    estimatedDuration: "60-90 mins",
    address: "Gunung Rapat, Ipoh",
    openingHours: "9:00 AM - 6:00 PM",
    rating: 4.7,
    rewardEnabled: false,
    pointsReward: 0,
  },
  {
    id: "kongheng",
    name: "Kong Heng Square",
    slug: "kong-heng-square",
    shortDescription: "Boutique shops, art corners, and indie food in old town.",
    fullDescription: "A layered heritage block with cafes, local products, art, and corners that feel made for wandering with friends.",
    image: "linear-gradient(135deg,#2f4858,#f6ae2d 46%,#f26419)",
    category: "Culture",
    tags: ["Food", "Coffee", "Culture", "Shopping", "Photography"],
    travellerTypes: ["Friends", "Couple", "Local Explorer"],
    budgetLevel: "moderate",
    estimatedDuration: "60 mins",
    address: "Jalan Panglima, Ipoh",
    openingHours: "10:00 AM - 7:00 PM",
    rating: 4.6,
    rewardEnabled: true,
    pointsReward: 90,
  },
  {
    id: "lost-world",
    name: "Lost World of Tambun",
    slug: "lost-world-of-tambun",
    shortDescription: "Theme park, hot springs, and family activities by the cliffs.",
    fullDescription: "A full-day attraction that mixes water rides, animal encounters, night park experiences, and hot springs.",
    image: "linear-gradient(135deg,#118ab2,#06d6a0 48%,#ffd166)",
    category: "Activities",
    tags: ["Activities", "Family", "Nature", "Relaxation"],
    travellerTypes: ["Family", "Friends"],
    budgetLevel: "premium",
    estimatedDuration: "Half day",
    address: "Sunway City Ipoh",
    openingHours: "11:00 AM - 11:00 PM",
    rating: 4.7,
    rewardEnabled: false,
    pointsReward: 0,
  },
  {
    id: "railway",
    name: "Ipoh Railway Station",
    slug: "ipoh-railway-station",
    shortDescription: "Iconic colonial architecture and an easy heritage photo stop.",
    fullDescription: "Known as the Taj Mahal of Ipoh, this station is a quick but memorable stop for architecture and history fans.",
    image: "linear-gradient(135deg,#e9ecef,#adb5bd 52%,#343a40)",
    category: "History",
    tags: ["History", "Culture", "Photography"],
    travellerTypes: ["Solo", "Couple", "Family", "Friends"],
    budgetLevel: "budget",
    estimatedDuration: "25 mins",
    address: "Jalan Panglima Bukit Gantang Wahab",
    openingHours: "Open daily",
    rating: 4.4,
    rewardEnabled: false,
    pointsReward: 0,
  },
  {
    id: "oldtown",
    name: "Ipoh Old Town",
    slug: "ipoh-old-town",
    shortDescription: "Murals, white coffee, and heritage streets in one walkable loop.",
    fullDescription: "A flexible old-town route for first-timers who want food, coffee, murals, and shopfront textures without overplanning.",
    image: "linear-gradient(135deg,#ef476f,#ffd166 50%,#073b4c)",
    category: "Culture",
    tags: ["Food", "Coffee", "Culture", "History", "Photography"],
    travellerTypes: ["Solo", "Couple", "Friends", "Family"],
    budgetLevel: "budget",
    estimatedDuration: "90 mins",
    address: "Ipoh Old Town",
    openingHours: "Best 8:00 AM - 5:00 PM",
    rating: 4.7,
    rewardEnabled: true,
    pointsReward: 70,
  },
  {
    id: "perak-cave",
    name: "Perak Cave Temple",
    slug: "perak-cave-temple",
    shortDescription: "Temple murals, cave halls, and a climb to a city viewpoint.",
    fullDescription: "A classic Ipoh cave temple with painted interiors and a stair route for visitors who want a little climb with their culture.",
    image: "linear-gradient(135deg,#bc6c25,#dda15e 48%,#283618)",
    category: "Culture",
    tags: ["Culture", "History", "Nature", "Photography"],
    travellerTypes: ["Solo", "Couple", "Family"],
    budgetLevel: "budget",
    estimatedDuration: "60 mins",
    address: "Jalan Kuala Kangsar",
    openingHours: "8:00 AM - 5:00 PM",
    rating: 4.6,
    rewardEnabled: false,
    pointsReward: 0,
  },
  {
    id: "new-hollywood",
    name: "New Hollywood",
    slug: "new-hollywood",
    shortDescription: "A beloved local food court for breakfast and hawker classics.",
    fullDescription: "A crowd-favourite halal-friendly breakfast stop with noodles, chee cheong fun, pastries, and coffee energy.",
    image: "linear-gradient(135deg,#ffcad4,#f4a261 52%,#6d2e46)",
    category: "Food",
    tags: ["Food", "Coffee", "Local Explorer"],
    travellerTypes: ["Family", "Friends", "Local Explorer"],
    budgetLevel: "budget",
    estimatedDuration: "45 mins",
    address: "Canning Garden, Ipoh",
    openingHours: "7:00 AM - 2:00 PM",
    rating: 4.5,
    rewardEnabled: true,
    pointsReward: 60,
  },
];

const rewards: Reward[] = [
  { id: "white-coffee", name: "Ipoh White Coffee", category: "Drinks", description: "Claim a local white coffee at participating cafes.", pointsRequired: 500, stock: 18, image: "linear-gradient(135deg,#fff3d6,#b08968)" },
  { id: "magnet", name: "Ipoh Fridge Magnet", category: "Souvenirs", description: "A small keepsake featuring Ipoh's limestone skyline.", pointsRequired: 600, stock: 12, image: "linear-gradient(135deg,#ffd6e0,#ff7a90)" },
  { id: "keychain", name: "Ipoh Keychain", category: "Souvenirs", description: "Premium enamel-style Ipoh keychain for your travel bag.", pointsRequired: 700, stock: 9, image: "linear-gradient(135deg,#bde0fe,#ffafcc)" },
  { id: "dessert", name: "Free Local Dessert", category: "Food", description: "Redeem a dessert bowl after your next food trail stop.", pointsRequired: 800, stock: 7, image: "linear-gradient(135deg,#fefae0,#dda15e)" },
  { id: "voucher", name: "RM10 Cafe Voucher", category: "Vouchers", description: "Use this voucher at selected Old Town cafes.", pointsRequired: 1000, stock: 5, image: "linear-gradient(135deg,#caffbf,#9bf6ff)" },
];

const qrTokens: Record<string, { locationId: string; active: boolean }> = {
  "IPOH-KLT-001": { locationId: "klt", active: true },
  "IPOH-CONCUBINE-001": { locationId: "concubine", active: true },
  "IPOH-PLATFORM-001": { locationId: "platform", active: true },
  "IPOH-KONGHENG-001": { locationId: "kongheng", active: true },
  "IPOH-INACTIVE-001": { locationId: "oldtown", active: false },
};

const stories = [
  ["Your Story", "Old Town", "linear-gradient(135deg,#ffd166,#ef476f)"],
  ["Aina", "Kek Lok Tong", "linear-gradient(135deg,#80ed99,#57cc99)"],
  ["Sarah", "Concubine Lane", "linear-gradient(135deg,#ffafcc,#ffc8dd)"],
  ["Amir", "Platform Coffee", "linear-gradient(135deg,#cdb4db,#bde0fe)"],
  ["Jason", "Tasik Cermin", "linear-gradient(135deg,#90dbf4,#a3c4f3)"],
];

const defaultState: UserState = {
  loggedIn: false,
  onboarded: false,
  travellerType: "",
  interests: [],
  budget: "moderate",
  scannedTokens: [],
  pointTransactions: [{ id: "welcome", type: "ADJUSTMENT", amount: 650, label: "Welcome demo balance", date: new Date().toISOString() }],
  redemptions: [],
  rewardStock: Object.fromEntries(rewards.map((reward) => [reward.id, reward.stock])),
};

function scorePlace(place: Location, user: UserState) {
  let score = 0;
  for (const interest of user.interests) if (place.tags.includes(interest)) score += 2;
  if (place.travellerTypes.includes(user.travellerType)) score += 1;
  if (place.budgetLevel === user.budget) score += 1;
  if (place.rewardEnabled) score += 0.5;
  return score;
}

function matchText(place: Location, user: UserState) {
  const hits = user.interests.filter((interest) => place.tags.includes(interest)).slice(0, 2);
  return hits.length ? `Recommended because you like ${hits.join(" + ")}` : "Popular with Ipoh explorers";
}

export function IpohDiscoveryApp() {
  const [user, setUser] = useState<UserState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<View>("home");
  const [selectedPlace, setSelectedPlace] = useState("klt");
  const [selectedReward, setSelectedReward] = useState("keychain");
  const [story, setStory] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [lastScan, setLastScan] = useState<{ place: Location; points: number; balance: number } | null>(null);
  const [lastRedemption, setLastRedemption] = useState<{ reward: Reward; code: string } | null>(null);

  useEffect(() => {
    window.queueMicrotask(() => {
      const saved = localStorage.getItem("ipoh-discovery-demo");
      if (saved) setUser({ ...defaultState, ...JSON.parse(saved) });
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("ipoh-discovery-demo", JSON.stringify(user));
  }, [hydrated, user]);

  const balance = useMemo(() => user.pointTransactions.reduce((sum, tx) => sum + tx.amount, 0), [user.pointTransactions]);
  const recommendations = useMemo(() => [...places].sort((a, b) => scorePlace(b, user) - scorePlace(a, user)), [user]);
  const activePlace = places.find((place) => place.id === selectedPlace) ?? places[0];
  const activeReward = rewards.find((reward) => reward.id === selectedReward) ?? rewards[0];

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function login(email: string, password: string) {
    if (email.toLowerCase() === "demo@ipoh.local" && password === "demo123") {
      setUser((current) => ({ ...current, loggedIn: true }));
      notify("Welcome back, Jessica.");
      return true;
    }
    notify("Use demo@ipoh.local and demo123 for the local demo.");
    return false;
  }

  function completeOnboarding(travellerType: string, selected: string[], budget: Budget) {
    setUser((current) => ({ ...current, onboarded: true, travellerType, interests: selected, budget }));
    setView("home");
    notify("Your Ipoh journey is ready.");
  }

  function validateQr(tokenInput: string) {
    const token = tokenInput.trim().toUpperCase();
    const qr = qrTokens[token];
    if (!qr) return notify("Invalid QR token. Try IPOH-KLT-001.");
    if (!qr.active) return notify("This QR code is inactive.");
    if (user.scannedTokens.includes(token)) return notify("Already checked in for this QR code.");
    const place = places.find((item) => item.id === qr.locationId);
    if (!place || !place.rewardEnabled) return notify("This place has no active points reward.");
    const transaction = { id: `earn-${Date.now()}`, type: "EARN" as TxType, amount: place.pointsReward, label: place.name, date: new Date().toISOString() };
    const nextBalance = balance + place.pointsReward;
    setUser((current) => ({
      ...current,
      scannedTokens: [...current.scannedTokens, token],
      pointTransactions: [transaction, ...current.pointTransactions],
    }));
    setLastScan({ place, points: place.pointsReward, balance: nextBalance });
  }

  function redeemReward(reward: Reward) {
    const stock = user.rewardStock[reward.id] ?? reward.stock;
    if (balance < reward.pointsRequired) return notify("Not enough points yet.");
    if (stock < 1) return notify("This reward is out of stock.");
    const code = `IPOH-${reward.id.slice(0, 2).toUpperCase()}-${Math.random().toString(16).slice(2, 6).toUpperCase()}`;
    setUser((current) => ({
      ...current,
      rewardStock: { ...current.rewardStock, [reward.id]: stock - 1 },
      pointTransactions: [{ id: `redeem-${Date.now()}`, type: "REDEEM", amount: -reward.pointsRequired, label: reward.name, date: new Date().toISOString() }, ...current.pointTransactions],
      redemptions: [{ id: `redemption-${Date.now()}`, rewardId: reward.id, code, date: new Date().toISOString() }, ...current.redemptions],
    }));
    setLastRedemption({ reward, code });
  }

  if (!hydrated) return <Shell><div className="skeleton h-96 rounded-[2rem]" /></Shell>;
  if (!user.loggedIn) return <LoginScreen onLogin={login} />;
  if (!user.onboarded) return <Onboarding onComplete={completeOnboarding} />;

  return (
    <Shell>
      <main className="pb-24">
        {view === "home" && (
          <Home
            user={user}
            balance={balance}
            recommendations={recommendations}
            onStory={setStory}
            onPlace={(id) => {
              setSelectedPlace(id);
              setView("place");
            }}
            onReward={(id) => {
              setSelectedReward(id);
              setView("reward");
            }}
          />
        )}
        {view === "explore" && (
          <Explore
            user={user}
            category={category}
            query={query}
            onCategory={setCategory}
            onQuery={setQuery}
            onPlace={(id) => {
              setSelectedPlace(id);
              setView("place");
            }}
          />
        )}
        {view === "scan" && <Scan onValidate={validateQr} result={lastScan} onRewards={() => setView("rewards")} onExplore={() => setView("explore")} />}
        {view === "rewards" && (
          <Rewards balance={balance} user={user} onReward={(id) => {
            setSelectedReward(id);
            setView("reward");
          }} />
        )}
        {view === "wallet" && <Wallet balance={balance} transactions={user.pointTransactions} />}
        {view === "profile" && <Profile user={user} balance={balance} onLogout={() => setUser((current) => ({ ...current, loggedIn: false }))} />}
        {view === "place" && <PlaceDetail place={activePlace} user={user} onBack={() => setView("explore")} onScan={() => setView("scan")} onPlace={(id) => {
          setSelectedPlace(id);
          setView("place");
        }} />}
        {view === "reward" && <RewardDetail reward={activeReward} balance={balance} stock={user.rewardStock[activeReward.id] ?? activeReward.stock} redemption={lastRedemption} onBack={() => setView("rewards")} onRedeem={redeemReward} />}
      </main>
      <BottomNav view={view} setView={setView} />
      {story && <StoryModal name={story} onClose={() => setStory(null)} />}
      {toast && <div className="fixed left-1/2 top-4 z-50 w-[min(92vw,380px)] -translate-x-1/2 rounded-2xl bg-[#171311] px-4 py-3 text-sm font-semibold text-white shadow-2xl">{toast}</div>}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#fbf7f3] text-[#171311]"><div className="mx-auto min-h-screen w-full max-w-md bg-[#fffdfb] shadow-[0_0_60px_rgba(23,19,17,0.10)] md:my-6 md:min-h-[860px] md:overflow-hidden md:rounded-[2rem] md:border md:border-black/5">{children}</div></div>;
}

function LoginScreen({ onLogin }: { onLogin: (email: string, password: string) => boolean }) {
  const [email, setEmail] = useState("demo@ipoh.local");
  const [password, setPassword] = useState("demo123");
  return (
    <Shell>
      <div className="flex min-h-screen flex-col justify-between p-6 md:min-h-[860px]">
        <div className="pt-10">
          <div className="mb-8 h-72 rounded-[2rem] bg-[linear-gradient(135deg,#ff5f7e,#ff8f70_48%,#ffd166)] p-5 text-white shadow-2xl shadow-[#ff5f7e]/30">
            <div className="flex h-full flex-col justify-between">
              <span className="w-max rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Ipoh Discovery</span>
              <div>
                <h1 className="font-display text-5xl font-bold leading-none">Discover Ipoh your way.</h1>
                <p className="mt-3 text-sm text-white/90">Personal picks, QR check-ins, points, and local rewards.</p>
              </div>
            </div>
          </div>
          <label className="field-label">Email</label>
          <input className="field" value={email} onChange={(event) => setEmail(event.target.value)} />
          <label className="field-label mt-4">Password</label>
          <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button className="primary-btn" onClick={() => onLogin(email, password)}>Login to Demo</button>
      </div>
    </Shell>
  );
}

function Onboarding({ onComplete }: { onComplete: (traveller: string, interests: string[], budget: Budget) => void }) {
  const [step, setStep] = useState(0);
  const [traveller, setTraveller] = useState("Friends");
  const [selected, setSelected] = useState(["Food", "Coffee", "Nature", "Culture"]);
  const [budget, setBudget] = useState<Budget>("moderate");
  return (
    <Shell>
      <div className="flex min-h-screen flex-col p-6 md:min-h-[860px]">
        <div className="mb-5 mt-8 flex gap-2">{[0, 1, 2].map((item) => <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= step ? "bg-[#ff5f7e]" : "bg-black/10"}`} />)}</div>
        {step === 0 && <Picker title="Who are you travelling with?" items={travellers} selected={[traveller]} onToggle={(item) => setTraveller(item)} />}
        {step === 1 && <Picker title="What are you interested in?" subtitle="Choose a few so recommendations feel personal." items={interests} selected={selected} multi onToggle={(item) => setSelected((current) => current.includes(item) ? current.filter((x) => x !== item) : [...current, item])} />}
        {step === 2 && <Picker title="What is your spending style?" items={budgets.map((item) => item[0].toUpperCase() + item.slice(1))} selected={[budget[0].toUpperCase() + budget.slice(1)]} onToggle={(item) => setBudget(item.toLowerCase() as Budget)} />}
        <div className="mt-auto">
          {step < 2 ? <button className="primary-btn" onClick={() => setStep(step + 1)}>Continue</button> : <button className="primary-btn" onClick={() => onComplete(traveller, selected, budget)}>Explore Ipoh</button>}
        </div>
      </div>
    </Shell>
  );
}

function Picker({ title, subtitle, items, selected, multi, onToggle }: { title: string; subtitle?: string; items: string[]; selected: string[]; multi?: boolean; onToggle: (item: string) => void }) {
  return <section><p className="text-sm font-bold text-[#ff5f7e]">Personalize</p><h2 className="mt-2 font-display text-4xl font-bold leading-tight">{title}</h2>{subtitle && <p className="mt-2 text-sm text-black/55">{subtitle}</p>}<div className="mt-8 flex flex-wrap gap-3">{items.map((item) => <button key={item} className={`rounded-full border px-4 py-3 text-sm font-bold transition ${selected.includes(item) ? "border-[#ff5f7e] bg-[#ff5f7e] text-white shadow-lg shadow-[#ff5f7e]/25" : "border-black/10 bg-white text-black/70"}`} onClick={() => onToggle(item)}>{item}{multi && selected.includes(item) ? " +" : ""}</button>)}</div></section>;
}

function Home({ user, balance, recommendations, onStory, onPlace, onReward }: { user: UserState; balance: number; recommendations: Location[]; onStory: (name: string) => void; onPlace: (id: string) => void; onReward: (id: string) => void }) {
  const hero = recommendations[0];
  return (
    <div className="space-y-6 p-5">
      <header className="flex items-center justify-between pt-2"><div><p className="text-sm">Good Morning, <b className="text-[#ff5f7e]">Jessica</b></p><h1 className="mt-1 text-sm text-black/50">Discover your favourite side of Ipoh.</h1></div><button className="icon-btn">bell</button></header>
      <div className="search">Search Ipoh places, rewards, cafes</div>
      <StoryRow onStory={onStory} />
      <Section title="Your Interests"><div className="flex gap-2 overflow-x-auto no-scrollbar">{user.interests.map((item) => <Chip key={item}>{item}</Chip>)}</div></Section>
      <Section title="Recommended For You"><button className="featured-card text-left" onClick={() => onPlace(hero.id)}><div className="image-fill" style={{ background: hero.image }} /><div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-lg"><div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-2xl font-bold">{hero.name}</h2><p className="text-xs text-black/55">{matchText(hero, user)}</p></div><span className="points">+{hero.pointsReward || 60} pts</span></div></div></button></Section>
      <Section title="More For You"><div className="flex gap-3 overflow-x-auto no-scrollbar">{recommendations.slice(1, 5).map((place) => <MiniPlace key={place.id} place={place} user={user} onClick={() => onPlace(place.id)} />)}</div></Section>
      <Section title="Popular Rewards" action={`${balance} pts`}><div className="grid grid-cols-2 gap-3">{rewards.slice(0, 2).map((reward) => <RewardCard key={reward.id} reward={reward} onClick={() => onReward(reward.id)} />)}</div></Section>
      <Section title="Around Ipoh"><MockPost /></Section>
    </div>
  );
}

function Explore({ user, category, query, onCategory, onQuery, onPlace }: { user: UserState; category: string; query: string; onCategory: (v: string) => void; onQuery: (v: string) => void; onPlace: (id: string) => void }) {
  const categories = ["All", "Food", "Coffee", "Nature", "Culture", "Shopping", "Activities", "Relax"];
  const filtered = places.filter((place) => (category === "All" || place.category === category || place.tags.includes(category === "Relax" ? "Relaxation" : category)) && place.name.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-5 p-5"><TopTitle title="Explore" subtitle="Image-heavy picks around Ipoh" /><input className="field" placeholder="Search places" value={query} onChange={(event) => onQuery(event.target.value)} /><div className="flex gap-2 overflow-x-auto no-scrollbar">{categories.map((item) => <button key={item} onClick={() => onCategory(item)} className={`chip-btn ${category === item ? "active" : ""}`}>{item}</button>)}</div><div className="grid grid-cols-2 gap-3">{filtered.map((place) => <LocationCard key={place.id} place={place} user={user} onClick={() => onPlace(place.id)} />)}</div></div>;
}

function PlaceDetail({ place, user, onBack, onScan, onPlace }: { place: Location; user: UserState; onBack: () => void; onScan: () => void; onPlace: (id: string) => void }) {
  return <div><div className="relative h-80" style={{ background: place.image }}><button className="absolute left-5 top-5 icon-btn" onClick={onBack}>back</button><button className="absolute right-5 top-5 icon-btn">save</button></div><div className="-mt-8 rounded-t-[2rem] bg-white p-5"><div className="flex items-start justify-between gap-3"><div><h1 className="font-display text-4xl font-bold">{place.name}</h1><p className="mt-1 text-sm text-black/55">Star {place.rating} - {place.tags.slice(0, 3).join(" - ")}</p></div>{place.rewardEnabled && <span className="points">+{place.pointsReward}</span>}</div><div className="mt-4 rounded-2xl bg-[#fff5f3] p-4 text-sm font-semibold text-[#c7465f]">{matchText(place, user)}</div><Section title="About"><p className="text-sm leading-6 text-black/65">{place.fullDescription}</p></Section><div className="grid grid-cols-2 gap-3 text-sm"><Info label="Estimated Visit" value={place.estimatedDuration} /><Info label="Opening Hours" value={place.openingHours} /><Info label="Budget" value={place.budgetLevel} /><Info label="Address" value={place.address} /></div>{place.rewardEnabled && <button className="primary-btn mt-5" onClick={onScan}>Scan QR to Earn {place.pointsReward} pts</button>}<Section title="Related Places"><div className="flex gap-3 overflow-x-auto no-scrollbar">{places.filter((item) => item.id !== place.id).slice(0, 4).map((item) => <MiniPlace key={item.id} place={item} user={user} onClick={() => onPlace(item.id)} />)}</div></Section></div></div>;
}

function Scan({ onValidate, result, onRewards, onExplore }: { onValidate: (token: string) => void; result: { place: Location; points: number; balance: number } | null; onRewards: () => void; onExplore: () => void }) {
  const [token, setToken] = useState("IPOH-KLT-001");
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camera, setCamera] = useState("idle");
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      const BarcodeDetectorCtor = (window as unknown as { BarcodeDetector?: new (options: { formats: string[] }) => { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>> } }).BarcodeDetector;
      if (!BarcodeDetectorCtor) {
        setCamera("Camera ready. Manual token works if this browser cannot decode QR.");
        return;
      }
      const detector = new BarcodeDetectorCtor({ formats: ["qr_code"] });
      timerRef.current = window.setInterval(async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) return;
        const codes = await detector.detect(videoRef.current).catch(() => []);
        const value = codes[0]?.rawValue;
        if (value) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          onValidate(value);
        }
      }, 700);
      setCamera("Camera scanning. Point it at a demo QR token.");
    } catch {
      setCamera("Camera access unavailable. Manual token works for desktop demo.");
    }
  }
  if (result) return <div className="p-5"><div className="success-card"><div className="check">OK</div><p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Check-in Complete</p><h1 className="mt-3 font-display text-4xl font-bold">{result.place.name}</h1><p className="mt-6 text-5xl font-black">+{result.points}</p><p className="text-sm text-white/80">You now have {result.balance.toLocaleString()} pts</p></div><button className="primary-btn mt-5" onClick={onRewards}>View Rewards</button><button className="secondary-btn mt-3" onClick={onExplore}>Continue Exploring</button></div>;
  return <div className="space-y-5 p-5"><TopTitle title="Scan QR" subtitle="Check in at participating Ipoh spots" /><div className="rounded-[2rem] bg-black p-3"><video ref={videoRef} autoPlay playsInline muted className="h-72 w-full rounded-[1.4rem] bg-[#171311] object-cover" /><button className="secondary-btn mt-3 bg-white" onClick={startCamera}>{camera === "idle" ? "Start Camera" : camera}</button></div><div className="rounded-[2rem] border border-black/10 bg-white p-4"><label className="field-label">Enter Demo QR Code</label><input className="field" value={token} onChange={(event) => setToken(event.target.value)} /><button className="primary-btn mt-3" onClick={() => onValidate(token)}>Validate</button><p className="mt-3 text-xs text-black/45">Try IPOH-KLT-001, IPOH-CONCUBINE-001, IPOH-PLATFORM-001, or IPOH-INACTIVE-001.</p></div></div>;
}

function Rewards({ balance, user, onReward }: { balance: number; user: UserState; onReward: (id: string) => void }) {
  return <div className="space-y-5 p-5"><TopTitle title="Rewards" subtitle={`${balance.toLocaleString()} pts available`} /><div className="flex gap-2 overflow-x-auto no-scrollbar">{["All", "Drinks", "Food", "Souvenirs", "Vouchers"].map((item) => <span className="chip-btn active" key={item}>{item}</span>)}</div><div className="grid grid-cols-2 gap-3">{rewards.map((reward) => <RewardCard key={reward.id} reward={{ ...reward, stock: user.rewardStock[reward.id] ?? reward.stock }} onClick={() => onReward(reward.id)} />)}</div></div>;
}

function RewardDetail({ reward, balance, stock, redemption, onBack, onRedeem }: { reward: Reward; balance: number; stock: number; redemption: { reward: Reward; code: string } | null; onBack: () => void; onRedeem: (reward: Reward) => void }) {
  const disabled = balance < reward.pointsRequired || stock < 1;
  if (redemption?.reward.id === reward.id) return <div className="p-5"><button className="icon-btn mb-5" onClick={onBack}>back</button><div className="success-card"><p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Reward Redeemed</p><h1 className="mt-3 font-display text-4xl font-bold">{reward.name}</h1><div className="mx-auto mt-8 w-max rounded-2xl bg-white px-6 py-4 font-mono text-2xl font-black text-[#171311]">{redemption.code}</div><p className="mt-4 text-sm text-white/80">Status: READY TO CLAIM</p></div><p className="mt-4 text-center text-sm text-black/55">Show this code to the participating merchant.</p></div>;
  return <div><div className="h-80" style={{ background: reward.image }} /><div className="-mt-8 rounded-t-[2rem] bg-white p-5"><button className="icon-btn mb-4" onClick={onBack}>back</button><h1 className="font-display text-4xl font-bold">{reward.name}</h1><p className="mt-2 text-sm leading-6 text-black/60">{reward.description}</p><div className="mt-5 grid grid-cols-2 gap-3"><Info label="Required" value={`${reward.pointsRequired} pts`} /><Info label="Stock" value={`${stock} left`} /><Info label="Your Balance" value={`${balance} pts`} /><Info label="After Redeem" value={`${Math.max(0, balance - reward.pointsRequired)} pts`} /></div><button className="primary-btn mt-6 disabled:opacity-45" disabled={disabled} onClick={() => onRedeem(reward)}>{disabled ? "Not Available" : "Redeem Reward"}</button></div></div>;
}

function Wallet({ balance, transactions }: { balance: number; transactions: UserState["pointTransactions"] }) {
  return <div className="space-y-5 p-5"><TopTitle title="My Points" subtitle={`${balance.toLocaleString()} pts`} /><div className="rounded-[2rem] bg-[#171311] p-6 text-white"><p className="text-sm text-white/60">Available balance</p><p className="mt-2 text-5xl font-black">{balance.toLocaleString()}</p></div><Section title="Recent Activity"><div className="space-y-3">{transactions.map((tx) => <div key={tx.id} className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-sm"><div><p className="font-bold">{tx.label}</p><p className="text-xs text-black/45">{new Date(tx.date).toLocaleDateString()}</p></div><b className={tx.amount > 0 ? "text-[#13a56b]" : "text-[#ef476f]"}>{tx.amount > 0 ? "+" : ""}{tx.amount}</b></div>)}</div></Section></div>;
}

function Profile({ user, balance, onLogout }: { user: UserState; balance: number; onLogout: () => void }) {
  return <div className="space-y-5 p-5"><div className="pt-6 text-center"><div className="mx-auto h-24 w-24 rounded-full bg-[linear-gradient(135deg,#ffd166,#ef476f)] ring-4 ring-white shadow-xl" /><h1 className="mt-4 font-display text-3xl font-bold">Jessica Patterson</h1><p className="text-sm text-black/45">@jessica_ipoh</p><div className="mt-5 grid grid-cols-3 gap-3"><Info label="Visited" value={`${user.scannedTokens.length}`} /><Info label="Points" value={`${balance}`} /><Info label="Rewards" value={`${user.redemptions.length}`} /></div></div><Section title="Interests"><div className="flex flex-wrap gap-2">{user.interests.map((item) => <Chip key={item}>{item}</Chip>)}</div></Section><Section title="Visited"><div className="grid grid-cols-2 gap-3">{places.filter((place) => Object.entries(qrTokens).some(([token, qr]) => user.scannedTokens.includes(token) && qr.locationId === place.id)).map((place) => <div key={place.id} className="h-36 rounded-2xl" style={{ background: place.image }} />)}</div></Section><button className="secondary-btn" onClick={onLogout}>Logout</button></div>;
}

function BottomNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items: [View, string][] = [["home", "Home"], ["explore", "Explore"], ["scan", "Scan"], ["rewards", "Rewards"], ["profile", "Profile"]];
  return <nav className="fixed bottom-4 left-1/2 z-40 grid w-[min(92vw,390px)] -translate-x-1/2 grid-cols-5 items-center rounded-full border border-black/10 bg-white/95 p-2 shadow-2xl backdrop-blur">{items.map(([id, label]) => <button key={id} onClick={() => setView(id)} className={`h-12 rounded-full text-[11px] font-bold ${id === "scan" ? "-mt-8 h-16 bg-[#d9ff36] text-black shadow-xl" : view === id ? "text-[#ff5f7e]" : "text-black/45"}`}>{label}</button>)}</nav>;
}

function StoryRow({ onStory }: { onStory: (name: string) => void }) {
  return <div className="flex gap-3 overflow-x-auto no-scrollbar">{stories.map(([name, place, bg]) => <button key={name} className="w-[72px] shrink-0 text-center" onClick={() => onStory(name)}><span className="mx-auto block h-16 w-16 rounded-full border-2 border-[#ff5f7e] p-1"><span className="block h-full rounded-full" style={{ background: bg }} /></span><span className="mt-1 block truncate text-[11px] font-bold">{name}</span><span className="block truncate text-[10px] text-black/40">{place}</span></button>)}</div>;
}

function StoryModal({ name, onClose }: { name: string; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5"><div className="relative h-[720px] max-h-[88vh] w-full max-w-sm overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#ff5f7e,#ffb067)] p-5 text-white shadow-2xl"><button className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-2 text-sm font-bold" onClick={onClose}>Close</button><div className="mt-auto flex h-full flex-col justify-end"><p className="text-sm font-bold">{name}</p><h2 className="font-display text-4xl font-bold">A bright Ipoh stop worth saving.</h2><p className="mt-2 text-sm text-white/80">Static story preview for the stakeholder demo.</p></div></div></div>;
}

function LocationCard({ place, user, onClick }: { place: Location; user: UserState; onClick: () => void }) {
  return <button onClick={onClick} className="overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5"><div className="h-36" style={{ background: place.image }} /><div className="p-3"><h3 className="font-bold leading-tight">{place.name}</h3><p className="mt-1 text-[11px] text-black/45">{place.tags.slice(0, 2).join(" - ")}</p><div className="mt-2 flex items-center justify-between"><span className="rounded-full bg-[#fff0f3] px-2 py-1 text-[10px] font-bold text-[#ff5f7e]">{Math.min(99, Math.round(scorePlace(place, user) * 18))}% Match</span>{place.rewardEnabled && <span className="text-[10px] font-black">+{place.pointsReward}</span>}</div></div></button>;
}

function MiniPlace({ place, user, onClick }: { place: Location; user: UserState; onClick: () => void }) {
  return <button onClick={onClick} className="w-40 shrink-0 overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5"><div className="h-32" style={{ background: place.image }} /><div className="p-3"><h3 className="truncate font-bold">{place.name}</h3><p className="text-[11px] text-black/45">{Math.round(scorePlace(place, user) * 18)}% match</p></div></button>;
}

function RewardCard({ reward, onClick }: { reward: Reward; onClick: () => void }) {
  return <button onClick={onClick} className="overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5"><div className="h-28" style={{ background: reward.image }} /><div className="p-3"><h3 className="font-bold leading-tight">{reward.name}</h3><p className="mt-1 text-xs font-black text-[#ff5f7e]">{reward.pointsRequired} pts</p><p className="text-[10px] text-black/40">{reward.stock} left</p></div></button>;
}

function MockPost() {
  return <div className="rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5"><div className="mb-3 flex items-center gap-3"><span className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#ffafcc,#bde0fe)]" /><div><p className="text-sm font-bold">Sarah</p><p className="text-xs text-black/45">Concubine Lane - 1 min ago</p></div></div><div className="h-64 rounded-[1.4rem] bg-[linear-gradient(135deg,#f7b267,#f79d65_48%,#4a2d24)]" /><p className="mt-3 text-sm">Found this hidden street while exploring Old Town.</p><p className="mt-2 text-xs font-bold text-black/45">Heart 128</p></div>;
}

function Section({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return <section className="space-y-3"><div className="flex items-center justify-between"><h2 className="font-display text-xl font-bold">{title}</h2>{action && <span className="text-xs font-black text-[#ff5f7e]">{action}</span>}</div>{children}</section>;
}

function TopTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return <header className="pt-4"><h1 className="font-display text-4xl font-bold">{title}</h1><p className="mt-1 text-sm text-black/50">{subtitle}</p></header>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-[#fbf7f3] p-4"><p className="text-[11px] font-bold uppercase text-black/35">{label}</p><p className="mt-1 text-sm font-black capitalize">{value}</p></div>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 rounded-full bg-[#fff0f3] px-3 py-2 text-xs font-bold text-[#c7465f]">{children}</span>;
}
