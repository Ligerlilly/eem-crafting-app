# Land of Eem Crafting Tracker

A React Native Expo mobile application for tracking crafting components, recipes, and sessions in the Land of Eem tabletop RPG.

## Features

### MVP (Version 1.0)

-   ✅ Component inventory management with type filtering (Beast, Elemental, Fish, Herb)
-   ✅ Materials tracking
-   ✅ Recipe browser with type filtering (Alchemy, Cooking, Crafting)
-   ✅ Crafting calculator with Tinker Check outcomes
-   ✅ Regional component reference for 6 regions
-   ✅ Crafting history tracking
-   ✅ Fantasy RPG-themed UI with Land of Eem aesthetic

## Project Structure

```
eem-crafting-app/
├── App.tsx                 # Main app with navigation
├── src/
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   └── screens/
│       ├── InventoryScreen.tsx   # Component & material inventory
│       ├── RecipesScreen.tsx     # Recipe browser
│       ├── CraftScreen.tsx       # Crafting calculator
│       ├── RegionsScreen.tsx     # Regional component tables
│       └── HistoryScreen.tsx     # Crafting session history
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── requirements.md        # Full requirements document
└── crafting.txt          # Source game rules
```

## Getting Started

### Prerequisites

-   Node.js 20.9+ (note: some packages warn about 20.19.4+, but 20.9 works)
-   npm or yarn
-   Expo CLI
-   iOS Simulator (Mac) or Android Emulator

### Installation

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Start the development server:

```bash
npm start
```

3. Run on your device:

-   Press `i` for iOS simulator
-   Press `a` for Android emulator
-   Scan QR code with Expo Go app for physical device

## Data Models

The app uses TypeScript interfaces for:

-   **Component**: Beast, Elemental, Fish, and Herb components with descriptions, regions, and quantities
-   **Recipe**: Alchemy, Cooking, and Crafting recipes with requirements and effects
-   **UserInventory**: Tracks components, materials, and tools
-   **CraftingSession**: Records crafting attempts and outcomes

## Game Rules Implementation

### Crafting Formula

```
Materials Required = (Cost Tier Value) × (Item Slots)

Cost Tiers:
- Copper: 2 materials/slot, 1d6 hours
- Silver: 3 materials/slot, 6+1d6 hours
- Gold: 4 materials/slot, 1d6 days
- Ancient: 5 materials/slot, 1d6 weeks
```

### Tinker Check Outcomes (d12)

-   1-2: Failure
-   3-5: Failure (salvage 1d4 materials)
-   6-8: Success
-   9-11: Success (use 1d4 fewer materials)
-   12+: Success with Magnificent trait

## Technology Stack

-   **Framework**: React Native + Expo (managed workflow)
-   **Language**: TypeScript
-   **Navigation**: React Navigation 6.x (Bottom Tabs)
-   **UI**: Custom components with RPG theme
-   **State Management**: React hooks (useState)
-   **Platform**: iOS, Android, Web

## Roadmap

### Version 1.1 (Next)

-   [ ] Populate component database from crafting.txt
-   [ ] Populate recipe database (300+ recipes)
-   [ ] Implement crafting calculator logic
-   [ ] Add component quantity management
-   [ ] Tinker Check dice roller
-   [ ] Save/load inventory with AsyncStorage

### Version 1.2

-   [ ] Multiple character profiles
-   [ ] Export/import inventory
-   [ ] Advanced recipe filtering
-   [ ] Shopping list feature

### Version 2.0

-   [ ] Campaign management
-   [ ] Party inventory sharing
-   [ ] Cloud sync
-   [ ] Recipe discovery tracking

## Color Palette

The app uses a fantasy RPG aesthetic:

-   **Background**: #1a0f08 (dark brown)
-   **Cards**: #2c1810 (medium brown)
-   **Borders**: #4a2c2a (warm brown)
-   **Primary**: #d4a574 (gold/tan)
-   **Text**: #f5e6d3 (cream)
-   **Secondary**: #a0826d (muted tan)

## Component Icons

-   🐾 Beast Components
-   🗻 Elemental Components
-   🎣 Fish Components
-   🌿 Herb Components
-   ⚗️ Alchemy
-   🔥 Cooking
-   🔨 Crafting

## Contributing

This is a personal project for Land of Eem players. Contributions welcome!

## License

MIT

## Acknowledgments

-   Land of Eem tabletop RPG by Nate Marcel and team
-   Crafting system rules from Land of Eem Core Rulebook
