# Land of Eem Crafting Tracker - Requirements Document

## Executive Summary

### Project Overview

The Land of Eem Crafting Tracker is a React Native Expo mobile application designed to help tabletop RPG players manage their crafting inventory, browse recipes, and track crafting activities in the Land of Eem game system.

### Target Users

-   Land of Eem tabletop RPG players
-   Game Masters running Land of Eem campaigns
-   Players who engage with the crafting system

### Key Value Proposition

-   Simplify component and material inventory management
-   Provide instant access to 300+ crafting recipes
-   Enable quick lookup of regional component availability
-   Streamline crafting calculations and checks

---

## Core Features

### 1. Component Inventory Management

**Priority:** High

**Description:** Allow users to track their collection of crafting components across four types.

**Features:**

-   Add/remove/edit component quantities
-   View component by type:
    -   Beast Components 🐾 (100 types)
    -   Elemental Components 🗻 (36 types)
    -   Fish Components 🎣 (100 types)
    -   Herb Components 🌿 (100 types)
-   Search and filter components by name
-   View component descriptions and properties
-   See which recipes use each component
-   Track component locations/regions

**User Stories:**

-   As a player, I want to add components to my inventory when I gather them
-   As a player, I want to see what recipes I can craft with my current components
-   As a player, I want to search for a specific component quickly

### 2. Materials & Tools Management

**Priority:** High

**Description:** Track abstracted Materials and crafting tools/equipment.

**Features:**

-   Track Material quantity (the abstracted crafting resource)
-   Manage crafting tools inventory:
    -   Standard Crafting Tools
    -   Master Crafting Tools
    -   Cookware
    -   Alchemy Set
    -   Forge access (rented/owned)
-   Track tool usage and costs
-   Calculate material requirements for crafting

**User Stories:**

-   As a player, I want to track how many Materials I have
-   As a player, I want to know if I have the required tools for a recipe
-   As a player, I want to see if I need access to a forge

### 3. Recipe Browser

**Priority:** High

**Description:** Comprehensive database of all crafting, alchemy, and cooking recipes.

**Features:**

-   Browse all recipes by category:
    -   Alchemy Recipes (100 types)
    -   Cooking Recipes (100 types)
    -   Crafting Recipes (100 types)
-   Search recipes by name
-   Filter by:
    -   Rarity (Common, Rare, Witchcraft)
    -   Components required
    -   Recipe type
    -   Craftable with current inventory
-   View detailed recipe information:
    -   Required components
    -   Material requirements
    -   Crafting time
    -   Effects/properties
    -   Rarity level

**User Stories:**

-   As a player, I want to browse all available recipes
-   As a player, I want to filter recipes by what I can currently craft
-   As a player, I want to search for a specific recipe quickly

### 4. Crafting Calculator

**Priority:** High

**Description:** Calculate crafting requirements and simulate crafting checks.

**Features:**

-   Select a recipe to craft
-   Automatically check component availability
-   Calculate material requirements based on:
    -   Item cost tier (Copper/Silver/Gold/Ancient Coins)
    -   Item slot size
    -   Forge requirement (2x time multiplier)
-   Display crafting time
-   Show what's missing from inventory
-   Simulate Tinker Check outcomes (1d12)
-   Track crafting history

**User Stories:**

-   As a player, I want to see if I have everything needed to craft an item
-   As a player, I want to calculate how many materials I need
-   As a player, I want to simulate crafting results

### 5. Regional Component Reference

**Priority:** Medium

**Description:** Lookup which components are available in each region.

**Features:**

-   View all 6 regions:
    -   Drippy Downs
    -   Fleabag County
    -   Quagmash
    -   River Country
    -   Scalawag Strand
    -   Used T'Be Forest
-   See component tables for each region by type
-   Search for where to find specific components
-   View component drop tables (d12 or d100 rolls)

**User Stories:**

-   As a player, I want to know where to find a specific component
-   As a player, I want to see all components available in my current region
-   As a GM, I want quick access to regional component tables

### 6. Crafting Session Tracker

**Priority:** Medium

**Description:** Track active crafting projects and their outcomes.

**Features:**

-   Start a crafting session
-   Log Tinker Check results
-   Track materials consumed
-   Record crafted items
-   Save crafting history
-   Track successes/failures
-   Note Magnificent traits gained

**User Stories:**

