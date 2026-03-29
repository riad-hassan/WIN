import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { supabase } from "./supabase";

export default function BellButton({ navigation }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    if (!error) setUnreadCount(count || 0);
  };

  useEffect(() => {
    fetchUnreadCount();

    // auto refresh every 5 sec
    const interval = setInterval(fetchUnreadCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity
      style={{ position: "relative" }}
      onPress={() => navigation.navigate("notifi")}
    >
      <Text style={{ fontSize: 28 }}>🔔</Text>

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