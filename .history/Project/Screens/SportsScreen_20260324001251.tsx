import { ActivityIndicator,Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import suport2 from '../Screens/assets/suport2.png';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import pay from '../Screens/assets/pay.png';


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


// screen size thik rakar jonno
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 3;


const games = [ 
    { id: "1", title: "PLINKO GAME", image: require("../Screens/assets/pling.png"), action: "popup" },
    { id: "2", title: "CRAZY-777", image: require("../Screens/assets/crazy-777 (1).png"), action: "popup" },
    { id: "3", title: "3 PATTI", image: require("../Screens/assets/3patti (1).png"), action: "popup" }, 
    { id: "4", title: "CRAZY TIME", image: require("../Screens/assets/crazy_time.png"), action: "popup" }, 
    { id: "5", title: "777", image: require("../Screens/assets/777 (1).png"), action: "popup" },  
    { id: "6", title: "DRAGON VS TIGER", image: require("../Screens/assets/lion vs tiger.png"), action: "popup" }, 
    { id: "7", title: "HELICOPTER", image: require("../Screens/assets/helicopter.png"), action: "popup" }, 
    { id: "8", title: "SuperAce", image: require("../Screens/assets/superace.png"), action: "popup" },
    { id: "9", title: "POKER KINGDOM", image: require("../Screens/assets/Poker_Kingdom.png"), action: "popup" },
    { id: "10", title: "CK666", image: require("../Screens/assets/666.png"), action: "popup" },
    { id: "12", title: "COIN TOSS", image: require("../Screens/assets/Coin-Toss.png"), action: "popup",},  // popup er oikany screen dile oi screen open hby
    { id: "13", title: "Mega Ace", image: require("../Screens/assets/mega ace.png"), action: "popup" }, 
    { id: "14", title: "BOXING KING", image: require("../Screens/assets/Boxing.png"), action: "popup" }, 
    { id: "15", title: "GOLDEN TREASURE", image: require("../Screens/assets/golden.png"), action: "popup" }, 
    { id: "16", title: "CHIKEN ROAD", image: require("../Screens/assets/chiken.png"), action: "popup" }, 
    { id: "17", title: "7UP 7DOWN", image: require("../Screens/assets/7-Up-7-Down.png"), action: "popup" }, 
    { id: "18", title: "LUCKY FORTUNES", image: require("../Screens/assets/luckyf.png"), action: "popup", },  // popup er oikany screen dile oi screen open hby
    { id: "19", title: "GOLDEN TIME", image: require("../Screens/assets/golden.png"), action: "popup" }, 
    { id: "22", title: "POKER GAME", image: require("../Screens/assets/Poker_Kingdom.png"), action: "popup" }, 
    { id: "23", title: "PINK JOKER", image: require("../Screens/assets/pink.png"), action: "popup" }, 
    { id: "24", title: "LUDO BOARD", image: require("../Screens/assets/Ludo Board.png"), action: "popup" }, 
    { id: "25", title: "BG LIVE", image: require("../Screens/assets/BG.png"), action: "popup" }, 
    { id: "26", title: "EVO LIVE", image: require("../Screens/assets/EVO.png"), action: "popup" }, 
    { id: "27", title: "LUCKY SCORE", image: require("../Screens/assets/Lucky.png"), action: "popup" }, 
    { id: "28", title: "WILD ACE", image: require("../Screens/assets/wild ace.png"), action: "popup" }, 
    { id: "29", title: "JILI GOLD CARD", image: require("../Screens/assets/jili (1).png"), action: "popup" }, 
    { id: "30", title: "TEEN PATTI", image: require("../Screens/assets/teen.png"), action: "popup" }, 
    { id: "31", title: "SABA SPORTS", image: require("../Screens/assets/saba (1).png"), action: "popup",},
    { id: "33", title: "GOLDEN TREASURE", image: require("../Screens/assets/golden.png"), action: "popup" }, 
    { id: "34", title: "Golden Bank", image: require("../Screens/assets/golden bank.png"), action: "popup" }, 
    { id: "35", title: "SUPER WIN", image: require("../Screens/assets/super.png"), action: "popup" }, 
    { id: "36", title: "CALL BREAK", image: require("../Screens/assets/callbreak.png"), action: "popup" }, 
    { id: "37", title: "CHARGE BUFFALU", image: require("../Screens/assets/charge buffalo.png"), action: "popup" }, 
    { id: "38", title: "Sic Bo", image: require("../Screens/assets/Sic Bo.png"), action: "popup" }, 
    { id: "39", title: "BLACKJACK", image: require("../Screens/assets/black jack lobby.png"), action: "popup" }, 
    { id: "40", title: "CRASH BONUS", image: require("../Screens/assets/crash bonus.png"), action: "popup" }, 
    { id: "41", title: "HELICOPTER", image: require("../Screens/assets/helicopter.png"), action: "popup" }, 
    { id: "42", title: "LUCKY6 ROULETTE", image: require("../Screens/assets/lucky 6 roulette.png"), action: "popup" }, 
    { id: "43", title: "AUTO ROULETTE", image: require("../Screens/assets/auto roulette.png"), action: "popup" }, 
    { id: "44", title: "BACCARAT", image: require("../Screens/assets/baccarat.png"), action: "popup",},  // popup er oikany screen dile oi screen open hby
    { id: "45", title: "SPIN WHEELS", image: require("../Screens/assets/spin the wheels.png"), action: "popup" }, 
    { id: "46", title: "LUCKY CATCH", image: require("../Screens/assets/lucky catch.png"), action: "popup" }, 
    { id: "47", title: "LUCKY 6", image: require("../Screens/assets/lucky 6.png"), action: "popup" }, 
    { id: "48", title: "SWEET LAND", image: require("../Screens/assets/sweet land.png"), action: "popup" }, 
    { id: "49", title: "SUPER BINGO", image: require("../Screens/assets/super bingo.png"), action: "popup" }, 
    { id: "50", title: "COLOR GAME", image: require("../Screens/assets/color game.png"), action: "popup" }, 
    { id: "51", title: "HIGH FLYER", image: require("../Screens/assets/high flyer.png"), action: "popup" },
    { id: "52", title: "SWORD OF KING", image: require("../Screens/assets/sword of king.png"), action: "popup", },  // popup er oikany screen dile oi screen open hby
    { id: "53", title: "POKER WIN", image: require("../Screens/assets/poker win.png"), action: "popup" }, 
    { id: "54", title: "CRAZY PUSHER", image: require("../Screens/assets/crazy pusher.png"), action: "popup" }, 
    { id: "55", title: "TWIN WINS", image: require("../Screens/assets/twin wins.png"), action: "popup" }, 
    { id: "56", title: "BOOK OF GOLD", image: require("../Screens/assets/book of gold.png"), action: "popup" }, 
    { id: "57", title: "VAULT RUSH", image: require("../Screens/assets/vault rush.png"), action: "popup" }, 
    { id: "58", title: "BANG BANG", image: require("../Screens/assets/jungle bang bang.png"), action: "popup" }, 
    { id: "59", title: "PERFECT CATCH", image: require("../Screens/assets/perfect catch.png"), action: "popup" }, 
    { id: "60", title: "MINES GAME", image: require("../Screens/assets/mins game.png"), action: "popup" },
];



export default function SportsScreen () {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);  // pop up anar jonno use
    const scaleAnim = useRef(new Animated.Value(0)).current;  // pop up anar jonno use
    

const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;

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
    


    return(
        <ScrollView style={{ backgroundColor: "#225c14c0"}}>
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
              <Text style={styles.gameTitle}>{game.title}</Text>
            </TouchableOpacity>
          ))}
        </View>


        <View style={styles.text}> 
            <Text style={styles.text2}> More game Coming Soon ........!</Text>
        </View>


        <View style={styles.payImageContainer}>
                   <Image source={pay}
                   style={styles.payImage1} />
                   <Image source={suport2}
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
        
        </ScrollView>
        
    )
}



const styles = StyleSheet.create ({
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
gamesContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: "wrap", 
  marginTop: 10,
},
gameCard: {
    width: cardWidth,       // 2 column layout
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
text:{
    marginTop: 25,
     marginBottom:15,
     textAlign: 'center',
     alignSelf: 'center',
},
text2 :{
    fontSize: 20,
    fontWeight: '700',
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



})