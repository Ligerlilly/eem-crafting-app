# EEM Crafting App - UI/UX Design Guide

## Design Principles

### 1. Information Hierarchy

**Current Priority:** Components → Recipes → Crafting → Tools

**Optimal Hierarchy:**

1. **Primary Actions**: What users do most (Browse components, Check recipes, Craft items)
2. **Secondary Actions**: Supporting tasks (Manage inventory, View history)
3. **Tertiary Actions**: Occasional needs (Tools management, Settings)

---

## Screen-by-Screen Analysis

### 📦 Inventory Screen (Primary Hub)

**Current Issues:**

-   Component type filters take too much vertical space
-   List items could be more scannable
-   No quick search functionality

**Recommended Improvements:**

#### Header Area (Fixed)

```
┌─────────────────────────────────────┐
│  🎒 Inventory          [🔍 Search]  │
│  📦 Components: 42  💎 Materials: 15 │
│  ⚒️ Tools: 3                        │
└─────────────────────────────────────┘
```

#### Filter Pills (Compact Horizontal Scroll)

```
[🐾 Beast] [🗻 Elemental] [🎣 Fish] [🌿 Herb] [All]
```

-   Height: 36px (current: ~48px)
-   Pill style with icons
-   Selected state with accent color

#### List Items (Card Design)

```
┌─────────────────────────────────────┐
│ 🦌 Great Stag Antler         QTY: 3 │
│ Drippy Downs • Used T'Be Forest     │
│ ⚗️ Used in 2 recipes                │
└─────────────────────────────────────┘
```

**Key Improvements:**

-   Quantity badge prominent (top right)
-   Region tags as pills
-   Recipe count indicator
-   Quick increment/decrement buttons on long-press
-   Color-coded by rarity/type

---

### 📜 Recipes Screen

**Current Issues:**

-   Filter buttons too large initially
-   No search or sort options
-   Hard to see which recipes are craftable at a glance

**Recommended Layout:**

#### Top Bar (Sticky)

```
┌─────────────────────────────────────┐
│ 📜 Recipes              [🔍] [⋮]    │
│ ⚗️ Alchemy  🔥 Cooking  🔨 Crafting │
│ [✓ Craftable] [All]  Sort: A-Z ▼    │
└─────────────────────────────────────┘
```

#### Recipe Cards (Enhanced)

```
┌─────────────────────────────────────┐
│ ✓ Courage Potion          [COMMON]  │
│ Heal 1d12 Courage                   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ 📦 2 components  ⏱ 1 Hour          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ✗ Flying Fang Daggers     [RARE]    │
│ 5 Daggers. 0 Slot items.            │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ 📦 2 components  ⏱ 1d6 Days  🔥     │
│ Missing: Ur Steel (need 1)          │
└─────────────────────────────────────┘
```

**Visual Indicators:**

-   ✓ = Can craft (green)
-   ✗ = Cannot craft (red)
-   🔥 = Requires forge
-   Progress bar showing component availability

---

### 🔨 Craft Screen

**Current Issues:**

-   Unclear workflow
-   No visual feedback on crafting
-   Missing batch crafting option

**Recommended Design:**

#### Workflow Steps

```
1. SELECT RECIPE
   ┌─────────────────────────────────┐
   │ Search or Browse Available      │
   │ [Most Recent] [Favorites]       │
   └─────────────────────────────────┘

2. REVIEW REQUIREMENTS
   ┌─────────────────────────────────┐
   │ Courage Potion                  │
   │ ✓ Grail Tick Mucus      1/1     │
   │ ✓ Doohagenberry         1/1     │
   │                                 │
   │ Quantity: [－] 1 [＋]           │
   │                                 │
   │ Total Time: 1 Hour              │
   │ [ CRAFT NOW ]                   │
   └─────────────────────────────────┘

3. CRAFTING ANIMATION
   ┌─────────────────────────────────┐
   │      ⚗️                         │
   │   Crafting...                   │
   │   ▓▓▓▓▓▓▓▓▓░░░░░░░  60%        │
   │                                 │
   │   [Cancel]                      │
   └─────────────────────────────────┘

4. SUCCESS
   ┌─────────────────────────────────┐
   │       ✨                        │
   │   Courage Potion                │
   │   Added to Inventory!           │
   │                                 │
   │   [View] [Craft Another]        │
   └─────────────────────────────────┘
```

