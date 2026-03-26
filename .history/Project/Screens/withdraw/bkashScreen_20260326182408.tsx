import React, { useContext, useState } from "react";
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
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { DepositContext } from "../context/DepositContext";



export default function WbkashScreen() {
 const { balance } = useContext(DepositContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { data } = route.params || {};

  const [amount, setAmount] = useState("");

  // quick amount buttons
  const quickAmounts = [ 1000, 2000, 5000, 10000, 20000];

  const handleContinue = () => {
  const num = Number(amount);

  if (!amount) {
    Alert.alert("Error", "Amount লিখুন");
    return;
  }

  if (num < 1000) {
    Alert.alert("Minimum", "সর্বনিম্ন ১০০০ টাকা দিতে হবে");
    return;
  }

  navigation.navigate("BkashConfirm", {
    amount: amount
  });
};

  return (
    <View style={styles.container}>

        <View style={styles.infoBox}>
                  <View style={styles.row1}>
                    <Text style={styles.label1}>Available Balance</Text>
                    <MaterialIcons name="account-balance-wallet" size={20} color="#ffbfbfff" />
                  </View>
        
                  <View style={styles.row2}>
                    <Text style={styles.label2}>৳{balance.toFixed(2)}</Text>
                  </View>
                  
                </View>

  <Text> </Text>
      {/* METHOD */}
      <View style={styles.methodBox}>
        <View>
                 <Image
                  source={require('../assets/bkash.png')}
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
        <Text style={styles.methodTitle}>{data?.name || "bKash"}</Text>
        <Text style={styles.range}>৳1000.00 - ৳30,000.00</Text>
        </View>
      </View>

      {/* AMOUNT BOX */}
      <View style={styles.amountBox}>
        <Text style={styles.enterText}>ENTER WITHDRAW AMOUNT</Text>

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

      <View style={styles.amountBox}>
        <Text style={styles.enterText}>☏ WITHDRAW TO</Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter bKash number"
          placeholderTextColor="#999"
          style={styles.input}
        />

      </View>
    
      <Text> </Text>

      <View style={styles.amountBox}>
        <Text style={styles.enterText}>☏ WITHDRAW TO</Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter bKash number"
          placeholderTextColor="#999"
          style={styles.input}
        />

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
    fontSize: 18,
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
  },

  infoBox: {
    backgroundColor: "#111827",
    marginTop: -5,
    marginHorizontal: 5,
    padding: 18,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  
row1: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 6,
    marginTop: -10
  },
  row2: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 6,
    marginTop: 0
  },
  row3: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 6,
    marginTop: 0
  },

label1: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: -2,
    color: "#ffffffff",
  },
label2: {
    fontSize: 28,
    fontWeight: "900",
    marginLeft: -2,
    color: "#ffd4d4ff",
  },
});