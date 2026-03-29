import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ref from "./assets/ref.png";
import LinearGradient from "react-native-linear-gradient";
import { supabase } from "./supabase";



const bottomMenuItems = [
  { id: "9", name: "DIREXT REFERRALS", icon: "group-add", color: "#ce5050ff", text:"00"},
  { id: "10", name: "TOTAL EARNINGS", icon: "account-balance-wallet", color: "#2980b9", text:"$0.00" },
];

const icon = [
  { id: "1", name: "DIREXT REFERRALS", icon: "facebook", color: "#002fffff", text:"00"},
  { id: "2", name: "TOTAL EARNINGS", icon: "local-phone", color: "#27ff93ff", text:"$0.00" },
  { id: "3", name: "DIREXT REFERRALS", icon: "telegram", color: "#0004ffff", text:"00"},
  { id: "4", name: "TOTAL EARNINGS", icon: "snapchat", color: "#c8ff00ff", text:"$0.00" },
];



export default function ReferScreen () {

  const [links, setLinks] = useState({ whatsapp: "", telegram: "" });
  const [loading, setLoading] = useState(true);

  const copyToClipboard = (text) => {
    if (!text) return;
    Clipboard.setString(text);
    ToastAndroid.show("✅ কপি করা হয়েছে", ToastAndroid.SHORT);
  };

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .in("key", ["referral_whatsapp", "referral_telegram"]);

    if (error) return alert("Error fetching links: " + error.message);

    let newLinks = { whatsapp: "", telegram: "" };
    data.forEach((item) => {
      if (item.key === "referral_whatsapp") newLinks.whatsapp = item.value;
      if (item.key === "referral_telegram") newLinks.telegram = item.value;
    });
    setLinks(newLinks);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  
    return(
      
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 100 }}> 
        <LinearGradient colors={["#e0f7fa", "#f3e5f5"]}>
          <View style={styles.leaderboardContainer2}>
              <Text style={styles.leaderboardTitle}>
          INVITE & EARN
          </Text>
              <Image source={ref} style={styles.ref} />
            </View>
            <View style={styles.bottomContainer}>
              {bottomMenuItems.map((item) => (
                <TouchableOpacity
                   key={item.id} 
                   style={styles.bottomCard}
                   >
                  <MaterialIcons name={item.icon} size={40} color="#fff" />
                  <Text style={styles.bottomLabe2}>{item.text}</Text>
                  <Text style={styles.bottomLabel}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.container1}>
                <Text style={styles.text1}>📢 Invite & Earn</Text>
                <Text>   Share your link with friends. You will receive 25.00% </Text>
                <Text>         commission on every activity they perform. </Text>
                <TextInput style={styles.input}  placeholder="Example:- 017........" />
            <View style={styles.bottomContainer2}>
              {icon.map((icon) => (
                <TouchableOpacity
                   key={icon.id} 
                   style={styles.bottomCard2}
                   >
                    <MaterialIcons name={icon.icon}  size={40} color={icon.color} />
                    
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.container2}>
                <Text style={styles.text1}>📋 Referral Network</Text>
                <MaterialIcons name="person-off"  size={50} color={icon.color} style={styles.icon} />
                <Text>                        Noreferrals yet. Start inviting!</Text>
            </View>
            </View>
            <Text></Text>
            
        </LinearGradient>
        </ScrollView>
        </KeyboardAvoidingView>
        
    )
}


const styles= StyleSheet.create({
bottomContainer: {
  flexDirection: "row",
  justifyContent: "space-between", // cards সমান দূরত্বে
  marginTop: 25,
  width: "95%",                   // container width বড় রাখলে দুই card ফিট হবে
  alignSelf: "center",
},
bottomContainer2: {
  flexDirection: "row",
  justifyContent: "space-between",  // 🔹 icons equally spaced
  marginTop: 15,
  width: "90%",
  alignSelf: "center",
  flexWrap: "wrap",                 // 🔹 responsive wrap
},
bottomCard2: {
  width: 70,
  height: 45,
  backgroundColor: "#22b1dddc",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  margin: 5,                        // 🔹 spacing
},
bottomCard: {
  flex: 1,               // 🔹 flexible width
  maxWidth: 170,         // 🔹 বড় ফোনে card বড় হবে কিন্তু সীমিত
  height: 130,
  backgroundColor: "#22b1dddc",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 5,   // 🔹 spacing
},

gameImage:{
    width:60,
    height: 60,
},
bottomLabel: {
  color: "#ffffffff",
  fontSize: 14,
  marginTop: 5,
  fontWeight: "700",
},
bottomLabe2: {
  color: "#fff",
  fontSize: 18,
  marginTop: 5,
  fontWeight: "700",
},
container1:{
    width: "94%",
    backgroundColor: "#ffffffff",
    marginTop: 20,
    alignSelf: 'center',
     borderRadius: 12,
},
container2:{
    width: "98%",
    backgroundColor: "#ffffffff",
    marginTop: 30,
    alignSelf: 'center',
     borderRadius: 12,
     marginBottom: 10
},
text1: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: 'center',
    marginTop: 5,
},
input: {
    borderWidth: 1,
    borderColor: "#949292ff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
    width: '96%',
    alignSelf: 'center'
  },
  payImageContainer: {
    marginTop: 15,
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
   height: 375,
   width: '98%',
},
icon: {
    alignSelf: 'center',
    marginTop: 30
},
leaderboardContainer2:{
marginTop:10,
width:"95%",
alignSelf:"center",
backgroundColor:"#1a1a1a",
borderRadius:18,
padding:2,
overflow:'hidden'
},
leaderboardTitle:{
color:"#ffd700",
fontSize:16,
fontWeight:"bold",
textAlign:"center",
marginBottom:1,
marginTop:2,
fontStyle:'italic'
},
ref: {
   height: 120,
   width: "100%",       // 🔹 full width of container
   marginTop:5,
   overflow:'hidden',
   borderRadius:8
},

})