"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type View = "home" | "explore" | "map" | "passes" | "pass-review" | "quest" | "scan" | "rewards" | "profile" | "place" | "reward";
type PassTier = "NONE" | "EXPLORER" | "QUEST_PLUS" | "VIP";
type Budget = "Under RM100" | "RM100-RM200" | "RM200-RM400" | "RM400+";
type TravelStyle = "Relaxed" | "Balanced" | "Packed";
type ItineraryPreference = "Yes, I already have one" | "No, plan my day for me" | "I have some plans - help me fill the gaps";
type TxType = "EARN" | "REDEEM" | "ADJUSTMENT";

type Place = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  foodTags: string[];
  priceRange: Budget;
  durationMinutes: number;
  latitude: number;
  longitude: number;
  openingHours: string;
  partner: boolean;
  partnerLevel: "STANDARD" | "QUEST_PLUS" | "VIP" | "SPONSORED";
  checkpoint: boolean;
  basePoints: number;
  distanceKm: number;
  rating: number;
  familyFriendly: boolean;
  coupleFriendly: boolean;
};

type PassPackage = {
  tier: PassTier;
  name: string;
  adult: number;
  child: number;
  short: string;
  positioning: string;
  multiplier: number;
  fbCredit: number;
  childCredit: number;
  experiences: number;
  swaps: number | "Flexible";
  transport: string;
  guide: string;
  perk: string;
  popular?: boolean;
};

type Reward = {
  id: string;
  name: string;
  points: number;
  merchant: string;
  category: string;
  availability: string;
  image: string;
};

type Checkpoint = {
  id: string;
  placeId: string;
  name: string;
  description: string;
  qr: string;
  reward: string;
};

type DemoState = {
  onboarded: boolean;
  preferences: {
    interests: string[];
    foodPreferences: string[];
    travellerType: string;
    travelStyle: TravelStyle;
    itineraryPreference: ItineraryPreference;
    knownDestinations: string[];
    budget: Budget;
    duration: string;
  };
  currentPass: PassTier;
  points: number;
  fbCreditRemaining: number;
  experiencesRemaining: number;
  itinerarySwapsRemaining: number | "Flexible";
  itinerary: string[];
  checkedIn: string[];
  pointTransactions: { id: string; type: TxType; amount: number; label: string; date: string }[];
  rewardStock: Record<string, number>;
  redemptions: { id: string; rewardId: string; code: string; date: string }[];
};

const interests = ["Food", "Coffee", "Nature", "Culture", "Heritage", "Shopping", "Photography", "Family", "Relaxation", "Adventure"];
const foodPreferences = ["Local food", "Coffee", "Traditional", "Dessert", "Spicy", "Local favourites", "Fine dining", "Street food"];
const travellers = ["Solo", "Couple", "Family", "Friends", "Group / work"];
const styles: TravelStyle[] = ["Relaxed", "Balanced", "Packed"];
const itineraryPreferences: ItineraryPreference[] = ["Yes, I already have one", "No, plan my day for me", "I have some plans - help me fill the gaps"];
const budgets: Budget[] = ["Under RM100", "RM100-RM200", "RM200-RM400", "RM400+"];
const durations = ["Half day", "1 day", "2 days+"];

const passPackages: PassPackage[] = [
  {
    tier: "EXPLORER",
    name: "Explorer",
    adult: 99,
    child: 49,
    short: "PLAN MY DAY",
    positioning: "Explore at your own pace.",
    multiplier: 1,
    fbCredit: 20,
    childCredit: 10,
    experiences: 0,
    swaps: 0,
    transport: "Self-arranged",
    guide: "Digital / self-guided",
    perk: "Standard partner privileges",
  },
  {
    tier: "QUEST_PLUS",
    name: "Quest+",
    adult: 199,
    child: 99,
    short: "TAKE ME AROUND",
    positioning: "Everything you need for the perfect day in Ipoh.",
    multiplier: 1.5,
    fbCredit: 50,
    childCredit: 15,
    experiences: 1,
    swaps: 1,
    transport: "Shared transport",
    guide: "Shared local guide",
    perk: "Better rewards and 10% partner perks",
    popular: true,
  },
  {
    tier: "VIP",
    name: "VIP Explorer",
    adult: 399,
    child: 199,
    short: "LOOK AFTER ME",
    positioning: "The best of Ipoh, without the hassle.",
    multiplier: 2,
    fbCredit: 80,
    childCredit: 20,
    experiences: 2,
    swaps: "Flexible",
    transport: "Premium small-group transport",
    guide: "Dedicated / specialist guide",
    perk: "Priority reservations and premium partner rewards",
  },
];

const places: Place[] = [
  place("kong-heng", "Kong Heng Square", "Boutique shops, art corners, indie food, and heritage textures in Old Town.", "Culture", ["Food", "Coffee", "Heritage", "Shopping", "Photography"], ["Coffee", "Street food", "Local favourites"], "RM100-RM200", 60, 4.5975, 101.0763, "10:00-19:00", true, "QUEST_PLUS", true, 60, 1.2, 4.7, true, true, "linear-gradient(135deg,#2f4858,#f6ae2d 46%,#f26419)"),
  place("concubine-lane", "Concubine Lane", "A heritage lane packed with snacks, murals, souvenir stalls, and old-town bustle.", "Heritage", ["Food", "Culture", "Heritage", "Shopping", "Photography"], ["Dessert", "Street food", "Traditional"], "RM100-RM200", 50, 4.5977, 101.0773, "10:00-18:00", true, "STANDARD", true, 70, 1.0, 4.6, true, true, "linear-gradient(135deg,#f7b267,#f79d65 48%,#4a2d24)"),
  place("old-town", "Ipoh Old Town", "Murals, white coffee, and colonial shopfronts in one walkable loop.", "Heritage", ["Food", "Coffee", "Culture", "Heritage", "Photography"], ["Coffee", "Local food", "Traditional"], "Under RM100", 90, 4.5964, 101.0779, "Best 08:00-17:00", true, "STANDARD", true, 50, 0.9, 4.7, true, true, "linear-gradient(135deg,#ef476f,#ffd166 50%,#073b4c)"),
  place("nam-heong", "Nam Heong White Coffee", "Classic Ipoh white coffee, egg tarts, and old kopitiam energy.", "Coffee", ["Food", "Coffee", "Heritage", "Relaxation"], ["Coffee", "Traditional", "Local favourites"], "Under RM100", 45, 4.5968, 101.0792, "07:00-16:30", true, "SPONSORED", true, 50, 1.1, 4.5, true, true, "linear-gradient(135deg,#fff3d6,#b08968 52%,#3f2f2a)"),
  place("kek-lok-tong", "Kek Lok Tong", "A limestone cave temple that opens into quiet gardens and karst views.", "Nature", ["Nature", "Culture", "Photography", "Relaxation", "Family"], [], "Under RM100", 80, 4.5592, 101.1295, "07:00-17:00", true, "STANDARD", true, 80, 6.8, 4.8, true, true, "linear-gradient(135deg,#7cc7b7,#f6d483 55%,#f07f72)"),
  place("tasik-cermin", "Tasik Cermin", "Mirror lake scenery wrapped by limestone walls and soft nature views.", "Nature", ["Nature", "Photography", "Adventure", "Relaxation", "Family"], [], "RM100-RM200", 75, 4.5603, 101.1193, "09:00-18:00", true, "QUEST_PLUS", true, 70, 7.1, 4.7, true, true, "linear-gradient(135deg,#75b8c8,#d9ed92 52%,#44633f)"),
  place("railway", "Ipoh Railway Station", "Iconic colonial architecture and an easy heritage photo stop.", "Heritage", ["Heritage", "Culture", "Photography"], [], "Under RM100", 30, 4.5971, 101.0737, "Open daily", false, "STANDARD", false, 0, 1.5, 4.4, true, true, "linear-gradient(135deg,#e9ecef,#adb5bd 52%,#343a40)"),
  place("lost-world", "Lost World of Tambun", "Theme park, hot springs, and family attractions by the cliffs.", "Adventure", ["Adventure", "Family", "Nature", "Relaxation"], [], "RM200-RM400", 240, 4.6267, 101.1549, "11:00-23:00", true, "VIP", false, 0, 11.4, 4.7, true, false, "linear-gradient(135deg,#118ab2,#06d6a0 48%,#ffd166)"),
  place("perak-cave", "Perak Cave Temple", "Temple murals, cave halls, and a short climb to a city viewpoint.", "Culture", ["Culture", "Heritage", "Nature", "Photography"], [], "Under RM100", 60, 4.6396, 101.0987, "08:00-17:00", false, "STANDARD", false, 0, 7.6, 4.6, true, true, "linear-gradient(135deg,#bc6c25,#dda15e 48%,#283618)"),
  place("new-hollywood", "New Hollywood", "A beloved local food court for breakfast and hawker classics.", "Food", ["Food", "Coffee", "Family"], ["Local food", "Street food", "Local favourites"], "Under RM100", 45, 4.6169, 101.1182, "07:00-14:00", true, "STANDARD", false, 0, 4.8, 4.5, true, false, "linear-gradient(135deg,#ffcad4,#f4a261 52%,#6d2e46)"),
  place("happy-8", "Happy 8 Retreat Cafe", "Slow cafe moments with wood textures, coffee, and a boutique local feel.", "Coffee", ["Coffee", "Relaxation", "Photography", "Couple"], ["Coffee", "Dessert", "Fine dining"], "RM100-RM200", 55, 4.5972, 101.0797, "09:00-22:00", true, "VIP", false, 0, 1.3, 4.4, false, true, "linear-gradient(135deg,#cdb4db,#bde0fe 52%,#60463b)"),
  place("gerbang-malam", "Gerbang Malam Market", "Night shopping, local snacks, bargain finds, and souvenir energy.", "Shopping", ["Shopping", "Food", "Adventure"], ["Street food", "Local favourites"], "Under RM100", 70, 4.5962, 101.0858, "18:00-00:00", true, "STANDARD", false, 0, 1.9, 4.3, true, false, "linear-gradient(135deg,#171311,#9066c4 52%,#ff8f70)"),
  place("han-chin-pet-soo", "Han Chin Pet Soo", "A compact cultural museum revealing stories of Ipoh's tin-mining past.", "Heritage", ["Heritage", "Culture", "Photography"], [], "RM100-RM200", 70, 4.5961, 101.0772, "09:30-15:30", true, "QUEST_PLUS", true, 60, 1.0, 4.6, true, true, "linear-gradient(135deg,#f2cc8f,#9066c4 52%,#3d405b)"),
  place("local-snack-box", "Old Town Snack Box", "Local snack bundles and edible souvenirs for the final reward stop.", "Shopping", ["Shopping", "Food", "Family"], ["Dessert", "Traditional", "Local favourites"], "Under RM100", 35, 4.5969, 101.0786, "09:00-20:00", true, "SPONSORED", true, 40, 1.1, 4.4, true, false, "linear-gradient(135deg,#ffd166,#ffafcc 52%,#f26d4f)"),
];

