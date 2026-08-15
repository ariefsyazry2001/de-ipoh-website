export type DateRange = "Today" | "7 Days" | "30 Days" | "Custom";

export const rangeMultipliers: Record<DateRange, number> = {
  Today: 1,
  "7 Days": 6.8,
  "30 Days": 27.5,
  Custom: 12.4,
};

export const overview = {
  updatedAt: "15 Aug 2026, 1:30 PM",
  kpis: [
    { label: "Today's Revenue", value: "RM12,840", change: "+12%", context: "Money" },
    { label: "Active Travellers", value: "86", change: "+8%", context: "Customers" },
    { label: "Quest Completion", value: "72%", change: "+4%", context: "Engagement" },
    { label: "Avg Experience Rating", value: "4.7 / 5", change: "+0.2", context: "Quality" },
  ],
  revenueBreakdown: [
    { label: "Pass Sales", value: 28400 },
    { label: "Experiences", value: 4200 },
    { label: "Partner Fees", value: 2800 },
    { label: "Add-ons", value: 1820 },
    { label: "Merchandise", value: 1200 },
  ],
  revenueTrend: [4200, 5100, 4900, 6800, 7400, 9150, 12840],
};

export const packages = [
  { name: "Explorer", sold: 42, revenue: 4158, share: 32, completion: 66, rating: 4.4, points: 260, redemption: 42, effort: "Low" },
  { name: "Quest+", sold: 58, revenue: 11542, share: 45, completion: 78, rating: 4.8, points: 420, redemption: 64, effort: "Medium" },
  { name: "VIP Explorer", sold: 29, revenue: 11571, share: 23, completion: 81, rating: 4.9, points: 510, redemption: 71, effort: "High" },
];

export const questFunnel = [
  { label: "Started Quest", value: 104, rate: 100 },
  { label: "First Checkpoint", value: 96, rate: 92 },
  { label: "Third Checkpoint", value: 84, rate: 81 },
  { label: "Quest Completed", value: 75, rate: 72 },
  { label: "Reward Redeemed", value: 51, rate: 49 },
];

export const questMetrics = [
  { label: "Average Checkpoints", value: "4.2" },
  { label: "Average Quest Duration", value: "5h 18m" },
  { label: "Total QR Scans", value: "438" },
  { label: "Avg Points Earned", value: "420" },
];

export const checkpoints = [
  { name: "Kong Heng Square", quest: "Ipoh Heritage Quest", visits: 86, scans: 81, completion: 94, points: 4860, status: "Healthy" },
  { name: "Concubine Lane", quest: "Ipoh Heritage Quest", visits: 82, scans: 77, completion: 94, points: 5390, status: "Healthy" },
  { name: "Old Town White Coffee", quest: "Coffee Trail", visits: 74, scans: 68, completion: 92, points: 3400, status: "Healthy" },
  { name: "Kek Lok Tong", quest: "Nature Discovery", visits: 52, scans: 41, completion: 79, points: 3280, status: "Watch" },
  { name: "Souvenir Partner", quest: "Local Rewards", visits: 48, scans: 31, completion: 65, points: 1240, status: "Problem" },
];

export const guides = [
  { name: "Aina", groups: 18, travellers: 112, completion: 91, rating: 4.8, complaints: 1, quality: 91, status: "Healthy" },
  { name: "Amir", groups: 16, travellers: 98, completion: 89, rating: 4.7, complaints: 0, quality: 89, status: "Healthy" },
  { name: "Jason", groups: 21, travellers: 124, completion: 72, rating: 4.1, complaints: 6, quality: 71, status: "Coach" },
  { name: "Sarah", groups: 14, travellers: 87, completion: 94, rating: 4.9, complaints: 0, quality: 94, status: "Excellent" },
];

