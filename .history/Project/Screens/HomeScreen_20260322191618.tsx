import MaterialIcons from "@react-native-vector-icons/material-icons";
import {  ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import pay from '../Screens/assets/pay.png';
import suport from '../Screens/assets/suport.png';
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Modal } from "react-native";
import { useState } from "react";
import { Linking } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import ref from "./assets/ref.png";




const images = [
  require("../Screens/assets/DP1.png"),
  require("../Screens/assets/DP2.png"),
  require("../Screens/assets/DP3.png"),
  require("../Screens/assets/DP4.png"),
  require("../Screens/assets/DP5.png"),
  require("../Screens/assets/DP6.png"),
];


const avatars = [
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


// casino name list
const generateTop10Players = () => {
const names = [
"Rahim332","Karim43","Hasan5g","Sakiber4","Nayeemt54", "Moli", "Aktar354", "Jenijd", "gShofiq", "Soh...", "Barsha", "Abir", "Tahsin", "mehrab", "Rohan", "Naomi", "Maaryam", "mahin", "jahid", "	MAHDI", "Ridwan", "Shah", "Hridi", "Sanjana", "Saeed", "Protik",
"Arif346","Jamal856","Sabbir573","Imran776","Rony734", "Kam...", "Era...","Samha", "Ruhani", "Muhu", "Asif", "Saliha", "Bushra", "Parban" ,"Omar", "Dina", "Amatullah", "Labiba", "Labib", "Rihaa", "Tasfin", "Rehanul", "nafis", "zawad", "Emu", "eblehe", "Nishat", "Shuvadip", "Faysal", "Arpi", "Mun", "Joy", 
]

let amount = 18000

 return Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name:
      "Mem***" +
      names[Math.floor(Math.random() * names.length)].slice(0, 3),
    win: Math.floor(200000 + Math.random() * 500000),
    avatar: avatars[Math.floor(Math.random() * avatars.length)]
  }))
  .sort((a, b) => b.win - a.win);
};


const topMenuItems = [
  { id: "1", name: "Deposit", icon: "account-balance-wallet", color: "#fa6b5bff" },
  { id: "2", name: "Deposit List", icon: "add-chart", color: "#27ae60" },
  { id: "3", name: "WithDraw", icon: "assured-workload", color: "#16a085" },
  { id: "4", name: "WithDraw List", icon: "add-chart", color: "#e67e22" },
  { id: "5", name: "My Account", icon: "person-outline", color: "#9b59b6" },
  { id: "6", name: "Privacy Policy", icon: "list-alt", color: "#2980b9" },
  { id: "7", name: "Refer&Earn", icon: "groups", color: "#eb387aff" },
];

