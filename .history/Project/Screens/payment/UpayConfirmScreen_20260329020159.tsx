import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { DepositContext } from "../context/DepositContext"; // path ঠিক করো
import { supabase } from "../supabase";


export default function UpayConfirmScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const { amount } = route.params;

  const [time, setTime] = useState(1500); // 25 min = 1500 sec
  const [trxId, setTrxId] = useState("");
  
  
  const [userNumber, setUserNumber] = useState("");
const [bkashNumber, setBkashNumber] = useState("");
  

  // ⏱ TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const copyNumber = () => {
    Clipboard.setString(UpayNumber);
    Alert.alert("Copied", "Number copied");
  };




  // ✅ Fetch bKash number from Supabase
    useEffect(() => {
      const fetchNumber = async () => {
        const { data, error } = await supabase
          .from("payment_numbers")
          .select("bkash")
          .single(); // assume one row with all numbers
        if (error) {
          console.log("Supabase fetch error:", error.message);
        } else {
          setBkashNumber(data.bkash);
        }
      };
      fetchNumber();
    }, []);





  const { addDeposit } = useContext(DepositContext);
  const handleSubmit = () => {
    if (!trxId) {
      Alert.alert("Error", "TRX ID দিন");
      return;
    }
  
    const newDeposit = {
      id: Date.now().toString(),
      method: "Upay",
      amount: amount,
      trxId: trxId,
      userNumber: userNumber || "N/A",
      status: "Pending",
      time: new Date().toLocaleString()
    };
  
    addDeposit(newDeposit);
  
    // 🔥 instant balance add
    // setBalance(prev => prev + Number(amount));
  
    Alert.alert("Success", "Deposit Submitted");
  
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    
  });
  };




  return (
    <View style={styles.container}>

      {/* TOP */}
    
      <View style={styles.topBox}>
        <Text style={styles.amountText}>৳{amount} BDT</Text>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>
      

      {/* STEP 1 */}
      <Text style={styles.step}>👉 Send to this Upay Number</Text>
      <Text style={{color:"#fff" , alignSelf: 'center'}} > ⛉ Account: Business</Text>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{UpayNumber}</Text>

        <TouchableOpacity onPress={copyNumber}>
          <Text style={styles.copy}>⧉</Text>
        </TouchableOpacity>
      </View>


      {/* STEP 2 */}
      <Text style={styles.copy}></Text>
      <Text style={styles.step}>👉 Enter Transaction Details</Text>
      

      <Text style={{color:"#fff", marginBottom:-5, marginTop: 5, fontSize:12}} > Transaction ID (TRX ID)*</Text>
      <TextInput
        placeholder="  e.g G65GYS87GV"
        placeholderTextColor="#888"
        style={styles.input}
        value={trxId}
        onChangeText={setTrxId}
      />


      <Text style={{color:"#fff", marginBottom:-5, marginTop: 5, fontSize:12}} > Your Upay Number (optional)</Text>
      <TextInput
        placeholder="  e.g 01XXXXXXXXX"
        placeholderTextColor="#888"
        style={styles.input}
        value={userNumber}
        onChangeText={setUserNumber}
      />

      {/* SEND */}
      <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit}>
        <Text style={styles.sendText}>SEND</Text>
      </TouchableOpacity>

      {/* CANCEL */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancel}>Cancel</Text>
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

  topBox: {
    backgroundColor: "#f43f5e",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  amountText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },

  timer: {
    color: "#fff",
    fontSize: 18
  },

  step: {
    color: "#fff",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 16
  },

  numberBox: {
    backgroundColor: "#1f2937",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  number: {
    color: "#f43f5e",
    fontSize: 20,
    fontWeight: "bold"
  },

  copy: {
    color: "#fff"
  },

  copyAmount: {
    backgroundColor: "#374151",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },

  input: {
    backgroundColor: "#1f2937",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  sendBtn: {
    backgroundColor: "#facc15",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    width: "65%",
    alignSelf: 'center'
  },

  sendText: {
    fontWeight: "bold"
  },

  cancel: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 10
  }

});