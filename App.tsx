import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

// Context
import { InventoryProvider } from "./src/context/InventoryContext";

// Screens
import InventoryScreen from "./src/screens/InventoryScreen";
import RecipesScreen from "./src/screens/RecipesScreen";
import HistoryScreen from "./src/screens/HistoryScreen";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <InventoryProvider>
            <SafeAreaProvider>
                <StatusBar barStyle="dark-content" />
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarActiveTintColor: "#c8a063",
                            tabBarInactiveTintColor: "#8a7a6d",
                            tabBarStyle: {
                                backgroundColor: "#f5ede1",
                                borderTopColor: "#d4c4b4",
                            },
                            headerStyle: {
                                backgroundColor: "#c8a063",
                            },
                            headerTintColor: "#2d2520",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            tabBarIcon: () => null,
                            tabBarLabelStyle: {
                                fontSize: 14,
                                fontWeight: "600",
                            },
                            tabBarLabelPosition: "beside-icon",
                            tabBarIconStyle: { display: "none" },
                        }}
                    >
                        <Tab.Screen
                            name="Inventory"
                            component={InventoryScreen}
                            options={{
                                title: "Inventory",
                                tabBarLabel: "Inventory",
                            }}
                        />
                        <Tab.Screen
                            name="Recipes"
                            component={RecipesScreen}
                            options={{
                                title: "Recipes",
                                tabBarLabel: "Recipes",
                            }}
                        />
                        <Tab.Screen
                            name="History"
                            component={HistoryScreen}
                            options={{
                                title: "History",
                                tabBarLabel: "History",
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </InventoryProvider>
    );
}