const bottomMenuItems = [
  { id: "9", name: "HOT GAMES", icon: "sports-esports", color: "#ce5050ff" },
  { id: "10", name: "SPORTS", icon: "sports-soccer", color: "#2980b9" },
  { id: "11", name: "LOTTERY", icon: "local-play", color: "#795548" },
];

 const renderIcon = (item) => (
    <MaterialIcons name={item.icon} size={25} color={item.color} />
  );


  const games = [ 
    { id: "1", title: "AVIATOR GAME", image: require("../Screens/assets/aviator.png"), action: "screen", screen: "AVIATOR GAME" },  // popup er oikany screen dile oi screen open hby
    { id: "2", title: "ANDAR & BAHAR", image: require("../Screens/assets/andar bahar (1).png"), action: "popup" }, 
    { id: "3", title: "PLINKO GAME", image: require("../Screens/assets/pling.png"), action: "popup" }, 
    { id: "4", title: "CRAZY TIME", image: require("../Screens/assets/crazy_time.png"), action: "popup" }, 
    { id: "5", title: "DRAGON VS TIGER", image: require("../Screens/assets/lion vs tiger.png"), action: "popup" }, 
    { id: "6", title: "3 PATTI", image: require("../Screens/assets/3patti (1).png"), action: "popup" }, 
    { id: "7", title: "777", image: require("../Screens/assets/777 (1).png"), action: "popup" }, 
    { id: "8", title: "CRAZY-777", image: require("../Screens/assets/crazy-777 (1).png"), action: "popup" }, 
    { id: "9", title: "HELICOPTER", image: require("../Screens/assets/helicopter.png"), action: "popup" }, 
    { id: "10", title: "JILI", image: require("../Screens/assets/jili.png"), action: "popup" }, 
    { id: "11", title: "SuperAce", image: require("../Screens/assets/superace.png"), action: "popup" }, 
    { id: "12", title: "COIN TOSS", image: require("../Screens/assets/Coin-Toss.png"), action: "popup",},  // popup er oikany screen dile oi screen open hby
    { id: "13", title: "CK444", image: require("../Screens/assets/444.png"), action: "popup" }, 
    { id: "14", title: "BOXING KING", image: require("../Screens/assets/Boxing.png"), action: "popup" }, 
    { id: "15", title: "GOLDEN TREASURE", image: require("../Screens/assets/golden.png"), action: "popup" }, 
    { id: "16", title: "CHIKEN ROAD", image: require("../Screens/assets/chiken.png"), action: "popup" }, 
    { id: "17", title: "7UP 7DOWN", image: require("../Screens/assets/7-Up-7-Down.png"), action: "popup" }, 
    { id: "18", title: "CHICKY RUN", image: require("../Screens/assets/chicky-run.png"), action: "popup" }, 
    { id: "19", title: "POKER KINGDOM", image: require("../Screens/assets/Poker_Kingdom.png"), action: "popup" },
    { id: "20", title: "LUCKY FORTUNES", image: require("../Screens/assets/luckyf.png"), action: "popup", },  // popup er oikany screen dile oi screen open hby
    { id: "21", title: "GOLDEN TIME", image: require("../Screens/assets/golden.png"), action: "popup" }, 
    { id: "22", title: "POKER GAME", image: require("../Screens/assets/Poker_Kingdom.png"), action: "popup" }, 
    { id: "23", title: "PINK JOKER", image: require("../Screens/assets/pink.png"), action: "popup" }, 
    { id: "24", title: "LUDO BOARD", image: require("../Screens/assets/Ludo Board.png"), action: "popup" }, 
    { id: "25", title: "BG LIVE", image: require("../Screens/assets/BG.png"), action: "popup" }, 
    { id: "26", title: "EVO LIVE", image: require("../Screens/assets/EVO.png"), action: "popup" }, 
    { id: "27", title: "LUCKY SCORE", image: require("../Screens/assets/Lucky.png"), action: "popup" }, 
    { id: "28", title: "9-WICKET", image: require("../Screens/assets/9w.png"), action: "popup" }, 
    { id: "29", title: "JILI GOLD CARD", image: require("../Screens/assets/jili (1).png"), action: "popup" }, 
    { id: "30", title: "TEEN PATTI", image: require("../Screens/assets/teen.png"), action: "popup" }, 
    { id: "31", title: "SABA SPORTS", image: require("../Screens/assets/saba (1).png"), action: "popup",},
    { id: "32", title: "BOXING KING", image: require("../Screens/assets/Boxing.png"), action: "popup" }, 
    { id: "33", title: "GOLDEN TREASURE", image: require("../Screens/assets/golden.png"), action: "popup" }, 

  ];

const names = [
"Rahim332","KKarim43","Hasan5g","Sakiber4","Nayeemt54", "Molina32K", "Aktar354", "Jenijd", "gShofiq", "Soh...", "Barsha", "Abir", "Tahsin", "mehrab", "Rohan", "Naomi", "Maaryam", "mahin", "jahid", "	MAHDI", "Ridwan", "Shah", "Hridi", "Sanjana", "Saeed", "Protik",
"Arif346","Jamal856","Sabbir573","Imran776","Rony734", "Kam...", "Era...","Samha", "Ruhani", "Muhu", "Asif", "Saliha", "Bushra", "Parban" ,"Omar", "Dina", "Amatullah", "Labiba", "Labib", "Rihaa", "Tasfin", "Rehanul", "nafis", "zawad", "Emu", "eblehe", "Nishat", "Shuvadip", "Faysal", "Arpi", "Mun", "Joy", 
]

