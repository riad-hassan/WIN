import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



import HomeScreen from "../HomeScreen";
import ProfileScreen from "../ProfileScreen";
import DepositScreen from "../DepositScreen";
import CashoutScreen from "../CashoutScreen";
import ReferScreen from "../ReferScreen";
import MaterialIcons from "@react-native-vector-icons/material-icons";


const Tab = createBottomTabNavigator();

export function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7FFFD4",
        tabBarInactiveTintColor: "#ffffffec",
        
        tabBarStyle: { 
        backgroundColor: "#6de0cdff", 
        height: 60, 
        position: "absolute",
        borderTopWidth: 0,
        elevation: 0,
        paddingBottom: 1
        },
      }}
    >

      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="cottage" size={28} color={color} />
          ),
        }}
      />


      <Tab.Screen
        name="WithDraw"
        component={CashoutScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="assured-workload" size={28} color={color} />
          ),
        }}
      />


      <Tab.Screen
        name="Deposit"
        component={DepositScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-card" size={34} color={color} />
          ),
        }}
      />



      <Tab.Screen
        name="Refer&Earn"
        component={ReferScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="groups-3" size={28} color={color} />
          ),
        }}
      />




      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-outline" size={28} color={color} />
          ),
        }}
      />
      

      

    </Tab.Navigator>
  );
}