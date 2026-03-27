
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



const bottomMenuItems = [
  { id: "1", name: "Wallet", icon: "account-balance-wallet", color: "#ce5050ff" },
  { id: "2", name: "History", icon: "history", color: "#2980b9" },
  { id: "3", name: "Referral", icon: "groups-3", color: "#795548" },
];

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 3;

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


export default function ProfileScreen() {
 
const [savedNumber, setSavedNumber] = useState(""); // সেভ করা নাম্বার
  const [isEditing, setIsEditing] = useState(false); // এডিট মোড
const [savedMethod, setSavedMethod] = useState(""); // সেভ করা মেথড

const navigation = useNavigation();
// cash out toost er jonno
const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;

const [status, setStatus] = useState("Non Verified");
const [kycName, setKycName] = useState("");
const [kycNumber, setKycNumber] = useState("");


const { balance } = useContext(DepositContext);
const [selectedImage, setSelectedImage] = useState(null);
const [showImagePicker, setShowImagePicker] = useState(false);

useEffect(() => {
  const loadImage = async () => {
    const img = await AsyncStorage.getItem("@profile_image");
    if (img) {
      setSelectedImage(img);
    }
  };
  loadImage();
}, []);

const saveImage = async (img) => {
  await AsyncStorage.setItem("@profile_image", img);
  setSelectedImage(img);
  setShowImagePicker(false);
};



useEffect(() => {
  const loadKycStatus = async () => {
    const savedStatus = await AsyncStorage.getItem("@kyc_status");
    const savedName = await AsyncStorage.getItem("@kyc_name");
    const savedNumber = await AsyncStorage.getItem("@kyc_number");

    if (savedStatus) setStatus(savedStatus);
    if (savedName) setKycName(savedName);
    if (savedNumber) setKycNumber(savedNumber);
  };

  loadKycStatus();
}, []);




const handleSave = () => {
  if (
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    mobile.trim() === "" ||
    city.trim() === "" ||
    postal.trim() === "" ||
    address.trim() === ""
  ) {
    setStatus("Non Verified");
    return Alert.alert("Error", "সব required field পূরণ করো!");
  }

  setStatus("Verified");
  Alert.alert("Success", "Verification Complete ✅");
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






  return (
    <LinearGradient colors={["#e0f7fa", "#f3e5f5"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* প্রোফাইল কার্ড */}
        <View style={styles.profileCard}>

  {/* LEFT IMAGE */}
  <View style={styles.avatarBox}>
    <Image
      source={
        selectedImage
          ? { uri: selectedImage }
          : { uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }
      }
      style={styles.avatar}
    />

    <TouchableOpacity
      style={styles.editAvatarBtn}
      onPress={() => setShowImagePicker(true)}
    >
      <Text style={{ color: "#fff", fontSize: 12 }}>✏️</Text>
    </TouchableOpacity>
  </View>

  

  {/* RIGHT INFO */}
  <View style={styles.profileInfo}>

      <Text
      style={[
        styles.verifyText,
        { color: status === "Verified" ? "#00ff88" : "#ff4444" }
      ]}
    >
      {status}
      </Text>

    <View style={styles.infoRow}>
      <Text style={styles.infoValue} numberOfLines={1}>
  Name:{kycName ? kycName : "Not Set"}
</Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>UID:</Text>
      <Text style={styles.infoValue} numberOfLines={1}>123456</Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoValue} numberOfLines={1}>
  {kycNumber ? kycNumber : "Not Set"}
</Text>
    </View>

  </View>

</View>

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
              
            <Text style={styles.label3}>↓ Deposit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={styles.btn3}
            onPress={() => navigation.navigate("Cashout")}
            >
            <Text style={styles.label3}> ↗ Withdraw</Text>
            </TouchableOpacity>
          </View>
          

        </View>


        <View style={styles.bottomContainer}>
          {bottomMenuItems.map((item) => (
            <TouchableOpacity 
               key={item.id} 
               style={styles.bottomCard}
               onPress={() => {
                if (item.name === "Wallet") navigation.navigate("Wallet");
                else if (item.name === "History") navigation.navigate("DepoList");
                else if (item.name === "Referral") navigation.navigate("Reffer Income");
               }}
               >
              <MaterialIcons name={item.icon} size={40} color="#ffffffff" />
              <Text style={styles.bottomLabel}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
        style={styles.btn1}
        onPress={() => navigation.navigate("Wallet")}
        >
          <MaterialIcons name="account-balance-wallet" size={20} color="#e7d212ff" />
          <Text style={styles.btnText1}>  My Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.btn1} 
        onPress={() => navigation.navigate("notifi")}
        >
          <MaterialIcons name="notifications-none" size={20} color="#01fff2ff" />
          <Text style={styles.btnText1}>  Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.btn1} 
        onPress={() => navigation.navigate("HOT GAMES")}
        >
          <MaterialIcons name="whatshot" size={20} color="#fa4322ff" />
          <Text style={styles.btnText1}>  Hot Games</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.btn1} 
        onPress={() => navigation.navigate("Slot")}
        >
          <MaterialIcons name="casino" size={20} color="#9116f5ff" />
          <Text style={styles.btnText1}>  Slots</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.btn1} 
        onPress={() => navigation.navigate("KYC")}
        >
          <MaterialIcons name="shield" size={20} color="#21d69aff" />
          <Text style={styles.btnText1}>  KYC Verification</Text>
        </TouchableOpacity>


        <TouchableOpacity 
        style={styles.btn1} 
        onPress={() => navigation.navigate("Reffer Income")}
        >
          <MaterialIcons name="groups-3" size={20} color="#21d69aff" />
          <Text style={styles.btnText1}>  Reffer & Earn</Text>
        </TouchableOpacity>



        <TouchableOpacity 
        style={styles.btn1} 
        onPress={() => navigation.navigate("Blog")}
        >
          <MaterialIcons name="menu-book" size={20} color="#81f73dff" />
          <Text style={styles.btnText1}> Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.btn1} 
        onPress={() => navigation.navigate("Help")}
        >
          <MaterialIcons name="help-outline" size={20} color="#2ad8f7ff" />
          <Text style={styles.btnText1}>  Help Center</Text>
        </TouchableOpacity>



        {/* বাটন */}
        <TouchableOpacity style={styles.btn} >
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.btnText}>Log Out</Text>
        </TouchableOpacity>
        <Text> </Text>
        <Text> </Text>
      </ScrollView>
      {showImagePicker && (
  <View style={{
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 10
  }}>

    <Text style={{ fontWeight: "bold", marginBottom: 10, alignSelf:'center' }}>
      Select Profile Image
    </Text>

    <ScrollView horizontal>
      {profile.map((img, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => saveImage(Image.resolveAssetSource(img).uri)}
        >
          <Image
            source={img}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              margin: 5
            }}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Random Button */}
    <TouchableOpacity
      onPress={() => {
        const random = profile[Math.floor(Math.random() * profile.length)];
        saveImage(Image.resolveAssetSource(random).uri);
      }}
      style={{
        backgroundColor: "#066b24ff",
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: "center"
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>
        Random Select 🎲
      </Text>
    </TouchableOpacity>

    {/* Close */}
    <TouchableOpacity
      onPress={() => setShowImagePicker(false)}
      style={{ marginTop: 10, alignItems: "center" }}
    >
      <Text style={{ color: "red" }}>Close</Text>
    </TouchableOpacity>

  </View>
)}

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
  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
 profileCard: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
  paddingVertical: 18,
  backgroundColor: "#fff",
  borderRadius: 20,
  marginHorizontal: 15,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 5,
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
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
  gap: 10
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
  fontWeight: "700",
  color: "#111",
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
 btn1: {
    flexDirection: "row",
    backgroundColor: "#066b24ff",
    borderRadius: 20,
    marginTop: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: 50,
    width: "95%",

    alignItems:'center',
    paddingHorizontal:15
  },

   btn2: {
  flex: 1,
  backgroundColor: "#f3ef1aff",
  borderRadius: 30,
  height: 48,
  justifyContent: "center",
  alignItems: "center",
},

btn3: {
  flex: 1,
  backgroundColor: "#1feec1ff",
  borderRadius: 30,
  height: 48,
  justifyContent: "center",
  alignItems: "center",
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


bottomContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 15,
  paddingHorizontal: 10,
  
},
bottomCard: {
  width: cardWidth,
  height: 90,
  backgroundColor: "#066b24ff",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,

},
bottomLabel: {
  color: "#fff",
  fontSize: 11,
  marginTop: 5,
  fontWeight: "bold",
},
avatarBox: {
  width: 95,
  height: 95,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
},

avatar: {
  width: 85,
  height: 85,
  borderRadius: 50,
  borderWidth: 3,
  borderColor: "#066b24ff",
},

editAvatarBtn: {
  position: "absolute",
  bottom: -2,
  right: -2,
  backgroundColor: "#000",
  padding: 6,
  borderRadius: 20,
},

profileInfo: {
  flex: 1,
  marginLeft: 12,
  paddingRight: 10,
},

infoRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 6,
},

infoLabel: {
  width: 70,
  fontWeight: "bold",
  color: "#333",
  fontSize: 14,
},

infoValue: {
  flex: 1,
  color: "#555",
  fontWeight: "600",
  fontSize: 14,
},
profileRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
},

verifyBox: {
  flex: 1,
  alignItems: "flex-end",
},

verifyText: {
  fontSize: 16,
  fontWeight: "700",
},


});