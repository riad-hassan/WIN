
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Animated,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DepositContext } from "./context/DepositContext"; // path ঠিক রাখবা



const names = [
"Rahim332","KKarim43","Hasan5g","Sakiber4","Nayeemt54", "Molina32K", "Aktar354", "Jenijd", "gShofiq", "Soh...", "Barsha", "Abir", "Tahsin", "mehrab", "Rohan", "Naomi", "Maaryam", "mahin", "jahid", "	MAHDI", "Ridwan", "Shah", "Hridi", "Sanjana", "Saeed", "Protik",
"Arif346","Jamal856","Sabbir573","Imran776","Rony734", "Kam...", "Era...","Samha", "Ruhani", "Muhu", "Asif", "Saliha", "Bushra", "Parban" ,"Omar", "Dina", "Amatullah", "Labiba", "Labib", "Rihaa", "Tasfin", "Rehanul", "nafis", "zawad", "Emu", "eblehe", "Nishat", "Shuvadip", "Faysal", "Arpi", "Mun", "Joy", 
]

const amounts = [50000,28000,32000,25500,75000,72000,100000, 27000, 25000, 28000, 34000, 48500, 57000, 47000, 88000, 34000, 48500, 77000, 75000,72500,100000, 25000, 25000, 50000,28000,52000,25500,75000, 25000, 58450, 90000, 45000, 25000, 45000, 70000, 71000, 54000, 25000, 26000, 29000, 54000, 25000, 26000, 29000,54000, 25000, 26000, 29000, ]
const methods = [
  { name: "bKash", icon: require("../Screens/assets/bkash.png") },
  { name: "Nagad", icon: require("../Screens/assets/nogod.png") },
  { name: "Rocket", icon: require("../Screens/assets/rocket.png") },
];