const checkpoints: Checkpoint[] = [
  { id: "kong-heng", placeId: "kong-heng", name: "Kong Heng Square", description: "Start with art, cafes, and old-town shops.", qr: "checkpoint:kong-heng", reward: "10% off selected partner items" },
  { id: "concubine-lane", placeId: "concubine-lane", name: "Concubine Lane", description: "Check in after the heritage lane walk.", qr: "checkpoint:concubine-lane", reward: "Bonus souvenir stamp" },
  { id: "old-town", placeId: "old-town", name: "Ipoh Old Town", description: "Complete the mural and white coffee loop.", qr: "checkpoint:old-town", reward: "Partner coffee upgrade" },
  { id: "han-chin-pet-soo", placeId: "han-chin-pet-soo", name: "Heritage Attraction", description: "Visit a deeper cultural stop.", qr: "checkpoint:han-chin-pet-soo", reward: "Museum partner privilege" },
  { id: "local-snack-box", placeId: "local-snack-box", name: "Local Souvenir", description: "End with local products and redeemable rewards.", qr: "checkpoint:local-snack-box", reward: "Snack-box reward unlock" },
];

const rewards: Reward[] = [
  { id: "white-coffee", name: "Ipoh White Coffee", points: 700, merchant: "Nam Heong White Coffee", category: "Drinks", availability: "18 left", image: "linear-gradient(135deg,#fff3d6,#b08968)" },
  { id: "keychain", name: "D'Ipoh Keychain", points: 500, merchant: "Old Town Snack Box", category: "Souvenir", availability: "12 left", image: "linear-gradient(135deg,#bde0fe,#ffafcc)" },
  { id: "magnet", name: "Heritage Fridge Magnet", points: 350, merchant: "Kong Heng Square", category: "Souvenir", availability: "25 left", image: "linear-gradient(135deg,#ffd6e0,#ff7a90)" },
  { id: "tote", name: "D'Ipoh Tote Bag", points: 1000, merchant: "Concubine Lane Merchant", category: "Souvenir", availability: "8 left", image: "linear-gradient(135deg,#d9c9ee,#9066c4)" },
  { id: "voucher", name: "RM10 Food Voucher", points: 600, merchant: "Partner food stalls", category: "Food", availability: "20 left", image: "linear-gradient(135deg,#caffbf,#9bf6ff)" },
  { id: "snack-box", name: "Local Snack Box", points: 850, merchant: "Old Town Snack Box", category: "Food", availability: "10 left", image: "linear-gradient(135deg,#ffd166,#f26d4f)" },
];

const experiences = ["Ipoh Heritage Walk", "White Coffee Tasting", "Local Food Experience", "Traditional Culture Workshop", "Nature Discovery"];
const itineraryTimes = ["09:00", "10:00", "12:00", "14:00", "16:00"];
const storageKey = "dipoh-package-prototype-v1";

const defaultState: DemoState = {
  onboarded: false,
  preferences: {
    interests: [],
    foodPreferences: [],
    travellerType: "Couple",
    travelStyle: "Balanced",
    itineraryPreference: "No, plan my day for me",
    knownDestinations: [],
    budget: "RM100-RM200",
    duration: "1 day",
  },
  currentPass: "NONE",
  points: 650,
  fbCreditRemaining: 0,
  experiencesRemaining: 0,
  itinerarySwapsRemaining: 0,
  itinerary: ["nam-heong", "kong-heng", "concubine-lane", "kek-lok-tong", "local-snack-box"],
  checkedIn: [],
  pointTransactions: [{ id: "welcome", type: "ADJUSTMENT", amount: 650, label: "Welcome demo balance", date: new Date().toISOString() }],
  rewardStock: Object.fromEntries(rewards.map((reward) => [reward.id, Number(reward.availability.match(/\d+/)?.[0] ?? 10)])),
  redemptions: [],
};

function place(id: string, name: string, description: string, category: string, tags: string[], foodTags: string[], priceRange: Budget, durationMinutes: number, latitude: number, longitude: number, openingHours: string, partner: boolean, partnerLevel: Place["partnerLevel"], checkpoint: boolean, basePoints: number, distanceKm: number, rating: number, familyFriendly: boolean, coupleFriendly: boolean, image: string): Place {
  return { id, name, description, image, category, tags, foodTags, priceRange, durationMinutes, latitude, longitude, openingHours, partner, partnerLevel, checkpoint, basePoints, distanceKm, rating, familyFriendly, coupleFriendly };
}

function passByTier(tier: PassTier) {
  return passPackages.find((item) => item.tier === tier);
}