---

### 🗺️ Regions Screen

**Current Issues:**

-   Static list, not engaging
-   No visual differentiation
-   Missing component discovery flow

**Recommended Design:**

#### Map-Style Interface

```
┌─────────────────────────────────────┐
│                                     │
│     🌲 Used T'Be Forest             │
│        32 components                │
│                                     │
│  🏞️ Drippy     💧 Quagmash         │
│   Downs          28 comp            │
│   25 comp                           │
│                                     │
│     🏘️ Fleabag  🌊 Scalawag        │
│      County      Strand             │
│      30 comp     22 comp            │
│                                     │
│           🏔️ River Country          │
│              26 components          │
└─────────────────────────────────────┘
```

**Features:**

-   Visual map layout
-   Tap region to see available components
-   Progress tracking (collected/total)
-   Regional theming (colors, icons)

---

### 📊 History Screen

**Current Issues:**

-   Linear list is boring
-   No insights or statistics
-   Missing search/filter

**Recommended Design:**

#### Stats Dashboard

```
┌─────────────────────────────────────┐
│ 📊 Crafting Statistics              │
│                                     │
│ Total Crafted: 47                   │
│ Most Crafted: Courage Potion (12)   │
│ Recent Streak: 5 days 🔥            │
│                                     │
│ ┌─────────┬─────────┬─────────┐   │
│ │ Alchemy │ Cooking │Crafting │   │
│ │   18    │   15    │   14    │   │
│ └─────────┴─────────┴─────────┘   │
└─────────────────────────────────────┘
```

#### Timeline View

```
TODAY
├─ 🔨 Tiger Bone Shield (2:30 PM)
└─ ⚗️ Flight Potion (11:45 AM)

YESTERDAY
├─ 🔥 Kilorat Jerky (8:15 PM)
├─ ⚗️ Courage Potion (3:20 PM)
└─ 🔨 Welkin Armor (10:30 AM)
```

---

## Color System

### Current Palette (Dark Fantasy Theme)

```css
Background:   #1a0f08 (Very Dark Brown)
Surface:      #2c1810 (Dark Brown)
Primary:      #d4a574 (Gold/Tan)
Secondary:    #a0826d (Light Brown)
Accent:       #4a2c2a (Burgundy)
Text:         #f5e6d3 (Cream)
```

### Recommended Enhancements

#### Rarity Colors

```css
Common:       #a0826d (Tan)
Rare:         #d4a574 (Gold)
Witchcraft:   #8b4789 (Purple)
Magnificent:  #d4af37 (Metallic Gold)
```

#### Semantic Colors

```css
Success:      #4a9d5f (Green)
Warning:      #e89b3c (Orange)
Error:        #c96d6d (Red)
Info:         #6b9dc9 (Blue)
```

#### Component Type Colors

```css
Beast:        #8b6f47 (Brown)
Elemental:    #6b7c8f (Steel Blue)
Fish:         #5a8fa8 (Ocean Blue)
Herb:         #6b8e5a (Forest Green)
```

---

## Typography Scale

### Font Sizes

```
Hero:         32px (Screen titles)
Title:        24px (Section headers)
Subtitle:     18px (Card titles)
Body:         14px (Content text)
Caption:      12px (Meta information)
Tiny:         10px (Tags, labels)
```

### Font Weights

```
Bold:         700 (Emphasis, headers)
Semibold:     600 (Card titles, buttons)
Regular:      400 (Body text)
Light:        300 (Secondary text)
```

---

## Spacing System (8px Base)

```
Micro:    4px   (Icon spacing)
Small:    8px   (Compact spacing)
Medium:   16px  (Standard spacing)
Large:    24px  (Section spacing)
XLarge:   32px  (Screen margins)
XXLarge:  48px  (Major divisions)
```

---

## Component Library

### Buttons

#### Primary Button

```
Height: 48px
Padding: 12px 24px
Border Radius: 8px
Background: #d4a574
Text: #2c1810, Bold, 16px
```

#### Secondary Button

```
Height: 44px
Padding: 10px 20px
Border Radius: 8px
Background: Transparent
Border: 2px solid #4a2c2a
Text: #a0826d, Semibold, 14px
```

