import MaterialIcons from "@react-native-vector-icons/material-icons";
import { ActivityIndicator, Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import pay from '../Screens/assets/pay.png';
import suport from '../Screens/assets/suport.png';
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";



const methods = [
  { name: "Bkash", icon: require("../Screens/assets/bkash.png") },
  { name: "Nagad", icon: require("../Screens/assets/nogod.png") },
  { name: "Rocket", icon: require("../Screens/assets/rocket.png") },
];

const names = [
"Rahim332","KKarim43","Hasan5g","Sakiber4","Nayeemt54", "Molina32K", "Aktar354", "Jenijd", "gShofiq", "Soh...", "Barsha", "Abir", "Tahsin", "mehrab", "Rohan", "Naomi", "Maaryam", "mahin", "jahid", "	MAHDI", "Ridwan", "Shah", "Hridi", "Sanjana", "Saeed", "Protik",
"Arif346","Jamal856","Sabbir573","Imran776","Rony734", "Kam...", "Era...","Samha", "Ruhani", "Muhu", "Asif", "Saliha", "Bushra", "Parban" ,"Omar", "Dina", "Amatullah", "Labiba", "Labib", "Rihaa", "Tasfin", "Rehanul", "nafis", "zawad", "Emu", "eblehe", "Nishat", "Shuvadip", "Faysal", "Arpi", "Mun", "Joy", 
]

const amounts = [50000,28000,32000,25500,75000,72000,100000, 27000, 25000, 28000, 34000, 48500, 57000, 47000, 88000, 34000, 48500, 77000, 75000,72500,100000, 25000, 25000, 50000,28000,52000,25500,75000, 25000, 58450, 90000, 45000, 25000, 45000, 70000, 71000, 54000, 25000, 26000, 29000, 54000, 25000, 26000, 29000,54000, 25000, 26000, 29000, ]


const gateways = [ 
    { id: "1", name: "bKash", image: require("../Screens/assets/bkash.png"),number: "qqqqqqqq", },  
    { id: "2", name: "Nagad", image: require("../Screens/assets/nogod.png"), number: "eeeeee", }, 
    { id: "3", name: "Rocket", image: require("../Screens/assets/rocket.png"), number: "00000000",  }, 
    { id: "4", name: "Upay", image: require("../Screens/assets/upay.png"), number: "111111111",  },
];


 



export default function DepositScreen () {
const navigation = useNavigation();
const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;


  // j ta select korbo oita asbe number
  const [selectedGateway, setSelectedGateway] = useState(gateways[0]);


const handleSelectGateway = async (item) => {
  setSelectedGateway(item);


  const userId = await AsyncStorage.getItem("user_id");

  const { data, error } = await supabase
    .from("deposits")
    .insert([
      {
        id: Date.now(),
        method: item.name,
        gateway_number: item.number,
        amount: enteredAmount,
        user_id: Number(userId)
      },
    ])
    .select(); // ✅ এটা লাগবে

  if (error) {
    console.log("DepositScreen insert error:", error.message);
    Alert.alert("Error", "Deposit create failed");
    return;
  }

  const depositId = data[0].id;

  if (item.name === "bKash") navigation.navigate("bkash", { depositId });
  else if (item.name === "Nagad") navigation.navigate("Nagad", { depositId });
  else if (item.name === "Rocket") navigation.navigate("Rocket", { depositId });
  else if (item.name === "Upay") navigation.navigate("Upay", { depositId });
};



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








    return(
      <KeyboardAwareScrollView
              enableOnAndroid={true}
              extraScrollHeight={20}
              keyboardShouldPersistTaps="handled"
              
>
  
           <View style={styles.container}>
            <TouchableOpacity >
              <MaterialIcons name="account-balance" size={90} color={"#066b24ff"} />
              <Text >  Add Money</Text>
            </TouchableOpacity>
            </View>

            <View>
                <Text style={{alignSelf:"center"}} >(Official Gateway)</Text>
            </View>
            <Text>    </Text>
            <Text>   SELECT METHOD : </Text>
            <View style={styles.gatewayContainer}>
            {gateways.map((item) => (
              <TouchableOpacity
                key={item.id} 
                style={[
                  styles.gatewayBox,
                  selectedGateway.id === item.id && styles.selectedBox
                       ]}
                  onPress={() => handleSelectGateway(item)}
              >
                <Image source={item.image} style={styles.gatewayImage} />
                <Text style={styles.gatewayLabel}>{item.name}</Text>
                <Text> ৳500.00 - ৳ 50,000.00</Text>
                <Text style={styles.instant}> ⚡ Instant</Text>
              </TouchableOpacity>
            ))}
          </View>




            <View style={styles.payImageContainer}>
                       <Image source={pay}
                       style={styles.payImage1} />
                       <Image source={suport}
                       style={styles.payImage2} />
                       
                    </View> 
            
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
        </KeyboardAwareScrollView>  
        
        
    )
}






const styles = StyleSheet.create ({
  container: {
  width: 120,
  height: 120,
  backgroundColor: "#f1f1f1",
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  marginTop: 20,
  marginBottom: 20,
},
 gatewayContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',             // ছোট ফোনে wrap
  justifyContent: 'space-between',
  marginVertical: 15,
  paddingHorizontal: 10,
},

gatewayBox: {
  flexBasis: '48%',
  backgroundColor: "rgba(238, 229, 229, 0.66)",
  borderWidth: 2,
  borderColor: "rgba(41, 116, 23, 0.3)",
  borderRadius: 10,
  paddingVertical: 15,          // 🔹 উঁচু না হতে দিতে vertical padding
  alignItems: "center",
  marginBottom: 10,
  minHeight: 120,               // 🔹 minimum height
},
  selectedBox: { borderColor: "#e30613", backgroundColor: "#ffdadaff" },
 gatewayImage: {
  width: 70,
  height: 45,
  resizeMode: "contain",
  marginBottom: 5
},
 gatewayLabel: {
  fontWeight: "500",
  fontSize: 16,
  color: "#000",
  textAlign: "center"
},
 label: { fontSize: 14, color: "#000", marginTop: 10 },
 input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
    width: '96%',
    alignSelf: 'center'
  },
submitBtn: {
    backgroundColor: "#066b24ff",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    width: '70%',
    alignSelf: 'center'
  },
instant: {
  marginTop: 5,
  backgroundColor: "#89f0a441",
  borderRadius: 20,
  paddingHorizontal: 8,
  paddingVertical: 3,
  fontSize: 12,
  color: "#45574a",
  textAlign: "center"
},

  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
payImageContainer: {
    marginTop: 25,
    padding: 1,          // 🔹 ভিতরে কিছু স্পেস
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 2,
  elevation: 3,
  alignItems: "center",
  borderRadius: 10,
},
payImage1: {
   height: 186,
   width: '98%',
},
payImage2: {
   height: 500,
   width: '98%',
},
numberBox: {
    width: '96%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    alignSelf: 'center'
  },
  numberText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  copyText: { color: "#e30613", fontWeight: "bold" },

cashBox:{
  position:"absolute",
  bottom:65,   // 🔥 support button এর উপরে বসবে
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

})