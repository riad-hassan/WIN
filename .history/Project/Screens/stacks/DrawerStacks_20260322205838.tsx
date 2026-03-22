import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomNavigation } from "./BottomStacks";
import CustomDrawerContent from "../CustomDrawerContent";

const Drawer = createDrawerNavigator();

export function DrawerStacks() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTabs" component={BottomNavigation} />
    </Drawer.Navigator>
  );
}