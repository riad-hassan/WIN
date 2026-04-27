import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";

export default function GameLoaderScreen({ route, navigation }) {
  const { game } = route.params;

  const progress = useRef(new Animated.Value(0)).current;
  const [retry, setRetry] = useState(1);
  const [status, setStatus] = useState("loading"); // loading | error
const [percent, setPercent] = useState(0);


const dots = ["", ".", "..", "..."];
const [dotIndex, setDotIndex] = useState(0);

useEffect(() => {
  const d = setInterval(() => {
    setDotIndex((prev) => (prev + 1) % 4);
  }, 500);
  return () => clearInterval(d);
}, []);



  useEffect(() => {
  let current = 0;

  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 8) + 2; // random speed

    if (current >= 100) {
      current = 100;
      clearInterval(interval);

      // delay for real feel
      setTimeout(() => {
        if (game.title === "AVIATOR GAME") {
          navigation.replace("AVIATOR GAME");
        } else {
          setStatus("error");
        }
      }, 500);
    }

    setPercent(current);

    progress.setValue(current / 100);
  }, 120);

  return () => clearInterval(interval);
}, []);

  

  const handleRetry = () => {
  if (retry >= 3) return;

  setRetry(retry + 1);
  setPercent(0);
  progress.setValue(0);
  setStatus("loading");
};

  // 🔥 LOADING UI
  if (status === "loading") {
    return (
      <View style={styles.container}>
        <View style={styles.logoCircle}>
          <Image source={require('./assets/profile.png')}
                  style={{ 
                    width: 270, 
                    height: 120, 
                    resizeMode: 'contain', 
                    
                }} />
        </View>

        <View style={styles.bar}>
  <Animated.View
    style={[
      styles.progress,
      {
        width: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ["0%", "100%"],
        }),
      },
    ]}
  />
</View>

<Text style={styles.percentText}>{percent}%</Text>

        <Text style={styles.retry}>● Retry {retry}/3</Text>
        <Text style={styles.connect}>Connecting to server{dots[dotIndex]}</Text>
      </View>
    );
  }

  // ❌ ERROR UI
 return (
  <View style={styles.container}>

    <View style={styles.errorCard}>
      
      <Text style={styles.errorIcon}>⚠️</Text>

      <Text style={styles.errorTitle}>Unable to load game</Text>

      <Text style={styles.errorSub}>
        Game unavailable due to connection issue.
        Please try again.
      </Text>

      <View style={styles.divider} />

      <View style={styles.btnRow}>

        <TouchableOpacity style={styles.tryBtn} onPress={handleRetry}>
          <Text style={styles.tryText}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>

      </View>

    </View>

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    overflow: 'hidden'
  },
  logoText: {
    color: "#facc15",
    fontSize: 40,
    fontWeight: "bold",
  },
  percentText: {
  color: "#facc15",
  marginTop: 8,
  fontWeight: "bold",
  fontSize: 16,
},
  bar: {
    width: "70%",
    height: 8,
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#facc15",
  },
  retry: {
    color: "#facc15",
    marginTop: 10,
  },
  connect: {
    color: "#aaa",
    marginTop: 10,
  },

  errorCard: {
  width: "85%",
  backgroundColor: "#111827",
  borderRadius: 20,
  padding: 25,
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.5,
  shadowRadius: 10,
  elevation: 10,
},

errorIcon: {
  fontSize: 45,
  color: "#ff4d4f",
  marginBottom: 10,
},

errorTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
},

errorSub: {
  color: "#9ca3af",
  textAlign: "center",
  marginTop: 8,
  lineHeight: 20,
},

divider: {
  height: 1,
  backgroundColor: "#222",
  width: "100%",
  marginVertical: 20,
},

btnRow: {
  flexDirection: "row",
},

tryBtn: {
  flex: 1,
  backgroundColor: "#facc15",
  padding: 12,
  borderRadius: 12,
  marginRight: 8,
},

tryText: {
  textAlign: "center",
  fontWeight: "bold",
  color: "#000",
},

backBtn: {
  flex: 1,
  backgroundColor: "#1f2937",
  padding: 12,
  borderRadius: 12,
},

backText: {
  textAlign: "center",
  color: "#fff",
},
});