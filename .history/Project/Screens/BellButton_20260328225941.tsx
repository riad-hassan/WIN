import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BellButton({ navigation }) {
  const [unreadCount, setUnreadCount] = useState(0);
const [uid, setUid] = useState("");

  // uid load
  useEffect(() => {
    const loadUid = async () => {
      const savedUid = await AsyncStorage.getItem("uid");
      if (savedUid) setUid(savedUid);
    };
    loadUid();
  }, []);


  const fetchUnreadCount = async () => {
    if (!uid) return;
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .or(`user_uid.is.null,user_uid.eq.${uid}`)
      .eq("is_read", false);

    if (error) {
      console.log("Unread count error:", error.message);
      return;
    }

    setUnreadCount(count || 0);
  };

  useEffect(() => {
    fetchUnreadCount();

    // auto refresh every 5 sec
    const interval = setInterval(fetchUnreadCount, 5000);
    return () => clearInterval(interval);
  }, [uid]);

  return (
    <TouchableOpacity
      style={{ position: "relative" }}
      onPress={() => navigation.navigate("notifi")}
    >
      <Text style={{ fontSize: 20, marginTop: -3 }}>🔔</Text>

      {unreadCount > 0 && (
        <View
          
        >
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
            {unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}