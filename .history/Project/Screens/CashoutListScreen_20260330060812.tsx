import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import suport from "../Screens/assets/suport.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";

export default function WithDrawListScreen() {
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchWithdraws = async () => {
    setLoading(true);

    const uid = await AsyncStorage.getItem("user_id"); // <-- user_id নাও fetch করা

    if (!uid) {
      console.log("User ID not found in AsyncStorage");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("withdraw_requests")
      .select("*")
      .eq("uid", uid.toString()) // uid should match string in DB
      .order("created_at", { ascending: false }); // make sure created_at exists in table

    if (error) {
      console.log("Supabase fetch error:", error.message);
      setLoading(false);
      return;
    }

    setWithdraws(data);
    setLoading(false);
  };




  useEffect(() => {
  fetchWithdraws();
  const interval = setInterval(fetchWithdraws, 20000);
  return () => clearInterval(interval);
}, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  



  return (
    <ScrollView>
      {withdraws.map((item) => {
  const status = (item.status || "").trim().toLowerCase();

  return (
    <View key={item.id} style={styles.card}>
      <Text>Method: {item.method}</Text>
      <Text>Number: {item.account_number}</Text>
      <Text>Amount: {item.amount} Tk</Text>

      <Text
        style={[
          styles.status,
          status === "pending" && { color: "orange" },
          status === "approved" && { color: "green" },
          status === "rejected" && { color: "red" },
        ]}
      >
        Status: {item.status}
      </Text>

      <Text style={styles.time}>
        {new Date(item.created_at).toLocaleString()}
      </Text>

      {item.admin_note && (
        <Text style={{ color: "red", marginTop: 5 }}>
          Note: {item.admin_note}
        </Text>
      )}
    </View>
  );
})}

      <View style={styles.payImageContainer}>
        <Image source={suport} style={styles.payImage2} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "#f1f1f1ff",
    margin: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 18,
  },
  payImageContainer: {
    marginTop: 25,
    padding: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 3,
    alignItems: "center",
    borderRadius: 10,
  },
  payImage2: {
    height: 500,
    width: "98%",
  },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});