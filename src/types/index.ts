// Type definitions for Land of Eem Crafting Tracker

export type ComponentType = 'beast' | 'elemental' | 'fish' | 'herb';
export type RecipeType = 'alchemy' | 'cooking' | 'crafting';
export type RecipeRarity = 'common' | 'rare' | 'witchcraft';
export type ItemCostTier = 'copper' | 'silver' | 'gold' | 'ancient';
export type ForgeAccess = 'none' | 'rented' | 'owned';

export interface Component {
  id: string;
  name: string;
  type: ComponentType;
  description: string;
  recipes: string[]; // recipe names that use this component
  regions: string[]; // where it can be found
  rollRange: string; // e.g., "1-2" for d100 table
  magnificentTrait?: string; // for elemental components
  quantity: number; // user's inventory quantity
}

export interface ComponentRequirement {
  componentId: string;
  componentName: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  type: RecipeType;
  rarity: RecipeRarity;
  effect: string;
  components: ComponentRequirement[];
  materialsRequired?: number;
  craftingTime: string;
  itemCost?: ItemCostTier;
  itemSlots?: number;
  requiresForge: boolean;
  properties?: string[]; // magnificent traits, effects, etc.
}

export interface UserInventory {
  components: Map<string, number>; // componentId -> quantity
  materials: number;
  tools: {
    standardCraftingTools: boolean;
    masterCraftingTools: boolean;
    cookware: boolean;
    alchemySet: boolean;
    forgeAccess: ForgeAccess;
  };
}

export interface CraftingSession {
  id: string;
  recipeId: string;
  recipeName: string;
  date: number; // timestamp
  tinkerCheckRoll: number;
  outcome: string;
  materialsUsed: number;
  componentsUsed: ComponentRequirement[];
  itemCrafted: boolean;
  magnificentTrait?: string;
  notes: string;
}

export interface Region {
  name: string;
  components: {
    beast: Component[];
    elemental: Component[];
    fish: Component[];
    herb: Component[];
  };
}

// Crafting formula constants
export const MATERIAL_COSTS: Record<ItemCostTier, number> = {
  copper: 2,
  silver: 3,
  gold: 4,
  ancient: 5,
};

export const CRAFTING_TIMES: Record<ItemCostTier, string> = {
  copper: '1d6 Hours',
  silver: '6+1d6 Hours',
  gold: '1d6 Days',
  ancient: '1d6 Weeks',
};

// Tinker check outcome ranges
export interface TinkerCheckOutcome {
  roll: number;
  result: string;
}

export const MUNDANE_TINKER_CHECKS: TinkerCheckOutcome[] = [
  { roll: 2, result: 'Failure (lose all materials)' },
  { roll: 5, result: 'Failure (salvage 1d4 materials)' },
  { roll: 8, result: 'Success' },
  { roll: 11, result: 'Success (use 1d4 fewer materials)' },
  { roll: 12, result: 'Success with Magnificent trait' },
];

export const ALCHEMY_TINKER_CHECKS: TinkerCheckOutcome[] = [
  { roll: 2, result: 'Failure' },
  { roll: 5, result: 'Failure (can retry once)' },
  { roll: 8, result: 'Success (1 use)' },
  { roll: 11, result: 'Success (1d6 usage die)' },
  { roll: 12, result: 'Success (1d8 usage die)' },
];

export const COOKING_TINKER_CHECKS: TinkerCheckOutcome[] = [
  { roll: 2, result: 'Inedible failure' },
  { roll: 5, result: 'Edible but no buffs (feeds 1)' },
  { roll: 8, result: 'Decent dish (feeds 2)' },
  { roll: 11, result: 'Tasty meal (feeds 3)' },
  { roll: 12, result: 'Gourmet meal (feeds 4)' },
];
