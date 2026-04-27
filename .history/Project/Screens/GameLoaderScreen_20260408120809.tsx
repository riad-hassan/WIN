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



  useEffect(() => {
    startLoading();
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

  const startLoading = () => {
    setStatus("loading");

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      // ✅ AVIATOR হলে game open
      if (game.title === "AVIATOR GAME") {
        navigation.replace("AVIATOR GAME");
      } else {
        setStatus("error");
      }
    });
  };

  const handleRetry = () => {
    if (retry >= 3) return;

    setRetry(retry + 1);
    progress.setValue(0);
    startLoading();
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
        <Text style={styles.connect}>Connecting to server...</Text>
      </View>
    );
  }

  // ❌ ERROR UI
  return (
    <View style={styles.container}>
      <Text style={styles.errorIcon}>⚠️</Text>

      <Text style={styles.errorTitle}>Unable to load game</Text>
      <Text style={styles.errorSub}>
        Game unavailable to connection
      </Text>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity style={styles.tryBtn} onPress={handleRetry}>
          <Text style={{ color: "#000", fontWeight: "bold" }}>
            Try Again
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#fff" }}>Go Back</Text>
        </TouchableOpacity>
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

  errorIcon: {
    fontSize: 50,
    color: "red",
  },
  errorTitle: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
  },
  errorSub: {
    color: "#aaa",
  },
  tryBtn: {
    backgroundColor: "#facc15",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  backBtn: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
  },
});