const amounts = [5000,28000,12000,20500,75000,7200,11000, 20000, 24000, 18000, 34000, 48500, 17000, 47000,18000, 34000, 48500, 17000,75000,7200,11000, 20000, 24000,5000,28000,12000,20500,75000, 24500, 8450, 9000, 14500, 24000, 45000, 7000, 71000, 54000, 25000,  ]

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen () {
const navigation = useNavigation();

const [topPlayers,setTopPlayers] = useState(generateTop10Players())

const [liveMulti,setLiveMulti] = useState(1.00)
const [supportOpen,setSupportOpen] = useState(false)



// slide bar ar cashout bar
const noticeAnim = useRef(new Animated.Value(screenWidth)).current
const cashAnim = useRef(new Animated.Value(-100)).current

const [helpVisible,setHelpVisible] = useState(false)
const [cashMsg,setCashMsg] = useState(null)
const [showCash,setShowCash] = useState(false)


const telegramLink = "https://t.me/yourchannel"
const whatsappLink = "https://wa.me/8801XXXXXXXXX"

const openLink = (link) =>{
Linking.openURL(link)
}

const copyLink = (link)=>{
Clipboard.setString(link)
Alert.alert("Copied", "Link copied successfully")
}



const [modalVisible, setModalVisible] = useState(false);  // pop up anar jonno use
const scaleAnim = useRef(new Animated.Value(0)).current;  // pop up anar jonno use
const displayMulti = Math.max(7, liveMulti + Math.random()*5)
const openPopup = () => {
  setModalVisible(true);

  Animated.spring(scaleAnim, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};

const closePopup = () => {
  Animated.timing(scaleAnim, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  }).start(() => {
    setModalVisible(false);
  });
};

const handleGamePress = (game) => {

  if (game.action === "popup") {
    openPopup();
  }

  if (game.action === "screen") {
    navigation.navigate(game.screen);
  }
};


// slide bar er jonno
useEffect(() => {

const startAnimation = () => {
  noticeAnim.setValue(screenWidth)
  Animated.timing(noticeAnim,{
    toValue:-screenWidth,
    duration:9000,
    useNativeDriver:true
  }).start(()=> startAnimation())
}

startAnimation()
},[])




// live blink er jonno ata 
const blinkAnim = useRef(new Animated.Value(1)).current;
useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(blinkAnim, {
        toValue: 0.3,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(blinkAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);



// 10 name list update er jonno 
useEffect(() => {
  const timer = setInterval(() => {
    setTopPlayers(generateTop10Players());
  }, 43200000); // ⏱️ 12 hours

  return () => clearInterval(timer);
}, []);



//auto massage popup
useEffect(()=>{

const timer = setInterval(()=>{

const name = names[Math.floor(Math.random()*names.length)]
const amount = amounts[Math.floor(Math.random()*amounts.length)]

setCashMsg(`${name} cashed out ${amount} Tk from AVIATOR`)
setShowCash(true)

// slide down
Animated.timing(cashAnim,{
toValue:60,
duration:500,
useNativeDriver:true
}).start()

setTimeout(()=>{

Animated.timing(cashAnim,{
toValue:-100,
duration:500,
useNativeDriver:true
}).start(()=>{
setShowCash(false)
})

},3000)

},6000)

return ()=>clearInterval(timer)

},[])



// lister name change
useEffect(()=>{
  const dayTimer = setInterval(()=>{
setTopPlayers(generatePlayers())

},86400000) // 24 hours
return ()=>clearInterval(dayTimer)

},[])
// auto scroll er jonno
const scrollRef = useRef(null)

useEffect(()=>{
let scrollPosition = 0
const scrollTimer = setInterval(()=>{
if(scrollRef.current){
scrollPosition += 60
scrollRef.current.scrollTo({
y:scrollPosition,
animated:true
})
if(scrollPosition > 1000){
scrollPosition = 0
}
}
},2000)
return ()=>clearInterval(scrollTimer)
},[])




    return(
      
      <View style={{flex:1, backgroundColor: "#225c14c0"}}>

{showCash && (
<Animated.View 
style={[
styles.cashToast,
{transform:[{translateY:cashAnim}]}
]}>

<Text style={styles.cashText}>
💰 {cashMsg}
</Text>

</Animated.View>
)}

        <ScrollView>

  { /** pop up uner jonno daoya */ }      
  <Modal transparent visible={modalVisible} animationType="fade">
  <View style={styles.overlay}>

  <Animated.View
    style={[
      styles.popup,
      { transform: [{ scale: scaleAnim }] }
    ]}
  >
<Text style={styles.popupTitle}>⏳ Coming Soon! </Text>
<Text style={styles.popupText}>
      Api is under maintenance.
    </Text>
  <Text style={styles.popupText1}> Available Soon!</Text>
    

<ActivityIndicator size="large" color="red" />

<TouchableOpacity style={styles.closeBtn} onPress={closePopup}>
      <Text style={{color:"white"}}>Close</Text>
</TouchableOpacity>
</Animated.View>
</View>
</Modal>




<View> 
             <View style={styles.container3}>
                <Swiper 
                 
                loop 
                showsPagination={true} 
                dotColor="#fff"
                
                >
              {images.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={image} style={styles.image1} />
                </View>
              ))}
            </Swiper>
            </View>



            <View style={styles.mini}> 
             <Animated.Text
        style={[
          styles.slideText,
          { transform: [{ translateX: noticeAnim }] }
        ]}
      >
        📢 Welcome to Grand WIN BET 🎉 
      </Animated.Text>
            </View>

            
            <View style={styles.container1}>
               <ScrollView
                 horizontal
                  showsHorizontalScrollIndicator={true}
                 contentContainerStyle={styles.scrollContainer}
                >
  {topMenuItems.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => {
        if (item.name === "Deposit") navigation.navigate("Deposit");
        else if (item.name === "Deposit List") navigation.navigate("DepoList");
        else if (item.name === "WithDraw") navigation.navigate("Cashout");
        else if (item.name === "WithDraw List") navigation.navigate("Cashout List");
        else if (item.name === "My Account") navigation.navigate("Profile");
        else if (item.name === "Privacy Policy") navigation.navigate("Lenden");
        else if (item.name === "Refer&Earn") navigation.navigate("Reffer Income");
      }}
    >
              <View style={[styles.iconWrapper, { borderColor: "#fa2727ff" }]}>
                {renderIcon(item)}
              </View>
              <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
            </View>
        

<View style={styles.bottomContainer}>
  {bottomMenuItems.map((item) => (
    <TouchableOpacity 
       key={item.id} 
       style={styles.bottomCard}
       onPress={() => {
        if (item.name === "HOT GAMES") navigation.navigate("HOT GAMES");
        else if (item.name === "SPORTS") navigation.navigate("SPORTS");
        else if (item.name === "LOTTERY") navigation.navigate("LOTTERY");
       }}
       >
      <MaterialIcons name={item.icon} size={40} color="#fff" />
      <Text style={styles.bottomLabel}>{item.name}</Text>
    </TouchableOpacity>
  ))}
</View>
         




<View style={styles.gamesContainer}>  
  {games.map((game) => (
    <TouchableOpacity 
    key={game.id} 
    style={styles.gameCard}
    onPress={() => handleGamePress(game)}
    >

       {/* LIVE badge */}
      <Animated.View style={[styles.liveBadge, { opacity: blinkAnim }]}>
        <Text style={styles.liveText}>🔴 LIVE</Text>
      </Animated.View>


      <Image source={game.image} style={styles.gameImage} />
      
      {game.title === "AVIATOR GAME"  &&  (

<View style={styles.liveMultiplier}>
<Text style={styles.liveMultiplierText}>
{displayMulti.toFixed(2)}x
</Text>
</View>

)}
      <Text style={styles.gameTitle}>{game.title}</Text>
    </TouchableOpacity>
  ))}
</View>


   
{/* player list auto scroll hby */}
<View style={styles.leaderboardContainer}> 

<Text style={styles.leaderboardTitle}>
🏆 TOP 50 PLAYERS TODAY
</Text>
{/* 🔥 TOP 3 */}
  <View style={styles.top3Container}>
  {topPlayers.slice(0, 3).map((player, index) => {

    const crown = ["👑","👑","👑"];

    return (
      <View key={player.id} style={[
        styles.topBox,
        index === 0 && styles.firstPlace,
        index === 1 && styles.secondPlace,
        index === 2 && styles.thirdPlace
      ]}>

        {/* Crown */}
        <Text style={styles.crown}>{crown[index]}</Text>

        {/* Avatar */}
        <Image source={player.avatar} style={styles.avatar} />

        <Text style={styles.rankText}>NO{index + 1}</Text>
        <Text style={styles.nameText}>{player.name}</Text>

        <View style={styles.amountBadge}>
          <Text style={styles.amountText}>
            ৳{player.win.toLocaleString()}
          </Text>
        </View>

      </View>
    );
  })}
</View>
{topPlayers.slice(3, 10).map((player, index) => (
  <View key={player.id} style={styles.listRow}>

    <Text style={styles.listRank}>{index + 4}</Text>

    <Image source={player.avatar} style={styles.listAvatar} />

    <Text style={styles.listName}>{player.name}</Text>

    <View style={styles.listAmountBox}>
      <Text style={styles.listAmount}>
        ৳{player.win.toLocaleString()}
      </Text>
    </View>

  </View>
))}

</View>   
        
  <View style={styles.leaderboardContainer2}>
    <Text style={styles.leaderboardTitle}>
INVITE & EARN
</Text>
    <Image source={ref} style={styles.ref} />
  </View>
        
        <View style={styles.payImageContainer}>
           <Image source={pay}
           style={styles.payImage1} />
           <Image source={suport}
           style={styles.payImage2} />
           
        </View>    


</View>       
</ScrollView>

{/* SUPPORT BUTTON */}

<View style={styles.supportContainer}>

{supportOpen && (

<View style={styles.supportMenu}>

<Text style={{color:"#ffffffff", fontWeight: "700"}}>☎ 24/7 CUSTOMER SERVICES </Text>
<Text>  </Text>

{/* TELEGRAM */}

<View style={styles.supportItem}>

<TouchableOpacity
style={styles.linkBtn}
onPress={()=>openLink(telegramLink)}
>
<Text style={styles.linkText}>    📩 Telegram       </Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.copyBtn}
onPress={()=>copyLink(telegramLink)}
>
<Text style={styles.copyText}> COPY </Text>
</TouchableOpacity>

</View>


{/* WHATSAPP */}

<View style={styles.supportItem}>

<TouchableOpacity
style={styles.linkBtn2}
onPress={()=>openLink(whatsappLink)}
>
<Text style={styles.linkText}>    💬 WhatsApp     </Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.copyBtn}
onPress={()=>copyLink(whatsappLink)}
>
<Text style={styles.copyText}> COPY </Text>
</TouchableOpacity>

</View>

</View>

)}

