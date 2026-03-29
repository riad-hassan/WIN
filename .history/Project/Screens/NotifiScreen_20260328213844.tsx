import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { supabase } from "./supabase";



const TABS = ["All", "Unread", "Deposits", "Withdrawals", "Bonus", "Promos", "Alerts"];

export default function NotificationScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const renderContent = () => {
    // এখানে যদি future এ notifications রাখো, replace this array
    const notifications = [];

    if (notifications.length === 0) {
      return (
        <View style={styles.emptyContainer}>
            <MaterialIcons name="notifications-off" size={50} color="#5e4c49ff" />
          <Text style={styles.emptyText}>
            
            {activeTab === "All" ? "No notifications yet" : `No ${activeTab.toLowerCase()} notifications right now`}
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.title}</Text>
            <Text style={styles.notificationSubText}>{item.message}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Notifications</Text>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // black-blue theme
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    alignSelf: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    height:40
  },
  activeTab: {
    backgroundColor: "#f6da3bff",
  },
  tabText: {
    color: "#cbd5e1",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  emptyContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 18,
  },
  notificationItem: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  notificationText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  notificationSubText: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },
});