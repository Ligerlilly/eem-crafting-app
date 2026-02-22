import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserInventory, Component, CraftingSession } from "../types";
import { allComponents } from "../data/components";
import * as db from "../services/database";

interface InventoryContextType {
    inventory: UserInventory;
    components: Component[];
    craftingHistory: CraftingSession[];
    addComponent: (componentId: string, quantity: number) => void;
    removeComponent: (componentId: string, quantity: number) => void;
    setComponentQuantity: (componentId: string, quantity: number) => void;
    addMaterials: (amount: number) => void;
    removeMaterials: (amount: number) => void;
    updateTools: (tools: Partial<UserInventory["tools"]>) => void;
    addCraftingSession: (session: CraftingSession) => void;
    getComponentById: (id: string) => Component | undefined;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error("useInventory must be used within an InventoryProvider");
    }
    return context;
};

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [inventory, setInventory] = useState<UserInventory>({
        materials: 0,
        components: new Map(),
        tools: {
            standardCraftingTools: false,
            masterCraftingTools: false,
            cookware: false,
            alchemySet: false,
            forgeAccess: "none",
        },
    });

    const [craftingHistory, setCraftingHistory] = useState<CraftingSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Create a working copy of components with quantities from inventory
    const [components] = useState<Component[]>(() => {
        return allComponents.map((comp) => ({
            ...comp,
            quantity: 0,
        }));
    });

    // Initialize database and load data on mount
    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        try {
            // Initialize database
            await db.initDatabase();

            // Load all data from database
            const componentsMap = await db.getAllComponents();
            const settings = await db.getInventorySettings();
            const history = await db.getAllCraftingHistory();

            setInventory({
                materials: settings.materials,
                components: componentsMap,
                tools: settings.tools,
            });
            setCraftingHistory(history);
        } catch (error) {
            console.error("Error initializing app:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addComponent = (componentId: string, quantity: number) => {
        setInventory((prev) => {
            const newComponents = new Map(prev.components);
            const current = newComponents.get(componentId) || 0;
            const newQuantity = current + quantity;
            newComponents.set(componentId, newQuantity);

            // Persist to database
            db.setComponentQuantity(componentId, newQuantity).catch(console.error);

            return { ...prev, components: newComponents };
        });
    };

    const removeComponent = (componentId: string, quantity: number) => {
        setInventory((prev) => {
            const newComponents = new Map(prev.components);
            const current = newComponents.get(componentId) || 0;
            const newQuantity = Math.max(0, current - quantity);

            if (newQuantity === 0) {
                newComponents.delete(componentId);
            } else {
                newComponents.set(componentId, newQuantity);
            }

            // Persist to database
            db.setComponentQuantity(componentId, newQuantity).catch(console.error);

            return { ...prev, components: newComponents };
        });
    };

    const setComponentQuantity = (componentId: string, quantity: number) => {
        setInventory((prev) => {
            const newComponents = new Map(prev.components);
            if (quantity <= 0) {
                newComponents.delete(componentId);
            } else {
                newComponents.set(componentId, quantity);
            }

            // Persist to database
            db.setComponentQuantity(componentId, quantity).catch(console.error);

            return { ...prev, components: newComponents };
        });
    };

    const addMaterials = (amount: number) => {
        setInventory((prev) => {
            const newMaterials = prev.materials + amount;

            // Persist to database
            db.updateMaterials(newMaterials).catch(console.error);

            return {
                ...prev,
                materials: newMaterials,
            };
        });
    };

    const removeMaterials = (amount: number) => {
        setInventory((prev) => {
            const newMaterials = Math.max(0, prev.materials - amount);

            // Persist to database
            db.updateMaterials(newMaterials).catch(console.error);

            return {
                ...prev,
                materials: newMaterials,
            };
        });
    };

    const updateTools = (tools: Partial<UserInventory["tools"]>) => {
        setInventory((prev) => {
            const newTools = { ...prev.tools, ...tools };

            // Persist to database
            db.updateTools(tools).catch(console.error);

            return {
                ...prev,
                tools: newTools,
            };
        });
    };

    const addCraftingSession = (session: CraftingSession) => {
        setCraftingHistory((prev) => {
            // Persist to database
            db.addCraftingSession(session).catch(console.error);

            return [session, ...prev];
        });
    };

    const getComponentById = (id: string): Component | undefined => {
        return components.find((c) => c.id === id);
    };

    const value: InventoryContextType = {
        inventory,
        components,
        craftingHistory,
        addComponent,
        removeComponent,
        setComponentQuantity,
        addMaterials,
        removeMaterials,
        updateTools,
        addCraftingSession,
        getComponentById,
    };

    return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};
