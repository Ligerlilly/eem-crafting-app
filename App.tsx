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
                <StatusBar barStyle="light-content" />
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarActiveTintColor: "#d4a574",
                            tabBarInactiveTintColor: "#8b7355",
                            tabBarStyle: {
                                backgroundColor: "#2c1810",
                                borderTopColor: "#4a2c2a",
                            },
                            headerStyle: {
                                backgroundColor: "#4a2c2a",
                            },
                            headerTintColor: "#f5e6d3",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
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