export const partners = [
  { name: "Platform Coffee", category: "Coffee", visits: 328, scans: 282, redemptions: 91, conversion: 32, views: 1284, impressions: 5821, status: "Strong" },
  { name: "Kong Heng", category: "Heritage", visits: 412, scans: 361, redemptions: 104, conversion: 29, views: 1640, impressions: 7102, status: "Strong" },
  { name: "Souvenir Partner", category: "Retail", visits: 187, scans: 151, redemptions: 62, conversion: 41, views: 820, impressions: 2800, status: "Inventory" },
  { name: "Local Restaurant", category: "Food", visits: 296, scans: 246, redemptions: 87, conversion: 35, views: 1106, impressions: 4902, status: "Healthy" },
];

export const rewards = {
  summary: [
    { label: "Points Issued", value: "128,450" },
    { label: "Points Redeemed", value: "82,300" },
    { label: "Redemption Rate", value: "64%" },
  ],
  items: [
    { name: "Ipoh White Coffee", cost: 700, redeemed: 184, stock: 8, popularity: 92, status: "Low Stock" },
    { name: "D'Ipoh Keychain", cost: 500, redeemed: 142, stock: 4, popularity: 78, status: "Low Stock" },
    { name: "RM10 F&B Voucher", cost: 600, redeemed: 119, stock: 18, popularity: 74, status: "Healthy" },
    { name: "Heritage Magnet", cost: 350, redeemed: 86, stock: 21, popularity: 58, status: "Healthy" },
    { name: "Tote Bag", cost: 1000, redeemed: 42, stock: 3, popularity: 39, status: "Low Stock" },
  ],
};

export const travellerInsights = {
  interests: [
    { label: "Food", value: 68 },
    { label: "Coffee", value: 61 },
    { label: "Culture", value: 47 },
    { label: "Nature", value: 41 },
    { label: "Shopping", value: 32 },
    { label: "History", value: 29 },
  ],
  types: [
    { label: "Couples", value: 34 },
    { label: "Families", value: 27 },
    { label: "Friends", value: 22 },
    { label: "Solo", value: 13 },
    { label: "Groups", value: 4 },
  ],
  budgets: [
    { label: "Budget", value: 28 },
    { label: "Comfortable", value: 51 },
    { label: "Premium", value: 21 },
  ],
  combinations: ["Food + Coffee", "Food + Heritage", "Nature + Relaxation", "Family + Activities", "Coffee + Culture"],
};

export const capacity = [
  { label: "Today's Travellers", value: 86, total: 150, status: "Healthy" },
  { label: "Quest+ Transport", value: 42, total: 60, status: "Moderate" },
  { label: "Guides", value: 6, total: 8, status: "Moderate" },
  { label: "VIP Capacity", value: 8, total: 12, status: "Watch" },
  { label: "Experience Slots", value: 44, total: 52, status: "Watch" },
];

export const alerts = [
  { title: "Kek Lok Tong completion dropped 18%", detail: "Route timing may be too tight after lunch. Review itinerary order.", severity: "Watch" },
  { title: "Platform Coffee reward inventory is low", detail: "White Coffee reward has 8 units left. Restock before weekend.", severity: "Inventory" },
  { title: "Guide Jason received 3 low ratings this week", detail: "High tour count but lower completion and quality scores.", severity: "Quality" },
  { title: "Quest+ transport reaches 85% capacity tomorrow", detail: "Consider adding a shared van or limiting new Quest+ slots.", severity: "Capacity" },
];

export const adminSections = [
  { label: "Dashboard", href: "/admin", group: "Overview" },
  { label: "Passes", href: "/admin/passes", group: "Business" },
  { label: "Quests", href: "/admin/quests", group: "Experience" },
  { label: "Checkpoints", href: "/admin/checkpoints", group: "Experience" },
  { label: "Rewards", href: "/admin/rewards", group: "Experience" },
  { label: "Guides", href: "/admin/guides", group: "Operations" },
  { label: "Partners", href: "/admin/partners", group: "Partners" },
  { label: "Travellers", href: "/admin/travellers", group: "Insights" },
  { label: "Capacity", href: "/admin/capacity", group: "Operations" },
];
