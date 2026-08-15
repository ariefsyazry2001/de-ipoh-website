# D'Ipoh PWA --- Package Features & Implementation Specification

## 1. Purpose

This document is the **new implementation specification** for extending
the existing D'Ipoh PWA.

The existing application has already been implemented and is currently
accessible at:

``` text
http://localhost:3000/app
```

The current UI already contains the basic D'Ipoh home experience:

-   Greeting / user profile
-   Search
-   Story-style location circles
-   User interests
-   Recommended place
-   More recommendations
-   Bottom navigation
-   Scan action
-   Rewards / Profile navigation

**Do not rebuild the existing application from scratch.**

Extend the existing implementation to support the new **D'Ipoh Day
Pass**, personalization, itinerary, map, quest, QR, points, and reward
experience described below.

------------------------------------------------------------------------

# 2. Product Vision

D'Ipoh is a **personalized local tourism experience platform**.

The product should not feel like a generic travel directory.

The core experience is:

``` text
Personalize Me
      ↓
Understand My Travel Preferences
      ↓
Generate My Ipoh Day
      ↓
Recommend Places
      ↓
Show Places on Map
      ↓
Choose Day Pass
      ↓
Explore Ipoh
      ↓
Visit Checkpoints
      ↓
Scan QR
      ↓
Earn Points
      ↓
Unlock / Redeem Rewards
      ↓
Continue Exploring
```

The primary product differentiators are:

1.  Personalized recommendations
2.  Curated day itinerary
3.  Map-based exploration
4.  Day Pass tiers
5.  QR checkpoint system
6.  Gamified points
7.  Local rewards
8.  Partner privileges

------------------------------------------------------------------------

# 3. Source of Truth

Use the provided concept images as the **visual direction / design
source of truth**.

The current running application is also a source of truth for the
existing visual language.

Maintain the current overall design direction:

-   Mobile-first
-   PWA
-   Rounded cards
-   Warm / soft background
-   Pink / coral accent
-   Strong typography
-   Large destination imagery
-   Story circles
-   Bottom navigation
-   Large central Scan action
-   Friendly travel/social-app feeling

Do NOT replace the application with a completely different design
system.

Improve and extend what already exists.

------------------------------------------------------------------------

# 4. Important Scope Constraints

This is a **local stakeholder prototype**.

Do NOT introduce unnecessary production infrastructure.

## Do NOT implement

-   Cloudflare R2
-   AWS S3
-   Real image storage service
-   Real payment gateway
-   Real transportation API
-   Real hotel booking
-   Real attraction ticket API
-   Real merchant settlement
-   Real merchant onboarding
-   Real guide scheduling
-   Real social posting
-   Full social media system
-   Complex AI recommendation infrastructure

## Images

Use:

-   local images
-   seeded mock images
-   placeholder images
-   existing local assets

Post images are **mock content only**.

There is no need to implement a real Create Post feature.

## Data

Use seeded/mock data for:

-   users
-   places
-   interests
-   itineraries
-   quests
-   checkpoints
-   passes
-   rewards
-   vouchers
-   merchants
-   experiences

The prototype should behave realistically even though the commercial
integrations are mocked.

------------------------------------------------------------------------

# 5. Day Pass Business Model

There are three packages.

## Explorer --- RM99

### Positioning

> **Explore at your own pace.**

Short positioning:

> **PLAN MY DAY**

The user gets the intelligence and platform experience but handles the
expensive fulfilment themselves.

### Included

-   Curated day itinerary
-   Digital map / guide
-   Personalized recommendations
-   QR check-ins
-   Points
-   Rewards
-   Partner privileges
-   RM20 F&B credit
-   1× points multiplier

### Not included

-   Transport
-   Physical guide
-   Attraction tickets

The user is responsible for:

-   Getting around
-   Buying attraction tickets
-   Other optional expenses

### Transport

``` text
Self-arranged
```

### Guide

``` text
Digital / Self-guided
```

### Experiences

``` text
Pay-as-you-go
```

### Itinerary flexibility

``` text
Fixed
```

------------------------------------------------------------------------

# 6. Quest+ --- RM199 ⭐

## Positioning

> **Everything you need for the perfect day in Ipoh.**

Short positioning:

> **TAKE ME AROUND**

This should be the **MOST POPULAR** package.

The user pays RM100 more than Explorer and receives meaningful
convenience.

### Included

