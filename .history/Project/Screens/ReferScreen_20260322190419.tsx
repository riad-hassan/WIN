import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ref from "./assets/ref.png";



const bottomMenuItems = [
  { id: "9", name: "DIREXT REFERRALS", icon: "group-add", color: "#ce5050ff", text:"00"},
  { id: "10", name: "TOTAL EARNINGS", icon: "account-balance-wallet", color: "#2980b9", text:"$0.00" },
];

const icon = [
  { id: "1", name: "DIREXT REFERRALS", icon: "facebook", color: "#3c28f5ff", text:"00"},
  { id: "2", name: "TOTAL EARNINGS", icon: "local-phone", color: "#2980b9", text:"$0.00" },
  { id: "3", name: "DIREXT REFERRALS", icon: "telegram", color: "#54bafdff", text:"00"},
  { id: "4", name: "TOTAL EARNINGS", icon: "snapchat", color: "#437fffff", text:"$0.00" },
];

export default function ReferScreen () {
    return(
        <ScrollView> 
        <View>
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
                <TextInput style={styles.input}  placeholder="Example:- 017........" keyboardType="numeric" />
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
        </View>
        </ScrollView>
    )
}


const styles= StyleSheet.create({
bottomContainer: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 25,
},
bottomContainer2: {
  flexDirection: "row",
  justifyContent: "space-around",
},
bottomCard: {
  width: 170,
  height: 130,
  backgroundColor: "#08c227dc",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
},
bottomCard2: {
  width: 70,
  height: 45,
  backgroundColor: "#ffffffff",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
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
    height:193,
    width: "94%",
    backgroundColor: "#ffffffff",
    marginTop: 20,
    alignSelf: 'center',
     borderRadius: 12,
},
container2:{
    height:200,
    width: "98%",
    backgroundColor: "#ffffffff",
    marginTop: 30,
    alignSelf: 'center',
     borderRadius: 12,
     
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
marginTop:5,
fontStyle:'italic'
},
ref: {
   height: 120,
   width: 360,
   marginTop:5,
   overflow:'hidden'
},

})