{/* MAIN BUTTON */}

<TouchableOpacity
style={styles.supportBtn}
onPress={()=>setSupportOpen(!supportOpen)}
>
<Text style={{color:"white",fontSize:28}}>
  <MaterialIcons name="support-agent"  size={40} />
</Text>
</TouchableOpacity>

</View>
</View>

    )
}




const styles = StyleSheet.create ({
    container3: { 
    width: '97%',
    marginTop: 20, 
    height: 165,
    alignSelf: 'center',
    borderColor: "#0c0c0cff" ,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#fdfdfdff" ,
    flexWrap: 'wrap',
  },
  mini:{
    height:27,
    width:"98%",
    backgroundColor: "#fff",
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    overflow:"hidden",
    marginTop:-5
  },
  slide: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  image1: { 
    width: "100%", 
    height: 170, 
    resizeMode: "contain",
    flexWrap: 'wrap',
    borderRadius: 10,
  },
  container1: { 
    width: '98%',
    marginTop: 5, 
    height: 110,
    alignSelf: 'center',
    borderColor: "#0c0c0cff" ,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#2cf5685d" ,
    overflow: "hidden",
  },
card: { 
   width: 90,
  height: 90,
  backgroundColor: '#7FFFD4',
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 5,
  padding: 5,          // 🔹 ভিতরে কিছু স্পেস
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 8,
  elevation: 3,  
  },
  iconWrapper: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
  },
  label: { 
    fontSize: 11, 
    textAlign: "center",
    fontWeight: '400'
  },
scrollContainer: {
    paddingHorizontal: 5,
    alignItems: 'center'
  },
bottomContainer: {
  flexDirection: "row",
  justifyContent: 'space-evenly',
  marginTop: 5,
},
bottomCard: {
  width: 110,
  height: 90,
  backgroundColor: "#27fc677a",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",

},
bottomLabel: {
  color: "#fff",
  fontSize: 11,
  marginTop: 5,
  fontWeight: "bold",
},

slideText:{
  fontSize:16,
  fontWeight:"600",
  position:"absolute",
  alignSelf: 'center',
},

gradient: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: 10,
},
gamesContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: "wrap", 
  marginTop: 10,
},
gameCard: {
    width: 110,       // 2 column layout
    height: 100,
    marginBottom: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#271d1dff",
    alignItems: "center",
    justifyContent: 'center',
    margin: 5,
  padding: 1,          // 🔹 ভিতরে কিছু স্পেস
  shadowColor: '#3de5fcff',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 2,
  elevation: 3,
  },
  gameImage: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  gameTitle: {
    color: "#fff",
    fontSize: 11,
    marginTop: 2,
    textAlign: "center",
    fontWeight: "bold",
  },