#### Icon Button

```
Size: 40x40px
Border Radius: 20px
Background: #3d2415
Icon: 20px
```

### Cards

#### Standard Card

```
Padding: 16px
Border Radius: 12px
Background: #2c1810
Border: 1px solid #4a2c2a
Shadow: 0 2px 8px rgba(0,0,0,0.3)
```

#### Elevated Card (Active/Selected)

```
Same as Standard +
Border: 2px solid #d4a574
Shadow: 0 4px 12px rgba(212,165,116,0.2)
```

### Pills/Tags

```
Height: 28px
Padding: 4px 12px
Border Radius: 14px
Background: #3d2415
Text: #a0826d, Semibold, 12px
```

---

## Interactive States

### Touch States

```
Normal:    opacity: 1.0
Pressed:   opacity: 0.7, scale: 0.98
Disabled:  opacity: 0.4
Loading:   opacity: 0.6 + spinner
```

### Hover (Web)

```
Cards:     Border color transition
Buttons:   Background darken 10%
Links:     Underline + color shift
```

---

## Animations & Transitions

### Standard Timing

```
Fast:      150ms (Toggles, switches)
Normal:    250ms (Cards, modals)
Slow:      350ms (Screen transitions)
```

### Easing Functions

```
Standard:  cubic-bezier(0.4, 0.0, 0.2, 1)
Enter:     cubic-bezier(0.0, 0.0, 0.2, 1)
Exit:      cubic-bezier(0.4, 0.0, 1, 1)
```

### Key Animations

-   **Modal Enter**: Slide up + fade in
-   **Modal Exit**: Slide down + fade out
-   **List Items**: Stagger fade-in (50ms delay)
-   **Success State**: Scale pulse + confetti
-   **Loading**: Shimmer skeleton screens

---

## Accessibility

### Contrast Ratios

```
Normal Text:       4.5:1 minimum
Large Text:        3:1 minimum
Interactive:       4.5:1 minimum
UI Components:     3:1 minimum
```

### Touch Targets

```
Minimum:  44x44px
Optimal:  48x48px
Spacing:  8px between targets
```

### Screen Reader Support

-   All interactive elements labeled
-   Status announcements for changes
-   Proper heading hierarchy
-   Form validation feedback

---

## Performance Optimizations

### List Rendering

-   Use `FlatList` with `getItemLayout` for known heights
-   `removeClippedSubviews={true}` for long lists
-   `maxToRenderPerBatch={10}`
-   `windowSize={10}`

### Image Optimization

-   Use appropriate image sizes
-   Lazy load images below fold
-   Cache frequently accessed images
-   Use placeholder skeletons

### State Management

-   Memoize expensive calculations
-   Use `React.memo` for pure components
-   Debounce search inputs (300ms)
-   Throttle scroll handlers (100ms)

---

## Navigation Patterns

### Bottom Tab Bar (Current - Good)

```
✓ Always visible
✓ Clear icons + labels
✓ 5 main sections
✓ Active state indication
```

### Recommended Gestures

-   **Swipe**: Navigate between adjacent tabs
-   **Long Press**: Quick actions menu
-   **Pull to Refresh**: Update data
-   **Swipe to Delete**: Remove history items

---

## Modal Design Best Practices

### Size & Position

```
Max Width:   90% of screen
Max Height:  85% of screen
Padding:     20px
Top Margin:  60px (safe area)
```

### Content Structure

```
1. Header (Fixed)
   - Title
   - Close button

2. Body (Scrollable)
   - Sections with clear labels
   - Scannable layout

3. Footer (Fixed)
   - Primary action
   - Secondary action
```

---

## Empty States

### Design Pattern

```
┌─────────────────────────────────────┐
│                                     │
│           [Large Icon]              │
│         64px, muted color           │
│                                     │
│      "No items yet"                 │
│       18px, semibold                │
│                                     │
│   "Add components to get started"   │
│       14px, secondary color         │
│                                     │
│      [Primary CTA Button]           │
│                                     │
└─────────────────────────────────────┘
```

---

## Error Handling

### Error States

```
┌─────────────────────────────────────┐
│            ⚠️                       │
│     "Something went wrong"          │
│                                     │
│   Error details (if helpful)        │
│                                     │
│   [Try Again]  [Go Back]            │
└─────────────────────────────────────┘
```

