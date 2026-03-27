import React from "react";
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
  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>Personal Info</Text>

        {/* First + Last Name */}
        <View style={styles.row}>
          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>FIRST NAME *</Text>
            <TextInput style={styles.input} 
            placeholder="John" 
            placeholderTextColor="#777"
            keyboardType="default"
            />
          </View>

          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>LAST NAME *</Text>
            <TextInput style={styles.input} 
            placeholder="Doe" 
            placeholderTextColor="#777"
            keyboardType="default"
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>EMAIL *</Text>
          <TextInput style={styles.input} 
          placeholder="john@example.com" 
          placeholderTextColor="#777"
          keyboardType="default"
          />
        </View>


        {/* Mobile */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>MOBILE *</Text>
         </View>
        {/* Country */}
        <TextInput
          placeholder="Select Country"
          placeholderTextColor="#888"
          keyboardType="numeric"
          style={styles.input}
        />

         {/* City + Postal */}
        <View style={styles.row}>
          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>CITY *</Text>
            <TextInput style={styles.input} 
            placeholder="Dhaka" 
            placeholderTextColor="#777"
            keyboardType="default"
            />
          </View>

          <View style={styles.inputBoxHalf}>
            <Text style={styles.label}>POSTAL *</Text>
            <TextInput style={styles.input} 
            placeholder="1205" 
            placeholderTextColor="#777"
            keyboardType="default"
            />
          </View>
        </View>

        {/* Address */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>ADDRESS *</Text>
          <TextInput style={styles.input}
           placeholder="House, Road, Area" 
           placeholderTextColor="#777"
           keyboardType="default"
           />
        </View>

        {/* Button */}
        
<LinearGradient
  colors={["#3b82f6", "#06b6d4"]}
  style={styles.button}
>
  <Text style={styles.buttonText}>Save</Text>
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