export default function WalletScreen() {
 
const [numbers, setNumbers] = useState({
  bKash: "",
  nagad: "",
  rocket: ""
});

const navigation = useNavigation();
// cash out toost er jonno
const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;


const { balance } = useContext(DepositContext);






// cashout massage er jonno 
useEffect(() => {

const interval = setInterval(() => {

  const name = names[Math.floor(Math.random()*names.length)];
  const amount = amounts[Math.floor(Math.random()*amounts.length)];
  const method = methods[Math.floor(Math.random()*methods.length)];

  setCashData({
    name,
    amount,
    method
  });

  progressAnim.setValue(1);

  // progress bar animation (5 sec)
  Animated.timing(progressAnim,{
    toValue: 0,
    duration: 5000,
    useNativeDriver: false
  }).start(() => {
    setCashData(null);
  });

},10000); // every 10 sec

return ()=>clearInterval(interval);

},[]);





// State
const [progress, setProgress] = useState(0); // KYC progress 0 or 1
const [levelText, setLevelText] = useState("Level 1 of 2");
const [balanceProgress, setBalanceProgress] = useState(0); // balance percentage
// প্রথমে progress state কে 2 parts এ ভাগ করব
const [kycProgress, setKycProgress] = useState(0); // Basic Step 0 বা 1
const [fundsProgress, setFundsProgress] = useState(0); // balance progress 0–1
const maxBalance = 10000; // যেটা 100% ধরা হবে
const [status, setStatus] = useState("Non Verified");
const [kycName, setKycName] = useState("");
const [kycNumber, setKycNumber] = useState("");

const [progressPercent, setProgressPercent] = useState(0);

// useFocusEffect এর মধ্যে loadKycStatus update:
useFocusEffect(
  useCallback(() => {
    const loadKycStatus = async () => {
      const savedStatus = await AsyncStorage.getItem("@kyc_status");
      const savedName = await AsyncStorage.getItem("@kyc_name");
      const savedNumber = await AsyncStorage.getItem("@kyc_number");

      if (savedStatus) setStatus(savedStatus);
      if (savedName) setKycName(savedName);
      if (savedNumber) setKycNumber(savedNumber);

      // 🔹 Level text
      setLevelText(savedStatus === "Verified" ? "Level 2 of 2" : "Level 1 of 2");

      // 🔹 প্রগেস বার
      let kycProg = savedStatus === "Verified" ? 0.5 : 0; // KYC 50% ধরে নিচ্ছি
      let fundsProg = Math.min(balance / maxBalance, 0.5); // 50% max allocation
      setProgressPercent((kycProg + fundsProg) * 100); // % হিসেবে
    };

    loadKycStatus();
  }, [balance])
);






// number asyn a rakar jonno
useEffect(() => {
  const loadNumbers = async () => {
    try {
      const saved = await AsyncStorage.getItem("@payment_numbers");
      if (saved) {
        setNumbers(JSON.parse(saved));
      }
    } catch (e) {
      console.log(e);
    }
  };

  loadNumbers();
}, []);




// Save বাটন
  const handleSave = async (type) => {
  if (numbers[type].trim() === "") {
    alert("Enter number!");
    return;
  }

  if (!/^\d{11}$/.test(numbers[type])) {
    alert("Number must be 11 digits!");
    return;
  }

  try {
    await AsyncStorage.setItem("@payment_numbers", JSON.stringify(numbers));
    alert("Saved!");
  } catch (e) {
    console.log(e);
  }
};


const handleChange = (type, value) => {
  setNumbers(prev => ({
    ...prev,
    [type]: value
  }));
};







  return (
    <LinearGradient colors={["#e0f7fa", "#f3e5f5"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        

        {/* ইনফো সেকশন */}
        <View style={styles.infoBox}>
          <View style={styles.row1}>
            <Text style={styles.label1}>Balance</Text>
            <MaterialIcons name="account-balance-wallet" size={20} color="#2e302eff" />
          </View>

          <View style={styles.row2}>
            <Text style={styles.label2}>৳{balance.toFixed(2)}</Text>
          </View>

          
          <View style={styles.row3}>
            <TouchableOpacity 
            style={styles.btn2}
            onPress={() => navigation.navigate("Deposit")}
            >
              
            <Text style={styles.label3}>     ↓ Deposit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={styles.btn3}
            onPress={() => navigation.navigate("Cashout")}
            >
            <Text style={styles.label3}>   ↗ Withdraw</Text>
            </TouchableOpacity>
          </View>
          

        </View>
    <View style={styles.infoBox2}>

    </View>

    <LinearGradient
      colors={["#1e293b", "#0f172a"]}
      style={styles.card}
    >
      {/* Top Section */}
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.iconBox}>
            <MaterialIcons name="shield" size={24} color="#facc15" />
          </View>
    
          <View>
            <Text style={styles.subTitle}>Verification</Text>
            <Text style={styles.title}>{levelText}</Text>
          </View>
        </View>
    
        {/* শুধুমাত্র active level এর % দেখাবে */}
        <View>
          <Text style={styles.percent}>
            {progress === 1 ? "100%" : "0%"}
          </Text>
          <Text style={styles.complete}>Complete</Text>
        </View>
      </View>
    
      {/* Progress Bar */}
      {/* Progress Bar */}
    <View style={styles.progressBg}>
      {/* Basic Step */}
      <Animated.View
        style={[
          styles.progressFill,
          {
            width: kycProgress === 1 ? "100%" : "0%", 
          },
        ]}
      />
      {/* Funds Step */}
      {kycProgress === 1 && (
       
      <Animated.View
        style={[
          styles.progressFill,
          {
            width: `${progressPercent}%`, // balance অনুযায়ী
            backgroundColor: "#facc15",
            position: "absolute", // overlap হবে
            top: 0,
            left: 0,
            height: 6,
          },
        ]}
      />
      )}
    </View>
    
      {/* Steps */}
      {/* Steps */}
    <View style={styles.stepsRow}>
      {/* Basic Step */}
      <View style={kycProgress === 1 ? styles.activeStep : styles.step}>
        <MaterialIcons name="person" size={20} color="#facc15" />
        <Text style={kycProgress === 1 ? styles.activeText : styles.stepText}>
          Basic
        </Text>
      </View>
    
      {/* Funds Step */}
      <View style={kycProgress === 1 ? styles.step : styles.activeStep}>
        <MaterialIcons name="account-balance-wallet" size={20} color="#facc15" />
        <Text style={kycProgress === 1 ? styles.stepText : styles.activeText}>
          Funds
        </Text>
      </View>
    </View>
    </LinearGradient>



    <View style={styles.paymentBox}>
  <Text style={styles.paymentTitle}>Add Payment Numbers</Text>

  {/* Bkash */}
  <Text style={styles.methodTitle}>Bkash</Text>
  <TextInput
    style={styles.numberInput}
    value={numbers.bKash}
    onChangeText={(text) => handleChange("bKash", text)}
    keyboardType="numeric"
    placeholder="Bkash number"
  />
  <TouchableOpacity onPress={() => handleSave("bKash")} style={styles.saveBtn}>
    <Text style={{ color: "#fff" }}>Save</Text>
  </TouchableOpacity>

  {/* Nagad */}
  <Text style={styles.methodTitle}>Nagad</Text>
  <TextInput
    style={styles.numberInput}
    value={numbers.nagad}
    onChangeText={(text) => handleChange("nagad", text)}
    keyboardType="numeric"
    placeholder="Nagad number"
  />
  <TouchableOpacity onPress={() => handleSave("nagad")} style={styles.saveBtn}>
    <Text style={{ color: "#fff" }}>Save</Text>
  </TouchableOpacity>

  {/* Rocket */}
  <Text style={styles.methodTitle}>Rocket</Text>
  <TextInput
    style={styles.numberInput}
    value={numbers.rocket}
    onChangeText={(text) => handleChange("rocket", text)}
    keyboardType="numeric"
    placeholder="Rocket number"
  />
  <TouchableOpacity onPress={() => handleSave("rocket")} style={styles.saveBtn}>
    <Text style={{ color: "#fff" }}>Save</Text>
  </TouchableOpacity>
</View>


<LinearGradient
      colors={["#151829", "#101325"]}
      style={styles.card}
    >
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="redeem" size={18} color="#facc15" />
        <Text style={styles.headerText}>Current Benefits</Text>
      </View>

      {/* Row */}
      <View style={styles.row}>

        {/* Bonus */}
        <View style={styles.item}>
          <MaterialIcons name="emoji-events" size={26} color="#3b3f55" />
          <Text style={styles.value}>0%</Text>
          <Text style={styles.label}>Bonus</Text>
        </View>

        {/* Limit Active */}
        <View style={styles.item}>
          <View style={styles.activeIconBox}>
            <MaterialIcons name="account-balance-wallet" size={24} color="#10b981" />
          </View>

          <Text style={[styles.value, { color: "#fff" }]}>৳50K</Text>
          <Text style={styles.label}>Limit</Text>
        </View>

        {/* Priority */}
        <View style={styles.item}>
          <MaterialIcons name="flash-on" size={26} color="#3b3f55" />
          <Text style={styles.value}>—</Text>
          <Text style={styles.label}>Priority</Text>
        </View>

        {/* Badge */}
        <View style={styles.item}>
          <MaterialIcons name="verified" size={26} color="#3b3f55" />
          <Text style={styles.value}>—</Text>
          <Text style={styles.label}>Badge</Text>
        </View>

      </View>
    </LinearGradient>



      </ScrollView>



{cashData && (
<View style={styles.cashBox}>

  <Image source={cashData.method.icon} style={styles.cashIcon} />

  <View style={{flex:1}}>
    <Text style={styles.cashTitle}>
      {cashData.name}
    </Text>

    <Text style={styles.cashSub}>
      Cash out ৳{cashData.amount}
    </Text>
  </View>

  {/* progress bar */}
  <Animated.View
    style={[
      styles.progress,
      {
        width: progressAnim.interpolate({
          inputRange:[0,1],
          outputRange:["0%","100%"]
        })
      }
    ]}
  />

</View>
)}   
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  infoBox2: {
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
    justifyContent: 'space-around',
    marginVertical: 6,
    marginTop: 0
  },

label1: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: -2,
    color: "#333",
  },
label2: {
    fontSize: 28,
    fontWeight: "900",
    marginLeft: -2,
    color: "#333",
  },
label3: {
    fontSize: 18,
    fontWeight: "500",
    color: "#383838ff",
    alignSelf:'center'
  },

   btn2: {
    flexDirection: "row",
    backgroundColor: "#f3ef1aff",
    borderRadius: 30,
    marginTop: 0,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: 50,
    width: 140,
    alignItems:'center'
  },
  btn3: {
    flexDirection: "row",
    backgroundColor: "#1feec1ff",
    borderRadius: 30,
    marginTop: 0,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: 50,
    width: 130,
    alignItems:'center'
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "600",
  },
   btnText1: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "600",
  },
  
cashBox:{
  position:"absolute",
  bottom:10,   // 🔥 support button এর উপরে বসবে
  left:10,
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#ffffff",
  padding:10,
  borderRadius:15,
  width:190,
  elevation:10,
  shadowColor:"#000",
},

cashIcon:{
  width:40,
  height:40,
  borderRadius:10,
  marginRight:10
},

cashTitle:{
  fontWeight:"bold",
  fontSize:14
},

cashSub:{
  color:"#16a34a",
  fontSize:12
},

progress:{
  position:"absolute",
  bottom:0,
  left:0,
  height:4,
  backgroundColor:"#22c55e",
  borderBottomLeftRadius:10,
  borderBottomRightRadius:10
},
paymentBox:{
backgroundColor:"#fff",
marginTop:10,
borderRadius:15,
padding:15,
marginHorizontal: 20,
 shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
},

paymentTitle:{
fontSize:16,
fontWeight:"bold",
marginBottom:10,
alignSelf: 'center',
marginTop: -8
},

methodRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

methodBtn:{
flex:1,
backgroundColor:"#9ca57cff",
padding:7,
borderRadius:12,
marginHorizontal:5,
alignItems:"center"
},

methodActive:{
backgroundColor:"#2bdbc4ff"
},

numberInput:{
borderWidth:2,
borderColor:"#a09d9dff",
borderRadius:8,
padding:9,
fontSize:16
},
saveBtn:{ backgroundColor:"#28a745", padding:10, borderRadius:12, alignItems:"center", marginTop: 9, width: "50%", alignSelf: 'center'  },
editBtn:{ 
  backgroundColor:"#066b24ff", 
  padding:5, 
  borderRadius:12, 
  alignItems:"center",
  width: 50,
 },
savedBox:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:8, backgroundColor:"#f8eaeaff", borderRadius:10 },
savedText:{ fontSize:16, fontWeight:"600" },
methodTitle:{
  fontSize:14,
  fontWeight:"bold",
  marginTop:10
},
card: {
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 15,
    marginTop: 15,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  headerText: {
    color: "#cbd5e1",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    alignItems: "center",
    width: "24%",
  },

  activeIconBox: {
    borderWidth: 2,
    borderColor: "#10b981",
    borderRadius: 10,
    padding: 4,
    marginBottom: 4,
  },

  value: {
    color: "#7c839a",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
  },

  label: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "600",
  },
card: {
    margin: 15,
    padding: 16,
    borderRadius: 18,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#2e3b4e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  subTitle: {
    color: "#9ca3af",
    fontSize: 12,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  percent: {
    color: "#facc15",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "right",
  },

  complete: {
    color: "#9ca3af",
    fontSize: 12,
    textAlign: "right",
  },

  progressBg: {
    height: 6,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: 6,
    backgroundColor: "#facc15",
    borderRadius: 10,
  },

  stepsRow: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginTop: 16,
  },

  activeStep: {
    backgroundColor: "#2e3b4e",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    width: 80,
  },

  activeText: {
    color: "#facc15",
    fontSize: 12,
    marginTop: 5,
  },

  step: {
    backgroundColor: "#2e3b4e",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    width: 80,
  },

  stepText: {
    color: "#facc15",
    fontSize: 12,
    marginTop: 5,
  },
});