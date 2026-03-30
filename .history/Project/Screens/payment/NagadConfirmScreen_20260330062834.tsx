import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { DepositContext } from "../context/DepositContext"; // path ঠিক করো
import { supabase } from "../supabase";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";


export default function NagadConfirmScreen() {

  const navigation = useNavigation();
    const route = useRoute();
  
    const { amount } = route.params;
  const { depositId } = route.params;
    const [time, setTime] = useState(1500); // 25 min = 1500 sec
    const [trxId, setTrxId] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [image, setImage] = useState(null);
  const { addDeposit } = useContext(DepositContext);
   
    const [nagadNumber, setNagadNumber] = useState("");
  
   const pickImage = async () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled");
      } else if (response.errorCode) {
        Alert.alert("Error", response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
      }
    });
  };
  
  const openCamera = async () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };
  
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("Camera cancelled");
      } else if (response.errorCode) {
        Alert.alert("Error", response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
      }
    });
  };
  
  
  
  
  
  
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
      Clipboard.setString(nagadNumber);
      Alert.alert("Copied", "Number copied");
    };
  
  
  
  
   // ✅ Fetch random bKash number from Supabase
  useEffect(() => {
    const fetchRandomNumber = async () => {
      const { data, error } = await supabase
        .from("payment_numbers")
        .select("number")
        .eq("method", "nagad");  // method change করলে Nagad/Rocket/Upay ও fetch হবে
  
      if (error) {
        console.log("Supabase fetch error:", error.message);
      } else if (data.length > 0) {
        // pick a random number
        const randomIndex = Math.floor(Math.random() * data.length);
        setNagadNumber(data[randomIndex].number);
      }
    };
  
    fetchRandomNumber();
  }, []);
  
  
  
  
  
  const handleSubmit = async () => {
      if (!trxId) {
        Alert.alert("Error", "TRX ID required");
        return;
      }
  
      const { error } = await supabase
        .from("deposits")
        .update({
          trx_id: trxId,
          user_number: userNumber,
          screenshot: image || null,
          
        })
        .eq("id", depositId);
  
      if (error) {
       Alert.alert("Error", error.message);
        return;
      }
  
      Alert.alert("Success", "Deposit Submitted!");
      navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
    };




  return (
    <ScrollView> 
    <View style={styles.container}>

      {/* TOP */}
    
      <View style={styles.topBox}>
        <Text style={styles.amountText}>৳{amount} BDT</Text>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>
      

      {/* STEP 1 */}
      <Text style={styles.step}>👉 Send to this Nagad Number</Text>
      <Text style={{color:"#fff" , alignSelf: 'center'}} > ⛉ Account: Business</Text>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{nagadNumber}</Text>

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


      <Text style={{color:"#fff", marginBottom:-5, marginTop: 5, fontSize:12}} > Your Nagad Number (optional)</Text>
      <TextInput
        placeholder="  e.g 01XXXXXXXXX"
        placeholderTextColor="#888"
        style={styles.input}
        value={userNumber}
        onChangeText={setUserNumber}
      />


      <Text style={styles.step}>📸 Payment Screenshot</Text>
      
      <View style={styles.uploadCard}>
      
        <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : (
            <Text style={styles.uploadText}>Tap to upload</Text>
          )}
        </TouchableOpacity>
      
        {/* Buttons */}
        <View style={styles.uploadBtns}>
          <TouchableOpacity style={styles.smallBtn} onPress={pickImage}>
            <Text style={styles.smallBtnText}>Gallery</Text>
          </TouchableOpacity>
      
          <TouchableOpacity style={styles.smallBtn} onPress={openCamera}>
            <Text style={styles.smallBtnText}>Camera</Text>
          </TouchableOpacity>
        </View>
      
      </View>

      {/* SEND */}
      <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit}>
        <Text style={styles.sendText}>SEND</Text>
      </TouchableOpacity>

      {/* CANCEL */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancel}>Cancel</Text>
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

  topBox: {
    backgroundColor: "#f43f5e",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  uploadCard: {
  backgroundColor: "#111827",
  padding: 12,
  borderRadius: 12,
  marginTop: 5
},

uploadArea: {
  height: 160,
  borderWidth: 2,
  borderColor: "#374151",
  borderStyle: "dashed",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
},

uploadText: {
  color: "#9ca3af"
},

uploadBtns: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10
},

smallBtn: {
  backgroundColor: "#1f2937",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8
},

smallBtnText: {
  color: "#fff",
  fontSize: 13
},

preview: {
  width: "100%",
  height: "100%",
  borderRadius: 10
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