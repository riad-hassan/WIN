import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function GameDetailsScreen({ route, navigation }) {
  const { game } = route.params;

  return (
    <LinearGradient
      colors={["#020617", "#0b1220", "#0f172a"]}
      style={{ flex: 1, padding: 15 }}
    >
      {/* TOP CARD */}
      <View style={styles.card}>
        <Image source={game.image} style={styles.image} />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>{game.title}</Text>

          <View style={styles.row}>
            <Text style={styles.rtp}>⭐ RTP 96.74%</Text>
            <Text style={styles.badge}>MEDIUM</Text>
          </View>

          

          {/* PLAY BUTTON */}
          <TouchableOpacity style={styles.playBtn}>
            <Text style={styles.playText}>▶ Play Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TAB SECTION */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.tabText}>🏆 Winners</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={{ color: "#aaa" }}>🕒 My History</Text>
        </TouchableOpacity>
      </View>

      {/* EMPTY STATE */}
      <View style={styles.empty}>
        <Text style={{ color: "#777", fontSize: 18 }}>
          No winners yet
        </Text>
        <Text style={{ color: "#555" }}>
          Be the first to win!
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  rtp: {
    color: "#00ffcc",
    marginRight: 10,
  },
  badge: {
    backgroundColor: "#6c5ce7",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  bet: {
    color: "#aaa",
    marginTop: 5,
  },
  playBtn: {
    marginTop: 10,
    backgroundColor: "#ff9800",
    padding: 10,
    borderRadius: 10,
  },
  playText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 20,
  },
  activeTab: {
    flex: 1,
    backgroundColor: "#1f2937",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  inactiveTab: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 10,
    borderRadius: 10,
  },
  tabText: {
    color: "#fff",
    textAlign: "center",
  },
  empty: {
    alignItems: "center",
    marginTop: 50,
  },
});