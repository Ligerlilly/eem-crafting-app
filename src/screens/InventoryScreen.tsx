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
    // NEW: Compact Filter Pills
    filterScroll: {
        maxHeight: 50,
        backgroundColor: "#f5ede1",
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
        backgroundColor: "#ffffff",
        height: 32,
        borderWidth: 1,
        borderColor: "#d4c4b4",
    },
    filterPillActive: {
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
    // Component List (more space!)
    componentList: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 8,
    },
    componentCard: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#d4c4b4",
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
        color: "#2d2520",
        flex: 1,
    },
    quantityBadge: {
        backgroundColor: "#c8a063",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginLeft: 8,
        minWidth: 32,
        alignItems: "center",
    },
    quantityText: {
        color: "#2d2520",
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
        color: "#5a4a3d",
        backgroundColor: "#f9f3e8",
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
        color: "#5a4a3d",
    },
    quickActions: {
        flexDirection: "row",
        gap: 6,
    },
    iconButton: {
        backgroundColor: "#d4c4b4",
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    iconButtonText: {
        color: "#2d2520",
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
    // Modals
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    modalScroll: {
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
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2d2520",
        marginBottom: 12,
    },
    modalDescription: {
        fontSize: 16,
        color: "#5a4a3d",
        marginBottom: 20,
        lineHeight: 24,
    },
    modalSection: {
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#c8a063",
        marginBottom: 8,
    },
    modalText: {
        fontSize: 14,
        color: "#2d2520",
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
        backgroundColor: "#ffffff",
        color: "#2d2520",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
        flex: 1,
        borderWidth: 1,
        borderColor: "#d4c4b4",
    },
    confirmButton: {
        backgroundColor: "#c8a063",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    confirmButtonText: {
        color: "#2d2520",
        fontSize: 16,
        fontWeight: "600",
    },
    closeButton: {
        backgroundColor: "#d4c4b4",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#2d2520",
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
        backgroundColor: "#ffffff",
        color: "#2d2520",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#d4c4b4",
    },
    miniButton: {
        backgroundColor: "#c8a063",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    miniButtonText: {
        color: "#2d2520",
        fontSize: 12,
        fontWeight: "600",
    },
    quickButton: {
        flex: 1,
        backgroundColor: "#f9f3e8",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d4c4b4",
    },
    quickButtonText: {
        color: "#2d2520",
        fontSize: 12,
        fontWeight: "600",
    },
    toolRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#d4c4b4",
    },
    toolName: {
        fontSize: 16,
        color: "#2d2520",
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
        backgroundColor: "#f9f3e8",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d4c4b4",
    },
    forgeButtonActive: {
        backgroundColor: "#c8a063",
        borderColor: "#c8a063",
    },
    forgeButtonText: {
        fontSize: 14,
        color: "#5a4a3d",
        fontWeight: "600",
    },
    forgeButtonTextActive: {
        color: "#2d2520",
    },
});

export default InventoryScreen;