Everything from Explorer, plus:

-   Shared transport
-   Shared local guide
-   1 included experience
-   RM50 F&B credit
-   1.5× points multiplier
-   Better partner perks / rewards
-   1 itinerary swap

### Transport

``` text
Shared transport
```

### Guide

``` text
Shared local guide
```

### Experiences

``` text
1 included
```

### F&B credit

``` text
RM50 adult
RM15 child
```

### Itinerary flexibility

``` text
1 swap
```

### Core user perception

The user should understand:

> "For another RM100, I don't have to worry about transport, I get a
> guide, an activity and more food credit."

------------------------------------------------------------------------

# 7. VIP Explorer --- RM399

## Positioning

> **The best of Ipoh, without the hassle.**

Short positioning:

> **LOOK AFTER ME**

This is a premium experience.

### Included

Everything from Quest+, plus:

-   Premium small-group transport
-   Dedicated / specialist guide
-   2 selected experiences
-   RM80 F&B credit
-   2× points multiplier
-   Priority reservations
-   Flexible itinerary
-   Premium partner perks / rewards

### Transport

``` text
Premium small-group transport
```

### Guide

``` text
Dedicated / specialist guide
```

### Experiences

``` text
2 included
```

### F&B credit

``` text
RM80 adult
RM20 child
```

### Itinerary flexibility

``` text
Flexible
```

### Core user perception

> "Give me the best experience."

------------------------------------------------------------------------

# 8. Final Package Comparison

  -----------------------------------------------------------------------
  Feature           Explorer          Quest+ ⭐         VIP Explorer
  ----------------- ----------------- ----------------- -----------------
  Adult             RM99              RM199             RM399

  Child (4--12)     RM49              RM99              RM199

  Curated Day       ✓                 ✓                 ✓
  Itinerary                                             

  Digital Map /     ✓                 ✓                 ✓
  Guide                                                 

  Transport         Self-arranged     Shared            Premium
                                                        small-group

  Guide             Digital /         Shared local      Dedicated /
                    self-guided       guide             specialist

  F&B Credit ---    RM20              RM50              RM80
  Adult                                                 

  F&B Credit ---    RM10              RM15              RM20
  Child                                                 

  Experiences       Pay-as-you-go     1 included        2 included

  Points Multiplier 1×                1.5×              2×

  Itinerary         Fixed             1 swap            Flexible
  Flexibility                                           

  Partner Perks     Standard          Better            Premium

  Priority          ---               ---               ✓
  Reservations                                          
  -----------------------------------------------------------------------

**Important:** The latest business plan uses **VIP RM399**, not RM349.

------------------------------------------------------------------------

# 9. New User Journey

The user should not immediately be thrown into the normal home screen.

The first-time experience should guide the user through personalization.

## Step 1 --- Welcome

Screen:

``` text
Welcome to D'Ipoh

Let's build your perfect day in Ipoh.

[ Start Planning ]
```

------------------------------------------------------------------------

# 10. Personalization Flow

The personalization flow should feel like a short travel quiz, not a
registration form.

## Question 1 --- What are you looking for?

Allow multiple selections.

Options:

-   Food
-   Coffee
-   Nature
-   Culture
-   Heritage
-   Shopping
-   Photography
-   Family
-   Relaxation
-   Adventure

Example:

``` text
What are you looking for?

[ Food ] [ Coffee ] [ Nature ]
[ Culture ] [ Heritage ] [ Shopping ]
[ Photography ] [ Family ] [ Relaxation ]
```

------------------------------------------------------------------------

# 11. Question 2 --- What kind of food?

Show this if Food is selected.

Options:

-   Local food
-   Coffee
-   Traditional
-   Dessert
-   Spicy
-   Local favourites
-   Fine dining
-   Street food

Allow multiple selections.

------------------------------------------------------------------------

# 12. Question 3 --- Who are you travelling with?

Options:

-   Solo
-   Couple
-   Family
-   Friends
-   Group / work

This affects recommendation scoring.

Example:

``` text
Who are you travelling with?

👤 Solo

💑 Couple

👨‍👩‍👧 Family

👯 Friends

👥 Group
```

------------------------------------------------------------------------

# 13. Question 4 --- What's your travel style?

Options:

### Relaxed

> Take it slow.

### Balanced

> See the highlights.

### Packed

> I want to maximise my day.

This affects itinerary density and number of activities.

------------------------------------------------------------------------

