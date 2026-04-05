import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { DepositContext } from "../context/DepositContext";
import { CashoutContext } from "../context/CashoutContext";
import { supabase } from "../supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function WnagadScreen() {
const { balance, withdrawBalance, setBalance } = useContext(DepositContext);
  const navigation = useNavigation();
  const route = useRoute();
const { addCashout } = useContext(CashoutContext);
  const { data } = route.params || {};
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
const [loading, setLoading] = useState(false);
  // quick amount buttons
  const quickAmounts = [ 2000, 5000, 10000, 30000, 50000];




  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");


  // Load userId & username from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem("user_id");
      const name = await AsyncStorage.getItem("@username");
      if (id) setUserId(Number(id));
      if (name) setUsername(name);
    };
    loadUser();
  }, []);



  
  const handleWithdraw = async () => {
  const numAmount = Number(amount);
  if (!amount) return Alert.alert("Error", "Amount লিখুন");
  if (numAmount < 1000) return Alert.alert("Minimum", "সর্বনিম্ন ১,০০০ টাকা দিতে হবে");
  if (numAmount > balance) return Alert.alert("Error", "Insufficient Balance");
  if (!number) return Alert.alert("Error", "Nagad নাম্বার দিন");
  if (number.length < 11) return Alert.alert("Error", "Valid Nagad নাম্বার দিন");

if (!userId) return Alert.alert("Error", "User not loaded");

  setLoading(true);

  // 🔹 Step 1: Deduct balance instantly
    const success = await withdrawBalance(numAmount);
    if (!success) {
      setLoading(false);
      return Alert.alert("Error", "Balance deduction failed");
    }
  
    // 🔹 Step 2: Insert withdraw request for admin approval
    const res = await supabase.from("withdraw_requests").insert([
      {
        uid: userId.toString(),
        username: username,
        method: data?.name || "Nagad",
        account_number: number,
        amount: numAmount,
        status: "Pending"
      }
    ]);
  
    setLoading(false);
  
    if (res.error) {
      Alert.alert("Withdraw Failed", res.error.message);
      // Optionally rollback balance
      setBalance(prev => prev + numAmount);
      return;
    }
  
    addCashout({
        id: Date.now().toString(),
        method: data?.name || "Nagad",
        amount: numAmount,
        status: "Pending",
        number: number,
        date: new Date().toLocaleString(),
      });
  
    Alert.alert("Success ✅", `Withdraw Request ৳${numAmount} Submitted`, [
      { text: "OK", onPress: () => navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] }) },
    ]);
  };
  
  
  const numAmount = Number(amount);



  return (
    <ScrollView style={{backgroundColor: "#0c0f1a"}} >  
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
        <Text style={styles.range}>৳1,000.00 - ৳1,00,000.00</Text>
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

      <Text> </Text>

      {/* ✅ show only when amount entered */}
      {amount !== "" && numAmount > 0 && (
        <>
          {/* YOU WILL RECEIVE */}
          <View style={styles.amountBox}>
            <Text style={styles.enterText}>YOU WILL RECEIVE</Text>

            <Text style={styles.receiveText}>
              ৳ {numAmount.toFixed(2)}
            </Text>
          </View>

          <Text> </Text>

          {/* WITHDRAW TO */}
          <View style={styles.amountBox}>
            <Text style={styles.enterText}>☏ WITHDRAW TO</Text>

            <TextInput
              value={number}
              onChangeText={setNumber}
              keyboardType="numeric"
              placeholder="Enter Nagad number"
              placeholderTextColor="#999"
              style={styles.input}
              maxLength={11}
            />
          </View>
        </>
      )}



      {/* CONTINUE BUTTON */}
     <TouchableOpacity
  style={styles.continueBtn}
  onPress={handleWithdraw}
  disabled={loading} // loading হলে বাটন disable হবে
>
  <Text style={styles.continueText}>
    {loading ? "Processing..." : amount !== "" ? `WITHDRAW ৳${numAmount}` : "Enter amount to continue"}
  </Text>
</TouchableOpacity>

      {/* BACK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to methods</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
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

  receiveText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#22c55e"
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