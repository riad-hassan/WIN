import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
npm install react-native-linear-gradient
export default function VerificationScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>Personal Info</Text>

        {/* First + Last Name */}
        <View style={styles.row}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#888"
            style={styles.inputHalf}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#888"
            style={styles.inputHalf}
          />
        </View>

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
        />

        {/* Mobile */}
        <View style={styles.row}>
          <TextInput
            placeholder="+880"
            placeholderTextColor="#888"
            style={styles.codeInput}
          />
          <TextInput
            placeholder="1712345678"
            placeholderTextColor="#888"
            style={styles.mobileInput}
          />
        </View>

        {/* Country */}
        <TextInput
          placeholder="Select Country"
          placeholderTextColor="#888"
          style={styles.input}
        />

        {/* City + Postal */}
        <View style={styles.row}>
          <TextInput
            placeholder="City"
            placeholderTextColor="#888"
            style={styles.inputHalf}
          />
          <TextInput
            placeholder="Postal Code"
            placeholderTextColor="#888"
            style={styles.inputHalf}
          />
        </View>

        {/* Address */}
        <TextInput
          placeholder="House, Road, Area"
          placeholderTextColor="#888"
          style={styles.input}
        />

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    backgroundColor: "#111525",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    color: "#fff",
  },

  inputHalf: {
    backgroundColor: "#111525",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    color: "#fff",
    width: "48%",
  },

  codeInput: {
    backgroundColor: "#111525",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    width: "25%",
  },

  mobileInput: {
    backgroundColor: "#111525",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    width: "72%",
  },

  button: {
    marginTop: 10,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    backgroundColor: "linear-gradient(90deg, #3b82f6, #06b6d4)", // fallback নিচে দেখো
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});