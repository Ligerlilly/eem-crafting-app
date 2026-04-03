import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { RecipeType } from "../types";
import { allRecipes } from "../data/recipes";
import { useInventory } from "../context/InventoryContext";

type RootTabParamList = {
    Inventory: { componentId?: string };
    Recipes: { recipeId?: string };
    History: undefined;
};

const RecipesScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NavigationProp<RootTabParamList>>();
    const { inventory, removeComponent, removeMaterials, addCraftingSession } = useInventory();
    const [selectedType, setSelectedType] = useState<RecipeType | "all">("all");
    const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCraftableOnly, setShowCraftableOnly] = useState(false);
    const [tinkerRoll, setTinkerRoll] = useState<number | null>(null);

    // Handle navigation from Inventory screen
    useFocusEffect(
        React.useCallback(() => {
            const params = route.params as { recipeId?: string } | undefined;
            if (params?.recipeId) {
                setSelectedRecipe(params.recipeId);
            }
        }, [route]),
    );

    const recipeTypes: { type: RecipeType | "all"; icon: string; label: string }[] = [
        { type: "all", icon: "📜", label: "All" },
        { type: "alchemy", icon: "⚗️", label: "Alchemy" },
        { type: "cooking", icon: "🔥", label: "Cooking" },
        { type: "crafting", icon: "🔨", label: "Crafting" },
    ];

    const canCraftRecipe = (recipe: (typeof allRecipes)[0]): boolean => {
        // Check if we have all required components
        const hasComponents = recipe.components.every((req) => {
            const inInventory = inventory.components.get(req.componentId) || 0;
            return inInventory >= req.quantity;
        });

        // Check if we have required materials
        const hasMaterials = !recipe.materialsRequired || inventory.materials >= recipe.materialsRequired;

        // Check if we have required tools
        let hasTools = true;
        if (recipe.type === "alchemy") {
            hasTools = inventory.tools.alchemySet;
        } else if (recipe.type === "cooking") {
            hasTools = inventory.tools.cookware;
        } else if (recipe.type === "crafting") {
            hasTools = inventory.tools.standardCraftingTools || inventory.tools.masterCraftingTools;
        }

        // Check forge requirement
        const hasForge = !recipe.requiresForge || inventory.tools.forgeAccess !== "none";

        return hasComponents && hasMaterials && hasTools && hasForge;
    };

    const getMissingRequirements = (recipe: (typeof allRecipes)[0]): string[] => {
        const missing: string[] = [];

        // Check components
        recipe.components.forEach((req) => {
            const inInventory = inventory.components.get(req.componentId) || 0;
            if (inInventory < req.quantity) {
                missing.push(`${req.componentName} (need ${req.quantity}, have ${inInventory})`);
            }
        });

        // Check materials
        if (recipe.materialsRequired && inventory.materials < recipe.materialsRequired) {
            missing.push(`Materials (need ${recipe.materialsRequired}, have ${inventory.materials})`);
        }

        // Check tools
        if (recipe.type === "alchemy" && !inventory.tools.alchemySet) {
            missing.push("Alchemy Set");
        } else if (recipe.type === "cooking" && !inventory.tools.cookware) {
            missing.push("Cookware");
        } else if (
            recipe.type === "crafting" &&
            !inventory.tools.standardCraftingTools &&
            !inventory.tools.masterCraftingTools
        ) {
            missing.push("Crafting Tools");
        }

        // Check forge
        if (recipe.requiresForge && inventory.tools.forgeAccess === "none") {
            missing.push("Forge Access");
        }

        return missing;
    };

    const filteredRecipes = allRecipes
        .filter((r) => selectedType === "all" || r.type === selectedType)
        .filter((r) => searchQuery === "" || r.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((r) => !showCraftableOnly || canCraftRecipe(r));

    const selectedRecipeData = allRecipes.find((r) => r.id === selectedRecipe);

    const craftableCount = allRecipes.filter(canCraftRecipe).length;

    const getTinkerOutcome = (roll: number, recipeType: string) => {
        if (recipeType === "alchemy") {
            if (roll <= 2) return "Failure";
            if (roll <= 5) return "Failure (can retry once)";
            if (roll <= 8) return "Success (1 use)";
            if (roll <= 11) return "Success (1d6 usage die)";
            return "Success (1d8 usage die)";
        } else if (recipeType === "cooking") {
            if (roll <= 2) return "Inedible failure";
            if (roll <= 5) return "Edible but no buffs (feeds 1)";
            if (roll <= 8) return "Decent dish (feeds 2)";
            if (roll <= 11) return "Tasty meal (feeds 3)";
            return "Gourmet meal (feeds 4)";
        } else {
            // Crafting/Mundane
            if (roll <= 2) return "Failure (lose all materials)";
            if (roll <= 5) return "Failure (salvage 1d4 materials)";
            if (roll <= 8) return "Success";
            if (roll <= 11) return "Success (use 1d4 fewer materials)";
            return "Success with Magnificent trait";
        }
    };

    const handleCraft = (recipe: (typeof allRecipes)[0]) => {
        if (!canCraftRecipe(recipe)) return;

        const roll = Math.floor(Math.random() * 12) + 1;
        setTinkerRoll(roll);
        const outcome = getTinkerOutcome(roll, recipe.type);

        // Record crafting session
        addCraftingSession({
            id: Date.now().toString(),
            recipeId: recipe.id,
            recipeName: recipe.name,
            date: Date.now(),
            tinkerCheckRoll: roll,
            outcome,
            materialsUsed: recipe.materialsRequired || 0,
            componentsUsed: recipe.components,
            itemCrafted: roll >= 6,
            magnificentTrait: roll === 12 ? "Magnificent" : undefined,
            notes: "",
        });

        // Consume resources
        if (recipe.materialsRequired) {
            removeMaterials(recipe.materialsRequired);
        }
        recipe.components.forEach((comp) => {
            removeComponent(comp.componentId, comp.quantity);
        });
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "common":
                return "#8a7a6d";
            case "rare":
                return "#c8a063";
            case "witchcraft":
                return "#9b7eb5";
            default:
                return "#8a7a6d";
        }
    };

    return (
        <View style={styles.container}>
            {/* Compact Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>📜 Recipes</Text>
                    <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.headerIcon}>
                        <Text style={styles.headerIconText}>🔍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowCraftableOnly(!showCraftableOnly)}
                        style={[styles.headerIcon, showCraftableOnly && styles.headerIconActive]}
                    >
                        <Text style={styles.headerIconText}>✓</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.statsRow}>
                    <Text style={styles.statText}>📜 {allRecipes.length} Total</Text>
                    <Text style={styles.statText}>✓ {craftableCount} Craftable</Text>
                    <Text style={styles.statText}>
                        {selectedType === "all"
                            ? "All Types"
                            : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                    </Text>
                </View>
                {showSearch && (
                    <View style={styles.searchRow}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search recipes..."
                            placeholderTextColor="#a0826d"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                        {searchQuery !== "" && (
                            <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                                <Text style={styles.clearButtonText}>×</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>

            {/* Recipe Type Filter */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterContainer}
            >
                {recipeTypes.map((item) => (
                    <TouchableOpacity
                        key={item.type}
                        style={[styles.filterButton, selectedType === item.type && styles.filterButtonActive]}
                        onPress={() => setSelectedType(item.type)}
                    >
                        <Text style={styles.filterIcon}>{item.icon}</Text>
                        <Text style={[styles.filterText, selectedType === item.type && styles.filterTextActive]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Recipe List */}
            <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const canCraft = canCraftRecipe(item);
                    return (
                        <TouchableOpacity
                            style={[styles.recipeCard, canCraft && styles.recipeCardCraftable]}
                            onPress={() => setSelectedRecipe(item.id)}
                        >
                            <View style={styles.recipeHeader}>
                                <Text style={styles.recipeName}>
                                    {canCraft ? "✓ " : ""}
                                    {item.name}
                                </Text>
                                <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(item.rarity) }]}>
                                    <Text style={styles.rarityText}>{item.rarity}</Text>
                                </View>
                            </View>
                            <Text style={styles.recipeEffect} numberOfLines={2}>
                                {item.effect}
                            </Text>
                            <View style={styles.recipeFooter}>
                                <Text style={styles.componentCount}>
                                    📦 {item.components.length} • ⏱ {item.craftingTime}
                                    {item.requiresForge && " • 🔥"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                style={styles.recipeList}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateIcon}>📜</Text>
                        <Text style={styles.emptyStateText}>
                            {searchQuery
                                ? "No recipes found"
                                : showCraftableOnly
                                  ? "No craftable recipes"
                                  : `No ${selectedType} recipes found`}
                        </Text>
                        <Text style={styles.emptyStateSubtext}>
                            {searchQuery
                                ? "Try a different search term"
                                : showCraftableOnly
                                  ? (() => {
                                        const missingTools =
                                            !inventory.tools.alchemySet ||
                                            !inventory.tools.cookware ||
                                            (!inventory.tools.standardCraftingTools &&
                                                !inventory.tools.masterCraftingTools);

                                        if (missingTools) {
                                            const missing = [];
                                            if (!inventory.tools.alchemySet) missing.push("Alchemy Set");
                                            if (!inventory.tools.cookware) missing.push("Cookware");
                                            if (
                                                !inventory.tools.standardCraftingTools &&
                                                !inventory.tools.masterCraftingTools
                                            )
                                                missing.push("Crafting Tools");

                                            return `Missing tools: ${missing.join(
                                                ", ",
                                            )}. Get them from the Inventory screen (⚙️) to unlock recipes!`;
                                        }
                                        return "Collect more components or get the required tools from Inventory (⚙️)";
                                    })()
                                  : "Add more recipes to your collection"}
                        </Text>
                    </View>
                }
            />

            {/* Recipe Detail Modal */}
            <Modal
                visible={selectedRecipe !== null}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedRecipe(null)}
            >
                <View style={styles.modalOverlay}>
                    <ScrollView style={styles.modalScrollView}>
                        <View style={styles.modalContent}>
                            {selectedRecipeData && (
                                <>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>{selectedRecipeData.name}</Text>
                                        <View
                                            style={[
                                                styles.rarityBadge,
                                                { backgroundColor: getRarityColor(selectedRecipeData.rarity) },
                                            ]}
                                        >
                                            <Text style={styles.rarityText}>{selectedRecipeData.rarity}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.modalSection}>
                                        <Text style={styles.modalLabel}>Effect:</Text>
                                        <Text style={styles.modalText}>{selectedRecipeData.effect}</Text>
                                    </View>

                                    <View style={styles.modalSection}>
                                        <Text style={styles.modalLabel}>Components Required:</Text>
                                        {selectedRecipeData.components.map((comp, index) => {
                                            const inInventory = inventory.components.get(comp.componentId) || 0;
                                            const hasEnough = inInventory >= comp.quantity;
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.componentRow}
                                                    onPress={() => {
                                                        setSelectedRecipe(null);
                                                        setTinkerRoll(null);
                                                        navigation.navigate("Inventory", {
                                                            componentId: comp.componentId,
                                                        });
                                                    }}
                                                >
                                                    <View style={styles.componentNameContainer}>
                                                        <Text
                                                            style={[
                                                                styles.componentName,
                                                                !hasEnough && styles.componentMissing,
                                                            ]}
                                                        >
                                                            {hasEnough ? "✓" : "✗"} {comp.componentName} x
                                                            {comp.quantity}
                                                        </Text>
                                                        <Text style={styles.tapHint}>→</Text>
                                                    </View>
                                                    <Text style={styles.componentInventory}>
                                                        ({inInventory} in inventory)
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>

                                    {selectedRecipeData.materialsRequired && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalLabel}>Materials Required:</Text>
                                            <Text style={styles.modalText}>
                                                {selectedRecipeData.materialsRequired} materials
                                            </Text>
                                            <Text style={styles.modalText}>
                                                (You have {inventory.materials} in inventory)
                                            </Text>
                                        </View>
                                    )}

                                    <View style={styles.modalSection}>
                                        <Text style={styles.modalLabel}>Crafting Time:</Text>
                                        <Text style={styles.modalText}>{selectedRecipeData.craftingTime}</Text>
                                    </View>

                                    {selectedRecipeData.requiresForge && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalLabel}>⚠️ Requires Forge</Text>
                                            <Text style={styles.modalText}>
                                                This recipe requires access to a forge (2x crafting time)
                                            </Text>
                                        </View>
                                    )}

                                    {selectedRecipeData.properties && selectedRecipeData.properties.length > 0 && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalLabel}>Properties:</Text>
                                            <Text style={styles.modalText}>
                                                {selectedRecipeData.properties.join(", ")}
                                            </Text>
                                        </View>
                                    )}

                                    {/* Crafting Section */}
                                    {tinkerRoll === null ? (
                                        <>
                                            {!canCraftRecipe(selectedRecipeData) && (
                                                <View style={styles.missingRequirementsCard}>
                                                    <Text style={styles.missingTitle}>⚠️ Missing Requirements:</Text>
                                                    {getMissingRequirements(selectedRecipeData).map((req, index) => (
                                                        <Text key={index} style={styles.missingItem}>
                                                            • {req}
                                                        </Text>
                                                    ))}
                                                </View>
                                            )}
                                            <TouchableOpacity
                                                style={[
                                                    styles.craftButton,
                                                    !canCraftRecipe(selectedRecipeData) && styles.craftButtonDisabled,
                                                ]}
                                                onPress={() => handleCraft(selectedRecipeData)}
                                                disabled={!canCraftRecipe(selectedRecipeData)}
                                            >
                                                <Text style={styles.craftButtonText}>
                                                    {canCraftRecipe(selectedRecipeData)
                                                        ? "🎲 Craft Now"
                                                        : "🔒 Cannot Craft"}
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <View style={styles.rollResultCard}>
                                            <Text style={styles.rollNumber}>Roll: {tinkerRoll}</Text>
                                            <Text style={styles.rollOutcome}>
                                                {getTinkerOutcome(tinkerRoll, selectedRecipeData.type)}
                                            </Text>
                                            <TouchableOpacity
                                                style={styles.craftAnotherButton}
                                                onPress={() => setTinkerRoll(null)}
                                            >
                                                <Text style={styles.craftAnotherText}>Craft Another</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => {
                                            setSelectedRecipe(null);
                                            setTinkerRoll(null);
                                        }}
                                    >
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8dfd4",
    },
    // NEW: Compact Header
    header: {
        backgroundColor: "#f5ede1",
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#d4c4b4",
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2d2520",
        flex: 1,
    },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#f9f3e8",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    headerIconActive: {
        backgroundColor: "#7ab087",
    },
    headerIconText: {
        fontSize: 18,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statText: {
        fontSize: 12,
        color: "#5a4a3d",
        fontWeight: "600",
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#ffffff",
        color: "#2d2520",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#d4c4b4",
    },
    clearButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#d4c4b4",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    clearButtonText: {
        color: "#5a4a3d",
        fontSize: 20,
        fontWeight: "bold",
    },
    // Compact filters
    filterScroll: {
        maxHeight: 50,
        backgroundColor: "#f5ede1",
    },
    filterContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        height: 32,
        borderWidth: 1,
        borderColor: "#d4c4b4",
    },
    filterButtonActive: {
        backgroundColor: "#c8a063",
    },
    filterIcon: {
        fontSize: 16,
        marginRight: 4,
    },
    filterText: {
        color: "#5a4a3d",
        fontSize: 13,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "#2d2520",
    },
    recipeList: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 12,
    },
    recipeCard: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#d4c4b4",
    },
    recipeCardCraftable: {
        borderColor: "#7ab087",
        borderWidth: 2,
    },
    recipeHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    recipeName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2d2520",
        flex: 1,
    },
    rarityBadge: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginLeft: 8,
    },
    rarityText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    recipeEffect: {
        fontSize: 14,
        color: "#5a4a3d",
        marginBottom: 10,
    },
    recipeFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    componentCount: {
        fontSize: 12,
        color: "#8a7a6d",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyStateIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyStateText: {
        fontSize: 18,
        color: "#2d2520",
        fontWeight: "600",
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: "#5a4a3d",
        textAlign: "center",
        paddingHorizontal: 40,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    modalScrollView: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: "#ffffff",
        margin: 20,
        marginTop: 60,
        borderRadius: 16,
        padding: 24,
        borderWidth: 2,
        borderColor: "#c8a063",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2d2520",
        flex: 1,
        marginRight: 12,
    },
    modalSection: {
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#c8a063",
        marginBottom: 8,
    },
    modalText: {
        fontSize: 14,
        color: "#2d2520",
        lineHeight: 20,
    },
    componentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#d4c4b4",
        borderRadius: 8,
        backgroundColor: "#f9f3e8",
        marginBottom: 4,
    },
    componentNameContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    componentName: {
        fontSize: 14,
        color: "#2d2520",
        flex: 1,
        fontWeight: "600",
    },
    tapHint: {
        fontSize: 16,
        color: "#c8a063",
        marginLeft: 8,
        fontWeight: "bold",
    },
    componentMissing: {
        color: "#c97676",
    },
    componentInventory: {
        fontSize: 12,
        color: "#8a7a6d",
    },
    craftButton: {
        backgroundColor: "#c8a063",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 8,
    },
    craftButtonDisabled: {
        backgroundColor: "#d4c4b4",
        opacity: 0.5,
    },
    craftButtonText: {
        color: "#2d2520",
        fontSize: 18,
        fontWeight: "bold",
    },
    craftWarning: {
        fontSize: 12,
        color: "#c97676",
        textAlign: "center",
        marginBottom: 12,
    },
    rollResultCard: {
        backgroundColor: "#f9f3e8",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "#c8a063",
    },
    rollNumber: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#c8a063",
        marginBottom: 12,
    },
    rollOutcome: {
        fontSize: 16,
        color: "#2d2520",
        textAlign: "center",
        marginBottom: 16,
    },
    craftAnotherButton: {
        backgroundColor: "#d4c4b4",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    craftAnotherText: {
        color: "#2d2520",
        fontSize: 14,
        fontWeight: "600",
    },
    closeButton: {
        backgroundColor: "#d4c4b4",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    closeButtonText: {
        color: "#2d2520",
        fontSize: 16,
        fontWeight: "600",
    },
    missingRequirementsCard: {
        backgroundColor: "#fff5f5",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "#c97676",
    },
    missingTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2d2520",
        marginBottom: 12,
    },
    missingItem: {
        fontSize: 14,
        color: "#c97676",
        marginBottom: 6,
        lineHeight: 20,
    },
});

export default RecipesScreen;
