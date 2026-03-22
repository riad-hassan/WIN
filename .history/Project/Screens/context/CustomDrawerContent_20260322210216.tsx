import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#066b24ff", padding: 20 }}>

      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
        GrandWIN Menu
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: "#fff", marginBottom: 15 }}>🏠 Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AVIATOR GAME")}>
        <Text style={{ color: "#fff", marginBottom: 15 }}>✈ Aviator</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Deposit")}>
        <Text style={{ color: "#fff", marginBottom: 15 }}>💰 Deposit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cashout")}>
        <Text style={{ color: "#fff" }}>💸 Cashout</Text>
      </TouchableOpacity>

    </View>
  );
}