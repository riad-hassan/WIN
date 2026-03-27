import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

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