# 14. Question 5 --- Do you already have an itinerary?

Options:

``` text
Yes, I already have one

No, plan my day for me

I have some plans — help me fill the gaps
```

## Behaviour

### No itinerary

Generate a complete mock itinerary.

### Existing itinerary

Allow the user to enter/select known destinations.

### Partial itinerary

Use existing destinations and recommend additional places around them.

For the prototype, this can be implemented using predefined choices
instead of a complex itinerary editor.

------------------------------------------------------------------------

# 15. Question 6 --- Budget

Options:

-   Under RM100
-   RM100--RM200
-   RM200--RM400
-   RM400+

This can influence recommendations and pass suggestions.

------------------------------------------------------------------------

# 16. Question 7 --- How long are you in Ipoh?

Options:

-   Half day
-   1 day
-   2 days+

The Day Pass experience focuses primarily on the **1-day Ipoh
experience**.

------------------------------------------------------------------------

# 17. Personalization Result

After the quiz, show:

``` text
Your Ipoh Day is Ready ✨

Based on your preferences:

☕ Coffee
🏛 Heritage
🍜 Local Food
🌿 Relaxed
💑 Couple
```

Then:

# Your Personalized Day

Example:

``` text
09:00
☕ Morning Coffee

10:00
🏛 Heritage Walk

12:00
🍜 Local Lunch

14:00
🌿 Nature Experience

16:00
🎁 Local Shopping
```

------------------------------------------------------------------------

# 18. Recommendation Engine

Do NOT build a real AI recommendation engine.

Implement a simple deterministic scoring system.

Each place should contain:

``` text
id
name
description
image
category
tags[]
price_range
duration_minutes
latitude
longitude
opening_hours
partner
checkpoint
base_points
family_friendly
couple_friendly
```

User preferences contain:

``` text
interests[]
food_preferences[]
traveller_type
travel_style
budget
duration
has_itinerary
```

Conceptual scoring:

``` text
Interest match       +40
Food match           +20
Traveller match      +15
Travel style         +15
Budget match         +10
Partner bonus         +5
```

The exact scoring implementation can be simple.

The goal is to make the recommendation feel personalized.

------------------------------------------------------------------------

# 19. Recommended Places

Every recommendation should contain:

-   Image
-   Name
-   Category
-   Short reason for recommendation
-   Points available
-   Distance
-   Map action
-   Add to itinerary action

Example:

``` text
Kong Heng Square

Recommended because you like:
Food + Coffee + Heritage

+90 pts

[ View Map ]
[ Add to My Day ]
```

------------------------------------------------------------------------

# 20. Map Requirement

**Every suggested place must be map-aware.**

The user should be able to select:

> View Map

and see:

-   Place location
-   Map marker
-   Nearby places
-   Distance
-   Suggested route / order
-   Itinerary locations

For the prototype, use seeded latitude / longitude.

Do not build advanced routing.

A simple map view is sufficient.

------------------------------------------------------------------------

# 21. Personalized Day Map

Create a dedicated map screen:

``` text
YOUR IPoh DAY

        MAP

📍 Coffee
   ↓
📍 Heritage
   ↓
📍 Lunch
   ↓
📍 Experience
   ↓
📍 Reward
```

Below the map:

``` text
Today's Quest

1 / 5 checkpoints

██████░░░░ 40%

+150 points available
```

------------------------------------------------------------------------

# 22. Pass Selection

After personalization, show the user the pass packages.

Heading:

``` text
Choose how you want to experience Ipoh
```

Display three cards.

## Explorer

``` text
RM99 / pax

PLAN MY DAY

I'll handle the rest.
```

## Quest+

``` text
RM199 / pax

⭐ MOST POPULAR

TAKE ME AROUND

Everything you need for the perfect day.
```

## VIP Explorer

``` text
RM399 / pax

LOOK AFTER ME

The best of Ipoh, without the hassle.
```

The Quest+ card should have stronger visual emphasis.

------------------------------------------------------------------------

# 23. Pass Activation

For the prototype, do NOT implement real payment.

Create a mock activation flow:

``` text
[ Choose Quest+ ]

Review your pass

Quest+
RM199

[ Activate Pass ]
```

After activation:

``` text
Quest+ Active ✓

1.5× Points
RM50 F&B Credit
1 Experience Included
Shared Transport
Shared Guide
```

The pass should appear in the user's profile/wallet.

