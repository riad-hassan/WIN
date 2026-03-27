import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "@react-native-vector-icons/material-icons";





export default function LoginScreen({ navigation }) {
  const [tab, setTab] = useState("phone"); // phone | email | user
  const [showPass, setShowPass] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
         <Text style={{ color: "#facc15" }}>Welcome</Text> !
      </Text>

      <Text style={styles.subTitle}>
        Sign in to{" "}
        <Text style={{ color: "#facc15", fontWeight: "bold" }}>
          continue playing
        </Text>
      </Text>

      {/* Tabs */}
      <View style={styles.tabBox}>
        <TouchableOpacity
          style={[styles.iconTab, tab === "phone" && styles.activeIconTab]}
          onPress={() => setTab("phone")}
        >
          <MaterialIcons
            name="phone"
            size={22}
            color={tab === "phone" ? "#111827" : "#9ca3af"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconTab, tab === "email" && styles.activeIconTab]}
          onPress={() => setTab("email")}
        >
          <MaterialIcons
            name="email"
            size={22}
            color={tab === "email" ? "#111827" : "#9ca3af"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconTab, tab === "user" && styles.activeIconTab]}
          onPress={() => setTab("user")}
        >
          <MaterialIcons
            name="person"
            size={22}
            color={tab === "user" ? "#111827" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>

      {/* Input (Phone / Email / Username) */}
      {tab === "phone" && (
        <View style={styles.phoneRow}>
          <View style={styles.countryBox}>
            <Text style={styles.countryText}>+880</Text>
            <MaterialIcons name="arrow-drop-down" size={22} color="#9ca3af" />
          </View>

          <View style={styles.inputBoxRow}>
            <TextInput
              placeholder="01XXXXXXXXX"
              placeholderTextColor="#6b7280"
              style={styles.inputRow}
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
            />
          </View>
        </View>
      )}

      {tab === "email" && (
        <View style={styles.inputBox}>
          <MaterialIcons name="email" size={22} color="#9ca3af" />
          <TextInput
            placeholder="Enter email"
            placeholderTextColor="#6b7280"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
      )}

      {tab === "user" && (
        <View style={styles.inputBox}>
          <MaterialIcons name="person" size={22} color="#9ca3af" />
          <TextInput
            placeholder="Enter username"
            placeholderTextColor="#6b7280"
            style={styles.input}
            value={user}
            onChangeText={setUser}
          />
        </View>
      )}

      {/* Forgot */}
      <TouchableOpacity style={{ alignSelf: "flex-start", marginBottom: 10 }}>
        <Text style={styles.forgotText}>Forgot?</Text>
      </TouchableOpacity>

      {/* Password */}
      <View style={styles.inputBox}>
        <MaterialIcons name="lock" size={22} color="#9ca3af" />
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#6b7280"
          style={styles.input}
          secureTextEntry={!showPass}
          value={pass}
          onChangeText={setPass}
        />

        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <MaterialIcons
            name={showPass ? "visibility" : "visibility-off"}
            size={22}
            color="#9ca3af"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity 
      style={styles.loginBtn}
      onPress={() => {
    if (pass !== confirm) {
      alert("Password not match");
      return;
    }

    if (tab === "phone" && phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    if (tab === "email" && email.length < 5) {
      alert("Enter valid email");
      return;
    }

    alert("✅ Account Login Successfully!");

    setTimeout(() => {
      navigation.reset({
        index:0,
        routes:[{name:"MainTabs"}],
      });
    }, 1000);
  }}
      >
        <LinearGradient
          colors={["#facc15", "#fb923c"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBtn}
        >
          <Text style={styles.loginText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Signup */}
      <Text style={styles.signupText}>
  No account?{" "}
  <Text
    style={{ color: "#facc15", fontWeight: "bold" }}
    onPress={() => navigation.navigate("Register")}
  >
    Sign Up
  </Text>
</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  subTitle: {
    color: "#9ca3af",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 30,
  },

  tabBox: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 18,
    height: 55,
  },

  iconTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  activeIconTab: {
    backgroundColor: "#facc15",
    borderRadius: 12,
  },

  phoneRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  countryBox: {
    width: 90,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#111827",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  countryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  inputBoxRow: {
    flex: 1,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  inputRow: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  forgotText: {
    color: "#facc15",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
  },

  inputBox: {
    height: 55,
    borderRadius: 12,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  loginBtn: {
    marginTop: 18,
    borderRadius: 14,
    overflow: "hidden",
  },

  gradientBtn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  signupText: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 25,
    fontSize: 15,
  },
});