function scorePlace(place: Place, state: DemoState) {
  let score = 0;
  const prefs = state.preferences;
  if (prefs.interests.some((interest) => place.tags.includes(interest) || place.category === interest)) score += 40;
  if (prefs.foodPreferences.some((food) => place.foodTags.includes(food))) score += 20;
  if ((prefs.travellerType === "Family" && place.familyFriendly) || (prefs.travellerType === "Couple" && place.coupleFriendly) || ["Solo", "Friends", "Group / work"].includes(prefs.travellerType)) score += 15;
  if ((prefs.travelStyle === "Relaxed" && place.durationMinutes <= 70) || (prefs.travelStyle === "Balanced" && place.durationMinutes <= 95) || prefs.travelStyle === "Packed") score += 15;
  if (place.priceRange === prefs.budget || prefs.budget === "RM400+") score += 10;
  if (place.partner) score += 5;
  return score;
}

function recommendationReason(place: Place, state: DemoState) {
  const hits = [...state.preferences.interests.filter((item) => place.tags.includes(item) || place.category === item), ...state.preferences.foodPreferences.filter((item) => place.foodTags.includes(item))].slice(0, 3);
  return hits.length ? `Recommended because you like ${hits.join(" + ")}.` : "Recommended as a flexible Ipoh highlight.";
}

function generatedItinerary(state: DemoState, ranked: Place[]) {
  const wanted = state.preferences.travelStyle === "Relaxed" ? 4 : state.preferences.travelStyle === "Packed" ? 6 : 5;
  const known = state.preferences.knownDestinations;
  const ids = [...known, ...ranked.map((place) => place.id)].filter((id, index, list) => list.indexOf(id) === index);
  return ids.slice(0, wanted);
}

