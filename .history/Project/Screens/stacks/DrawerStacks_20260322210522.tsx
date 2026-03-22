import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootStack } from "./RootStacks";
import CustomDrawerContent from "../context/CustomDrawerContent";

const Drawer = createDrawerNavigator();

export function DrawerStacks() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Root" component={RootStack} />
    </Drawer.Navigator>
  );
}