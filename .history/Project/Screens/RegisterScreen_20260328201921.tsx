import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width } = Dimensions.get("window");

export default function RegisterScreen({ navigation, onLogin }) {
  const [tab, setTab] = useState("phone"); // phone | email
  const [agree, setAgree] = useState(true);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [referral, setReferral] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);



  const generateUID = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString(); 
  // 7 digit random
};





const handleRegister = async () => {
    if (!agree) return alert("Please accept Terms & Privacy Policy");
    if (pass.length < 4) return alert("Password too short");
    if (pass !== confirm) return alert("Password not match");
    if (tab === "phone" && phone.length < 10) return alert("Enter valid phone number");
    if (tab === "email" && email.length < 5) return alert("Enter valid email");
    const uid = generateUID();


    // Insert to Supabase
    const { data, error } = await supabase.from("users").insert([
      {
        uid: uid,
        phone: phone || null,
        email: email || null,
        username: username || null,
        password: pass,
        referral: referral || null,
      },
    ]);

    if (error) return alert("Error: " + error.message);
    await AsyncStorage.setItem("uid", uid);

    alert("✅ Account Created Successfully!");
    onLogin();   // 🔥 এইটা সবচেয়ে important
  };


  return (
    <ScrollView> 
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        Create <Text style={{ color: "#facc15" }}>Account</Text> !
      </Text>

      <Text style={styles.subTitle}>
        Join & get <Text style={{ color: "#facc15" }}>200% welcome bonus</Text>
      </Text>

      {/* Tabs */}
      <View style={styles.tabBox}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "email" && styles.activeTabYellow]}
          onPress={() => setTab("email")}
        >
          <MaterialIcons name="email" size={20} color="#9ca3af" />
          <Text style={styles.tabText}> Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, tab === "phone" && styles.activeTabYellow]}
          onPress={() => setTab("phone")}
        >
          <MaterialIcons name="phone" size={20} color="#9ca3af" />
          <Text style={[styles.tabText, { color: "#9ca3af" }]}> Phone</Text>
        </TouchableOpacity>
      </View>

      {/* Phone or Email */}
      {tab === "phone" ? (
        <View style={styles.phoneRow}>
          <View style={styles.countryBox}>
            <Text style={styles.countryText}>+88</Text>
            <MaterialIcons name="arrow-drop-down" size={22} color="#9ca3af" />
          </View>

          <View style={styles.inputBoxRow}>
            <MaterialIcons name="phone" size={22} color="#9ca3af" />
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
      ) : (
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

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <View style={styles.inputBox}>
        <MaterialIcons name="person" size={22} color="#9ca3af" />
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password *</Text>
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

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password *</Text>
      <View style={styles.inputBox}>
        <MaterialIcons name="lock" size={22} color="#9ca3af" />
        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#6b7280"
          style={styles.input}
          secureTextEntry={!showConfirm}
          value={confirm}
          onChangeText={setConfirm}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <MaterialIcons
            name={showConfirm ? "visibility" : "visibility-off"}
            size={22}
            color="#9ca3af"
          />
        </TouchableOpacity>
      </View>

      {/* Referral */}
      <Text style={styles.label}>Referral Code (optional)</Text>
      <View style={styles.inputBox}>
        <MaterialIcons name="card-giftcard" size={22} color="#9ca3af" />
        <TextInput
          placeholder="Enter referral code"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={referral}
          onChangeText={setReferral}
        />
      </View>

      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkRow}
        onPress={() => setAgree(!agree)}
      >
        <View style={[styles.checkBox, agree && styles.checkBoxActive]}>
          {agree && <Text style={{ color: "#000", fontWeight: "bold" }}>✓</Text>}
        </View>

        <Text style={styles.checkText}>
          I agree to the{" "}
          <Text style={{ color: "#facc15", fontWeight: "bold" }}>Terms</Text> and{" "}
          <Text style={{ color: "#facc15", fontWeight: "bold" }}>
            Privacy Policy
          </Text>
          . I am 18+.
        </Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity onPress={handleRegister}>
        <LinearGradient colors={["#facc15", "#fb923c"]}>
          <Text style={{ textAlign: "center", padding: 15 }}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Login */}
      <Text style={styles.loginText}>
  Already have an account?{" "}
  <Text
    style={{ color: "#facc15", fontWeight: "bold" }}
    onPress={() => navigation.navigate("Login")}
  >
    Login
  </Text>
</Text>
    </View>
    </ScrollView>
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  subTitle: {
    color: "#9ca3af",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },

  tabBox: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
  },

  tabBtn: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#1f2937",
  },

  activeTabYellow: {
    backgroundColor: "#facc15",
  },

  tabText: {
    color: "#9ca3af",
    fontWeight: "bold",
    fontSize: 16,
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
    gap: 8,
  },

  inputRow: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },

  label: {
    color: "#9ca3af",
    marginBottom: 5,
    marginTop: 5,
    fontSize: 14,
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

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#facc15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  checkBoxActive: {
    backgroundColor: "#facc15",
  },

  checkText: {
    flex: 1,
    color: "#9ca3af",
    fontSize: 13,
  },

  createBtn: {
    marginTop: 18,
    borderRadius: 14,
    overflow: "hidden",
  },

  gradientBtn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },

  createText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  loginText: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 18,
    fontSize: 15,
  },
});