-   As a player, I want to record my crafting attempts
-   As a player, I want to see my crafting success rate
-   As a player, I want to track what I've crafted this session

---

## Data Models

### Component

```
{
  id: string
  name: string
  type: 'beast' | 'elemental' | 'fish' | 'herb'
  description: string
  recipes: string[] // recipe names that use this
  regions: string[] // where it can be found
  rollRange: string // e.g., "1-2" for d100 table
  quantity: number // user's inventory
}
```

### Recipe

```
{
  id: string
  name: string
  type: 'alchemy' | 'cooking' | 'crafting'
  rarity: 'common' | 'rare' | 'witchcraft'
  effect: string
  components: ComponentRequirement[]
  materialsRequired?: number
  craftingTime: string
  itemCost?: 'copper' | 'silver' | 'gold' | 'ancient'
  itemSlots?: number
  requiresForge: boolean
  properties?: string[] // magnificent traits, etc.
}
```

### ComponentRequirement

```
{
  componentId: string
  componentName: string
  quantity: number
}
```

### UserInventory

```
{
  components: Map<componentId, quantity>
  materials: number
  tools: {
    standardCraftingTools: boolean
    masterCraftingTools: boolean
    cookware: boolean
    alchemySet: boolean
    forgeAccess: 'none' | 'rented' | 'owned'
  }
}
```

### CraftingSession

```
{
  id: string
  recipeId: string
  recipeName: string
  date: timestamp
  tinkerCheckRoll: number
  outcome: string
  materialsUsed: number
  componentsUsed: ComponentRequirement[]
  itemCrafted: boolean
  magnificentTrait?: string
  notes: string
}
```

### Region

```
{
  name: string
  components: {
    beast: Component[]
    elemental: Component[]
    fish: Component[]
    herb: Component[]
  }
}
```

---

## User Interface Requirements

### Navigation Structure

```
Main App Navigation (Bottom Tabs):
├── Inventory
│   ├── Components (grouped by type)
│   ├── Materials
│   └── Tools
├── Recipes
│   ├── All Recipes (searchable/filterable)
│   ├── Alchemy
│   ├── Cooking
│   └── Crafting
├── Craft
│   ├── Recipe Selection
│   ├── Requirement Check
│   └── Crafting Simulator
├── Regions
│   └── Regional Component Tables
└── History
    └── Past Crafting Sessions
```

### Key Screens

#### 1. Component Inventory Screen

-   **Header:** Search bar, filter dropdown (type)
-   **Body:**
    -   Grouped list by component type
    -   Component card showing: name, icon, quantity, description
    -   Tap to view details
-   **Actions:**
    -   Add/subtract quantity buttons
    -   View recipes using this component
    -   View regions where found

#### 2. Recipe Browser Screen

-   **Header:** Search bar, filter button
-   **Filters Modal:**
    -   Recipe type
    -   Rarity
    -   Can craft now (toggle)
    -   Has all components (toggle)
-   **Body:**
    -   Scrollable list of recipe cards
    -   Recipe card: name, type icon, rarity badge, quick stats
    -   Tap to view full recipe details
-   **Recipe Detail Modal:**
    -   Full description
    -   Required components (with availability indicators)
    -   Materials needed
    -   Crafting time
    -   Effects
    -   "Craft This" button

#### 3. Crafting Calculator Screen

-   **Recipe Selection:** Dropdown or search
-   **Requirements Check:**
    -   ✓ Components available (green)
    -   ✗ Components missing (red with quantity needed)
    -   ✓ Materials available (green)
    -   ✗ Materials missing (red with quantity needed)
    -   ✓ Tools available
    -   ✗ Tools missing
-   **Crafting Time Display:** with forge multiplier if applicable
-   **Tinker Check Simulator:**
    -   Roll d12 button
    -   Display result with outcome
    -   Option to apply result to inventory
-   **Actions:**
    -   "Start Crafting" button
    -   "Add to Shopping List" button

#### 4. Regional Reference Screen

-   **Region Selector:** Dropdown or tabs
-   **Component Tables:**
    -   Four tabs (Beast/Elemental/Fish/Herb)
    -   Table format with roll ranges
    -   Tap component to add to inventory or view details

#### 5. Crafting History Screen

-   **Filter:** By date, recipe type, success/failure
-   **Timeline List:**
    -   Date/time
    -   Recipe name
    -   Outcome
    -   Tap to view details

