import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function VerificationScreen() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");

  const [status, setStatus] = useState("Non Verified"); // default

  const handleSave = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      mobile.trim() === "" ||
      city.trim() === "" ||
      postal.trim() === "" ||
      address.trim() === ""
    ) {
      setStatus("Non Verified");
      Alert.alert("Error", "সব required field পূরণ করো!");
      return;
    }

    setStatus("Verified");
    Alert.alert("Success", "Verification Complete ✅");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Personal Info</Text>

        {/* Profile Container */}
        <View style={styles.profileBox}>
          <Text style={styles.profileText}>Name: {firstName} {lastName}</Text>
          <Text style={styles.profileText}>Mobile: {mobile}</Text>

          <Text style={[
            styles.verifyText,
            { color: status === "Verified" ? "#00ff88" : "#ff4444" }
          ]}>
            {status}
          </Text>
        </View>

        {/* First + Last Name */}
        <View style={styles.row}>
          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>FIRST NAME *</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              placeholderTextColor="#777"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>LAST NAME *</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              placeholderTextColor="#777"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>EMAIL (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="john@example.com"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Mobile */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>MOBILE *</Text>
          <TextInput
            placeholder="Enter your number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* City + Postal */}
        <View style={styles.row}>
          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>CITY *</Text>
            <TextInput
              style={styles.input}
              placeholder="Dhaka"
              placeholderTextColor="#777"
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>POSTAL *</Text>
            <TextInput
              style={styles.input}
              placeholder="0000"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={postal}
              onChangeText={setPostal}
            />
          </View>
        </View>

        {/* Address */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>ADDRESS *</Text>
          <TextInput
            style={styles.input}
            placeholder="House, Road, Area"
            placeholderTextColor="#777"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
          <LinearGradient
            colors={["#3b82f6", "#06b6d4"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f1a",
    padding: 16,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  profileBox: {
    backgroundColor: "#111525",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  profileText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
  },

  verifyText: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },

  label: {
    color: "#aaa",
    fontSize: 11,
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBox: {
    marginBottom: 12,
  },

  inputBoxHalf: {
    width: "48%",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#111525",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
  },

  button: {
    marginTop: 10,
    borderRadius: 12,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    padding: 16,
  },
});