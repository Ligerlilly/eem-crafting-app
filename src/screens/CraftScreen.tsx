import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from "react-native";
import { useInventory } from "../context/InventoryContext";
import { allRecipes } from "../data/recipes";
import { Recipe } from "../types";

const CraftScreen = () => {
    const { inventory, removeComponent, removeMaterials, addCraftingSession } = useInventory();
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [showRecipeSelector, setShowRecipeSelector] = useState(false);
    const [tinkerRoll, setTinkerRoll] = useState<number | null>(null);

    const canCraftRecipe = (recipe: Recipe): boolean => {
        // Check components
        const hasComponents = recipe.components.every((req) => {
            const inInventory = inventory.components.get(req.componentId) || 0;
            return inInventory >= req.quantity;
        });

        // Check materials
        const hasMaterials = recipe.materialsRequired ? inventory.materials >= recipe.materialsRequired : true;

        return hasComponents && hasMaterials;
    };

    const getMissingComponents = (recipe: Recipe) => {
        return recipe.components.filter((req) => {
            const inInventory = inventory.components.get(req.componentId) || 0;
            return inInventory < req.quantity;
        });
    };

    const handleSelectRecipe = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setShowRecipeSelector(false);
        setTinkerRoll(null);
    };

    const rollD12 = () => {
        const roll = Math.floor(Math.random() * 12) + 1;
        setTinkerRoll(roll);
        return roll;
    };

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

    const handleCraft = () => {
        if (!selectedRecipe || !canCraftRecipe(selectedRecipe)) return;

        const roll = rollD12();
        const outcome = getTinkerOutcome(roll, selectedRecipe.type);

        // Record crafting session
        addCraftingSession({
            id: Date.now().toString(),
            recipeId: selectedRecipe.id,
            recipeName: selectedRecipe.name,
            date: Date.now(),
            tinkerCheckRoll: roll,
            outcome,
            materialsUsed: selectedRecipe.materialsRequired || 0,
            componentsUsed: selectedRecipe.components,
            itemCrafted: roll >= 6,
            magnificentTrait: roll === 12 ? "Magnificent" : undefined,
            notes: "",
        });

        // Consume resources if crafting was attempted
        if (selectedRecipe.materialsRequired) {
            removeMaterials(selectedRecipe.materialsRequired);
        }
        selectedRecipe.components.forEach((comp) => {
            removeComponent(comp.componentId, comp.quantity);
        });
    };

    const canCraft = selectedRecipe ? canCraftRecipe(selectedRecipe) : false;
    const missingComponents = selectedRecipe ? getMissingComponents(selectedRecipe) : [];

    return (
        <ScrollView style={styles.container}>
            {!selectedRecipe ? (
                <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🔨 Crafting Calculator</Text>
                        <Text style={styles.cardText}>
                            Select a recipe to calculate requirements and simulate crafting
                        </Text>
                        <TouchableOpacity style={styles.selectButton} onPress={() => setShowRecipeSelector(true)}>
                            <Text style={styles.selectButtonText}>Select Recipe</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Tinker Check Outcomes</Text>
                        <View style={styles.outcomeRow}>
                            <Text style={styles.outcomeLabel}>1-2:</Text>
                            <Text style={styles.outcomeText}>Failure</Text>
                        </View>
                        <View style={styles.outcomeRow}>
                            <Text style={styles.outcomeLabel}>3-5:</Text>
                            <Text style={styles.outcomeText}>Failure (salvage 1d4 materials)</Text>
                        </View>
                        <View style={styles.outcomeRow}>
                            <Text style={styles.outcomeLabel}>6-8:</Text>
                            <Text style={styles.outcomeText}>Success</Text>
                        </View>
                        <View style={styles.outcomeRow}>
                            <Text style={styles.outcomeLabel}>9-11:</Text>
                            <Text style={styles.outcomeText}>Success (use 1d4 fewer materials)</Text>
                        </View>
                        <View style={styles.outcomeRow}>
                            <Text style={styles.outcomeLabel}>12+:</Text>
                            <Text style={styles.outcomeText}>Success with Magnificent trait</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.recipeTitle}>{selectedRecipe.name}</Text>
                        <Text style={styles.recipeEffect}>{selectedRecipe.effect}</Text>
                        <TouchableOpacity style={styles.changeButton} onPress={() => setSelectedRecipe(null)}>
                            <Text style={styles.changeButtonText}>Change Recipe</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Requirements Check</Text>

                        {/* Components */}
                        <View style={styles.requirementSection}>
                            <Text style={styles.requirementTitle}>Components:</Text>
                            {selectedRecipe.components.map((comp, index) => {
                                const inInventory = inventory.components.get(comp.componentId) || 0;
                                const hasEnough = inInventory >= comp.quantity;
                                return (
                                    <View key={index} style={styles.requirementRow}>
                                        <Text style={hasEnough ? styles.requirementOk : styles.requirementMissing}>
                                            {hasEnough ? "✓" : "✗"} {comp.componentName} x{comp.quantity}
                                        </Text>
                                        <Text style={styles.inventoryCount}>({inInventory} owned)</Text>
                                    </View>
                                );
                            })}
                        </View>

                        {/* Materials */}
                        {selectedRecipe.materialsRequired && (
                            <View style={styles.requirementSection}>
                                <Text style={styles.requirementTitle}>Materials:</Text>
                                <View style={styles.requirementRow}>
                                    <Text
                                        style={
                                            inventory.materials >= selectedRecipe.materialsRequired
                                                ? styles.requirementOk
                                                : styles.requirementMissing
                                        }
                                    >
                                        {inventory.materials >= selectedRecipe.materialsRequired ? "✓" : "✗"}{" "}
                                        {selectedRecipe.materialsRequired} materials needed
                                    </Text>
                                    <Text style={styles.inventoryCount}>({inventory.materials} owned)</Text>
                                </View>
                            </View>
                        )}

                        {/* Crafting Time */}
                        <View style={styles.requirementSection}>
                            <Text style={styles.requirementTitle}>Crafting Time:</Text>
                            <Text style={styles.craftingTime}>{selectedRecipe.craftingTime}</Text>
                            {selectedRecipe.requiresForge && (
                                <Text style={styles.forgeWarning}>⚠️ Requires forge (2x time)</Text>
                            )}
                        </View>
                    </View>

                    {/* Crafting Action */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Tinker Check Simulator</Text>
                        {tinkerRoll === null ? (
                            <>
                                <TouchableOpacity
                                    style={[styles.craftButton, !canCraft && styles.craftButtonDisabled]}
                                    onPress={handleCraft}
                                    disabled={!canCraft}
                                >
                                    <Text style={styles.craftButtonText}>🎲 Roll d12 & Craft</Text>
                                </TouchableOpacity>
                                {!canCraft && missingComponents.length > 0 && (
                                    <Text style={styles.warningText}>
                                        Missing {missingComponents.length} component(s)
                                    </Text>
                                )}
                            </>
                        ) : (
                            <View style={styles.resultCard}>
                                <Text style={styles.rollResult}>Roll: {tinkerRoll}</Text>
                                <Text style={styles.outcomeResult}>
                                    {getTinkerOutcome(tinkerRoll, selectedRecipe.type)}
                                </Text>
                                <TouchableOpacity style={styles.resetButton} onPress={() => setTinkerRoll(null)}>
                                    <Text style={styles.resetButtonText}>Craft Another</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            )}

            {/* Recipe Selector Modal */}
            <Modal visible={showRecipeSelector} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Recipe</Text>
                        <FlatList
                            data={allRecipes}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.recipeItem} onPress={() => handleSelectRecipe(item)}>
                                    <Text style={styles.recipeItemName}>{item.name}</Text>
                                    <Text style={styles.recipeItemType}>
                                        {item.type === "alchemy" ? "⚗️" : item.type === "cooking" ? "🔥" : "🔨"}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowRecipeSelector(false)}>
                            <Text style={styles.closeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a0f08",
    },
    content: {
        padding: 16,
    },
    card: {
        backgroundColor: "#2c1810",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "#4a2c2a",
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f5e6d3",
        marginBottom: 8,
    },
    cardText: {
        fontSize: 14,
        color: "#a0826d",
        marginBottom: 16,
    },
    selectButton: {
        backgroundColor: "#d4a574",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    selectButtonText: {
        color: "#2c1810",
        fontSize: 16,
        fontWeight: "600",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#d4a574",
        marginBottom: 12,
    },
    outcomeRow: {
        flexDirection: "row",
        paddingVertical: 6,
    },
    outcomeLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#d4a574",
        width: 60,
    },
    outcomeText: {
        fontSize: 14,
        color: "#f5e6d3",
        flex: 1,
    },
    recipeTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#f5e6d3",
        marginBottom: 8,
    },
    recipeEffect: {
        fontSize: 14,
        color: "#a0826d",
        marginBottom: 16,
    },
    changeButton: {
        backgroundColor: "#4a2c2a",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    changeButtonText: {
        color: "#a0826d",
        fontSize: 14,
        fontWeight: "600",
    },
    requirementSection: {
        marginBottom: 16,
    },
    requirementTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#d4a574",
        marginBottom: 6,
    },
    requirementRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
    },
    requirementOk: {
        fontSize: 14,
        color: "#4a9d5f",
        flex: 1,
    },
    requirementMissing: {
        fontSize: 14,
        color: "#c96d6d",
        flex: 1,
    },
    inventoryCount: {
        fontSize: 12,
        color: "#8b7355",
    },
    craftingTime: {
        fontSize: 14,
        color: "#f5e6d3",
    },
    forgeWarning: {
        fontSize: 12,
        color: "#d4a574",
        marginTop: 4,
    },
    craftButton: {
        backgroundColor: "#d4a574",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    craftButtonDisabled: {
        backgroundColor: "#3d2415",
    },
    craftButtonText: {
        color: "#2c1810",
        fontSize: 18,
        fontWeight: "bold",
    },
    warningText: {
        fontSize: 12,
        color: "#c96d6d",
        textAlign: "center",
        marginTop: 8,
    },
    resultCard: {
        alignItems: "center",
        padding: 20,
    },
    rollResult: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#d4a574",
        marginBottom: 12,
    },
    outcomeResult: {
        fontSize: 18,
        color: "#f5e6d3",
        textAlign: "center",
        marginBottom: 20,
    },
    resetButton: {
        backgroundColor: "#4a2c2a",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    resetButtonText: {
        color: "#d4a574",
        fontSize: 16,
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#2c1810",
        borderRadius: 16,
        padding: 24,
        maxHeight: "80%",
        borderWidth: 2,
        borderColor: "#4a2c2a",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#f5e6d3",
        marginBottom: 16,
    },
    recipeItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#3d2415",
        borderRadius: 8,
        marginBottom: 8,
    },
    recipeItemName: {
        fontSize: 16,
        color: "#f5e6d3",
        flex: 1,
    },
    recipeItemType: {
        fontSize: 20,
    },
    closeButton: {
        backgroundColor: "#4a2c2a",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 12,
    },
    closeButtonText: {
        color: "#a0826d",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default CraftScreen;