---

## Technical Requirements

### Platform & Framework

-   **Framework:** React Native with Expo
-   **Target Platforms:** iOS and Android
-   **Minimum Versions:**
    -   iOS 13.0+
    -   Android 10.0+ (API level 29)

### Technology Stack

-   **UI Framework:** React Native (Expo managed workflow)
-   **Navigation:** React Navigation 6.x
-   **State Management:** React Context API or Redux Toolkit
-   **Database:**
    -   Realm (for offline-first with sync capabilities)
-   **UI Components:**
    -   React Native Paper or Native Base (consistent Material Design)
    -   Custom components for game-specific elements
-   **Icons:** React Native Vector Icons or Expo Icons

### Data Management

-   **Offline-First:** All core functionality works without internet
-   **Data Storage:**
    -   Component database (read-only, bundled with app)
    -   User inventory (persistent local storage)
    -   Crafting history (local storage with export option)
-   **Data Import/Export:**
    -   Export inventory as JSON
    -   Share inventory with other players
    -   Backup/restore functionality

### Performance Requirements

-   **Startup Time:** < 3 seconds on mid-range devices
-   **Search/Filter:** Results displayed within 500ms
-   **Smooth Scrolling:** 60 FPS for component and recipe lists
-   **App Size:** < 50 MB initial download

### Code Quality

-   **TypeScript:** Strong typing for all data models
-   **ESLint:** Enforce code style consistency
-   **Testing:**
    -   Unit tests for calculations and business logic
    -   Component tests for UI elements
    -   Integration tests for crafting workflows

---

## Feature Breakdown by Release

### MVP (Version 1.0)

**Goal:** Basic inventory and recipe management

**Features:**

-   ✅ Component inventory management (add/remove/edit)
-   ✅ Materials tracking
-   ✅ Recipe browser with search
-   ✅ Basic crafting calculator
-   ✅ Regional component reference (read-only)
-   ✅ Simple data persistence (Realm)

### Version 1.1

**Goal:** Enhanced crafting experience

**Features:**

-   ✅ Tinker Check simulator
-   ✅ Crafting history tracking
-   ✅ Advanced filters (craftable now, by components)
-   ✅ Shopping list feature
-   ✅ Tool inventory management

### Version 1.2

**Goal:** Multiple characters and sharing

**Features:**

-   ✅ Multiple character profiles
-   ✅ Switch between inventories
-   ✅ Export/import inventory
-   ✅ Share inventory with party members

### Version 2.0

**Goal:** Campaign management

**Features:**

-   ✅ Campaign tracker (link multiple characters)
-   ✅ Session notes integration
-   ✅ Party inventory pooling
-   ✅ Crafting crew mechanics
-   ✅ Cloud sync (optional account creation)

---

## Game Rules Implementation

### Crafting Formula

```
Materials Required = (Item Cost Tier Value) × (Item Slots)

Cost Tier Values:
- Copper Coins: 2 materials per slot
- Silver Coins: 3 materials per slot
- Gold Coins: 4 materials per slot
- Ancient Coins: 5 materials per slot
- Magnificent: 5 materials per slot + Components

Crafting Time:
- Copper: 1d6 Hours
- Silver: 6+1d6 Hours
- Gold: 1d6 Days
- Ancient: 1d6 Weeks
- Alchemy/Cooking: 1 Hour

Forge Multiplier: 2x crafting time for metal items
```

### Tinker Check Outcomes

**Mundane Items (d12):**

-   1-2: Failure (lose all materials)
-   3-5: Failure (salvage 1d4 materials)
-   6-8: Success
-   9-11: Success (use 1d4 fewer materials)
-   12+: Success with Magnificent trait

**Magnificent Items (d12):**

-   1-2: Failure (lose all materials)
-   3-5: Failure (salvage 1d4 materials)
-   6-8: Success
-   9-11: Success (use 1d4 fewer materials)
-   12+: Success with additional Magnificent trait

**Alchemy (d12):**

-   1-2: Failure
-   3-5: Failure (can retry once)
-   6-8: Success (1 use)
-   9-11: Success (1d6 usage die)
-   12+: Success (1d8 usage die)

**Cooking (d12):**

-   1-2: Inedible failure
-   3-5: Edible but no buffs (feeds 1)
-   6-8: Decent dish (feeds 2)
-   9-11: Tasty meal (feeds 3)
-   12+: Gourmet meal (feeds 4)

