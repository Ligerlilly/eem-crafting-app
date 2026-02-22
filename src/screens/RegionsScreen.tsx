import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Modal } from "react-native";
import { ComponentType } from "../types";
import { allComponents } from "../data/components";

const RegionsScreen = () => {
    const regions = [
        "Drippy Downs",
        "Fleabag County",
        "Quagmash",
        "River Country",
        "Scalawag Strand",
        "Used T'Be Forest",
    ];

    const [selectedRegion, setSelectedRegion] = useState(regions[0]);
    const [selectedType, setSelectedType] = useState<ComponentType | "all">("all");
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

    const componentTypes: { type: ComponentType | "all"; icon: string; label: string }[] = [
        { type: "all", icon: "📦", label: "All" },
        { type: "beast", icon: "🐾", label: "Beast" },
        { type: "elemental", icon: "🗻", label: "Elemental" },
        { type: "fish", icon: "🎣", label: "Fish" },
        { type: "herb", icon: "🌿", label: "Herb" },
    ];

    // Get components for the selected region and type
    const componentsInRegion = allComponents
        .filter((comp) => comp.regions.includes(selectedRegion))
        .filter((comp) => selectedType === "all" || comp.type === selectedType)
        .filter((comp) => searchQuery === "" || comp.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalComponentsInRegion = allComponents.filter((comp) => comp.regions.includes(selectedRegion)).length;

    const getRegionIcon = (region: string) => {
        const icons: { [key: string]: string } = {
            "Drippy Downs": "🏞️",
            "Fleabag County": "🏘️",
            Quagmash: "💧",
            "River Country": "🏔️",
            "Scalawag Strand": "🌊",
            "Used T'Be Forest": "🌲",
        };
        return icons[region] || "🗺️";
    };

    return (
        <View style={styles.container}>
            {/* Compact Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>🗺️ Regions</Text>
                    <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.headerIcon}>
                        <Text style={styles.headerIconText}>🔍</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.statsRow}>
                    <Text style={styles.statText}>
                        {getRegionIcon(selectedRegion)} {selectedRegion}
                    </Text>
                    <Text style={styles.statText}>📦 {componentsInRegion.length} Found</Text>
                    <Text style={styles.statText}>🗺️ {totalComponentsInRegion} Total</Text>
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

            {/* Region Selector - Compact Pills */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.regionScroll}
                contentContainerStyle={styles.regionContainer}
            >
                {regions.map((region) => (
                    <TouchableOpacity
                        key={region}
                        style={[styles.regionPill, selectedRegion === region && styles.regionPillActive]}
                        onPress={() => setSelectedRegion(region)}
                    >
                        <Text style={styles.regionIcon}>{getRegionIcon(region)}</Text>
                        <Text style={[styles.regionText, selectedRegion === region && styles.regionTextActive]}>
                            {region}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Component Type Filter - Compact Pills */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.typeScroll}
                contentContainerStyle={styles.typeContainer}
            >
                {componentTypes.map((item) => (
                    <TouchableOpacity
                        key={item.type}
                        style={[styles.typePill, selectedType === item.type && styles.typePillActive]}
                        onPress={() => setSelectedType(item.type)}
                    >
                        <Text style={styles.typeIcon}>{item.icon}</Text>
                        <Text style={[styles.typeText, selectedType === item.type && styles.typeTextActive]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Component List */}
            {componentsInRegion.length > 0 ? (
                <FlatList
                    data={componentsInRegion}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.componentCard}>
                            <View style={styles.componentHeader}>
                                <Text style={styles.componentName}>{item.name}</Text>
                                {item.rollRange && (
                                    <View style={styles.rollBadge}>
                                        <Text style={styles.rollText}>{item.rollRange}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.componentDescription} numberOfLines={3}>
                                {item.description}
                            </Text>
                            {item.magnificentTrait && (
                                <View style={styles.traitBadge}>
                                    <Text style={styles.traitText}>✨ {item.magnificentTrait}</Text>
                                </View>
                            )}
                            {item.recipes.length > 0 && (
                                <View style={styles.recipeFooter}>
                                    <Text style={styles.recipeCount}>⚗️ {item.recipes.length} recipes</Text>
                                </View>
                            )}
                        </View>
                    )}
                    style={styles.componentList}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>🗺️</Text>
                    <Text style={styles.emptyText}>
                        {searchQuery
                            ? "No components found"
                            : `No ${selectedType === "all" ? "" : selectedType + " "}components in ${selectedRegion}`}
                    </Text>
                    <Text style={styles.emptySubtext}>
                        {searchQuery ? "Try a different search term" : "Try selecting a different region or type"}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a0f08",
    },
    // Compact Header
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
    // Region Pills
    regionScroll: {
        maxHeight: 50,
        backgroundColor: "#2c1810",
    },
    regionContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    regionPill: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        borderRadius: 16,
        backgroundColor: "#3d2415",
        height: 32,
    },
    regionPillActive: {
        backgroundColor: "#d4a574",
    },
    regionIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    regionText: {
        color: "#a0826d",
        fontSize: 12,
        fontWeight: "600",
    },
    regionTextActive: {
        color: "#2c1810",
    },
    // Type Pills
    typeScroll: {
        maxHeight: 50,
        backgroundColor: "#2c1810",
        borderBottomWidth: 1,
        borderBottomColor: "#4a2c2a",
    },
    typeContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    typePill: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        borderRadius: 16,
        backgroundColor: "#3d2415",
        height: 32,
    },
    typePillActive: {
        backgroundColor: "#4a2c2a",
    },
    typeIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    typeText: {
        color: "#a0826d",
        fontSize: 12,
        fontWeight: "600",
    },
    typeTextActive: {
        color: "#d4a574",
    },
    // Component List
    componentList: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 12,
    },
    componentCard: {
        backgroundColor: "#2c1810",
        padding: 14,
        marginBottom: 10,
        borderRadius: 12,
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
    rollBadge: {
        backgroundColor: "#3d2415",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        marginLeft: 8,
    },
    rollText: {
        fontSize: 11,
        color: "#d4a574",
        fontWeight: "600",
    },
    componentDescription: {
        fontSize: 13,
        color: "#a0826d",
        lineHeight: 18,
        marginBottom: 8,
    },
    traitBadge: {
        backgroundColor: "#4a2c2a",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginBottom: 6,
    },
    traitText: {
        fontSize: 11,
        color: "#d4a574",
        fontWeight: "600",
    },
    recipeFooter: {
        paddingTop: 6,
        borderTopWidth: 1,
        borderTopColor: "#3d2415",
    },
    recipeCount: {
        fontSize: 11,
        color: "#8b7355",
        fontWeight: "600",
    },
    emptyState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        color: "#f5e6d3",
        fontWeight: "600",
        marginBottom: 8,
        textAlign: "center",
    },
    emptySubtext: {
        fontSize: 13,
        color: "#a0826d",
        textAlign: "center",
    },
});

export default RegionsScreen;
