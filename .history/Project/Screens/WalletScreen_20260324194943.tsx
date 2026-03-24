
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { DepositContext } from "./context/DepositContext"; // path ঠিক রাখবা



const names = [
"Rahim332","KKarim43","Hasan5g","Sakiber4","Nayeemt54", "Molina32K", "Aktar354", "Jenijd", "gShofiq", "Soh...", "Barsha", "Abir", "Tahsin", "mehrab", "Rohan", "Naomi", "Maaryam", "mahin", "jahid", "	MAHDI", "Ridwan", "Shah", "Hridi", "Sanjana", "Saeed", "Protik",
"Arif346","Jamal856","Sabbir573","Imran776","Rony734", "Kam...", "Era...","Samha", "Ruhani", "Muhu", "Asif", "Saliha", "Bushra", "Parban" ,"Omar", "Dina", "Amatullah", "Labiba", "Labib", "Rihaa", "Tasfin", "Rehanul", "nafis", "zawad", "Emu", "eblehe", "Nishat", "Shuvadip", "Faysal", "Arpi", "Mun", "Joy", 
]

const amounts = [5000,28000,12000,20500,75000,7200,11000, 20000, 24000, 18000, 34000, 48500, 17000, 47000,18000, 34000, 48500, 17000,75000,7200,11000, 20000, 24000,5000,28000,12000,20500,75000, 24500, 8450, 9000, 14500, 24000, 45000, 7000, 71000, 54000, 25000,  ]
const methods = [
  { name: "Bkash", icon: require("../Screens/assets/bkash.png") },
  { name: "Nagad", icon: require("../Screens/assets/nogod.png") },
  { name: "Rocket", icon: require("../Screens/assets/rocket.png") },
];


export default function WalletScreen() {
 
const [method,setMethod] = useState("bkash")
const [numbers, setNumbers] = useState({
  bkash: "",
  nagad: "",
  rocket: ""
});
const [savedNumber, setSavedNumber] = useState(""); // সেভ করা নাম্বার
  const [isEditing, setIsEditing] = useState(false); // এডিট মোড
const [savedMethod, setSavedMethod] = useState(""); // সেভ করা মেথড

const navigation = useNavigation();
// cash out toost er jonno
const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;


const { balance } = useContext(DepositContext);
const [selectedImage, setSelectedImage] = useState(null);
const [showImagePicker, setShowImagePicker] = useState(false);





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


// numvber 3 tar jonno
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
  const handleSave = async () => {
  if (number.trim() === "") {
    alert("Please enter a valid number!");
    return;
  }

  if (!/^\d{11}$/.test(number)) {
    alert("Payment number must be 11 digits!");
    return;
  }

  try {
    const updatedNumbers = {
      ...numbers,
      [method]: number
    };

    await AsyncStorage.setItem("@payment_numbers", JSON.stringify(updatedNumbers));

    setNumbers(updatedNumbers);
    setIsEditing(false);

    alert("Saved successfully!");
  } catch (e) {
    console.log(e);
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

    {/* Payment Section */}
            <View style={styles.paymentBox}>
              <Text style={styles.paymentTitle}> Add Payment Number</Text>
    
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
marginTop:15,
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


});