**Magic Items (d12):**

-   1-2: Failure
-   3-5: Failure (salvage 1d4 materials)
-   6-8: Success with flaw
-   9-11: Success
-   12+: Success (enhanced property)

### Special Rules to Implement

-   Treat (0) Slot items as (1) Slot for crafting
-   Minimum 1 Material required regardless of perks
-   Makeshift items: 2 materials per slot, 1d6 hours, temporary
-   Repairing: 1 material per slot (mundane), 2 per slot (magnificent), 5 per slot (magic)
-   Salvaging: Materials = Item Slot value at a forge

---

## UI/UX Design Guidelines

### Visual Design

-   **Theme:** Fantasy RPG aesthetic matching Land of Eem art style
-   **Color Palette:**
    -   Beast components: earthy browns/oranges 🐾
    -   Elemental components: stone grays/metallic 🗻
    -   Fish components: aquatic blues/greens 🎣
    -   Herb components: natural greens/purples 🌿
-   **Typography:**
    -   Headers: Bold, slightly medieval-inspired
    -   Body: Clean, readable sans-serif
-   **Icons:** Use emoji or custom icons for component types

### Interaction Patterns

-   **Swipe Actions:** Swipe on inventory items to quick-add/remove
-   **Long Press:** Long press for detailed view or quick actions
-   **Pull to Refresh:** Update data or reset filters
-   **Haptic Feedback:** On critical actions (crafting, rolling dice)

### Accessibility

-   **Text Size:** Support dynamic type sizing
-   **Color Contrast:** WCAG AA compliant
-   **Screen Reader:** All interactive elements labeled
-   **Offline Indicators:** Clear messaging when features require connection

---

## Data Requirements

### Component Database Structure

The app will include a complete database of:

-   **236 Components total:**

    -   100 Beast components (d100 table, entries 1-100)
    -   36 Elemental components (d66 table, entries 11-66)
    -   100 Fish components (d100 table, entries 1-100)
    -   100 Herb components (d100 table, entries 1-100)

-   **300 Recipes total:**

    -   100 Alchemy recipes (d100 table)
    -   100 Cooking recipes (d100 table)
    -   100 Crafting recipes (d100 table)

-   **6 Regions:**
    -   Drippy Downs
    -   Fleabag County
    -   Quagmash
    -   River Country
    -   Scalawag Strand
    -   Used T'Be Forest

### Initial Data Seeding

All game data from crafting.txt must be:

1. Parsed and structured into JSON
2. Bundled with the app
3. Loaded into local database on first launch
4. Version-controlled for updates

---

## Non-Functional Requirements

### Security

