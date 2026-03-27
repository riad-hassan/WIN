import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";



export default function VerificationScreen() {
  const [countryCode, setCountryCode] = useState("BD");
  const [callingCode, setCallingCode] = useState("880");
  const [countryName, setCountryName] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>Personal Info</Text>

        {/* First + Last Name */}
        <View style={styles.row}>
          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>FIRST NAME *</Text>
            <TextInput style={styles.input} placeholder="John" placeholderTextColor="#777"/>
          </View>

          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>LAST NAME *</Text>
            <TextInput style={styles.input} placeholder="Doe" placeholderTextColor="#777"/>
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>EMAIL *</Text>
          <TextInput style={styles.input} placeholder="john@example.com" placeholderTextColor="#777"/>
        </View>

        {/* Mobile */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>MOBILE *</Text>

          <View style={styles.row}>
            <View style={styles.codeBox}>
              <CountryPicker
                countryCode={countryCode}
                withFlag
                withCallingCode
                withFilter
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCallingCode(country.callingCode[0]);
                }}
              />
              <Text style={styles.codeText}>+{callingCode}</Text>
            </View>

            <TextInput
              style={styles.mobileInput}
              placeholder="1712345678"
              placeholderTextColor="#777"
            />
          </View>
        </View>

        {/* Country */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>COUNTRY *</Text>

          <TouchableOpacity style={styles.selectBox}>
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withCountryNameButton
              withFilter
              onSelect={(country) => {
                setCountryName(country.name);
              }}
            />
          </TouchableOpacity>
        </View>

        {/* City + Postal */}
        <View style={styles.row}>
          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>CITY *</Text>
            <TextInput style={styles.input} placeholder="Dhaka" placeholderTextColor="#777"/>
          </View>

          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>POSTAL *</Text>
            <TextInput style={styles.input} placeholder="1205" placeholderTextColor="#777"/>
          </View>
        </View>

        {/* Address */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>ADDRESS *</Text>
          <TextInput style={styles.input} placeholder="House, Road, Area" placeholderTextColor="#777"/>
        </View>

        {/* Button */}
        <LinearGradient
          colors={["#3b82f6", "#06b6d4"]}
          style={styles.button}
        >
          <TouchableOpacity>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>

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

  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111525",
    padding: 10,
    borderRadius: 10,
    width: "30%",
  },

  codeText: {
    color: "#fff",
    marginLeft: 5,
  },

  mobileInput: {
    backgroundColor: "#111525",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    width: "68%",
  },

  selectBox: {
    backgroundColor: "#111525",
    padding: 14,
    borderRadius: 10,
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