### Inline Validation

-   Real-time as user types
-   Clear error messages
-   Suggestions for fixes
-   Don't block progression if possible

---

## Loading States

### Skeleton Screens (Preferred)

```
┌─────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓        ░░░░           │
│ ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
└─────────────────────────────────────┘
```

### Spinners

-   Use for quick operations (<2s)
-   Show progress percentage when possible
-   Allow cancellation for long operations

---

## Search & Filter

### Search Input

```
┌─────────────────────────────────────┐
│ 🔍 Search components...        [×] │
└─────────────────────────────────────┘
```

**Features:**

-   Auto-focus on screen load
-   Clear button when text present
-   Search history/suggestions
-   Debounced search (300ms)
-   Search by name, region, or recipe

### Filter System

```
Active Filters: Beast • Drippy Downs • Has Quantity

[Clear All]

Type:
  ☑ Beast  ☑ Elemental  ☐ Fish  ☐ Herb

Region:
  ☑ Drippy Downs  ☐ Fleabag County  ...

Status:
  ☑ In Stock  ☐ Out of Stock

[Apply Filters]
```

---

## Data Visualization

### Progress Indicators

```
Collection Progress
▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 42/336 (12%)

By Type:
Beast:      25/100  ▓▓░░░ 25%
Elemental:   8/36   ▓▓▓▓▓ 22%
Fish:        5/100  ▓░░░░  5%
Herb:        4/100  ▓░░░░  4%
```

### Stats Cards

```
┌────────────────┐
│ 🎯 Most Used   │
│ Doohagenberry  │
│ Used 15 times  │
└────────────────┘
```

---

## Quick Actions

### Swipe Actions (List Items)

```
← Swipe Left
  [🗑️ Delete]  [📍 Pin]

Swipe Right →
  [➕ Add]  [📝 Edit]
```

### Long Press Menu

```
┌─────────────────────────┐
│ Great Stag Antler       │
├─────────────────────────┤
│ ➕ Add to Inventory     │
│ 📋 View Recipes         │
│ 📍 Pin to Top           │
│ 📤 Share                │
│ ❌ Cancel               │
└─────────────────────────┘
```

---

## Onboarding & Tutorials

### First Launch

```
Page 1: Welcome + App Purpose
Page 2: Navigate Inventory
Page 3: Browse Recipes
Page 4: Craft Items
Page 5: Track Progress

[Skip]  [Next]  [Get Started]
```

### Contextual Tooltips

-   Small arrow pointers
-   Dismiss on tap
-   "Don't show again" option
-   Maximum 3 per screen

---

## Implementation Priority

### Phase 1: Critical UX (Week 1)

1. ✅ Optimize filter button sizes
2. ✅ Improve scrollable areas
3. 🔲 Add search functionality
4. 🔲 Implement "Can Craft" filter
5. 🔲 Better empty states

### Phase 2: Enhanced Features (Week 2)

1. 🔲 Quick add/subtract in inventory
2. 🔲 Batch crafting
3. 🔲 Recipe favoriting
4. 🔲 Progress tracking visualizations
5. 🔲 Swipe gestures

### Phase 3: Polish (Week 3)

1. 🔲 Animations & transitions
2. 🔲 Skeleton loading states
3. 🔲 Haptic feedback
4. 🔲 Dark/light theme toggle
5. 🔲 Advanced filters

### Phase 4: Delight (Week 4)

1. 🔲 Achievement system
2. 🔲 Daily challenges
3. 🔲 Collection statistics
4. 🔲 Export/import data
5. 🔲 Widget support

---

## Conclusion

This design guide balances **usability**, **aesthetics**, and **performance** for a crafting companion app. The medieval fantasy theme is maintained while ensuring modern UX best practices.

**Key Takeaways:**

-   **Hierarchy**: Most-used features are most accessible
-   **Clarity**: Visual feedback for all states
-   **Efficiency**: Minimal taps to complete tasks
-   **Delight**: Smooth animations and satisfying interactions
-   **Accessibility**: Inclusive design for all users

**Next Steps:**

1. Review with team/users
2. Create mockups for key screens
3. Implement high-priority improvements
4. Test with real users
5. Iterate based on feedback
