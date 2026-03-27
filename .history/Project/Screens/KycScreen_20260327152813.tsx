import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function VerificationScreen() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");



useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    const fName = await AsyncStorage.getItem("@firstName");
    const lName = await AsyncStorage.getItem("@lastName");
    const mail = await AsyncStorage.getItem("@email");
    const mob = await AsyncStorage.getItem("@mobile");
    const cty = await AsyncStorage.getItem("@city");
    const pst = await AsyncStorage.getItem("@postal");
    const addr = await AsyncStorage.getItem("@address");

    if (fName) setFirstName(fName);
    if (lName) setLastName(lName);
    if (mail) setEmail(mail);
    if (mob) setMobile(mob);
    if (cty) setCity(cty);
    if (pst) setPostal(pst);
    if (addr) setAddress(addr);

  } catch (e) {
    console.log("Load Error:", e);
  }
};






  const handleSave = async () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      mobile.trim() === "" ||
      city.trim() === "" ||
      postal.trim() === "" ||
      address.trim() === ""
    ) {
      await AsyncStorage.setItem("@kyc_status", "Non Verified");
      Alert.alert("Error", "সব Required Field পূরণ করো!");
      return;
    }

    await AsyncStorage.setItem("@kyc_status", "Verified");

    // চাইলে name + number save রাখতে পারো
    await AsyncStorage.setItem("@kyc_name", firstName + " " + lastName);
    await AsyncStorage.setItem("@kyc_number", mobile);

    Alert.alert("Success", "Verification Complete ✅");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Personal Info</Text>

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