-   No sensitive data collected (offline-first)
-   Local data only (user's device)
-   Export data encrypted (optional)

### Performance

-   App remains responsive with 1000+ inventory items
-   Search results in < 500ms
-   Smooth animations (60 FPS)

### Reliability

-   App works 100% offline
-   Data persists between sessions
-   Graceful handling of corrupted data

### Maintainability

-   Modular component architecture
-   Clear separation of concerns
-   Comprehensive documentation
-   Easy to add new recipes/components

### Scalability

-   Support for future game expansions
-   Additional regions/components can be added
-   New crafting mechanics can be integrated

---

## Future Enhancements (Post-MVP)

### Advanced Features

-   **Dice Roller Integration:** Built-in dice roller for Tinker Checks
-   **Character Stats:** Track character's Tinker skill bonus
-   **Gathering Tracker:** Log wilderness checks and component gathering
-   **Recipe Discovery:** Track which rare recipes have been found
-   **Cost Calculator:** Calculate coin costs for tools, forges, crews
-   **Time Tracker:** Track in-game time spent crafting
-   **Forge Finder:** List nearby settlements with forges

### Social Features

-   **Party Inventory Sharing:** Share inventory with gaming group
-   **Trade System:** Propose component trades with other players
-   **Recipe Sharing:** Share discovered rare recipes
-   **Crafting Contests:** Compare crafting outcomes with friends

### Integration Features

-   **VTT Integration:** Connect with Roll20 or Foundry VTT
-   **Character Sheet Import:** Import character data
-   **Campaign Logger:** Integration with campaign management tools
-   **Cloud Backup:** Optional cloud sync for premium users

### Monetization (Optional)

-   **Free Tier:** Full core functionality
-   **Premium Features:**
    -   Multiple character slots (>3)
    -   Cloud sync
    -   Advanced analytics
    -   Custom themes
    -   Ad-free experience

---

## Development Phases

### Phase 1: Setup & Data (2 weeks)

-   Project initialization with Expo
-   Data model design
-   Parse crafting.txt into structured JSON
-   Set up local database
-   Seed initial data

### Phase 2: Core UI (3 weeks)

-   Navigation structure
-   Component inventory screen
-   Recipe browser screen
-   Material/tool management
-   Basic styling and theme

### Phase 3: Crafting Logic (2 weeks)

-   Crafting calculator
-   Material requirement calculations
-   Component checking logic
-   Tinker check simulator
-   Crafting session tracker

### Phase 4: Regional Reference (1 week)

-   Region selector
-   Component tables
-   Search and filter
-   Component location lookup

### Phase 5: Polish & Testing (2 weeks)

-   UI/UX refinements
-   Performance optimization
-   Bug fixes
-   User testing
-   Documentation

### Phase 6: Release (1 week)

-   App store preparation
-   Final QA
-   Beta testing
-   Launch

**Total Estimated Time:** 11 weeks for MVP

---

## Success Metrics

### User Engagement

-   Daily active users
-   Average session duration
-   Components added per session
-   Recipes viewed per session

### Feature Adoption

-   % of users using crafting calculator
-   % of users tracking multiple characters
-   % of users using regional reference

### App Performance

-   Crash rate < 1%
-   Average startup time
-   Search response time
-   User retention rate (30 days)

### User Satisfaction

-   App store rating target: 4.5+ stars
-   User feedback response rate
-   Feature request frequency
-   Bug report frequency

---

## Risks & Mitigations

### Technical Risks

| Risk                                     | Impact | Mitigation                                          |
| ---------------------------------------- | ------ | --------------------------------------------------- |
| Database performance with large datasets | High   | Use SQLite with proper indexing, lazy loading       |
| App size exceeds store limits            | Medium | Optimize assets, use vector graphics, compress data |
| Cross-platform compatibility issues      | Medium | Thorough testing on both iOS and Android            |
| Data migration between versions          | Medium | Versioned database schema with migration scripts    |

### Product Risks

| Risk                                       | Impact | Mitigation                                   |
| ------------------------------------------ | ------ | -------------------------------------------- |
| Limited user base (niche game)             | Low    | Focus on core features, community engagement |
| Game rules change in future editions       | Medium | Modular design, easy to update data files    |
| User confusion with complex crafting rules | High   | Clear UI, tooltips, tutorial/onboarding      |
| Competition from other tools               | Low    | Focus on mobile-first, offline experience    |

---

## Appendix

### Glossary

-   **Materials:** Abstract crafting resource (not tracked individually)
-   **Components:** Specific items (Beast/Elemental/Fish/Herb) required for recipes
-   **Tinker Check:** d12 roll to determine crafting outcome
-   **Magnificent Trait:** Special property added to crafted items
-   **Usage Die:** Dice representing number of uses (d6, d8, etc.)
-   **Forge:** Required equipment for metal item crafting
-   **Makeshift Item:** Temporary, quickly-crafted item

### References

-   Land of Eem Core Rulebook (Chapter 3: Items & Equipment)
-   crafting.txt source document
-   React Native Documentation: https://reactnative.dev
-   Expo Documentation: https://docs.expo.dev

### Component Type Icons

-   🐾 Beast Components
-   🗻 Elemental Components
-   🎣 Fish Components
-   🌿 Herb Components
-   🔨 Crafting
-   ⚗️ Alchemy
-   🔥 Cooking
-   🗡️ Weapons
-   🛡️ Armor
-   🧰 Tools

---

## Conclusion

This requirements document outlines a comprehensive React Native Expo application for tracking Land of Eem crafting components and recipes. The app will provide an essential tool for players to manage their crafting inventory, browse recipes, and streamline the crafting process during gameplay.

The MVP focuses on core inventory management and recipe browsing, with a clear roadmap for enhanced features in future releases. The offline-first approach ensures the app works seamlessly during game sessions without requiring internet connectivity.

**Next Steps:**

1. Review and approve requirements
2. Create detailed technical specifications
3. Design UI mockups
4. Set up development environment
5. Begin Phase 1 development
