
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



export default function ProfileScreen() {
 
const [method,setMethod] = useState("bkash")
const [number,setNumber] = useState("")
const [savedNumber, setSavedNumber] = useState(""); // সেভ করা নাম্বার
  const [isEditing, setIsEditing] = useState(false); // এডিট মোড
const [savedMethod, setSavedMethod] = useState(""); // সেভ করা মেথড


// cash out toost er jonno
const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;



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
        
        {/* প্রোফাইল কার্ড */}
        <View style={styles.profileCard}>
          <Image
              source={
              selectedImage
              ? { uri: selectedImage }
              : { uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }
                     }
                  style={styles.avatar}
                 />


                 <View style={{flex:1, marginLeft:15}}>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Name :</Text>
    <Text style={styles.infoValue}>Rahim</Text>
  </View>

  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>UID :</Text>
    <Text style={styles.infoValue}>123456</Text>
  </View>

  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Number :</Text>
    <Text style={styles.infoValue}> 017XXXXXXXX</Text>
  </View>
</View>


          <TouchableOpacity
              style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      backgroundColor: "#000",
                      padding: 6,
                      borderRadius: 20
                      }}
               onPress={() => setShowImagePicker(true)}
                >
             <Text style={{ color: "#fff" }}>✏️</Text>
           </TouchableOpacity>


        </View>

        {/* ইনফো সেকশন */}
        <View style={styles.infoBox}>
          <View style={styles.row1}>
            <Text style={styles.label1}>Balance</Text>
            <MaterialIcons name="account-balance-wallet" size={20} color="#2e302eff" />
          </View>

          <View style={styles.row2}>
            <Text style={styles.label2}>৳0.00</Text>
          </View>

          
          <View style={styles.row3}>
            <TouchableOpacity style={styles.btn2}>
            <Text style={styles.label3}>     ↓ Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn3}>
            <Text style={styles.label3}>   ↗ Withdraw</Text>
            </TouchableOpacity>
          </View>
          

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


        {/* বাটন */}
        <TouchableOpacity style={styles.btn} >
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.btnText}>লগআউট</Text>
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
    flexDirection:'row'
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#066b24ff",
    marginBottom: -14,
    marginTop: -14,
    marginLeft:14
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
    fontSize: 20,
    fontWeight: "500",
    color: "#383838ff",
    alignSelf:'center'
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
    width: 140,
    alignItems:'center'
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
marginTop:15,
borderRadius:10,
padding:15,
marginHorizontal: 20,
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
infoRow:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:6
},

infoLabel:{
  fontWeight:"bold",
  color:"#333",
  width:60,   // 🔥 label alignment same রাখবে
 
},

infoValue:{
  color:"#555",
  fontWeight:"500"
}

});