import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NagadScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const { data } = route.params || {};

  const [amount, setAmount] = useState("");

  // quick amount buttons
  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  const handleContinue = () => {
    const num = Number(amount);
  
    if (!amount) {
      Alert.alert("Error", "Amount লিখুন");
      return;
    }
  
    if (num < 500) {
        Alert.alert("Minimum", "সর্বনিম্ন ৫০০ টাকা দিতে হবে");
        return;
      }
  
    navigation.navigate("NagadConfirm", {
      amount: amount
    });
  };

  

  return (
    <View style={styles.container}>
      {/* METHOD */}
      <View style={styles.methodBox}>
        <View>
                 <Image
                  source={require('../assets/nogod.png')}
                  style={{ 
                    width: 160, 
                    height: 47, 
                    resizeMode: 'contain', 
                    marginLeft:-60 ,
                    marginRight: -40,
                }}
                />
        </View>


        <View>  
        <Text style={styles.methodTitle}>{data?.name || "Nagad"}</Text>
        <Text style={styles.range}>৳300.00 - ৳30,000.00</Text>
        </View>
      </View>

      {/* AMOUNT BOX */}
      <View style={styles.amountBox}>
        <Text style={styles.enterText}>ENTER AMOUNT</Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="৳ 0"
          placeholderTextColor="#999"
          style={styles.input}
        />

        {/* QUICK SELECT */}
        <View style={styles.quickRow}>
          {quickAmounts.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.quickBtn}
              onPress={() => setAmount(item.toString())}
            >
              <Text style={styles.quickText}>
                {item >= 1000 ? item / 1000 + "K" : item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CONTINUE */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>
          Enter amount to continue
        </Text>
      </TouchableOpacity>

      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to methods</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f1a",
    padding: 15
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  logo: {
    color: "#facc15",
    fontSize: 22,
    fontWeight: "bold"
  },

  balance: {
    color: "#fff"
  },

  methodBox: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row'
  },

  methodTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },

  range: {
    color: "#aaa",
    marginTop: 3
  },

  changeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#facc15",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },

  amountBox: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10
  },

  enterText: {
    color: "#aaa",
    marginBottom: 10
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    color: "#fff",
    fontSize: 24,
    paddingVertical: 5
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  quickBtn: {
    backgroundColor: "#1f2937",
    padding: 8,
    borderRadius: 20,
    width: 50,
    alignItems: "center"
  },

  quickText: {
    color: "#fff"
  },

  bonus: {
    color: "#22c55e",
    marginTop: 15
  },

  continueBtn: {
    backgroundColor: "#facc15",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
     width: '65%',
     alignSelf:'center'
  },

  continueText: {
    fontWeight: "bold"
  },

  backText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 15
  }
});