export function IpohDiscoveryApp() {
  const [state, setState] = useState<DemoState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<View>("home");
  const [selectedPlace, setSelectedPlace] = useState("kong-heng");
  const [selectedPass, setSelectedPass] = useState<PassTier>("QUEST_PLUS");
  const [selectedReward, setSelectedReward] = useState("keychain");
  const [toast, setToast] = useState("");
  const [story, setStory] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [lastScan, setLastScan] = useState<{ checkpoint: Checkpoint; place: Place; base: number; multiplier: number; earned: number; balance: number } | null>(null);
  const [lastRedemption, setLastRedemption] = useState<{ rewardId: string; code: string } | null>(null);

  useEffect(() => {
    window.queueMicrotask(() => {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setState({ ...defaultState, ...JSON.parse(saved) });
        } catch {
          setState(defaultState);
        }
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state]);

  const activePass = passByTier(state.currentPass);
  const selectedPassPackage = passByTier(selectedPass) ?? passPackages[1];
  const multiplier = activePass?.multiplier ?? 1;
  const rankedPlaces = useMemo(() => [...places].sort((a, b) => scorePlace(b, state) - scorePlace(a, state)), [state]);
  const itineraryIds = state.itinerary.length ? state.itinerary : generatedItinerary(state, rankedPlaces);
  const itineraryPlaces = itineraryIds.map((id) => places.find((place) => place.id === id)).filter(Boolean) as Place[];
  const activePlace = places.find((place) => place.id === selectedPlace) ?? places[0];
  const activeReward = rewards.find((reward) => reward.id === selectedReward) ?? rewards[0];
  const completedCount = checkpoints.filter((checkpoint) => state.checkedIn.includes(checkpoint.id)).length;
  const progress = Math.round((completedCount / checkpoints.length) * 100);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function completeOnboarding(preferences: DemoState["preferences"]) {
    const temp = { ...state, preferences };
    const ranked = [...places].sort((a, b) => scorePlace(b, temp) - scorePlace(a, temp));
    setState((current) => ({ ...current, onboarded: true, preferences, itinerary: generatedItinerary(temp, ranked) }));
    setView("passes");
    notify("Your Ipoh day is ready.");
  }

  function choosePass(tier: PassTier) {
    setSelectedPass(tier);
    setView("pass-review");
  }

  function activatePass() {
    const plan = selectedPassPackage;
    setState((current) => ({
      ...current,
      currentPass: plan.tier,
      fbCreditRemaining: plan.fbCredit,
      experiencesRemaining: plan.experiences,
      itinerarySwapsRemaining: plan.swaps,
    }));
    setView("home");
    notify(`${plan.name} active. ${plan.multiplier}x points are on.`);
  }

  function addToItinerary(id: string) {
    setState((current) => current.itinerary.includes(id) ? current : { ...current, itinerary: [...current.itinerary, id].slice(0, 6) });
    notify("Added to your day.");
  }

  function swapItinerary(oldId: string, newId: string) {
    setState((current) => {
      if (current.itinerarySwapsRemaining === 0) return current;
      const nextSwaps = current.itinerarySwapsRemaining === "Flexible" ? "Flexible" : Math.max(0, current.itinerarySwapsRemaining - 1);
      return { ...current, itinerary: current.itinerary.map((id) => id === oldId ? newId : id), itinerarySwapsRemaining: nextSwaps };
    });
    notify("Itinerary stop replaced.");
  }

  function validateQr(value: string) {
    const token = value.trim().toLowerCase();
    const checkpoint = checkpoints.find((item) => item.qr.toLowerCase() === token || item.id.toLowerCase() === token.replace("checkpoint:", ""));
    if (!checkpoint) return notify("Invalid checkpoint QR. Try checkpoint:kong-heng.");
    if (state.checkedIn.includes(checkpoint.id)) return notify("Already checked in. You have earned points here.");
    const place = places.find((item) => item.id === checkpoint.placeId);
    if (!place) return notify("Checkpoint is unavailable.");
    const earned = Math.round(place.basePoints * multiplier);
    const nextBalance = state.points + earned;
    const transaction = { id: `earn-${Date.now()}`, type: "EARN" as TxType, amount: earned, label: checkpoint.name, date: new Date().toISOString() };
    setState((current) => ({ ...current, checkedIn: [...current.checkedIn, checkpoint.id], points: current.points + earned, pointTransactions: [transaction, ...current.pointTransactions] }));
    setLastScan({ checkpoint, place, base: place.basePoints, multiplier, earned, balance: nextBalance });
  }

  function redeemReward(reward: Reward) {
    const stock = state.rewardStock[reward.id] ?? 0;
    if (stock < 1) return notify("This reward is out of stock.");
    if (state.points < reward.points) return notify(`You need ${reward.points - state.points} more pts for this reward.`);
    const code = `DIPOH-${Math.random().toString(16).slice(2, 6).toUpperCase()}`;
    setState((current) => ({
      ...current,
      points: current.points - reward.points,
      rewardStock: { ...current.rewardStock, [reward.id]: stock - 1 },
      pointTransactions: [{ id: `redeem-${Date.now()}`, type: "REDEEM", amount: -reward.points, label: reward.name, date: new Date().toISOString() }, ...current.pointTransactions],
      redemptions: [{ id: `redemption-${Date.now()}`, rewardId: reward.id, code, date: new Date().toISOString() }, ...current.redemptions],
    }));
    setLastRedemption({ rewardId: reward.id, code });
  }

  function resetDemo() {
    localStorage.removeItem(storageKey);
    setState(defaultState);
    setView("home");
    notify("Demo state reset.");
  }

  if (!hydrated) return <Shell><div className="p-5"><div className="skeleton h-96 rounded-[2rem]" /></div></Shell>;
  if (!state.onboarded) return <PersonalizationFlow onComplete={completeOnboarding} />;

  return (
    <Shell>
      <main className="pb-24">
        {view === "home" && <Home state={state} pass={activePass} balance={state.points} recommendations={rankedPlaces} itinerary={itineraryPlaces} progress={progress} completedCount={completedCount} onStory={setStory} onPlace={(id) => { setSelectedPlace(id); setView("place"); }} onPass={() => setView("passes")} onQuest={() => setView("quest")} onMap={() => setView("map")} onReward={(id) => { setSelectedReward(id); setView("reward"); }} />}
        {view === "explore" && <Explore state={state} ranked={rankedPlaces} itinerary={itineraryPlaces} category={category} query={query} onCategory={setCategory} onQuery={setQuery} onPlace={(id) => { setSelectedPlace(id); setView("place"); }} onMap={() => setView("map")} />}
        {view === "map" && <MapScreen itinerary={itineraryPlaces} places={rankedPlaces} completedCount={completedCount} progress={progress} onPlace={(id) => { setSelectedPlace(id); setView("place"); }} onQuest={() => setView("quest")} />}
        {view === "passes" && <PassSelection current={state.currentPass} onChoose={choosePass} />}
        {view === "pass-review" && <PassReview plan={selectedPassPackage} onBack={() => setView("passes")} onActivate={activatePass} />}
        {view === "quest" && <QuestScreen state={state} pass={activePass} progress={progress} onScan={() => { setLastScan(null); setView("scan"); }} onMap={() => setView("map")} />}
        {view === "scan" && <Scan result={lastScan} onValidate={validateQr} onQuest={() => setView("quest")} onRewards={() => setView("rewards")} />}
        {view === "rewards" && <RewardsScreen state={state} pass={activePass} onReward={(id) => { setSelectedReward(id); setView("reward"); }} />}
        {view === "profile" && <Profile state={state} pass={activePass} onPass={() => setView("passes")} onReset={resetDemo} />}
        {view === "place" && <PlaceDetail place={activePlace} state={state} pass={activePass} alternatives={rankedPlaces.filter((place) => place.id !== activePlace.id).slice(0, 4)} onBack={() => setView("explore")} onMap={() => setView("map")} onScan={() => { setLastScan(null); setView("scan"); }} onAdd={addToItinerary} onSwap={swapItinerary} onPlace={(id) => { setSelectedPlace(id); setView("place"); }} />}
        {view === "reward" && <RewardDetail reward={activeReward} state={state} redemption={lastRedemption} onBack={() => setView("rewards")} onRedeem={redeemReward} />}
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

function PersonalizationFlow({ onComplete }: { onComplete: (preferences: DemoState["preferences"]) => void }) {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState<DemoState["preferences"]>({
    interests: ["Food", "Coffee", "Heritage"],
    foodPreferences: ["Local food", "Coffee"],
    travellerType: "Couple",
    travelStyle: "Balanced",
    itineraryPreference: "No, plan my day for me",
    knownDestinations: ["kong-heng"],
    budget: "RM100-RM200",
    duration: "1 day",
  });
  const steps = prefs.interests.includes("Food") ? 9 : 8;
  const ranked = useMemo(() => [...places].sort((a, b) => scorePlace(b, { ...defaultState, preferences: prefs }) - scorePlace(a, { ...defaultState, preferences: prefs })), [prefs]);
  const preview = generatedItinerary({ ...defaultState, preferences: prefs }, ranked).map((id) => places.find((place) => place.id === id)).filter(Boolean) as Place[];

  function toggle(key: "interests" | "foodPreferences" | "knownDestinations", value: string) {
    setPrefs((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  }

  if (step === 0) {
    return (
      <Shell>
        <div className="flex min-h-screen flex-col justify-between p-6 md:min-h-[860px]">
          <div className="pt-10">
            <div className="mb-8 h-80 rounded-[2rem] bg-[linear-gradient(135deg,#ff5f7e,#ff8f70_48%,#ffd166)] p-5 text-white shadow-2xl shadow-[#ff5f7e]/30">
              <div className="flex h-full flex-col justify-between">
                <span className="w-max rounded-full bg-white/20 px-3 py-1 text-xs font-bold">D&apos;Ipoh Day Pass</span>
                <div>
                  <h1 className="font-display text-5xl font-bold leading-none">Welcome to D&apos;Ipoh</h1>
                  <p className="mt-3 text-sm text-white/90">Let&apos;s build your perfect day in Ipoh.</p>
                </div>
              </div>
            </div>
          </div>
          <button className="primary-btn" onClick={() => setStep(1)}>Start Planning</button>
        </div>
      </Shell>
    );
  }

  const foodStep = prefs.interests.includes("Food");
  const normalizedStep = foodStep ? step : step > 1 ? step + 1 : step;
  return (
    <Shell>
      <div className="flex min-h-screen flex-col p-6 md:min-h-[860px]">
        <div className="mb-5 mt-8 flex gap-2">{Array.from({ length: steps }).map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full ${index < step ? "bg-[#ff5f7e]" : "bg-black/10"}`} />)}</div>
        {normalizedStep === 1 && <Picker title="What are you looking for?" subtitle={"Choose a few interests so D'Ipoh can shape your day."} items={interests} selected={prefs.interests} multi onToggle={(item) => toggle("interests", item)} />}
        {normalizedStep === 2 && <Picker title="What kind of food?" items={foodPreferences} selected={prefs.foodPreferences} multi onToggle={(item) => toggle("foodPreferences", item)} />}
        {normalizedStep === 3 && <Picker title="Who are you travelling with?" items={travellers} selected={[prefs.travellerType]} onToggle={(item) => setPrefs((current) => ({ ...current, travellerType: item }))} />}
        {normalizedStep === 4 && <StylePicker value={prefs.travelStyle} onChange={(value) => setPrefs((current) => ({ ...current, travelStyle: value }))} />}
        {normalizedStep === 5 && <Picker title="Do you already have an itinerary?" items={itineraryPreferences} selected={[prefs.itineraryPreference]} onToggle={(item) => setPrefs((current) => ({ ...current, itineraryPreference: item as ItineraryPreference }))} />}
        {normalizedStep === 6 && <KnownPlaces selected={prefs.knownDestinations} onToggle={(id) => toggle("knownDestinations", id)} />}
        {normalizedStep === 7 && <Picker title={"What's your budget?"} items={budgets} selected={[prefs.budget]} onToggle={(item) => setPrefs((current) => ({ ...current, budget: item as Budget }))} />}
        {normalizedStep === 8 && <Picker title="How long are you in Ipoh?" items={durations} selected={[prefs.duration]} onToggle={(item) => setPrefs((current) => ({ ...current, duration: item }))} />}
        {normalizedStep === 9 && <ResultPreview prefs={prefs} preview={preview} onComplete={() => onComplete(prefs)} />}
        <div className="mt-auto">
          {normalizedStep < 9 && <button className="primary-btn" onClick={() => setStep((current) => current + 1)}>Continue</button>}
        </div>
      </div>
    </Shell>
  );
}

function Picker({ title, subtitle, items, selected, multi, onToggle }: { title: string; subtitle?: string; items: string[]; selected: string[]; multi?: boolean; onToggle: (item: string) => void }) {
  return <section><p className="text-sm font-bold text-[#ff5f7e]">Personalize Me</p><h2 className="mt-2 font-display text-4xl font-bold leading-tight">{title}</h2>{subtitle && <p className="mt-2 text-sm text-black/55">{subtitle}</p>}<div className="mt-8 flex flex-wrap gap-3">{items.map((item) => <button key={item} className={`rounded-full border px-4 py-3 text-sm font-bold transition ${selected.includes(item) ? "border-[#ff5f7e] bg-[#ff5f7e] text-white shadow-lg shadow-[#ff5f7e]/25" : "border-black/10 bg-white text-black/70"}`} onClick={() => onToggle(item)}>{item}{multi && selected.includes(item) ? " +" : ""}</button>)}</div></section>;
}

function StylePicker({ value, onChange }: { value: TravelStyle; onChange: (value: TravelStyle) => void }) {
  const copy: Record<TravelStyle, string> = { Relaxed: "Take it slow.", Balanced: "See the highlights.", Packed: "I want to maximise my day." };
  return <section><p className="text-sm font-bold text-[#ff5f7e]">Personalize Me</p><h2 className="mt-2 font-display text-4xl font-bold leading-tight">What&apos;s your travel style?</h2><div className="mt-8 space-y-3">{styles.map((item) => <button key={item} onClick={() => onChange(item)} className={`w-full rounded-3xl border p-5 text-left ${value === item ? "border-[#ff5f7e] bg-[#fff0f3]" : "border-black/10 bg-white"}`}><b>{item}</b><p className="mt-1 text-sm text-black/55">{copy[item]}</p></button>)}</div></section>;
}

function KnownPlaces({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return <section><p className="text-sm font-bold text-[#ff5f7e]">Personalize Me</p><h2 className="mt-2 font-display text-4xl font-bold leading-tight">Any places already in mind?</h2><p className="mt-2 text-sm text-black/55">Pick known destinations or continue with D&apos;Ipoh&apos;s suggestions.</p><div className="mt-6 grid grid-cols-2 gap-3">{places.slice(0, 8).map((place) => <button key={place.id} onClick={() => onToggle(place.id)} className={`overflow-hidden rounded-2xl text-left shadow-sm ring-1 ${selected.includes(place.id) ? "ring-[#ff5f7e]" : "ring-black/5"}`}><div className="h-24" style={{ background: place.image }} /><div className="p-3"><b className="text-sm">{place.name}</b><p className="text-[11px] text-black/45">{place.category}</p></div></button>)}</div></section>;
}

function ResultPreview({ prefs, preview, onComplete }: { prefs: DemoState["preferences"]; preview: Place[]; onComplete: () => void }) {
  return <section><p className="text-sm font-bold text-[#ff5f7e]">Your Ipoh Day is Ready</p><h2 className="mt-2 font-display text-4xl font-bold leading-tight">Your personalized day</h2><div className="mt-4 flex flex-wrap gap-2">{[...prefs.interests.slice(0, 3), prefs.travelStyle, prefs.travellerType].map((item) => <Chip key={item}>{item}</Chip>)}</div><div className="mt-6 space-y-3">{preview.slice(0, 5).map((place, index) => <div key={place.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5"><span className="w-12 text-sm font-black text-[#ff5f7e]">{itineraryTimes[index] ?? "17:00"}</span><div><b>{place.name}</b><p className="text-xs text-black/45">{place.category} - {place.durationMinutes} mins</p></div></div>)}</div><button className="primary-btn mt-6" onClick={onComplete}>Generate My Ipoh Day</button></section>;
}

function Home({ state, pass, balance, recommendations, itinerary, progress, completedCount, onStory, onPlace, onPass, onQuest, onMap, onReward }: { state: DemoState; pass?: PassPackage; balance: number; recommendations: Place[]; itinerary: Place[]; progress: number; completedCount: number; onStory: (name: string) => void; onPlace: (id: string) => void; onPass: () => void; onQuest: () => void; onMap: () => void; onReward: (id: string) => void }) {
  const hero = recommendations[0];
  return <div className="space-y-6 p-5"><header className="flex items-center justify-between pt-2"><div><p className="text-sm">Good Morning, <b className="text-[#ff5f7e]">Jessica</b></p><h1 className="mt-1 text-sm text-black/50">Discover your favourite side of Ipoh.</h1></div><button className="icon-btn" onClick={onPass}>{pass ? "pass" : "plan"}</button></header><div className="search">Search Ipoh places, rewards, cafes</div><StoryRow onStory={onStory} /><ActivePassCard pass={pass} balance={balance} onClick={onPass} /><QuestCard completed={completedCount} total={checkpoints.length} progress={progress} onClick={onQuest} /><Section title={"Today's Itinerary"} action="View Map"><button className="w-full" onClick={onMap}><ItineraryList itinerary={itinerary} compact /></button></Section><Section title="Your Interests"><div className="flex gap-2 overflow-x-auto no-scrollbar">{state.preferences.interests.map((item) => <Chip key={item}>{item}</Chip>)}</div></Section><Section title="Recommended For You"><button className="featured-card text-left" onClick={() => onPlace(hero.id)}><div className="image-fill" style={{ background: hero.image }} /><div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-lg"><div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-2xl font-bold">{hero.name}</h2><p className="text-xs text-black/55">{recommendationReason(hero, state)}</p></div><span className="points">+{Math.round(hero.basePoints * (pass?.multiplier ?? 1))} pts</span></div></div></button></Section><Section title="More For You"><div className="flex gap-3 overflow-x-auto no-scrollbar">{recommendations.slice(1, 5).map((place) => <MiniPlace key={place.id} place={place} state={state} onClick={() => onPlace(place.id)} />)}</div></Section><Section title="Popular Rewards" action={`${balance} pts`}><div className="grid grid-cols-2 gap-3">{rewards.slice(0, 2).map((reward) => <RewardCard key={reward.id} reward={reward} stock={state.rewardStock[reward.id] ?? 0} onClick={() => onReward(reward.id)} />)}</div></Section></div>;
}

function ActivePassCard({ pass, balance, onClick }: { pass?: PassPackage; balance: number; onClick: () => void }) {
  if (!pass) return <button onClick={onClick} className="w-full rounded-[2rem] bg-[#171311] p-5 text-left text-white shadow-xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">Day Pass</p><h2 className="mt-2 font-display text-3xl font-bold">Choose how you want to experience Ipoh</h2><p className="mt-2 text-sm text-white/70">Quest+ adds transport, guide, an included experience, and 1.5x points.</p></button>;
  return <button onClick={onClick} className="w-full rounded-[2rem] bg-[linear-gradient(135deg,#ff5f7e,#ff8f70)] p-5 text-left text-white shadow-xl shadow-[#ff5f7e]/20"><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Active Pass</p><h2 className="font-display text-3xl font-bold">{pass.name}</h2></div><span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#ff5f7e]">{pass.multiplier}x</span></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold"><span className="rounded-2xl bg-white/18 p-2">{balance} pts</span><span className="rounded-2xl bg-white/18 p-2">RM{pass.fbCredit} F&B</span><span className="rounded-2xl bg-white/18 p-2">{pass.experiences || "PAYG"} exp</span></div></button>;
}

function QuestCard({ completed, total, progress, onClick }: { completed: number; total: number; progress: number; onClick: () => void }) {
  return <button onClick={onClick} className="w-full rounded-[2rem] bg-white p-5 text-left shadow-sm ring-1 ring-black/5"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase text-[#ff5f7e]">Today&apos;s Quest</p><h2 className="font-display text-2xl font-bold">{completed} of {total} checkpoints completed</h2></div><span className="points">+310 pts</span></div><div className="mt-4 h-3 overflow-hidden rounded-full bg-black/8"><div className="h-full rounded-full bg-[#d9ff36]" style={{ width: `${progress}%` }} /></div><p className="mt-2 text-sm font-bold text-black/45">Continue your quest</p></button>;
}

function Explore({ state, ranked, itinerary, category, query, onCategory, onQuery, onPlace, onMap }: { state: DemoState; ranked: Place[]; itinerary: Place[]; category: string; query: string; onCategory: (v: string) => void; onQuery: (v: string) => void; onPlace: (id: string) => void; onMap: () => void }) {
  const categories = ["All", "Food", "Coffee", "Culture", "Heritage", "Nature", "Shopping", "Family", "Couple", "Partner"];
  const filtered = ranked.filter((place) => (category === "All" || place.category === category || place.tags.includes(category) || (category === "Partner" && place.partner) || (category === "Family" && place.familyFriendly) || (category === "Couple" && place.coupleFriendly)) && place.name.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-5 p-5"><TopTitle title="Explore" subtitle="Recommended places, itinerary, and map-aware picks" /><input className="field" placeholder="Search places" value={query} onChange={(event) => onQuery(event.target.value)} /><div className="flex gap-2 overflow-x-auto no-scrollbar">{categories.map((item) => <button key={item} onClick={() => onCategory(item)} className={`chip-btn ${category === item ? "active" : ""}`}>{item}</button>)}</div><Section title="Your Itinerary" action="Map"><button onClick={onMap} className="w-full"><ItineraryList itinerary={itinerary} compact /></button></Section><Section title="Recommended For You"><div className="grid grid-cols-2 gap-3">{filtered.map((place) => <LocationCard key={place.id} place={place} state={state} onClick={() => onPlace(place.id)} />)}</div></Section></div>;
}

function MapScreen({ itinerary, places, completedCount, progress, onPlace, onQuest }: { itinerary: Place[]; places: Place[]; completedCount: number; progress: number; onPlace: (id: string) => void; onQuest: () => void }) {
  return <div className="space-y-5 p-5"><TopTitle title="Your Ipoh Day" subtitle="Map, route order, nearby places, and quest progress" /><div className="relative h-80 overflow-hidden rounded-[2rem] bg-[#f4f0ed] shadow-sm ring-1 ring-black/5"><div className="absolute inset-4 rounded-[1.5rem] bg-[linear-gradient(135deg,#fff0f3,#d9c9ee_48%,#d9ff36)] opacity-80" /><div className="absolute left-8 top-10 h-56 w-72 rounded-full border-2 border-dashed border-white/80" /><div className="absolute inset-0">{itinerary.map((place, index) => <button key={place.id} onClick={() => onPlace(place.id)} className="absolute grid h-11 w-11 place-items-center rounded-full bg-[#ff5f7e] text-sm font-black text-white shadow-xl ring-4 ring-white" style={{ left: `${18 + (index % 2) * 46}%`, top: `${12 + index * 13}%` }}>{index + 1}</button>)}</div><div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/92 p-3"><p className="text-xs font-black text-[#ff5f7e]">Suggested route</p><p className="truncate text-sm font-bold">{itinerary.map((place) => place.name).join(" -> ")}</p></div></div><Section title="Route Order"><ItineraryList itinerary={itinerary} /></Section><QuestCard completed={completedCount} total={checkpoints.length} progress={progress} onClick={onQuest} /><Section title="Nearby Places"><div className="flex gap-3 overflow-x-auto no-scrollbar">{places.slice(0, 6).map((place) => <MiniMapPlace key={place.id} place={place} onClick={() => onPlace(place.id)} />)}</div></Section></div>;
}

function PassSelection({ current, onChoose }: { current: PassTier; onChoose: (tier: PassTier) => void }) {
  return <div className="space-y-5 p-5"><TopTitle title="Choose how you want to experience Ipoh" subtitle="The packages are mocked, but the state changes are real." />{passPackages.map((plan) => <button key={plan.tier} onClick={() => onChoose(plan.tier)} className={`w-full rounded-[2rem] p-5 text-left shadow-sm ring-1 ${plan.popular ? "bg-[linear-gradient(135deg,#ff5f7e,#ff8f70)] text-white ring-[#ff5f7e] shadow-xl shadow-[#ff5f7e]/20" : "bg-white ring-black/5"}`}><div className="flex items-start justify-between"><div>{plan.popular && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/75">Most Popular</p>}<h2 className="font-display text-3xl font-bold">{plan.name}</h2><p className={`mt-1 text-sm ${plan.popular ? "text-white/80" : "text-black/55"}`}>{plan.positioning}</p></div><b className="text-2xl">RM{plan.adult}</b></div><p className="mt-4 text-xs font-black uppercase tracking-[0.18em]">{plan.short}</p><div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold"><span className="rounded-2xl bg-black/5 p-2">{plan.transport}</span><span className="rounded-2xl bg-black/5 p-2">{plan.guide}</span><span className="rounded-2xl bg-black/5 p-2">RM{plan.fbCredit} F&B</span><span className="rounded-2xl bg-black/5 p-2">{plan.multiplier}x points</span></div>{current === plan.tier && <p className="mt-3 text-xs font-black">Active now</p>}</button>)}</div>;
}

function PassReview({ plan, onBack, onActivate }: { plan: PassPackage; onBack: () => void; onActivate: () => void }) {
  return <div className="space-y-5 p-5"><button className="icon-btn" onClick={onBack}>back</button><div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5"><p className="text-xs font-black uppercase text-[#ff5f7e]">Review your pass</p><h1 className="mt-2 font-display text-4xl font-bold">{plan.name}</h1><p className="mt-1 text-3xl font-black">RM{plan.adult}</p><p className="mt-3 text-sm text-black/55">{plan.positioning}</p><div className="mt-5 grid grid-cols-2 gap-3"><Info label="Points" value={`${plan.multiplier}x multiplier`} /><Info label="F&B Credit" value={`RM${plan.fbCredit}`} /><Info label="Experiences" value={plan.experiences ? `${plan.experiences} included` : "Pay-as-you-go"} /><Info label="Swaps" value={`${plan.swaps}`} /><Info label="Transport" value={plan.transport} /><Info label="Guide" value={plan.guide} /></div></div><button className="primary-btn" onClick={onActivate}>Activate Pass</button></div>;
}

function QuestScreen({ state, pass, progress, onScan, onMap }: { state: DemoState; pass?: PassPackage; progress: number; onScan: () => void; onMap: () => void }) {
  return <div className="space-y-5 p-5"><TopTitle title="Ipoh Heritage Quest" subtitle={`${checkpoints.length} checkpoints tied to QR check-ins`} /><QuestCard completed={state.checkedIn.length} total={checkpoints.length} progress={progress} onClick={onScan} /><button className="secondary-btn" onClick={onMap}>Open Quest Map</button><div className="space-y-3">{checkpoints.map((checkpoint) => { const place = places.find((item) => item.id === checkpoint.placeId)!; const done = state.checkedIn.includes(checkpoint.id); return <div key={checkpoint.id} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5"><div className="flex gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-black ${done ? "bg-[#d9ff36]" : "bg-[#fff0f3] text-[#ff5f7e]"}`}>{done ? "OK" : ""}</span><div><b>{checkpoint.name}</b><p className="mt-1 text-sm text-black/55">{checkpoint.description}</p><p className="mt-2 text-xs font-black text-[#ff5f7e]">+{Math.round(place.basePoints * (pass?.multiplier ?? 1))} pts - {checkpoint.reward}</p></div></div></div>; })}</div></div>;
}

function Scan({ result, onValidate, onQuest, onRewards }: { result: { checkpoint: Checkpoint; place: Place; base: number; multiplier: number; earned: number; balance: number } | null; onValidate: (value: string) => void; onQuest: () => void; onRewards: () => void }) {
  const [token, setToken] = useState("checkpoint:kong-heng");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const [camera, setCamera] = useState("idle");
  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); streamRef.current?.getTracks().forEach((track) => track.stop()); }, []);
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      const BarcodeDetectorCtor = (window as unknown as { BarcodeDetector?: new (options: { formats: string[] }) => { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>> } }).BarcodeDetector;
      if (!BarcodeDetectorCtor) return setCamera("Camera ready. Manual token still works.");
      const detector = new BarcodeDetectorCtor({ formats: ["qr_code"] });
      timerRef.current = window.setInterval(async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) return;
        const codes = await detector.detect(videoRef.current).catch(() => []);
        if (codes[0]?.rawValue) onValidate(codes[0].rawValue);
      }, 700);
      setCamera("Scanning for checkpoint QR.");
    } catch {
      setCamera("Camera unavailable. Use manual token.");
    }
  }
  if (result) return <div className="p-5"><div className="success-card"><div className="check">OK</div><p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Checkpoint Verified</p><h1 className="mt-3 font-display text-4xl font-bold">{result.checkpoint.name}</h1><div className="mx-auto mt-6 max-w-[15rem] rounded-2xl bg-white/15 p-4 text-sm"><p>Base Points {result.base}</p><p>Multiplier x{result.multiplier}</p></div><p className="mt-6 text-5xl font-black">+{result.earned}</p><p className="text-sm text-white/80">You now have {result.balance.toLocaleString()} pts</p></div><button className="primary-btn mt-5" onClick={onRewards}>View Rewards</button><button className="secondary-btn mt-3" onClick={onQuest}>Continue Quest</button></div>;
  return <div className="space-y-5 p-5"><TopTitle title="Scan QR" subtitle="Visit checkpoints, scan QR, earn pass-multiplied points" /><div className="rounded-[2rem] bg-black p-3"><video ref={videoRef} autoPlay playsInline muted className="h-72 w-full rounded-[1.4rem] bg-[#171311] object-cover" /><button className="secondary-btn mt-3 bg-white" onClick={startCamera}>{camera === "idle" ? "Start Camera" : camera}</button></div><div className="rounded-[2rem] border border-black/10 bg-white p-4"><label className="field-label">Enter Demo QR Code</label><input className="field" value={token} onChange={(event) => setToken(event.target.value)} /><button className="primary-btn mt-3" onClick={() => onValidate(token)}>Validate Checkpoint</button><p className="mt-3 text-xs text-black/45">Try checkpoint:kong-heng, checkpoint:concubine-lane, checkpoint:old-town, checkpoint:han-chin-pet-soo, or checkpoint:local-snack-box.</p></div></div>;
}

