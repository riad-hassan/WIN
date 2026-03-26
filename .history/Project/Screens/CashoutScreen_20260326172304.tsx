import MaterialIcons from "@react-native-vector-icons/material-icons";
import { ActivityIndicator, Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import pay from '../Screens/assets/pay.png';
import suport from '../Screens/assets/suport.png';
import React, { useEffect, useRef, useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { DepositContext } from "../Screens/context/DepositContext";


const methods = [
  { name: "Bkash", icon: require("../Screens/assets/bkash.png") },
  { name: "Nagad", icon: require("../Screens/assets/nogod.png") },
  { name: "Rocket", icon: require("../Screens/assets/rocket.png") },
];

const names = [
"Rahim332","KKarim43","Hasan5g","Sakiber4","Nayeemt54", "Molina32K", "Aktar354", "Jenijd", "gShofiq", "Soh...", "Barsha", "Abir", "Tahsin", "mehrab", "Rohan", "Naomi", "Maaryam", "mahin", "jahid", "	MAHDI", "Ridwan", "Shah", "Hridi", "Sanjana", "Saeed", "Protik",
"Arif346","Jamal856","Sabbir573","Imran776","Rony734", "Kam...", "Era...","Samha", "Ruhani", "Muhu", "Asif", "Saliha", "Bushra", "Parban" ,"Omar", "Dina", "Amatullah", "Labiba", "Labib", "Rihaa", "Tasfin", "Rehanul", "nafis", "zawad", "Emu", "eblehe", "Nishat", "Shuvadip", "Faysal", "Arpi", "Mun", "Joy", 
]

const amounts = [5000,28000,12000,20500,75000,7200,11000, 20000, 24000, 18000, 34000, 48500, 17000, 47000,18000, 34000, 48500, 17000,75000,7200,11000, 20000, 24000,5000,28000,12000,20500,75000, 24500, 8450, 9000, 14500, 24000, 45000, 7000, 71000, 54000, 25000,  ]


const gateways = [ 
    { id: "1", name: "bKash", image: require("../Screens/assets/bkash.png"),number: "qqqqqqqq", },  
    { id: "2", name: "Nagad", image: require("../Screens/assets/nogod.png"), number: "eeeeee", }, 
    { id: "3", name: "Rocket", image: require("../Screens/assets/rocket.png"), number: "00000000",  }, 
    { id: "4", name: "Upay", image: require("../Screens/assets/upay.png"), number: "111111111",  },
];


 



export default function CashoutScreen () {
const navigation = useNavigation();
const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;
 const [hidden, setHidden] = useState(true);
 const { balance } = useContext(DepositContext);


  // j ta select korbo oita asbe number
  const [selectedGateway, setSelectedGateway] = useState(gateways[0]);
const handleSelectGateway = (item) => {
  setSelectedGateway(item);

  // 🔥 method অনুযায়ী আলাদা screen open
  if (item.name === "bKash") {
    navigation.navigate("bkash", { data: item });
  } 
  else if (item.name === "Nagad") {
    navigation.navigate("Nagad", { data: item });
  } 
  else if (item.name === "Rocket") {
    navigation.navigate("Rocket", { data: item });
  } 
  else if (item.name === "Upay") {
    navigation.navigate("Upay", { data: item });
  }
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
           <Text> </Text>
           <LinearGradient
      colors={["#ffb300", "#ff7b00", "#ff5400"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
    
      {/* wave overlay */}
      <View style={styles.wave1} />
      <View style={styles.wave2} />

      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="account-balance-wallet" size={18} color="#fff" />
          <Text style={styles.title}> Available balance</Text>
        </View>

        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          <MaterialIcons
            name={hidden ? "visibility-off" : "visibility"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      

      {/* Balance */}
      <View style={styles.bottomRow}>
        <Text style={styles.balanceText}>
          {hidden ? "****  ****" : `৳ ${balance.toLocaleString()}`}
        </Text>
      </View>
    </LinearGradient>



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
                <Text> ৳1000.00 - ৳ 50,000.00</Text>
                <Text style={styles.instant}> ⏳ Instant</Text>
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
    height: 100,
    width: 110,
    backgroundColor: "#f1f1f1ff",  // "#f1f1f1ff" matching color 
    alignSelf: 'center',
    margin: 20,
    padding: 13,
    marginBottom: 30,
   },
   gatewayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    gap: 10
  },
  gatewayBox: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
      flex: 1,                     // 🔥 IMPORTANT
  minWidth: "42%",             // 🔥 2 column layout
  
  height: undefined,           // ❌ fixed height বাদ
  aspectRatio: 1,  
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "rgba(238, 229, 229, 0.66)",
borderColor: "rgba(41, 116, 23, 0.3)",
  },
  selectedBox: { borderColor: "#e30613", backgroundColor: "#ffdadaff" },
  gatewayImage: { width: 70, height: 45, resizeMode: "contain", borderRadius:12,},
  gatewayLabel: { marginTop: 5, fontWeight: "500", color: "#000000ff", fontSize: 19 },
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
    backgroundColor: "#7777777a",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    width: '60%',
    alignSelf: 'center',
    color: "#ffee00ff"
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

card: {
    height: 160,
    borderRadius: 18,
    padding: 16,
    overflow: "hidden",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },

  wave1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.08)",
    top: -120,
    right: -100,
  },

  wave2: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -80,
    right: -40,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  refreshBtn: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  balanceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },

})