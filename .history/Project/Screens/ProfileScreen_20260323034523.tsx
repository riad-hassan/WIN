
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";



const profile = [
  require("../Screens/assets/im1.png"),
  require("../Screens/assets/im2.png"),
  require("../Screens/assets/im3.png"),
  require("../Screens/assets/im4.png"),
  require("../Screens/assets/im5.png"),
  require("../Screens/assets/im6.png"),
  require("../Screens/assets/im7.png"),
  require("../Screens/assets/im8.png"),
  require("../Screens/assets/im9.png"),
  require("../Screens/assets/im10.png"),
];




export default function ProfileScreen() {
 
const [method,setMethod] = useState("bkash")
const [number,setNumber] = useState("")
const [savedNumber, setSavedNumber] = useState(""); // সেভ করা নাম্বার
  const [isEditing, setIsEditing] = useState(false); // এডিট মোড
const [savedMethod, setSavedMethod] = useState(""); // সেভ করা মেথড


// অ্যাপ লোড হলে AsyncStorage থেকে নাম্বার ও মেথড নিয়ে আসা
  useEffect(() => {
    const loadPaymentData = async () => {
      try {
        const savedNum = await AsyncStorage.getItem("@payment_number");
        const savedMeth = await AsyncStorage.getItem("@payment_method");
        if (savedNum && savedMeth) {
          setSavedNumber(savedNum);
          setSavedMethod(savedMeth);
          setIsEditing(false);
        }
      } catch (e) {
        console.log("Failed to load payment data", e);
      }
    };
    loadPaymentData();
  }, []);

  // Save বাটন
  const handleSave = async () => {
    if (number.trim() === "") {
      alert("Please enter a valid number!");
      return;
    }
    // ২। ১১ ডিজিট কিনা চেক
  if (!/^\d{11}$/.test(number)) {
    alert("Payment number must be 11 digits!");
    return;
  }
    try {
      await AsyncStorage.setItem("@payment_number", number);
      await AsyncStorage.setItem("@payment_method", method);
      setSavedNumber(number);
      setSavedMethod(method);
      setIsEditing(false);
      alert("Payment number saved successfully!");
    } catch (e) {
      console.log("Failed to save payment data", e);
      alert("Failed to save payment data.");
    }
  };

  // Edit বাটন
  const handleEdit = () => {
    setIsEditing(true);
    setNumber(savedNumber);
    setMethod(savedMethod);
  };


  return (
    <LinearGradient colors={["#e0f7fa", "#f3e5f5"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        <Text> </Text>
        <View style={styles.container11}> 
          <Text style={styles.text11}>GrandWIN BET</Text>
        </View>
        
        
        {/* প্রোফাইল কার্ড */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri:
                "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
            style={styles.avatar}
          />
          
        </View>

        {/* ইনফো সেকশন */}
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <MaterialIcons name="api" size={22} color="#066b24ff" />
            <Text style={styles.label}>UID:</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="person" size={22} color="#066b24ff" />
            <Text style={styles.label}>নাম:</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="phone" size={22} color="#066b24ff" />
            <Text style={styles.label}>ফোন:</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="event" size={22} color="#066b24ff" />
            <Text style={styles.label}>যোগদানের তারিখ:</Text>
          </View>

        </View>



 {/* Payment Section */}
        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>Payment Number</Text>

          {isEditing ? (
            <>
              <View style={styles.methodRow}>
                {["bkash", "nagad", "rocket"].map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.methodBtn, method === m && styles.methodActive]}
                    onPress={() => setMethod(m)}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      {m.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                placeholder="Enter payment number"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
                style={styles.numberInput}
              />
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.savedBox}>
              <Text style={styles.savedText}>
                {savedMethod.toUpperCase()}: {savedNumber}
              </Text>
              <TouchableOpacity onPress={handleEdit} style={styles.editBtn}>
                <Text style={{ color: "#ffffffff", fontWeight: "600" }}>EDIT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>


        {/* বাটন */}
        <TouchableOpacity style={styles.btn} >
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.btnText}>লগআউট</Text>
        </TouchableOpacity>
        <Text> </Text>
        <Text> </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#066b24ff",
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f74242ff",
  },
  phone: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: "#fff",
    marginTop: 15,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#333",
  },
  value: {
    fontSize: 16,
    marginLeft: 6,
    color: "#555",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#066b24ff",
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    marginHorizontal: 80,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "600",
  },
  container11: {
    height: 65,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
    marginTop: -10,
  },
  text11:{
    fontSize: 28,
    alignSelf: 'center',
    fontWeight: '700',
    padding: 10,
    color: "#066b24ff",
  },
  paymentBox:{
backgroundColor:"#fff",
marginTop:20,
borderRadius:10,
padding:15
},

paymentTitle:{
fontSize:16,
fontWeight:"bold",
marginBottom:10
},

methodRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

methodBtn:{
flex:1,
backgroundColor:"#999",
padding:10,
borderRadius:6,
marginHorizontal:3,
alignItems:"center"
},

methodActive:{
backgroundColor:"#ff3b3b"
},

numberInput:{
borderWidth:1,
borderColor:"#ddd",
borderRadius:8,
padding:10,
fontSize:16
},
saveBtn:{ backgroundColor:"#28a745", padding:10, borderRadius:6, alignItems:"center", marginTop: 9  },
editBtn:{ 
  backgroundColor:"#066b24ff", 
  padding:10, 
  borderRadius:12, 
  alignItems:"center",
  width: 60,
 },
savedBox:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:10, backgroundColor:"#f0f0f0", borderRadius:8 },
savedText:{ fontSize:16, fontWeight:"600" },


});