function RewardsScreen({ state, pass, onReward }: { state: DemoState; pass?: PassPackage; onReward: (id: string) => void }) {
  const next = rewards.find((reward) => reward.points > state.points) ?? rewards[0];
  return <div className="space-y-5 p-5"><TopTitle title="Your Points" subtitle={`${state.points.toLocaleString()} pts available`} /><div className="rounded-[2rem] bg-[#171311] p-6 text-white"><p className="text-sm text-white/60">Current Pass</p><h2 className="font-display text-3xl font-bold">{pass?.name ?? "No pass yet"}</h2><p className="mt-2 text-sm text-white/70">{pass ? `${pass.multiplier}x multiplier - RM${state.fbCreditRemaining.toFixed(2)} F&B remaining` : "Choose a pass to unlock multipliers."}</p><p className="mt-5 text-5xl font-black">{state.points}</p><p className="text-sm text-white/70">{state.points < next.points ? `You are ${next.points - state.points} pts away from ${next.name}.` : "You have a reward ready to redeem."}</p></div><Section title="Reward Catalogue"><div className="grid grid-cols-2 gap-3">{rewards.map((reward) => <RewardCard key={reward.id} reward={reward} stock={state.rewardStock[reward.id] ?? 0} onClick={() => onReward(reward.id)} />)}</div></Section><Section title="Recent Activity"><ActivityList state={state} /></Section></div>;
}

