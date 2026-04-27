import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";


const avatars = [
  require("../Screens/assets/im1.png"),
  require("../Screens/assets/im2.png"),
  require("../Screens/assets/im3.png"),
  require("../Screens/assets/im4.png"),
  require("../Screens/assets/im5.png"),
  require("../Screens/assets/im6.png"),
  require("../Screens/assets/im7.png"),
  require("../Screens/assets/im8.png"),
  require("../Screens/assets/im9.png"),
  require("../Screens/assets/im10.png"),
];

const names = [
  "Rahim332","Karim43","Hasan5g","Sakiber4","Nayeemt54", "Moli", "Aktar354", "Jenijd", "gShofiq", "Soh...", "Barsha", "Abir", "Tahsin", "mehrab", "Rohan", "Naomi", "Maaryam", "mahin", "jahid", "MAHDI", "Ridwan", "Shah", "Hridi", "Sanjana", "Saeed", "Protik",
  "Arif346","Jamal856","Sabbir573","Imran776","Rony734", "Kam...", "Era...","Samha", "Ruhani", "Muhu", "Asif", "Saliha", "Bushra", "Parban" ,"Omar", "Dina", "Amatullah", "Labiba", "Labib", "Rihaa", "Tasfin", "Rehanul", "nafis", "zawad", "Emu", "eblehe", "Nishat", "Shuvadip", "Faysal", "Arpi", "Mun", "Joy", 
"Israt", "Sonia", "Tahmina", " Soni", "Ariful", " Siddiq", "Jannat", "Jiya", " Roki", " Akash", "Sagor", " Moni", " Tamanna", "Sabbir", " Shanto", "Fuad", "Fahat", " Billal", " Joni", "Roni", " Hussain", " Kazi", " Jahan", " Asma", "Rahim", " Babu", "Rahat",
"Sohel", "Abu", "Sayed", "Rana", "Nazmul", "Nazmul", "Imam", " Kamrul", " Elahi", "Afsana", " Mahmud", "Molla", "Mizan", " Solaiman", "Rohan", "Hasan", " Mamun", "Abul", "Sohag", "Farhana", " Husain", " Ayesha", "Kawsar", "Sonia", "Mannan", "Sadia", " Siddik", " Sarmin", "Bala",
"Halima", "Monira", "Yeasmin", "Sikder", "MOnir", "Sarmin", "Liton", "Sumaiya", "Kawsar", "Nusrat", "Shuvo", " Sumona", "Tasan", "Rabby", "Tanvir", "Rasel", "Araf", "Shah", "Anik", "Riad", "Arif", "Akondo", "Imran", "Hannan", "Sami", "Saiful", "Somrat", "Tanvir", "Syed", "Banik", "Abid", "Rajib", "Somor", "Kader", "Milon",
];

export default function GameDetailsScreen({ route, navigation }) {
  const { game } = route.params;
const [winners, setWinners] = useState([]);

  // Function to generate Top 20 winners
  const generateTop20Players = () => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i + 1,
      name:
        "Mem***" +
        names[Math.floor(Math.random() * names.length)].slice(0, 3),
      win: Math.floor(200000 + Math.random() * 500000),
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
    })).sort((a, b) => b.win - a.win); // Highest win first
  };

  useEffect(() => {
    if (game.title === "AVIATOR GAME" || game.title === "CRASH" ) {
      // Update winners initially
      setWinners(generateTop20Players());

      // Update winners every 5 seconds
      const interval = setInterval(() => {
        setWinners(generateTop20Players());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [game.title]);


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
          <TouchableOpacity style={styles.playBtn} onPress={() => navigation.navigate("GameLoader", { game })}>
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
    {/* WINNERS LIST */}
      {game.title === "AVIATOR GAME"  || game.title === "CRASH" ? (
        // ScrollView এর জায়গায়
<FlatList
  style={styles.winnersList}
  data={winners}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.winnerRow}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.winnerName}>{item.name}</Text>
      <Text style={styles.winnerAmount}>{item.win} 💰</Text>
    </View>
  )}
/>
      ) : (
        <View style={styles.empty}>
          <Text style={{ color: "#777", fontSize: 18 }}>No winners yet</Text>
          <Text style={{ color: "#555" }}>Be the first to win!</Text>
        </View>
      )}
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
  winnersList: {
  marginTop: 20,
},
avatar: { width: 35, height: 35, borderRadius: 20, marginRight: 10 },
winnerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#1f2937",
  padding: 10,
  borderRadius: 10,
  marginBottom: 5,
},
winnerName: { color: "#fff", fontWeight: "bold" },
winnerAmount: { color: "#00ffcc", fontWeight: "bold" },
  image: {
    width: 105,
    height: 120,
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
    fontSize: 12,
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