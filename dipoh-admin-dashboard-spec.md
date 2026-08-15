# D'Ipoh Admin Dashboard — Stakeholder Prototype Specification

## 1. Purpose

Build a **local stakeholder-facing admin dashboard** for D'Ipoh.

The dashboard exists to answer three management questions:

1. **Are we growing sustainably?**
2. **Where are problems happening in the customer journey?**
3. **Can the operation scale without sacrificing service quality?**

The dashboard must help administrators monitor:

- Revenue
- Pass performance
- Travellers
- Quest completion
- QR checkpoint activity
- Reward redemption
- Guide performance
- Partner performance
- Traveller preferences
- Operational capacity
- Business alerts

This is a **frontend-only local prototype**. Do not create a backend or database at this stage. Use seeded/mock data.

---

## 2. Business Context

The customer journey is:

```text
PERSONALISE
    ↓
GET CURATED IPOH DAY
    ↓
CHOOSE PASS
    ↓
EXPLORE
    ↓
CHECK IN
    ↓
EARN POINTS
    ↓
REDEEM REWARD
    ↓
EXPLORE MORE
```

Current packages:

```text
Explorer      RM99
Quest+        RM199 ⭐ MOST POPULAR
VIP Explorer  RM399
```

The admin dashboard must show whether these experiences are working commercially and operationally.

---

## 3. Dashboard Goals

### 3.1 Sustainable KPIs

Avoid measuring volume alone.

Bad:

```text
Guide completed 25 tours
```

Better:

```text
Guide completed 25 tours
Average traveller rating: 4.8
Quest completion rate: 91%
Complaints: 1
```

The goal is to encourage productivity **without sacrificing quality**.

### 3.2 Monitoring Mechanism

Represent key customer actions as measurable events:

```text
User Personalised
      ↓
Itinerary Generated
      ↓
Pass Activated
      ↓
Quest Started
      ↓
Checkpoint Scanned
      ↓
Points Earned
      ↓
Quest Completed
      ↓
Reward Redeemed
```

For the prototype, all event data can be mocked.

### 3.3 Scalability Monitoring

The dashboard should help management understand:

- How many travellers can D'Ipoh support today?
- Are guides fully booked?
- Is transport capacity becoming a bottleneck?
- Are Quest+ customers growing faster than operations can support?
- Is VIP too operationally heavy?
- Which package gives the strongest revenue relative to operational effort?

---

## 4. Technical Scope

Use the existing frontend stack.

Recommended:

```text
Next.js
React
TypeScript
Tailwind CSS
```

Do NOT add:

- Backend API
- PostgreSQL
- MySQL
- Redis
- R2 / S3
- Payment gateway
- Merchant API
- Transport API
- Authentication server

Use mock data and local state. `localStorage` is optional.

---

## 5. Suggested Routes

Create:

```text
/admin
```

Optional detail routes:

```text
/admin/passes
/admin/quests
/admin/checkpoints
/admin/rewards
/admin/guides
/admin/partners
/admin/travellers
/admin/capacity
```

The `/admin` Overview is the priority.

---

## 6. Admin Navigation

Use a desktop-first sidebar:

```text
D'IPOH ADMIN

OVERVIEW
▣ Dashboard

BUSINESS
├── Passes
├── Revenue
└── Travellers

EXPERIENCE
├── Quests
├── Checkpoints
├── Rewards
└── Itineraries

OPERATIONS
├── Guides
├── Experiences
└── Capacity

PARTNERS
├── Merchants
└── Partner Performance

INSIGHTS
└── Traveller Insights
```

---

## 7. Dashboard Header

```text
D'IPOH ADMIN

Overview

[ Today ] [ 7 Days ] [ 30 Days ] [ Custom ]

Last updated: 15 Aug 2026, 1:30 PM
```

Optional:

- Notifications
- Admin profile

---

## 8. Primary KPI Cards

### Revenue

```text
TODAY'S REVENUE
RM12,840
↑ 12%
```

### Active Travellers

```text
ACTIVE TRAVELLERS
86
↑ 8%
```

### Quest Completion

```text
QUEST COMPLETION
72%
↑ 4%
```

### Average Rating

```text
AVG EXPERIENCE RATING
4.7 / 5
↑ 0.2
```

These four KPIs represent:

```text
Money → Customers → Engagement → Quality
```

---

## 9. Package Performance

Show:

```text
PACKAGE PERFORMANCE

Package        Sold      Revenue      Share

Explorer        42       RM4,158       32%
Quest+          58       RM11,542      45% ⭐
VIP Explorer    29       RM11,571      23%
```

Highlight Quest+:

```text
MOST POPULAR

Quest+ ⭐

45% of bookings
RM11,542 revenue
78% quest completion
4.8 average rating
```