function RewardDetail({ reward, state, redemption, onBack, onRedeem }: { reward: Reward; state: DemoState; redemption: { rewardId: string; code: string } | null; onBack: () => void; onRedeem: (reward: Reward) => void }) {
  const stock = state.rewardStock[reward.id] ?? 0;
  if (redemption?.rewardId === reward.id) return <div className="p-5"><button className="icon-btn mb-5" onClick={onBack}>back</button><div className="success-card"><p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Reward Redeemed</p><h1 className="mt-3 font-display text-4xl font-bold">{reward.name}</h1><div className="mx-auto mt-8 w-max rounded-2xl bg-white px-6 py-4 font-mono text-2xl font-black text-[#171311]">{redemption.code}</div><p className="mt-4 text-sm text-white/80">Show this code at the partner counter.</p></div></div>;
  return <div><div className="h-80" style={{ background: reward.image }} /><div className="-mt-8 rounded-t-[2rem] bg-white p-5"><button className="icon-btn mb-4" onClick={onBack}>back</button><h1 className="font-display text-4xl font-bold">{reward.name}</h1><p className="mt-2 text-sm leading-6 text-black/60">{reward.merchant} - {reward.category}</p><div className="mt-5 grid grid-cols-2 gap-3"><Info label="Required" value={`${reward.points} pts`} /><Info label="Availability" value={`${stock} left`} /><Info label="Your Balance" value={`${state.points} pts`} /><Info label="After Redeem" value={`${Math.max(0, state.points - reward.points)} pts`} /></div><button className="primary-btn mt-6 disabled:opacity-45" disabled={state.points < reward.points || stock < 1} onClick={() => onRedeem(reward)}>{state.points < reward.points ? `Need ${reward.points - state.points} more pts` : "Redeem Reward"}</button></div></div>;
}

