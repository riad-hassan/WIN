import React, { useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DepositContext } from "./context/DepositContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BellButton from "./BellButton";
import { supabase } from "./supabase";

export default function CasinoHeader() {
  const { balance, refreshBalance, userId } = useContext(DepositContext);
  const navigation = useNavigation();



 // 🔹 2. 10 sec interval refresh (backup)
useEffect(() => {
  const interval = setInterval(() => {
    if (userId) refreshBalance();
  }, 10000);

  return () => clearInterval(interval);
}, [userId]);




  
  return (
    <View style={styles.container}>
      <View style={styles.balanceBox}>
        <View style={styles.balanceRow}>
          <Text style={styles.balance} numberOfLines={1}>
            ৳ {Number(balance).toLocaleString()}
          </Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate("Deposit")}
          >
            <Text style={styles.addText}>➕</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addBtn2}>
            <BellButton navigation={navigation} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  balanceBox: {
    backgroundColor: "#00000055",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    width: 120,
    height: 30,
    justifyContent: "center",
  },

  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  balance: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    flex: 1,
    marginRight: 5,
  },

  addBtn: {
    backgroundColor: "#f7df0bff",
    width: 22,
    height: 22,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  addBtn2: {
    backgroundColor: "#f7df0bff",
    width: 24,
    height: 22,
    borderRadius: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 3,
  },

  addText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
});