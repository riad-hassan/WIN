import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
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