function Profile({ state, pass, onPass, onReset }: { state: DemoState; pass?: PassPackage; onPass: () => void; onReset: () => void }) {
  return <div className="space-y-5 p-5"><div className="pt-6 text-center"><div className="mx-auto h-24 w-24 rounded-full bg-[linear-gradient(135deg,#ffd166,#ef476f)] ring-4 ring-white shadow-xl" /><h1 className="mt-4 font-display text-3xl font-bold">Jessica Patterson</h1><p className="text-sm text-black/45">@jessica_ipoh</p><div className="mt-5 grid grid-cols-3 gap-3"><Info label="Pass" value={pass?.name ?? "Choose"} /><Info label="Points" value={`${state.points}`} /><Info label="Rewards" value={`${state.redemptions.length}`} /></div></div><Section title="My Pass"><ActivePassCard pass={pass} balance={state.points} onClick={onPass} /></Section><Section title="Entitlements"><div className="grid grid-cols-2 gap-3"><Info label="F&B Credit" value={`RM${state.fbCreditRemaining.toFixed(2)}`} /><Info label="Experiences" value={`${state.experiencesRemaining} remaining`} /><Info label="Itinerary Swaps" value={`${state.itinerarySwapsRemaining}`} /><Info label="Checkpoints" value={`${state.checkedIn.length}/${checkpoints.length}`} /></div></Section><Section title="Included Experiences"><div className="flex gap-2 overflow-x-auto no-scrollbar">{experiences.map((item, index) => <span key={item} className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${index < state.experiencesRemaining ? "bg-[#d9ff36] text-[#171311]" : "bg-[#fbf7f3] text-black/45"}`}>{item}</span>)}</div></Section><Section title="My Preferences"><div className="flex flex-wrap gap-2">{[...state.preferences.interests, state.preferences.travellerType, state.preferences.travelStyle].map((item) => <Chip key={item}>{item}</Chip>)}</div></Section><Section title="Redemption History"><div className="space-y-2">{state.redemptions.length ? state.redemptions.map((item) => <div key={item.id} className="rounded-2xl bg-white p-3 text-sm shadow-sm ring-1 ring-black/5"><b>{rewards.find((reward) => reward.id === item.rewardId)?.name}</b><p className="font-mono text-xs text-black/45">{item.code}</p></div>) : <p className="text-sm text-black/45">No rewards redeemed yet.</p>}</div></Section><button className="secondary-btn" onClick={onReset}>Reset Demo</button></div>;
}

function PlaceDetail({ place, state, pass, alternatives, onBack, onMap, onScan, onAdd, onSwap, onPlace }: { place: Place; state: DemoState; pass?: PassPackage; alternatives: Place[]; onBack: () => void; onMap: () => void; onScan: () => void; onAdd: (id: string) => void; onSwap: (oldId: string, newId: string) => void; onPlace: (id: string) => void }) {
  const inItinerary = state.itinerary.includes(place.id);
  const points = Math.round(place.basePoints * (pass?.multiplier ?? 1));
  const swappable = inItinerary && state.itinerarySwapsRemaining !== 0;
  return <div><div className="relative h-80" style={{ background: place.image }}><button className="absolute left-5 top-5 icon-btn" onClick={onBack}>back</button><button className="absolute right-5 top-5 icon-btn" onClick={onMap}>map</button></div><div className="-mt-8 rounded-t-[2rem] bg-white p-5"><div className="flex items-start justify-between gap-3"><div><h1 className="font-display text-4xl font-bold">{place.name}</h1><p className="mt-1 text-sm text-black/55">Star {place.rating} - {place.tags.slice(0, 3).join(" - ")}</p></div>{place.checkpoint && <span className="points">+{points}</span>}</div><div className="mt-4 rounded-2xl bg-[#fff5f3] p-4 text-sm font-semibold text-[#c7465f]">{recommendationReason(place, state)}</div><Section title="About"><p className="text-sm leading-6 text-black/65">{place.description}</p></Section><div className="grid grid-cols-2 gap-3 text-sm"><Info label="Distance" value={`${place.distanceKm} km`} /><Info label="Opening" value={place.openingHours} /><Info label="Budget" value={place.priceRange} /><Info label="Duration" value={`${place.durationMinutes} mins`} /></div>{place.partner && <div className="mt-4 rounded-2xl bg-[#171311] p-4 text-white"><p className="text-xs font-black uppercase text-white/55">{pass?.tier === "VIP" ? "VIP Partner Perk" : "Partner Perk"}</p><p className="mt-1 text-sm font-bold">{pass?.tier === "VIP" ? "Priority reservation plus exclusive reward." : pass?.tier === "QUEST_PLUS" ? "Quest+ members get 10% off selected items." : "Standard members unlock local privileges."}</p></div>}<div className="mt-5 grid grid-cols-2 gap-3"><button className="secondary-btn" onClick={onMap}>View Map</button><button className="primary-btn" onClick={() => onAdd(place.id)}>{inItinerary ? "In My Day" : "Add to My Day"}</button></div>{place.checkpoint && <button className="primary-btn mt-3" onClick={onScan}>Scan Checkpoint</button>}{swappable && <Section title="Replace this stop?"><div className="flex gap-3 overflow-x-auto no-scrollbar">{alternatives.slice(0, 4).map((item) => <button key={item.id} onClick={() => onSwap(place.id, item.id)} className="w-40 shrink-0 overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5"><div className="h-28" style={{ background: item.image }} /><div className="p-3"><b className="text-sm">{item.name}</b><p className="text-[11px] text-black/45">Swap in</p></div></button>)}</div></Section>}<Section title="Nearby Places"><div className="flex gap-3 overflow-x-auto no-scrollbar">{alternatives.map((item) => <MiniPlace key={item.id} place={item} state={state} onClick={() => onPlace(item.id)} />)}</div></Section></div></div>;
}

function ItineraryList({ itinerary, compact }: { itinerary: Place[]; compact?: boolean }) {
  return <div className="space-y-2">{itinerary.map((place, index) => <div key={place.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-black/5"><span className="w-12 text-sm font-black text-[#ff5f7e]">{itineraryTimes[index] ?? "17:00"}</span><div className="min-w-0"><b className="block truncate">{place.name}</b><p className="truncate text-xs text-black/45">{compact ? place.category : `${place.category} - ${place.distanceKm} km - ${place.openingHours}`}</p></div></div>)}</div>;
}

function ActivityList({ state }: { state: DemoState }) {
  return <div className="space-y-3">{state.pointTransactions.slice(0, 5).map((tx) => <div key={tx.id} className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-sm"><div><p className="font-bold">{tx.label}</p><p className="text-xs text-black/45">{new Date(tx.date).toLocaleDateString()}</p></div><b className={tx.amount > 0 ? "text-[#13a56b]" : "text-[#ef476f]"}>{tx.amount > 0 ? "+" : ""}{tx.amount}</b></div>)}</div>;
}

function BottomNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items: [View, string][] = [["home", "Home"], ["explore", "Explore"], ["scan", "Scan"], ["rewards", "Rewards"], ["profile", "Profile"]];
  return <nav className="fixed bottom-4 left-1/2 z-40 grid w-[min(92vw,390px)] -translate-x-1/2 grid-cols-5 items-center rounded-full border border-black/10 bg-white/95 p-2 shadow-2xl backdrop-blur">{items.map(([id, label]) => <button key={id} onClick={() => setView(id)} className={`h-12 rounded-full text-[11px] font-bold ${id === "scan" ? "-mt-8 h-16 bg-[#d9ff36] text-black shadow-xl" : view === id ? "text-[#ff5f7e]" : "text-black/45"}`}>{label}</button>)}</nav>;
}

function StoryRow({ onStory }: { onStory: (name: string) => void }) {
  const stories = [["Your Story", "My Day", "linear-gradient(135deg,#ffd166,#ef476f)"], ["Aina", "Kek Lok Tong", "linear-gradient(135deg,#80ed99,#57cc99)"], ["Sarah", "Concubine Lane", "linear-gradient(135deg,#ffafcc,#ffc8dd)"], ["Amir", "White Coffee", "linear-gradient(135deg,#cdb4db,#bde0fe)"], ["Jason", "Tasik Cermin", "linear-gradient(135deg,#90dbf4,#a3c4f3)"]];
  return <div className="flex gap-3 overflow-x-auto no-scrollbar">{stories.map(([name, label, bg]) => <button key={name} className="w-[72px] shrink-0 text-center" onClick={() => onStory(name)}><span className="mx-auto block h-16 w-16 rounded-full border-2 border-[#ff5f7e] p-1"><span className="block h-full rounded-full" style={{ background: bg }} /></span><span className="mt-1 block truncate text-[11px] font-bold">{name}</span><span className="block truncate text-[10px] text-black/40">{label}</span></button>)}</div>;
}

function StoryModal({ name, onClose }: { name: string; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5"><div className="relative h-[720px] max-h-[88vh] w-full max-w-sm overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#ff5f7e,#ffb067)] p-5 text-white shadow-2xl"><button className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-2 text-sm font-bold" onClick={onClose}>Close</button><div className="mt-auto flex h-full flex-col justify-end"><p className="text-sm font-bold">{name}</p><h2 className="font-display text-4xl font-bold">A bright Ipoh stop worth saving.</h2><p className="mt-2 text-sm text-white/80">Static story preview for the stakeholder demo.</p></div></div></div>;
}

function LocationCard({ place, state, onClick }: { place: Place; state: DemoState; onClick: () => void }) {
  return <button onClick={onClick} className="overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5"><div className="h-36" style={{ background: place.image }} /><div className="p-3"><h3 className="font-bold leading-tight">{place.name}</h3><p className="mt-1 text-[11px] text-black/45">{place.tags.slice(0, 2).join(" - ")}</p><div className="mt-2 flex items-center justify-between"><span className="rounded-full bg-[#fff0f3] px-2 py-1 text-[10px] font-bold text-[#ff5f7e]">{Math.min(99, scorePlace(place, state))}% Match</span>{place.checkpoint && <span className="text-[10px] font-black">+{place.basePoints}</span>}</div></div></button>;
}

function MiniPlace({ place, state, onClick }: { place: Place; state: DemoState; onClick: () => void }) {
  return <button onClick={onClick} className="w-40 shrink-0 overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5"><div className="h-32" style={{ background: place.image }} /><div className="p-3"><h3 className="truncate font-bold">{place.name}</h3><p className="text-[11px] text-black/45">{Math.min(99, scorePlace(place, state))}% match</p></div></button>;
}

function MiniMapPlace({ place, onClick }: { place: Place; onClick: () => void }) {
  return <button onClick={onClick} className="w-44 shrink-0 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-black/5"><b className="block truncate">{place.name}</b><p className="mt-1 text-xs text-black/45">{place.distanceKm} km nearby</p><p className="mt-2 text-[10px] font-black text-[#ff5f7e]">{place.latitude.toFixed(3)}, {place.longitude.toFixed(3)}</p></button>;
}

function RewardCard({ reward, stock, onClick }: { reward: Reward; stock: number; onClick: () => void }) {
  return <button onClick={onClick} className="overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5"><div className="h-28" style={{ background: reward.image }} /><div className="p-3"><h3 className="font-bold leading-tight">{reward.name}</h3><p className="mt-1 text-xs font-black text-[#ff5f7e]">{reward.points} pts</p><p className="text-[10px] text-black/40">{reward.merchant} - {stock} left</p></div></button>;
}

function Section({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return <section className="space-y-3"><div className="flex items-center justify-between"><h2 className="font-display text-xl font-bold">{title}</h2>{action && <span className="text-xs font-black text-[#ff5f7e]">{action}</span>}</div>{children}</section>;
}

function TopTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return <header className="pt-4"><h1 className="font-display text-4xl font-bold leading-tight">{title}</h1><p className="mt-1 text-sm text-black/50">{subtitle}</p></header>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-[#fbf7f3] p-4"><p className="text-[11px] font-bold uppercase text-black/35">{label}</p><p className="mt-1 text-sm font-black capitalize">{value}</p></div>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 rounded-full bg-[#fff0f3] px-3 py-2 text-xs font-bold text-[#c7465f]">{children}</span>;
}