payImageContainer: {
    marginTop: 5,
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
ref: {
   height: 120,
   width: 360,
   marginTop:5,
   overflow:'hidden'
},
liveBadge: {
  position: "absolute",
  top: 5,
  right: 5,
  backgroundColor: "#291c1cff",
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 5,
  zIndex: 10
},

liveText: {
  color: "#ff0000ff",
  fontSize: 10,
  fontWeight: "bold"
},
overlay:{
  flex:1,
  backgroundColor:"rgba(245, 213, 213, 0.7)",
  justifyContent:"center",
  alignItems:"center"
},

popup:{
  width:270,
  backgroundColor:"#000000ff",
  padding:20,
  borderRadius:15,
  alignItems:"center"
},

popupTitle:{
  fontSize:24,
  color:"white",
  fontWeight:"bold",
  marginBottom:10
},

popupText:{
  color:"#ccc",
  textAlign:"center",
  marginBottom:15
},
popupText1:{
  color:"#ccc",
  textAlign:"center",
  marginBottom:15,
},
closeBtn:{
  marginTop:15,
  backgroundColor:"red",
  paddingVertical:8,
  paddingHorizontal:25,
  borderRadius:8
},
liveMultiplier:{
position:"absolute",
bottom:17,
right:1,
backgroundColor:"#000000aa",
paddingHorizontal:8,
paddingVertical:3,
borderRadius:6,

},

liveMultiplierText:{
color:"#22c55e",
fontWeight:"bold",
fontSize:14
},
cashToast:{
position:"absolute",
top:80,
alignSelf:"center",
backgroundColor:"#191b1aff",
paddingHorizontal:15,
paddingVertical:8,
borderRadius:20,
zIndex:999,
elevation:10
},

cashText:{
color:"#fff",
fontWeight:"bold"
},
leaderboardContainer:{
marginTop:5,
width:"95%",
alignSelf:"center",
backgroundColor:"#1a1a1a",
borderRadius:18,
padding:2,
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
fontStyle:"italic"
},

playerRow:{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#2a2a2a",
padding:10,
borderRadius:8,
marginBottom:6
},

rank:{
color:"#ff4757",
fontWeight:"bold"
},

playerName:{
color:"#fff"
},

playerWin:{
color:"#22c55e",
fontWeight:"bold"
},

supportContainer:{
position:"absolute",
bottom:70,
right:20,
alignItems:"flex-end"
},

supportBtn:{
backgroundColor:"#7FFFD4",
width:60,
height:60,
borderRadius:30,
justifyContent:"center",
alignItems:"center",
elevation:8
},

supportMenu:{
marginBottom:10,
backgroundColor:"#1e293b",
padding:10,
borderRadius:12
},

supportItem:{
flexDirection:"row",
alignItems:"center",
marginBottom:8
},

linkBtn:{
backgroundColor:"#1fa8f8ff",
padding:8,
borderRadius:8,
marginRight:6
},
linkBtn2:{
backgroundColor:"#25eb8fff",
padding:8,
borderRadius:8,
marginRight:6
},

linkText:{
color:'#fff'
},

copyBtn:{
backgroundColor:"#00FFFF",
padding:8,
borderRadius:8
},

copyText:{
color:'#000000ff'
},



top3Container: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
},

topBox: {
  flex: 1,
  margin: 5,
  padding: 10,
  borderRadius: 15,
  alignItems: "center",
},

firstPlace: {
  backgroundColor: "#ff6b6b",
},

secondPlace: {
  backgroundColor: "#8395a7",
},

thirdPlace: {
  backgroundColor: "#ff9f43",
},

crown: {
  fontSize: 30,
  position: "absolute",
  top: -5,
},

avatar: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginTop: 10,
},

rankText: {
  color: "#fff",
  fontWeight: "bold",
  marginTop: 5,
},

nameText: {
  color: "#fff",
  marginTop: 3,
   fontSize:14
},

amountBadge: {
  backgroundColor: "#ffffff55",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
  marginTop: 5,
},

amountText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize:12
},

/* bottom list */

listRow: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#f1f2f6",
  padding: 10,
  borderRadius: 12,
  marginBottom: 8,
},

listRank: {
  fontWeight: "bold",
  width: 20,
},

listAvatar: {
  width: 35,
  height: 35,
  borderRadius: 20,
  marginHorizontal: 8,
},

listName: {
  flex: 1,
},

listAmountBox: {
  backgroundColor: "#feca57",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
},

listAmount: {
  fontWeight: "bold",
},

});