------------------------------------------------------------------------

# 24. Pass State

The app should know:

``` text
currentPass
passTier
pointsMultiplier
fbCredit
experiencesRemaining
itineraryFlexibility
```

Example:

``` text
currentPass:
QUEST_PLUS

pointsMultiplier:
1.5

fbCredit:
50

experiencesRemaining:
1

itinerarySwapsRemaining:
1
```

------------------------------------------------------------------------

# 25. Quest System

The main gameplay loop is the Quest.

Example:

# Ipoh Heritage Quest

``` text
5 Checkpoints

○ Kong Heng Square
○ Concubine Lane
○ Old Town
○ Heritage Attraction
○ Local Souvenir
```

Each checkpoint has:

``` text
name
description
location
base_points
qr_code
partner
reward
```

------------------------------------------------------------------------

# 26. QR Check-In

QR scanning is one of the **most important features**.

The existing bottom navigation already has a central:

> Scan

button.

Keep it prominent.

When scanned:

``` text
Checkpoint Verified ✓

Kong Heng Square

Base Points       60
Quest+ Multiplier ×1.5

You earned

+90 POINTS
```

For Explorer:

``` text
60 × 1
=
60 pts
```

For Quest+:

``` text
60 × 1.5
=
90 pts
```

For VIP:

``` text
60 × 2
=
120 pts
```

The backend/state should calculate the final points.

------------------------------------------------------------------------

# 27. QR Prototype

For the local prototype, QR codes can represent seeded checkpoint IDs.

Example:

``` text
checkpoint:kong-heng
checkpoint:concubine-lane
checkpoint:old-town
```

The scan flow should resolve the QR value to a checkpoint.

Prevent duplicate points from the same checkpoint.

Show:

``` text
Already Checked In

You've already earned points here.
```

------------------------------------------------------------------------

# 28. Points Wallet

Create a dedicated wallet/reward progress experience.

Show:

``` text
YOUR POINTS

650 pts
```

Then:

``` text
Current Pass
Quest+ ⭐
1.5× multiplier
```

Show recent activity:

``` text
+90  Kong Heng Square
+120 Concubine Lane
+75  Old Town
```

------------------------------------------------------------------------

# 29. Reward System

Rewards should be seeded/mock.

Examples:

``` text
☕ Ipoh White Coffee
700 pts

🎁 D'Ipoh Keychain
500 pts

🧲 Heritage Fridge Magnet
350 pts

🎒 D'Ipoh Tote Bag
1,000 pts

🍜 RM10 Food Voucher
600 pts
```

Each reward should show:

-   Image
-   Name
-   Points
-   Merchant
-   Availability
-   Redeem button

------------------------------------------------------------------------

# 30. Redemption

When the user has enough points:

``` text
D'Ipoh Keychain

500 points

Your balance:
650 pts

[ Redeem Reward ]
```

After redemption:

``` text
Reward Redeemed ✓

D'Ipoh Keychain

Redemption Code:
DIPOH-8K29

Show this code at the partner counter.
```

For the prototype, the redemption code can be generated locally.

------------------------------------------------------------------------

# 31. F&B Credit

Each pass has F&B credit.

Explorer:

``` text
RM20
```

Quest+:

``` text
RM50
```

VIP:

``` text
RM80
```

Child:

``` text
RM10 / RM15 / RM20
```

Display:

``` text
F&B CREDIT

RM32.50 remaining
```

For the prototype, transactions can be mocked.

Do not implement payment processing.

------------------------------------------------------------------------

# 32. Included Experiences

Quest+:

``` text
1 experience included
```

VIP:

``` text
2 experiences included
```

Example experiences:

-   Heritage walking experience
-   Coffee tasting
-   Local food experience
-   Cultural workshop
-   Nature experience

Explorer shows:

``` text
Pay-as-you-go
```

Quest+ shows:

``` text
1 included
```

VIP shows:

``` text
2 included
```

------------------------------------------------------------------------

# 33. Itinerary Swap

Quest+:

``` text
1 swap available
```

If the user doesn't like an itinerary item:

``` text
Replace this stop?
```

Show alternatives matching their preferences.

After swapping:

``` text
Swap used

0 swaps remaining
```

VIP:

``` text
Flexible itinerary
```

For the prototype, VIP can allow unlimited mock swaps.

------------------------------------------------------------------------

# 34. Partner Privileges

Places can have:

``` text
partner: true
```

Show:

``` text
PARTNER PERK

Quest+ members get:
10% off selected items
```

VIP:

``` text
VIP PARTNER PERK

Priority reservation
+
Exclusive reward
```

These can be seeded/mock.

------------------------------------------------------------------------

# 35. Existing Home Screen Integration

The current home screen should evolve into the user's personalized
dashboard.

Keep:

``` text
Good Morning, Jessica
Discover your favourite side of Ipoh.
```

Keep:

-   Search
-   Stories
-   Interests
-   Recommended
-   More For You
-   Bottom navigation
-   Scan button

Add:

### Active Pass

``` text
QUEST+ ⭐

1.5× Points
650 pts

[ View Pass ]
```

### Today's Quest

``` text
2 / 5 Checkpoints

████████░░ 40%

[ Continue Quest ]
```

### Today's Itinerary

``` text
09:00 Coffee
10:00 Heritage
12:00 Lunch
...
```

------------------------------------------------------------------------

# 36. Suggested Navigation

Bottom navigation:

``` text
Home
Explore
Scan
Rewards
Profile
```

## Home

Personalized dashboard.

## Explore

Discover places, itinerary and map.

## Scan

QR checkpoint scanner.

## Rewards

Points + reward catalogue + redemption.

## Profile

User profile + current pass + preferences.

------------------------------------------------------------------------

# 37. Explore Screen

Explore should contain:

``` text
Search

Categories

Recommended For You

Nearby

Your Itinerary

Map
```

Filters:

-   Food
-   Coffee
-   Culture
-   Heritage
-   Nature
-   Shopping
-   Family
-   Couple
-   Partner

------------------------------------------------------------------------

# 38. Place Detail Screen

Every place should have:

``` text
Image

Kong Heng Square

⭐ 4.7

Heritage
Food
Coffee

Recommended because:
You selected Food + Coffee + Heritage.

+90 pts

Distance:
1.2 km

Opening:
09:00–18:00

Partner Perk:
Quest+ members receive...

[ View Map ]

[ Add to My Day ]
```

If it is a checkpoint:

``` text
[ Scan Checkpoint ]
```

------------------------------------------------------------------------

# 39. Profile

Show:

``` text
Jessica

Quest+ ⭐

650 Points

F&B Credit
RM32.50

Experiences
1 remaining

Itinerary Swaps
1 remaining
```

Sections:

-   My Pass
-   My Itinerary
-   My Rewards
-   My Preferences
-   Redemption History
-   Settings

------------------------------------------------------------------------

# 40. Mock Data Requirements

Seed at least 10--15 places around Ipoh.

Suggested categories:

### Heritage

-   Concubine Lane
-   Kong Heng Square
-   Ipoh Old Town
-   Ipoh Railway Station

### Food

-   Local food locations
-   Ipoh white coffee
-   Local dessert
-   Traditional food

### Nature

-   Tasik Cermin
-   Kek Lok Tong
-   Nearby scenic locations

### Attractions

-   Lost World of Tambun
-   Heritage / cultural experiences

### Shopping / Souvenir

-   Local souvenir shop
-   Local market

All locations must have mock coordinates.

------------------------------------------------------------------------

# 41. Mock Rewards

Seed at least:

``` text
Ipoh White Coffee
D'Ipoh Keychain
Heritage Fridge Magnet
D'Ipoh Tote Bag
RM10 F&B Voucher
Local Snack Box
```

------------------------------------------------------------------------

# 42. Mock Experiences

Seed:

``` text
Ipoh Heritage Walk
White Coffee Tasting
Local Food Experience
Traditional Culture Workshop
Nature Discovery
```

------------------------------------------------------------------------

# 43. Mock Merchants

Create seeded partner merchants.

Example structure:

``` text
merchant
name
category
location
partner_level
active
```

Partner levels:

``` text
STANDARD
QUEST_PLUS
VIP
SPONSORED
```

------------------------------------------------------------------------

# 44. Commercial Features --- Prototype Only

The architecture should leave room for future:

``` text
Merchant
   ↓
Campaign
   ↓
Sponsored Quest
   ↓
Featured Checkpoint
   ↓
QR Scans
   ↓
Redemptions
```

But these do NOT need to be fully implemented now.

A mock merchant analytics screen may be included if useful for
stakeholder presentation.

Example:

``` text
Merchant Performance

Views             1,284
Checkpoint Scans    218
Redemptions          94
Quest Visits         72
```

------------------------------------------------------------------------

# 45. What Is Real vs Mock

## Real prototype behaviour

Implement:

-   Personalization selections
-   Recommendation logic
-   Itinerary generation
-   Map locations
-   Pass selection
-   Pass activation state
-   Pass-specific points multiplier
-   Quest progress
-   QR scanning
-   Duplicate checkpoint prevention
-   Points wallet
-   Reward redemption
-   Redemption history
-   F&B credit display
-   Experience entitlement
-   Itinerary swap state

## Mock / UI-only

-   Payment
-   Transport booking
-   Guide booking
-   Attraction ticket purchase
-   Merchant settlement
-   Sponsored campaigns
-   Social posting
-   Real merchant account
-   Real external booking integrations

------------------------------------------------------------------------

# 46. Technical Principles

Do not over-engineer.

Use the existing stack and project structure.

Before making architectural changes:

1.  Inspect the existing repository.
2.  Understand current routes/components.
3.  Reuse existing components.
4.  Reuse existing styling/theme.
5.  Reuse existing mock data patterns.
6.  Extend instead of replacing.
7.  Avoid unnecessary dependencies.

Do not create duplicate implementations of existing functionality.

------------------------------------------------------------------------

# 47. State Requirements

The prototype needs a centralized state for:

``` text
user
preferences
recommendations
itinerary
currentPass
points
checkpoints
rewards
redemptions
fbCredit
experiences
itinerarySwaps
```

Persistence can use the simplest local mechanism already supported by
the project.

For example:

``` text
localStorage
```

or the existing local state/data mechanism.

The user should not lose the demo state after navigating between
screens.

------------------------------------------------------------------------

# 48. Acceptance Criteria

The implementation is considered complete when the following end-to-end
demo works.

## Flow A --- New user

``` text
Open app
↓
Start personalization
↓
Select interests
↓
Select food preferences
↓
Select traveller type
↓
Select travel style
↓
Select itinerary preference
↓
Select budget
↓
Select duration
↓
Generate personalized day
```

------------------------------------------------------------------------

## Flow B --- Recommendation

``` text
See recommended places
↓
Open place
↓
See reason for recommendation
↓
See points
↓
View map
↓
Add place to itinerary
```

------------------------------------------------------------------------

## Flow C --- Pass

``` text
Choose Quest+
↓
See package details
↓
Activate mock pass
↓
Home shows Quest+
↓
1.5× multiplier is active
↓
RM50 F&B credit appears
↓
1 experience appears
↓
1 itinerary swap appears
```

------------------------------------------------------------------------

## Flow D --- Quest

``` text
Open Today's Quest
↓
See checkpoints
↓
Open map
↓
Visit checkpoint
↓
Scan QR
↓
Checkpoint verified
↓
Points calculated using pass multiplier
↓
Progress updated
```

------------------------------------------------------------------------

## Flow E --- Rewards

``` text
Open Rewards
↓
See point balance
↓
Select reward
↓
Redeem
↓
Points deducted
↓
Redemption code generated
↓
Reward appears in redemption history
```

------------------------------------------------------------------------

## Flow F --- VIP

Activate VIP.

Verify:

``` text
2× points
RM80 F&B credit
2 experiences
Flexible itinerary
Premium partner perks
Priority reservation UI
```

------------------------------------------------------------------------

# 49. UX Rules

The application should always make the user's next action obvious.

Examples:

Instead of:

``` text
Points: 650
```

prefer:

``` text
650 pts

You're 50 pts away from
Ipoh White Coffee ☕
```

Instead of:

``` text
Quest Progress: 40%
```

prefer:

``` text
2 of 5 checkpoints completed

Continue your quest →
```

Instead of:

``` text
Quest+ RM199
```

show:

``` text
⭐ MOST POPULAR

Everything you need for the perfect day.
```

The product should constantly reinforce the value of exploration.

------------------------------------------------------------------------

# 50. Design Direction

Maintain the existing visual concept:

-   Warm off-white background
-   Coral / pink accent
-   Soft gradients
-   Rounded cards
-   Large imagery
-   Bold headings
-   Friendly typography
-   Minimal borders
-   Pill-shaped tags
-   Circular story avatars
-   Strong central Scan button
-   Mobile-first layout

Avoid:

-   Corporate dashboard aesthetics
-   Dense tables on mobile
-   Excessive dark UI
-   Generic Bootstrap-looking components
-   Overly technical interfaces

The app should feel like a modern travel/social discovery application.

------------------------------------------------------------------------

# 51. Implementation Order

Implement in this order.

## Phase 1 --- Data & State

Create/extend:

-   User
-   Place
-   Interest
-   Pass
-   Itinerary
-   Quest
-   Checkpoint
-   Reward
-   Experience
-   Merchant
-   Redemption

Seed realistic data.

------------------------------------------------------------------------

## Phase 2 --- Personalization

Implement:

``` text
Welcome
→ Interests
→ Food
→ Traveller
→ Travel Style
→ Existing Itinerary
→ Budget
→ Duration
→ Results
```

------------------------------------------------------------------------

## Phase 3 --- Recommendation

Implement simple scoring.

Generate:

``` text
Recommended places
Recommended itinerary
```

------------------------------------------------------------------------

## Phase 4 --- Map

Implement:

-   Place map
-   Itinerary map
-   Nearby places
-   Map markers
-   Place detail map action

------------------------------------------------------------------------

## Phase 5 --- Passes

Implement:

-   Explorer
-   Quest+
-   VIP
-   Comparison UI
-   Mock activation
-   Active pass state

------------------------------------------------------------------------

## Phase 6 --- Quest

Implement:

-   Quest list
-   Checkpoints
-   Progress
-   QR scanner
-   Check-in state
-   Point calculation

------------------------------------------------------------------------

## Phase 7 --- Rewards

Implement:

-   Wallet
-   Reward catalogue
-   Redemption
-   Redemption code
-   History

------------------------------------------------------------------------

## Phase 8 --- Existing Home Integration

Integrate:

-   Active pass
-   Today's itinerary
-   Quest progress
-   Points
-   Personalized recommendations

into the existing home screen.

------------------------------------------------------------------------

## Phase 9 --- Polish

Improve:

-   Responsive mobile UI
-   Empty states
-   Loading states
-   Success animations
-   QR success feedback
-   Points animation
-   Pass badges
-   Recommendation explanations
-   Navigation transitions

------------------------------------------------------------------------

# 52. Important Implementation Instruction

**Do not stop after creating screens.**

The implementation must be connected end-to-end.

For example:

Selecting Quest+ must actually change:

``` text
currentPass
pointsMultiplier
fbCredit
experience entitlement
itinerary swap entitlement
```

Scanning a checkpoint must actually change:

``` text
checkpoint status
points
quest progress
wallet
```

Redeeming a reward must actually change:

``` text
points balance
redemption history
reward availability
```

The stakeholder should be able to use the prototype as if it were a real
application.

------------------------------------------------------------------------

# 53. Final Product Loop

The final prototype should demonstrate this complete loop:

``` text
                    D'IPOH

                       ↓

              PERSONALIZATION
                       ↓
          "What are you looking for?"
                       ↓
              YOUR IPoh DAY
                       ↓
              RECOMMENDATIONS
                       ↓
                    MAP
                       ↓
                DAY PASS
          ┌────────┬────────┬────────┐
          │        │        │
        RM99     RM199     RM399
       Explorer  Quest+     VIP
          │        │        │
          └────────┴────────┘
                       ↓
                  YOUR QUEST
                       ↓
                 QR CHECK-IN
                       ↓
                    POINTS
                       ↓
                   REWARDS
                       ↓
                  REDEMPTION
                       ↓
              MORE EXPLORATION
```

The central business/product idea is:

> **D'Ipoh doesn't simply tell tourists where to go. It creates a
> personalized day for them, gives them a reason to explore, rewards
> them for visiting local places, and connects those visits to local
> partners.**

------------------------------------------------------------------------

# 54. Final Development Goal

At the end of implementation, a stakeholder should be able to sit down
with the developer and experience this without explanation:

``` text
"I tell D'Ipoh what I like."

        ↓

"It creates my day."

        ↓

"I can see everything on the map."

        ↓

"I choose Quest+ because it handles transport,
guide, experience and gives me better rewards."

        ↓

"I follow my itinerary."

        ↓

"I scan a QR at a checkpoint."

        ↓

"I earn 1.5× points."

        ↓

"I get closer to a local reward."

        ↓

"I redeem it."

        ↓

"I understand why merchants would
want to participate."
```

That is the **complete stakeholder-ready prototype story**.