Purpose:

- Validate pricing
- Confirm whether Quest+ is actually the sweet spot
- Compare demand
- Identify underperforming tiers

---

## 10. Revenue

Show:

```text
TOTAL REVENUE
RM38,420
```

Breakdown:

```text
Pass Sales        RM28,400
Experiences        RM4,200
Partner Fees       RM2,800
Add-ons            RM1,820
Merchandise        RM1,200
```

Recommended visualizations:

- Bar chart
- Donut chart
- Stacked bar

Also add a 7-day revenue trend using a line chart.

---

## 11. Quest Performance

Show:

```text
QUEST PERFORMANCE

Started Today            104
Reached First Checkpoint   96
Reached Third Checkpoint   84
Completed                  75
Redeemed Reward            51
```

### Quest Funnel

```text
Started Quest
104
 │
 ▼
First Checkpoint
96
92%
 │
 ▼
Third Checkpoint
84
81%
 │
 ▼
Quest Completed
75
72%
 │
 ▼
Reward Redeemed
51
49%
```

Purpose:

> Identify where travellers drop out.

Also show:

```text
Average Checkpoints Completed   4.2
Average Quest Duration          5h 18m
Total QR Scans                  438
Average Points Earned           420
```

---

## 12. Checkpoint Performance

```text
CHECKPOINT PERFORMANCE

Checkpoint               Visits   QR Scans   Completion

Kong Heng Square            86       81         94%
Concubine Lane              82       77         94%
Old Town White Coffee       74       68         92%
Kek Lok Tong                52       41         79%
Souvenir Partner            48       31         65%
```

Purpose:

- Find weak checkpoints
- Identify route problems
- Find QR issues
- Identify poor location placement

Example alerts:

```text
⚠ Kek Lok Tong completion dropped 18%
⚠ Souvenir Partner has the lowest conversion
⚠ 7 invalid QR scan attempts detected today
```

---

## 13. Guide Performance

Do NOT rank guides only by tour count.

```text
GUIDE PERFORMANCE

Guide   Groups   Travellers   Completion   Rating   Complaints

Aina      18        112          91%        4.8        1
Amir      16         98          89%        4.7        0
Jason     21        124          72%        4.1        6
Sarah     14         87          94%        4.9        0
```

Purpose:

- Productivity
- Traveller experience
- Service quality
- Staff coaching
- Capacity planning

Optional mock quality score:

```text
Sarah   94
Aina    91
Amir    89
Jason   71
```

---

## 14. Partner Performance

```text
PARTNER PERFORMANCE

Partner              Visits   QR Scans   Redemptions   Conversion

Platform Coffee        328       282          91          32%
Kong Heng              412       361         104          29%
Souvenir Partner       187       151          62          41%
Local Restaurant       296       246          87          35%
```

Purpose:

- Prove measurable value to merchants
- Identify strong partners
- Identify weak partners
- Support future sponsorship and partner pricing

Partner preview:

```text
PLATFORM COFFEE

Profile Views            1,284
Recommended Impressions  5,821
Checkpoint Visits          328
QR Scans                   282
Reward Redemptions          91
Conversion Rate             32%
```

---

## 15. Reward Performance

```text
REWARD PERFORMANCE

Points Issued       128,450
Points Redeemed      82,300
Redemption Rate         64%
```

Most redeemed:

```text
Ipoh White Coffee     184
D'Ipoh Keychain       142
RM10 F&B Voucher      119
Heritage Magnet        86
Tote Bag               42
```

Low-stock alerts:

```text
Ipoh White Coffee        8 left
D'Ipoh Keychain          4 left
Tote Bag                 3 left
```

Purpose:

- Understand what tourists value
- Identify unpopular rewards
- Manage reward inventory

---

## 16. Traveller Insights

Use personalization data.

### Top Interests

```text
Food        68%
Coffee      61%
Culture     47%
Nature      41%
Shopping    32%
History     29%
```

### Traveller Type

```text
Couples       34%
Families      27%
Friends       22%
Solo          13%
Groups         4%
```

### Budget Preference

```text
Budget       28%
Comfortable  51%
Premium      21%
```

### Popular Combinations

```text
Food + Coffee            31%
Food + Heritage          24%
Nature + Relaxation      18%
Family + Activities      16%
Coffee + Culture         11%
```

Purpose:

- Improve itinerary design
- Recruit better-fit merchants
- Improve rewards
- Support future campaigns

---

## 17. Operational Capacity

```text
OPERATIONAL CAPACITY

Today's Travellers
86 / 150
57%

Quest+ Transport
42 / 60 seats
70%

Guides
6 / 8 assigned
75%

VIP Capacity
8 / 12
67%
```

