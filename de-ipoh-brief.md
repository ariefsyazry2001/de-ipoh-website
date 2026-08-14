# De Ipoh Landing Page Wireframe

Document version: 0.2
Primary market: Ipoh, Perak, Malaysia
Primary goal: introduce De Ipoh, inspire exploration, and move visitors toward planning a personalized itinerary.

## 1. Positioning

De Ipoh is a personalized travel discovery platform for Ipoh. It should not feel like a directory of tourist spots. The central promise is:

> Tell us what you like, how long you are staying, who you are travelling with and your budget. We will curate the journey for you.

Core message:

> Your journey, curated around you.

Support message:

> Discover the Ipoh you would not find on your own.

## 2. Product Loop

```text
Discover
  -> Personalize
  -> Plan
  -> Explore
  -> Earn
  -> Discover More
```

The page introduces this loop gradually. The hero inspires. The planner personalizes. The experiences and stories create curiosity. The rewards section explains why travellers keep exploring.

## 3. Visual Direction

Follow the Globe Trekker-style reference, adapted for Ipoh:

- Warm off-white page background
- Large editorial headings
- Charcoal text
- Coral orange primary accent
- Rounded travel photography
- Organic photo layouts with generous whitespace
- Light map-style background marks
- Minimal borders
- Rounded buttons
- Mobile layouts designed intentionally, not just shrunk

Avoid government portal, hotel booking, corporate SaaS, generic dashboard, or traditional agency styling.

## 4. Navigation

Desktop:

```text
DE IPOH    Discover    Plan Your Trip    Experiences    Rewards    Stories
                                                Search    Sign In / Plan My Trip
```

Mobile:

```text
DE IPOH                                      Search    Menu
```

Primary CTA across the site:

```text
Plan My Trip
```

Secondary CTA:

```text
Explore Ipoh
```

## 5. MVP Page Structure

```text
Header
Hero: Discover Ipoh, Your Way
Personalized Journey Builder
Popular Experiences
Explore By Interest
How It Works
Explore And Earn
Stories From Ipoh
Journeys From The Community
Final CTA
Footer
```

## 6. Hero

Heading:

```text
Discover Ipoh,
Your Way.
```

Description:

```text
Hidden places, unforgettable food and local experiences curated around your interests, budget and travel style.
```

Layout:

```text
Left:
  Heading
  Short description
  Plan My Trip
  Explore Ipoh

Right:
  Three asymmetrical rounded photos
  Light map illustration behind
  Small travel-line accents
```

Hero image subjects:

- Ipoh Old Town / Concubine Lane
- Limestone cave or garden
- Ipoh coffee / cafe / food culture

## 7. Journey Builder

Heading:

```text
Your Journey Starts With You
```

Subheading:

```text
No generic itineraries. Tell us what you enjoy and we will create an Ipoh experience designed around you.
```

Inputs:

```text
Duration: Half Day, 1 Day, 2 Days, 3 Days, 4+ Days
Travellers: Solo, Couple, Friends, Family
Budget: Under RM200, RM200 - RM500, RM500 - RM1,000, RM1,000+
Interests: Food, Nature, Culture & History, Shopping, Cafes, Arts & Creative, Activities, Relaxation
```

Mobile behavior:

Use a compact step flow:

```text
Step 1: Duration
Step 2: Travellers
Step 3: Budget
Step 4: Interests
```

## 8. Popular Experiences

Heading:

```text
Popular Experiences
```

Use experience-based cards rather than destination-directory language.

Initial cards:

```text
Concubine Lane        Heritage - Food
Kek Lok Tong          Nature - Relaxation
Lost World of Tambun  Adventure - Family
Kong Heng Square      Food - Culture
```

Mobile behavior:

Cards scroll horizontally with snap alignment.

## 9. Explore By Interest

Heading:

```text
What Are You In The Mood For?
```

Categories:

```text
Food        Taste Ipoh
Nature      Slow Down
Culture     Discover The Stories
Shopping    Bring Something Home
Activities  Do Something Different
Relax       Take It Easy
```

Color language:

```text
Food        Coral
Nature      Green
Culture     Orange
Shopping    Purple
Activities  Yellow
Relax       Soft blue
```

## 10. How It Works

Heading:

```text
From "Where Should We Go?"
To Your Perfect Ipoh Day.
```

Steps:

```text
01 Tell Us About Your Trip
02 Pick What You Love
03 Get Your Journey
04 Explore And Earn
```

## 11. Rewards

Heading:

```text
Explore Ipoh. Earn While You Are At It.
```

Description:

```text
Visit participating cafes, restaurants, attractions and local businesses. Scan their QR codes, complete experiences and collect points along the way.
```

Reward loop:

```text
Visit -> Scan -> Earn -> Redeem
```

Example rewards:

```text
Free coffee
Restaurant discount
Free dessert
Attraction voucher
Local merchandise
Exclusive experience
```

Merchant teaser:

```text
Are You An Ipoh Business?
Join the experience network and help travellers discover what makes Ipoh special.
Become A Partner
```

## 12. Stories

Heading:

```text
Stories From Ipoh
```

Featured story:

```text
Food & Drink
10 Ipoh Breakfast Spots Worth Waking Up Early For
```

Secondary stories:

```text
The Stories Behind Ipoh Old Town
5 Limestone Caves You Should Explore
A Complete RM200 Ipoh Day Trip
```

Content funnel:

```text
Social post -> Article / place page -> Add to journey -> Generate itinerary -> Visit
```

## 13. Community Highlight

Heading:

```text
Journeys From The Community
```

Purpose:

Show how real travellers might use the platform and create social proof once user-generated content exists. Static copy is acceptable for MVP, but avoid fake scale claims.

## 14. Final CTA

Heading:

```text
Your Ipoh Story Starts Here.
```

Subheading:

```text
Tell us what you love and we will take care of the rest.
```

CTA:

```text
Plan My Trip
```

Use a cinematic Ipoh image background with a dark overlay for readability.

## 15. Footer

Footer groups:

```text
Discover: Places, Food, Nature, Culture, Activities
Plan: Plan My Trip, Saved Journeys, Rewards
Community: Stories, Traveller Highlights, Instagram, TikTok
Partners: Become A Partner, Merchant Login
Company: About Us, Contact, Privacy Policy, Terms
```

## 16. Implementation Notes

- Next.js App Router with static export.
- Keep primary route sections static and fast.
- Use local image assets in `public/images`.
- Keep all CTAs consistent with `Plan My Trip`.
- Do not place forms, maps, reward rules or merchant details inside the hero.
- Keep mobile hero simple: text first, image cluster second, CTA clearly visible.
- The page should inspire first, then explain value, then invite planning.
