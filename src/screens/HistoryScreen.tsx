import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { useInventory } from "../context/InventoryContext";

const HistoryScreen = () => {
    const { craftingHistory } = useInventory();

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const getOutcomeColor = (outcome: string) => {
        if (
            outcome.toLowerCase().includes("success") ||
            outcome.toLowerCase().includes("tasty") ||
            outcome.toLowerCase().includes("gourmet")
        ) {
            return "#4a9d5f";
        }
        if (outcome.toLowerCase().includes("failure") || outcome.toLowerCase().includes("inedible")) {
            return "#c96d6d";
        }
        return "#d4a574";
    };

    const getRollColor = (roll: number) => {
        if (roll >= 9) return "#4a9d5f"; // Good roll
        if (roll >= 6) return "#d4a574"; // Okay roll
        return "#c96d6d"; // Bad roll
    };

    return (
        <View style={styles.container}>
            {craftingHistory.length === 0 ? (
                <ScrollView style={styles.content}>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateIcon}>📖</Text>
                        <Text style={styles.emptyStateText}>No Crafting History Yet</Text>
                        <Text style={styles.emptyStateSubtext}>
                            Your crafting sessions and tinker check results will appear here
                        </Text>
                    </View>
                </ScrollView>
            ) : (
                <FlatList
                    data={craftingHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.historyCard}>
                            <View style={styles.cardHeader}>
                                <View style={styles.headerLeft}>
                                    <Text style={styles.recipeName}>{item.recipeName}</Text>
                                    <Text style={styles.dateText}>{formatDate(item.date)}</Text>
                                </View>
                                <View
                                    style={[styles.rollBadge, { backgroundColor: getRollColor(item.tinkerCheckRoll) }]}
                                >
                                    <Text style={styles.rollText}>{item.tinkerCheckRoll}</Text>
                                </View>
                            </View>

                            <View style={styles.outcomeSection}>
                                <Text style={[styles.outcomeText, { color: getOutcomeColor(item.outcome) }]}>
                                    {item.itemCrafted ? "✓" : "✗"} {item.outcome}
                                </Text>
                            </View>

                            {item.magnificentTrait && (
                                <View style={styles.traitSection}>
                                    <Text style={styles.traitText}>✨ {item.magnificentTrait}</Text>
                                </View>
                            )}

                            <View style={styles.resourcesSection}>
                                <View style={styles.resourceRow}>
                                    <Text style={styles.resourceLabel}>Materials Used:</Text>
                                    <Text style={styles.resourceValue}>{item.materialsUsed}</Text>
                                </View>
                                <View style={styles.resourceRow}>
                                    <Text style={styles.resourceLabel}>Components Used:</Text>
                                    <Text style={styles.resourceValue}>{item.componentsUsed.length}</Text>
                                </View>
                            </View>

                            {item.componentsUsed.length > 0 && (
                                <View style={styles.componentsList}>
                                    {item.componentsUsed.map((comp, index) => (
                                        <Text key={index} style={styles.componentText}>
                                            • {comp.componentName} x{comp.quantity}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a0f08",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 100,
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
    listContent: {
        padding: 16,
    },
    historyCard: {
        backgroundColor: "#2c1810",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "#4a2c2a",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    headerLeft: {
        flex: 1,
        marginRight: 12,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#f5e6d3",
        marginBottom: 4,
    },
    dateText: {
        fontSize: 12,
        color: "#8b7355",
    },
    rollBadge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    rollText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2c1810",
    },
    outcomeSection: {
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#3d2415",
        borderRadius: 8,
    },
    outcomeText: {
        fontSize: 14,
        fontWeight: "600",
    },
    traitSection: {
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#4a2c2a",
        borderRadius: 8,
    },
    traitText: {
        fontSize: 14,
        color: "#d4a574",
        fontWeight: "600",
    },
    resourcesSection: {
        marginBottom: 12,
    },
    resourceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    resourceLabel: {
        fontSize: 13,
        color: "#a0826d",
    },
    resourceValue: {
        fontSize: 13,
        color: "#f5e6d3",
        fontWeight: "600",
    },
    componentsList: {
        borderTopWidth: 1,
        borderTopColor: "#3d2415",
        paddingTop: 12,
    },
    componentText: {
        fontSize: 12,
        color: "#a0826d",
        paddingVertical: 2,
    },
});

export default HistoryScreen;
