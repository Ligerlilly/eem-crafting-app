import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Modal, Switch } from "react-native";
import { ComponentType, ForgeAccess } from "../types";
import { useInventory } from "../context/InventoryContext";

const InventoryScreen = () => {
    const { inventory, components, addComponent, removeComponent, addMaterials, removeMaterials, updateTools } =
        useInventory();
    const [selectedType, setSelectedType] = useState<ComponentType | "all">("all");
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
    const [addQuantity, setAddQuantity] = useState("1");
    const [showToolsModal, setShowToolsModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [materialsInput, setMaterialsInput] = useState("");
    const [showOwnedOnly, setShowOwnedOnly] = useState(false);

    const componentTypes: { type: ComponentType | "all"; icon: string; label: string }[] = [
        { type: "all", icon: "📦", label: "All" },
        { type: "beast", icon: "🐾", label: "Beast" },
        { type: "elemental", icon: "🗻", label: "Elemental" },
        { type: "fish", icon: "🎣", label: "Fish" },
        { type: "herb", icon: "🌿", label: "Herb" },
    ];

    const filteredComponents = components
        .filter((c) => selectedType === "all" || c.type === selectedType)
        .filter((c) => searchQuery === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const componentsWithInventory = filteredComponents
        .map((c) => ({
            ...c,
            quantity: inventory.components.get(c.id) || 0,
        }))
        .filter((c) => !showOwnedOnly || c.quantity > 0);

    const totalComponents = Array.from(inventory.components.values()).reduce((sum, qty) => sum + qty, 0);
    const ownedComponentCount = Array.from(inventory.components.entries()).filter(([_, qty]) => qty > 0).length;
    const toolsCount =
        (inventory.tools.standardCraftingTools ? 1 : 0) +
        (inventory.tools.masterCraftingTools ? 1 : 0) +
        (inventory.tools.cookware ? 1 : 0) +
        (inventory.tools.alchemySet ? 1 : 0);

    const handleAddComponent = (componentId: string) => {
        const qty = parseInt(addQuantity) || 1;
        addComponent(componentId, qty);
        setSelectedComponent(null);
        setAddQuantity("1");
    };

    const handleRemoveComponent = (componentId: string) => {
        removeComponent(componentId, 1);
    };

    const selectedComp = components.find((c) => c.id === selectedComponent);

    return (
        <View style={styles.container}>
            {/* Compact Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>🎒 Inventory</Text>
                    <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.headerIcon}>
                        <Text style={styles.headerIconText}>🔍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowOwnedOnly(!showOwnedOnly)}
                        style={[styles.headerIcon, showOwnedOnly && styles.headerIconActive]}
                    >
                        <Text style={styles.headerIconText}>✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowToolsModal(true)} style={styles.headerIcon}>
                        <Text style={styles.headerIconText}>⚙️</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.statsRow}>
                    <Text style={styles.statText}>📦 {totalComponents} Components</Text>
                    <Text style={styles.statText}>💎 {inventory.materials} Materials</Text>
                    <Text style={styles.statText}>⚒️ {toolsCount} Tools</Text>
                </View>
                {showSearch && (
                    <View style={styles.searchRow}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search components..."
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

            {/* Compact Filter Pills */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterContainer}
            >
                {componentTypes.map((item) => (
                    <TouchableOpacity
                        key={item.type}
                        style={[styles.filterPill, selectedType === item.type && styles.filterPillActive]}
                        onPress={() => setSelectedType(item.type)}
                    >
                        <Text style={styles.filterIcon}>{item.icon}</Text>
                        <Text style={[styles.filterText, selectedType === item.type && styles.filterTextActive]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Component List */}
            <FlatList
                data={componentsWithInventory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.componentCard} onPress={() => setSelectedComponent(item.id)}>
                        <View style={styles.componentHeader}>
                            <Text style={styles.componentName}>{item.name}</Text>
                            <View style={styles.quantityBadge}>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                            </View>
                        </View>
                        <View style={styles.regionsRow}>
                            {item.regions.slice(0, 2).map((region, idx) => (
                                <Text key={idx} style={styles.regionPill}>
                                    {region}
                                </Text>
                            ))}
                            {item.regions.length > 2 && (
                                <Text style={styles.regionPill}>+{item.regions.length - 2}</Text>
                            )}
                        </View>
                        <View style={styles.componentFooter}>
                            <Text style={styles.recipeCount}>⚗️ {item.recipes.length} recipes</Text>
                            <View style={styles.quickActions}>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => handleRemoveComponent(item.id)}
                                >
                                    <Text style={styles.iconButtonText}>−</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => {
                                        addComponent(item.id, 1);
                                    }}
                                >
                                    <Text style={styles.iconButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateIcon}>📦</Text>
                        <Text style={styles.emptyStateText}>
                            {searchQuery ? "No components found" : `No ${selectedType} components yet`}
                        </Text>
                        <Text style={styles.emptyStateSubtext}>
                            {searchQuery
                                ? "Try a different search term"
                                : "Tap any component to add it to your inventory"}
                        </Text>
                    </View>
                }
                style={styles.componentList}
            />

            {/* Component Detail Modal */}
            <Modal
                visible={selectedComponent !== null}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedComponent(null)}
            >
                <View style={styles.modalOverlay}>
                    <ScrollView style={styles.modalScroll}>
                        <View style={styles.modalContent}>
                            {selectedComp && (
                                <>
                                    <Text style={styles.modalTitle}>{selectedComp.name}</Text>
                                    <Text style={styles.modalDescription}>{selectedComp.description}</Text>

                                    <View style={styles.modalSection}>
                                        <Text style={styles.modalLabel}>Found in:</Text>
                                        <Text style={styles.modalText}>{selectedComp.regions.join(", ")}</Text>
                                    </View>

                                    {selectedComp.recipes.length > 0 && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalLabel}>Used in recipes:</Text>
                                            <Text style={styles.modalText}>{selectedComp.recipes.join(", ")}</Text>
                                        </View>
                                    )}

                                    {selectedComp.magnificentTrait && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalLabel}>Magnificent Trait:</Text>
                                            <Text style={styles.modalText}>[{selectedComp.magnificentTrait}]</Text>
                                        </View>
                                    )}

                                    <View style={styles.addSection}>
                                        <Text style={styles.modalLabel}>Add to inventory:</Text>
                                        <View style={styles.addRow}>
                                            <TextInput
                                                style={styles.quantityInput}
                                                keyboardType="number-pad"
                                                value={addQuantity}
                                                onChangeText={setAddQuantity}
                                            />
                                            <TouchableOpacity
                                                style={styles.confirmButton}
                                                onPress={() => handleAddComponent(selectedComp.id)}
                                            >
                                                <Text style={styles.confirmButtonText}>Add {addQuantity}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setSelectedComponent(null)}
                                    >
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            {/* Tools & Settings Modal */}
            <Modal
                visible={showToolsModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowToolsModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <ScrollView style={styles.modalScroll}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>⚙️ Tools & Settings</Text>

                            {/* Materials Management */}
                            <View style={styles.modalSection}>
                                <Text style={styles.modalLabel}>💎 Materials: {inventory.materials}</Text>
                                <View style={styles.materialsRow}>
                                    <TextInput
                                        style={styles.materialsInput}
                                        placeholder="Custom amount"
                                        placeholderTextColor="#a0826d"
                                        keyboardType="number-pad"
                                        value={materialsInput}
                                        onChangeText={setMaterialsInput}
                                    />
                                    <TouchableOpacity
                                        style={styles.miniButton}
                                        onPress={() => {
                                            const amount = parseInt(materialsInput) || 0;
                                            if (amount > 0) {
                                                addMaterials(amount);
                                                setMaterialsInput("");
                                            }
                                        }}
                                    >
                                        <Text style={styles.miniButtonText}>+ Add</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.materialsRow}>
                                    <TouchableOpacity style={styles.quickButton} onPress={() => addMaterials(1)}>
                                        <Text style={styles.quickButtonText}>+1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.quickButton} onPress={() => addMaterials(5)}>
                                        <Text style={styles.quickButtonText}>+5</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.quickButton} onPress={() => addMaterials(10)}>
                                        <Text style={styles.quickButtonText}>+10</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.quickButton} onPress={() => removeMaterials(1)}>
                                        <Text style={styles.quickButtonText}>-1</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Tools */}
                            <View style={styles.modalSection}>
                                <Text style={styles.modalLabel}>🧰 Crafting Tools</Text>

                                <View style={styles.toolRow}>
                                    <Text style={styles.toolName}>Standard Crafting Tools</Text>
                                    <Switch
                                        value={inventory.tools.standardCraftingTools}
                                        onValueChange={(val) => updateTools({ standardCraftingTools: val })}
                                        trackColor={{ false: "#3d2415", true: "#d4a574" }}
                                        thumbColor={inventory.tools.standardCraftingTools ? "#f5e6d3" : "#8b7355"}
                                    />
                                </View>

                                <View style={styles.toolRow}>
                                    <Text style={styles.toolName}>Master Crafting Tools</Text>
                                    <Switch
                                        value={inventory.tools.masterCraftingTools}
                                        onValueChange={(val) => updateTools({ masterCraftingTools: val })}
                                        trackColor={{ false: "#3d2415", true: "#d4a574" }}
                                        thumbColor={inventory.tools.masterCraftingTools ? "#f5e6d3" : "#8b7355"}
                                    />
                                </View>

                                <View style={styles.toolRow}>
                                    <Text style={styles.toolName}>Cookware</Text>
                                    <Switch
                                        value={inventory.tools.cookware}
                                        onValueChange={(val) => updateTools({ cookware: val })}
                                        trackColor={{ false: "#3d2415", true: "#d4a574" }}
                                        thumbColor={inventory.tools.cookware ? "#f5e6d3" : "#8b7355"}
                                    />
                                </View>

                                <View style={styles.toolRow}>
                                    <Text style={styles.toolName}>Alchemy Set</Text>
                                    <Switch
                                        value={inventory.tools.alchemySet}
                                        onValueChange={(val) => updateTools({ alchemySet: val })}
                                        trackColor={{ false: "#3d2415", true: "#d4a574" }}
                                        thumbColor={inventory.tools.alchemySet ? "#f5e6d3" : "#8b7355"}
                                    />
                                </View>
                            </View>

                            <View style={styles.modalSection}>
                                <Text style={styles.modalLabel}>🔥 Forge Access</Text>
                                <View style={styles.forgeButtons}>
                                    <TouchableOpacity
                                        style={[
                                            styles.forgeButton,
                                            inventory.tools.forgeAccess === "none" && styles.forgeButtonActive,
                                        ]}
                                        onPress={() => updateTools({ forgeAccess: "none" })}
                                    >
                                        <Text
                                            style={[
                                                styles.forgeButtonText,
                                                inventory.tools.forgeAccess === "none" && styles.forgeButtonTextActive,
                                            ]}
                                        >
                                            None
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.forgeButton,
                                            inventory.tools.forgeAccess === "rented" && styles.forgeButtonActive,
                                        ]}
                                        onPress={() => updateTools({ forgeAccess: "rented" })}
                                    >
                                        <Text
                                            style={[
                                                styles.forgeButtonText,
                                                inventory.tools.forgeAccess === "rented" &&
                                                    styles.forgeButtonTextActive,
                                            ]}
                                        >
                                            Rented
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.forgeButton,
                                            inventory.tools.forgeAccess === "owned" && styles.forgeButtonActive,
                                        ]}
                                        onPress={() => updateTools({ forgeAccess: "owned" })}
                                    >
                                        <Text
                                            style={[
                                                styles.forgeButtonText,
                                                inventory.tools.forgeAccess === "owned" && styles.forgeButtonTextActive,
                                            ]}
                                        >
                                            Owned
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.confirmButton} onPress={() => setShowToolsModal(false)}>
                                <Text style={styles.confirmButtonText}>Done</Text>
                            </TouchableOpacity>
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
        backgroundColor: "#1a0f08",
    },
    // NEW: Compact Header
    header: {
        backgroundColor: "#2c1810",
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#4a2c2a",
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f5e6d3",
        flex: 1,
    },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#3d2415",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    headerIconActive: {
        backgroundColor: "#4a9d5f",
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
        color: "#a0826d",
        fontWeight: "600",
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#3d2415",
        color: "#f5e6d3",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        fontSize: 14,
    },
    clearButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#4a2c2a",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    clearButtonText: {
        color: "#a0826d",
        fontSize: 20,
        fontWeight: "bold",
    },
    // NEW: Compact Filter Pills
    filterScroll: {
        maxHeight: 50,
        backgroundColor: "#2c1810",
    },
    filterContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    filterPill: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        borderRadius: 16,
        backgroundColor: "#3d2415",
        height: 32,
    },
    filterPillActive: {
        backgroundColor: "#d4a574",
    },
    filterIcon: {
        fontSize: 16,
        marginRight: 4,
    },
    filterText: {
        color: "#a0826d",
        fontSize: 13,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "#2c1810",
    },
    // Component List (more space!)
    componentList: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 8,
    },
    componentCard: {
        backgroundColor: "#2c1810",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#4a2c2a",
    },
    componentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    componentName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#f5e6d3",
        flex: 1,
    },
    quantityBadge: {
        backgroundColor: "#d4a574",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginLeft: 8,
        minWidth: 32,
        alignItems: "center",
    },
    quantityText: {
        color: "#2c1810",
        fontSize: 14,
        fontWeight: "bold",
    },
    regionsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 8,
    },
    regionPill: {
        fontSize: 11,
        color: "#8b7355",
        backgroundColor: "#3d2415",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginRight: 4,
        marginBottom: 4,
    },
    componentFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    recipeCount: {
        fontSize: 12,
        color: "#a0826d",
    },
    quickActions: {
        flexDirection: "row",
        gap: 6,
    },
    iconButton: {
        backgroundColor: "#4a2c2a",
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    iconButtonText: {
        color: "#d4a574",
        fontSize: 18,
        fontWeight: "bold",
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
        color: "#f5e6d3",
        fontWeight: "600",
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: "#a0826d",
        textAlign: "center",
        paddingHorizontal: 40,
    },
    // Modals
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    modalScroll: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: "#2c1810",
        margin: 20,
        marginTop: 60,
        borderRadius: 16,
        padding: 24,
        borderWidth: 2,
        borderColor: "#4a2c2a",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#f5e6d3",
        marginBottom: 12,
    },
    modalDescription: {
        fontSize: 16,
        color: "#a0826d",
        marginBottom: 20,
        lineHeight: 24,
    },
    modalSection: {
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#d4a574",
        marginBottom: 8,
    },
    modalText: {
        fontSize: 14,
        color: "#f5e6d3",
        lineHeight: 20,
    },
    addSection: {
        marginTop: 8,
        marginBottom: 16,
    },
    addRow: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    quantityInput: {
        backgroundColor: "#3d2415",
        color: "#f5e6d3",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
        flex: 1,
    },
    confirmButton: {
        backgroundColor: "#d4a574",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    confirmButtonText: {
        color: "#2c1810",
        fontSize: 16,
        fontWeight: "600",
    },
    closeButton: {
        backgroundColor: "#4a2c2a",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#a0826d",
        fontSize: 16,
        fontWeight: "600",
    },
    // Tools Modal
    materialsRow: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },
    materialsInput: {
        flex: 1,
        backgroundColor: "#3d2415",
        color: "#f5e6d3",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        fontSize: 14,
    },
    miniButton: {
        backgroundColor: "#4a2c2a",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    miniButtonText: {
        color: "#d4a574",
        fontSize: 12,
        fontWeight: "600",
    },
    quickButton: {
        flex: 1,
        backgroundColor: "#3d2415",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    quickButtonText: {
        color: "#d4a574",
        fontSize: 12,
        fontWeight: "600",
    },
    toolRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#3d2415",
    },
    toolName: {
        fontSize: 16,
        color: "#f5e6d3",
        flex: 1,
    },
    forgeButtons: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },
    forgeButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#3d2415",
        alignItems: "center",
    },
    forgeButtonActive: {
        backgroundColor: "#d4a574",
    },
    forgeButtonText: {
        fontSize: 14,
        color: "#a0826d",
        fontWeight: "600",
    },
    forgeButtonTextActive: {
        color: "#2c1810",
    },
});

export default InventoryScreen;
