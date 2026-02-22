import * as SQLite from "expo-sqlite";
import { CraftingSession } from "../types";

const DB_NAME = "eem_crafting.db";

let db: SQLite.SQLiteDatabase | null = null;

// Initialize database and create tables
export const initDatabase = async (): Promise<void> => {
    try {
        db = await SQLite.openDatabaseAsync(DB_NAME);

        // Create tables
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            
            CREATE TABLE IF NOT EXISTS inventory_components (
                component_id TEXT PRIMARY KEY,
                quantity INTEGER NOT NULL DEFAULT 0
            );
            
            CREATE TABLE IF NOT EXISTS inventory_settings (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                materials INTEGER NOT NULL DEFAULT 0,
                standard_crafting_tools INTEGER NOT NULL DEFAULT 0,
                master_crafting_tools INTEGER NOT NULL DEFAULT 0,
                cookware INTEGER NOT NULL DEFAULT 0,
                alchemy_set INTEGER NOT NULL DEFAULT 0,
                forge_access TEXT NOT NULL DEFAULT 'none'
            );
            
            CREATE TABLE IF NOT EXISTS crafting_history (
                id TEXT PRIMARY KEY,
                recipe_id TEXT NOT NULL,
                recipe_name TEXT NOT NULL,
                date INTEGER NOT NULL,
                tinker_check_roll INTEGER NOT NULL,
                outcome TEXT NOT NULL,
                materials_used INTEGER NOT NULL,
                components_used TEXT NOT NULL,
                item_crafted INTEGER NOT NULL,
                magnificent_trait TEXT,
                notes TEXT
            );
            
            -- Initialize settings if not exists
            INSERT OR IGNORE INTO inventory_settings (id, materials) VALUES (1, 0);
        `);

        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
};

// Component Operations
export const getComponentQuantity = async (componentId: string): Promise<number> => {
    if (!db) throw new Error("Database not initialized");

    const result = await db.getFirstAsync<{ quantity: number }>(
        "SELECT quantity FROM inventory_components WHERE component_id = ?",
        [componentId]
    );
    return result?.quantity ?? 0;
};

export const getAllComponents = async (): Promise<Map<string, number>> => {
    if (!db) throw new Error("Database not initialized");

    const rows = await db.getAllAsync<{ component_id: string; quantity: number }>(
        "SELECT component_id, quantity FROM inventory_components"
    );

    const components = new Map<string, number>();
    rows.forEach((row) => {
        components.set(row.component_id, row.quantity);
    });
    return components;
};

export const setComponentQuantity = async (componentId: string, quantity: number): Promise<void> => {
    if (!db) throw new Error("Database not initialized");

    if (quantity <= 0) {
        await db.runAsync("DELETE FROM inventory_components WHERE component_id = ?", [componentId]);
    } else {
        await db.runAsync(
            "INSERT OR REPLACE INTO inventory_components (component_id, quantity) VALUES (?, ?)",
            [componentId, quantity]
        );
    }
};

// Inventory Settings Operations
export const getInventorySettings = async () => {
    if (!db) throw new Error("Database not initialized");

    const settings = await db.getFirstAsync<{
        materials: number;
        standard_crafting_tools: number;
        master_crafting_tools: number;
        cookware: number;
        alchemy_set: number;
        forge_access: string;
    }>("SELECT * FROM inventory_settings WHERE id = 1");

    return {
        materials: settings?.materials ?? 0,
        tools: {
            standardCraftingTools: settings?.standard_crafting_tools === 1,
            masterCraftingTools: settings?.master_crafting_tools === 1,
            cookware: settings?.cookware === 1,
            alchemySet: settings?.alchemy_set === 1,
            forgeAccess: (settings?.forge_access ?? "none") as "none" | "rented" | "owned",
        },
    };
};

export const updateMaterials = async (materials: number): Promise<void> => {
    if (!db) throw new Error("Database not initialized");

    await db.runAsync("UPDATE inventory_settings SET materials = ? WHERE id = 1", [materials]);
};

export const updateTools = async (tools: {
    standardCraftingTools?: boolean;
    masterCraftingTools?: boolean;
    cookware?: boolean;
    alchemySet?: boolean;
    forgeAccess?: "none" | "rented" | "owned";
}): Promise<void> => {
    if (!db) throw new Error("Database not initialized");

    const updates: string[] = [];
    const values: any[] = [];

    if (tools.standardCraftingTools !== undefined) {
        updates.push("standard_crafting_tools = ?");
        values.push(tools.standardCraftingTools ? 1 : 0);
    }
    if (tools.masterCraftingTools !== undefined) {
        updates.push("master_crafting_tools = ?");
        values.push(tools.masterCraftingTools ? 1 : 0);
    }
    if (tools.cookware !== undefined) {
        updates.push("cookware = ?");
        values.push(tools.cookware ? 1 : 0);
    }
    if (tools.alchemySet !== undefined) {
        updates.push("alchemy_set = ?");
        values.push(tools.alchemySet ? 1 : 0);
    }
    if (tools.forgeAccess !== undefined) {
        updates.push("forge_access = ?");
        values.push(tools.forgeAccess);
    }

    if (updates.length > 0) {
        const sql = `UPDATE inventory_settings SET ${updates.join(", ")} WHERE id = 1`;
        await db.runAsync(sql, values);
    }
};

// Crafting History Operations
export const getAllCraftingHistory = async (): Promise<CraftingSession[]> => {
    if (!db) throw new Error("Database not initialized");

    const rows = await db.getAllAsync<{
        id: string;
        recipe_id: string;
        recipe_name: string;
        date: number;
        tinker_check_roll: number;
        outcome: string;
        materials_used: number;
        components_used: string;
        item_crafted: number;
        magnificent_trait: string | null;
        notes: string;
    }>("SELECT * FROM crafting_history ORDER BY date DESC");

    return rows.map((row) => ({
        id: row.id,
        recipeId: row.recipe_id,
        recipeName: row.recipe_name,
        date: row.date,
        tinkerCheckRoll: row.tinker_check_roll,
        outcome: row.outcome,
        materialsUsed: row.materials_used,
        componentsUsed: JSON.parse(row.components_used),
        itemCrafted: row.item_crafted === 1,
        magnificentTrait: row.magnificent_trait ?? undefined,
        notes: row.notes,
    }));
};

export const addCraftingSession = async (session: CraftingSession): Promise<void> => {
    if (!db) throw new Error("Database not initialized");

    await db.runAsync(
        `INSERT INTO crafting_history 
        (id, recipe_id, recipe_name, date, tinker_check_roll, outcome, materials_used, 
         components_used, item_crafted, magnificent_trait, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            session.id,
            session.recipeId,
            session.recipeName,
            session.date,
            session.tinkerCheckRoll,
            session.outcome,
            session.materialsUsed,
            JSON.stringify(session.componentsUsed),
            session.itemCrafted ? 1 : 0,
            session.magnificentTrait ?? null,
            session.notes,
        ]
    );
};

export const clearAllData = async (): Promise<void> => {
    if (!db) throw new Error("Database not initialized");

    await db.execAsync(`
        DELETE FROM inventory_components;
        DELETE FROM crafting_history;
        UPDATE inventory_settings SET 
            materials = 0,
            standard_crafting_tools = 0,
            master_crafting_tools = 0,
            cookware = 0,
            alchemy_set = 0,
            forge_access = 'none'
        WHERE id = 1;
    `);
};