Use progress bars.

### Capacity by Package

```text
Explorer
Digital capacity
Status: Healthy

Quest+
42 / 60 seats
Status: Moderate

VIP
8 / 12 slots
Status: Watch
```

Example alerts:

```text
⚠ Quest+ transport reaches 85% capacity tomorrow
⚠ VIP specialist guide availability is limited
⚠ Saturday experience slot is almost full
```

---

## 18. Needs Attention Panel

This should appear on Overview.

```text
NEEDS ATTENTION

3 issues require action

1. Kek Lok Tong completion ↓18%
2. Platform Coffee reward inventory is low
3. Guide Jason received 3 low ratings this week
```

The dashboard should tell admin **what needs attention**, not just display numbers.

---

## 19. Overview Layout

```text
┌──────────────────────────────────────────────────────────────────┐
│ D'IPOH ADMIN                     Today | 7 Days | 30 Days        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ RM12,840         86            72%           4.7                 │
│ Revenue          Travellers    Completion    Avg Rating          │
│                                                                  │
├───────────────────────────────┬──────────────────────────────────┤
│ PACKAGE PERFORMANCE           │ REVENUE TREND                    │
│ Explorer   32%                │                                  │
│ Quest+     45% ⭐             │                                  │
│ VIP        23%                │                                  │
├───────────────────────────────┼──────────────────────────────────┤
│ QUEST FUNNEL                  │ TOP CHECKPOINTS                  │
│ Started      104              │ Kong Heng         81 scans      │
│ First Scan    96              │ Concubine Lane    77 scans      │
│ Third Scan    84              │ Old Town          68 scans      │
│ Completed     75              │ Kek Lok Tong      41 scans      │
│ Redeemed      51              │                                  │
├───────────────────────────────┼──────────────────────────────────┤
│ PARTNER PERFORMANCE           │ REWARD PERFORMANCE               │
│ Platform Coffee 282 scans     │ White Coffee      184           │
│ Kong Heng       361 scans     │ Keychain          142           │
│ Restaurant      246 scans     │ F&B Voucher       119           │
├───────────────────────────────┴──────────────────────────────────┤
│ ⚠ NEEDS ATTENTION                                                │
│ Kek Lok Tong completion ↓18%                                    │
│ Platform Coffee reward stock low                                │
│ Guide Jason: 3 low ratings                                      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 20. Visual Direction

The admin panel should feel related to D'Ipoh but more operational.

Use:

- White / off-white background
- Coral / pink D'Ipoh accent
- Dark text
- Rounded cards
- Soft borders
- Clean data visualizations
- Large readable metrics
- Simple charts
- Generous spacing

Avoid:

- Generic Bootstrap admin look
- Dark cyberpunk themes
- Excessive charts
- Tiny fonts
- Overly dense tables
- Too many colors

Desired feel:

> **Modern tourism operations dashboard**

---

## 21. Chart Rules

Use charts only where useful.

Recommended:

- **Line chart** — revenue trend
- **Horizontal bar chart** — traveller interests
- **Donut** — package share
- **Funnel** — quest conversion
- **Progress bars** — operational capacity

Avoid:

- 3D charts
- Decorative charts
- Too many pie charts
- Gauges everywhere

---

## 22. Mock Data Architecture

Suggested:

```text
src/data/admin/
├── overview.ts
├── revenue.ts
├── passes.ts
├── quests.ts
├── checkpoints.ts
├── guides.ts
├── partners.ts
├── rewards.ts
├── travellers.ts
└── capacity.ts
```

Do not hardcode every metric directly inside JSX.

---

## 23. Suggested Components

```text
AdminSidebar
AdminHeader
DateRangeFilter
MetricCard
TrendBadge
SectionCard
PackagePerformanceCard
RevenueChart
QuestFunnel
CheckpointTable
GuidePerformanceTable
PartnerPerformanceTable
RewardPerformance
TravellerInterestChart
CapacityCard
AlertPanel
StatusBadge
```

---

## 24. Prototype Interactions

Required:

- Change date range
- Hover chart tooltips
- Click package
- Click checkpoint
- Click partner
- Click guide
- View alert detail
- Navigate sidebar

No real data mutation is required.

---

## 25. Detail Pages

### `/admin/passes`

Show:

```text
Sales
Revenue
Share
Quest Completion
Avg Rating
Avg Points Earned
Avg Reward Redemption
```

### `/admin/quests`

Show:

```text
Quest Name
Started
Completed
Completion Rate
Average Time
Average Points
```

### `/admin/checkpoints`

Show:

```text
Checkpoint
Quest
Visits
Scans
Completion
Points Issued
Status
```

Status:

```text
Healthy
Watch
Problem
```

### `/admin/rewards`

Show:

```text
Reward
Points Cost
Redeemed
Remaining Stock
Popularity
Status
```

### `/admin/guides`

Show:

```text
Guide
Groups
Travellers
Quest Completion
Rating
Complaints
Status
```

### `/admin/partners`

Show:

```text
Partner
Category
Visits
QR Scans
Redemptions
Conversion
Status
```

### `/admin/travellers`

Show:

- Top interests
- Traveller types
- Budget preferences
- Popular combinations
- Most recommended destinations

### `/admin/capacity`

Show:

- Guide availability
- Shared transport seats
- VIP capacity
- Experience slots
- Daily traveller capacity

---

## 26. Admin Decision Questions

The dashboard should answer:

### Business

- Which package is selling best?
- Which package generates the most revenue?
- Is Quest+ actually the most popular?
- Is VIP worth the operational effort?

### Product

- Are travellers completing quests?
- Which checkpoints cause drop-off?
- Are points encouraging exploration?
- Are rewards being redeemed?

### Operations

- Are guides overloaded?
- Is transport capacity sufficient?
- Are premium services scalable?

### Partners

- Which merchants receive visits?
- Which merchants generate redemptions?
- Can D'Ipoh prove partner value?

### Customer

- What do travellers care about?
- Which interests are most popular?
- Which traveller types use the platform?

---

## 27. Acceptance Criteria

### Overview

- [ ] Revenue KPI
- [ ] Active traveller KPI
- [ ] Quest completion KPI
- [ ] Average rating KPI
- [ ] Package performance
- [ ] Revenue trend
- [ ] Quest funnel
- [ ] Top checkpoints
- [ ] Partner performance
- [ ] Reward performance
- [ ] Needs Attention

### Sustainable KPI Requirement

- [ ] Guide performance combines volume and quality
- [ ] Completion rate visible
- [ ] Rating visible
- [ ] Complaints visible
- [ ] No guide judged only by tour count

### Monitoring Requirement

- [ ] Quest events visible
- [ ] QR scans visible
- [ ] Checkpoint conversion visible
- [ ] Reward redemption visible
- [ ] Partner performance visible

### Scalability Requirement

- [ ] Traveller capacity visible
- [ ] Guide capacity visible
- [ ] Quest+ transport capacity visible
- [ ] VIP capacity visible
- [ ] Capacity alerts visible

### Technical

- [ ] Frontend only
- [ ] No backend
- [ ] No database
- [ ] Mock data separated from components
- [ ] Desktop-first responsive layout
- [ ] Sidebar works
- [ ] Date filter works
- [ ] Detail pages navigable

---

## 28. Implementation Order

### Phase 1 — Admin Shell

- `/admin`
- Sidebar
- Header
- Date filter
- Layout
- D'Ipoh styling

### Phase 2 — Overview KPIs

- Revenue
- Active travellers
- Quest completion
- Average rating

### Phase 3 — Commercial Monitoring

- Package performance
- Revenue breakdown
- Revenue trend

### Phase 4 — Customer Journey Monitoring

- Quest funnel
- Quest metrics
- Checkpoint performance

### Phase 5 — Sustainable KPI Monitoring

- Guide performance
- Quality indicators
- Complaints / ratings

### Phase 6 — Partner & Reward Monitoring

- Partner table
- Reward performance
- Reward inventory alerts

### Phase 7 — Traveller Insights

- Interests
- Traveller types
- Budget preference
- Interest combinations

### Phase 8 — Scalability

- Capacity
- Transport seats
- Guide assignment
- VIP availability
- Capacity alerts

### Phase 9 — Needs Attention

- Business alerts
- Operational alerts
- Quality alerts

### Phase 10 — Detail Pages

Create supporting routes using the same mock data.

---

## 29. Final Dashboard Story

A stakeholder should be able to open the dashboard and understand:

```text
How much money are we making?
          ↓
Which package is performing?
          ↓
Are travellers completing quests?
          ↓
Where are they dropping off?
          ↓
Are guides delivering quality?
          ↓
Are partners benefiting?
          ↓
Are rewards motivating users?
          ↓
What do travellers want?
          ↓
Can our operation handle more customers?
```

---

## 30. Final Implementation Instruction

Before coding:

1. Inspect the existing D'Ipoh project.
2. Reuse the current D'Ipoh design language where appropriate.
3. Do not modify the tourist-facing `/app` unnecessarily.
4. Build admin as a separate desktop-first experience.
5. Use mock data.
6. Keep metrics realistic and internally consistent.
7. Avoid unnecessary backend work.
8. Focus on decision support, not decorative analytics.

The final prototype must clearly demonstrate:

> **Sustainable KPIs + Monitoring Mechanism + Scalability.**
