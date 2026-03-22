import React, {useEffect,useState,useRef} from "react";
import {
View,
Text,
StyleSheet,
Dimensions,
Image,
TouchableOpacity,
TextInput,
FlatList,
ScrollView
} from "react-native";
import { Animated } from "react-native";
import { useContext } from "react";
import { DepositContext } from "../Screens/context/DepositContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PixiGraph from "./PixiGraph";


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


// ⬇️ এখানে বসবে ডাবল বেটের জন্য 

const BetPanel = React.memo(({
  bet,
  setBet,
  mode,
  setMode,
  autoCash,
  setAutoCash,
  onBetPress,
  buttonText,
  buttonColor
}) => {

return(

<View style={styles.betBox}>

<View style={styles.modeRow}>

<TouchableOpacity
style={[styles.modeBtn,mode==="bet" && styles.activeMode]}
onPress={()=>setMode("bet")}
>
<Text style={styles.modeText}>Bet</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.modeBtn,mode==="auto" && styles.activeMode]}
onPress={()=>setMode("auto")}
>
<Text style={styles.modeText}>Auto</Text>
</TouchableOpacity>

</View>

{/* AUTO CASHOUT */}

{mode==="auto" && (

<View style={styles.autoBox}>

<Text style={{color:"#fff",marginRight:10, marginBottom:5,}}>
Auto Cashout
</Text>

<TextInput
style={styles.autoInput}
value={autoCash}
onChangeText={setAutoCash}
keyboardType="numeric"
/>

</View>

)}

<View style={styles.mainRow}>

{/* LEFT SIDE */}
<View style={{flex:1}}>

<View style={styles.betRow}>

<TouchableOpacity
style={styles.ctrl}
onPress={()=>setBet(Math.max(1,parseInt(bet)-1).toString())}
>
<Text style={styles.ctrlText}>-</Text>
</TouchableOpacity>

<TextInput
style={styles.input}
value={bet}
onChangeText={setBet}
keyboardType="numeric"
/>

<TouchableOpacity
style={styles.ctrl}
onPress={()=>setBet((parseInt(bet)+1).toString())}
>
<Text style={styles.ctrlText}>+</Text>
</TouchableOpacity>

</View>

<View style={styles.quickRow}>

{[100,500,1000,10000].map(v=>(
<TouchableOpacity
key={v}
style={styles.quick}
onPress={()=>setBet(v.toString())}
>
<Text style={{color:"#fff",fontWeight:"bold"}}>{v}</Text>
</TouchableOpacity>
))}

</View>

</View>

{/* RIGHT SIDE BET BUTTON */}

<TouchableOpacity
style={[styles.betBtn,{backgroundColor:buttonColor}]}
onPress={onBetPress}
>
<Text style={{color:"#fff",fontWeight:"bold", textAlign:"center"}}>
{buttonText}
</Text>
</TouchableOpacity>


</View>
</View>
)
})


const PlayerRow = React.memo(({item}) => {
const isWin = parseFloat(item.win) > 0;

return(
<View style={[
styles.row,
{ backgroundColor: isWin ? "#022c22" : "#2c0b0b" }
]}>

<Text style={styles.id}>
ID {item.id}
</Text>

<Text
style={styles.bet}
numberOfLines={1}
adjustsFontSizeToFit
>
{item.bet}
</Text>

<Text
style={styles.multi}
numberOfLines={1}
adjustsFontSizeToFit
>
{item.multi}
</Text>

<Text
style={[
styles.win,
{ color: isWin ? "#22c55e" : "#ef4444" }
]}
numberOfLines={1}
adjustsFontSizeToFit
>
{isWin ? "+" : "-"}{item.win}৳
</Text>
</View>
)
})



export default function AviatorScreen(){

const [multiplier,setMultiplier] = useState(1)
const [players,setPlayers] = useState([])
const crashPoint = useRef(2 + Math.random()*4)
const [activeTab, setActiveTab] = useState("wins") // "wins" | "mybets"
const [myBets, setMyBets] = useState([])



const [bet1,setBet1] = useState("10") // double bet
const [bet2,setBet2] = useState("10")
const [mode1,setMode1] = useState("bet")
const [mode2,setMode2] = useState("bet")
const [autoCash1,setAutoCash1] = useState("2")
const [autoCash2,setAutoCash2] = useState("2")


// betting system add
const [betPlaced1,setBetPlaced1] = useState(false)
const [betPlaced2,setBetPlaced2] = useState(false)

const [cashedOut1,setCashedOut1] = useState(false)
const [cashedOut2,setCashedOut2] = useState(false)

const [betAmount1,setBetAmount1] = useState(0)
const [betAmount2,setBetAmount2] = useState(0)

const [queuedBet1, setQueuedBet1] = useState(false);
const [queuedBet2, setQueuedBet2] = useState(false);

const [loadingBet1, setLoadingBet1] = useState(false)
const [loadingBet2, setLoadingBet2] = useState(false)


const {balance,setBalance} = useContext(DepositContext)

const [showHistory,setShowHistory] = useState(false) 


const [playersOnline,setPlayersOnline] = useState(2438) // random player amount dykanor jonno



const [cashData, setCashData] = useState(null);
const progressAnim = useRef(new Animated.Value(1)).current;


const [trail,setTrail] = useState([])

const [offsetX,setOffsetX] = useState(0)
const [offsetY,setOffsetY] = useState(0)

useEffect(()=>{
const interval = setInterval(()=>{
setOffsetX(prev => prev + 1.2)
setOffsetY(prev => prev - 0.8)
},16)
return ()=> clearInterval(interval)
},[])


useEffect(()=>{
  fakePlayers()
},[])



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



// crash history dykanor jonno 
const generateRealisticHistory = () => {
  const arr = [];

  for (let i = 0; i < 15; i++) {
    let num;

    // 70% chance small crash, 30% big win
    if (Math.random() < 0.7) {
      num = (Math.random() * 2 + 1).toFixed(2); // 1x - 3x
    } else {
      num = (Math.random() * 10 + 2).toFixed(2); // 2x - 12x
    }
    arr.push(Number(num));
  }
  return arr;
};
const [history,setHistory] = useState(generateRealisticHistory())  
useEffect(() => {
  setHistory(generateRealisticHistory());
}, []);



const gameTimer = useRef(null)
const playerTimer = useRef(null)

const [waiting,setWaiting]=useState(false)
const [waitTime,setWaitTime]=useState(20)


const [result,setResult] = useState("")


const waitText = waitTime > 5 ? "OFFICIAL PARTNERS" : "Waiting For Next Round..."






// fake player er number dykai
useEffect(()=>{

 const timer = setInterval(()=>{
  const random = 1000 + Math.floor(Math.random()*1500)
  setPlayersOnline(random)
 },4000)
 return ()=>clearInterval(timer)
},[])



//bet history er jonno 2 ta
useEffect(() => {
  AsyncStorage.setItem("MY_BETS", JSON.stringify(myBets));
}, [myBets]);

useEffect(() => {
  const loadBets = async () => {
    const data = await AsyncStorage.getItem("MY_BETS");
    if (data) {
      setMyBets(JSON.parse(data));
    }
  };
  loadBets();
}, []);





//waiting massage time set
useEffect(()=>{
  if(waiting){
    setWaitTime(20)
  }
},[waiting])
useEffect(()=>{
if(!waiting) return

const timer=setInterval(()=>{
setWaitTime(prev=>{

    if(prev<=1){
    clearInterval(timer)
    setWaiting(false)
    return 20
   }
return prev-1
  })
},1000)
return ()=>clearInterval(timer)
},[waiting])






const shake = useRef(new Animated.Value(0)).current
useEffect(()=>{
Animated.loop(
Animated.sequence([
Animated.timing(shake,{toValue:5,duration:200,useNativeDriver:true}),
Animated.timing(shake,{toValue:-5,duration:200,useNativeDriver:true}),
])
).start()
},[])







const fakePlayers = () => {
  playerTimer.current = setInterval(() => {
    const id = Math.floor(Math.random() * 900000) + 100000;

    const betAmount = [1000, 2500, 500, 6700, 5600][
      Math.floor(Math.random() * 5)
    ];

    const multi = (1 + Math.random() * 4).toFixed(2);

    const win = (betAmount * multi).toFixed(2);

    setPlayers(prev => {
      const newItem = {
        id: String(id),
        bet: betAmount,
        multi: `${multi}x`,
        win
      };

      return [newItem, ...prev].slice(0, 50); // 🔥 less artificial
    });

  }, 1500 + Math.random() * 2000); // 🔥 random timing
};





// bet er system add
const handleBet1 = () => {
  if(loadingBet1) return   // 🔥 block double click
  setLoadingBet1(true)

  setTimeout(()=> setLoadingBet1(false), 300)

if(waiting){

  if(betPlaced1 || queuedBet1) return   // 🔥 ADD THIS

  const amount = parseInt(bet1)

  if(amount > balance){
    alert("Insufficient Balance")
    return
  }

  setBalance(prev => prev - amount)
  setBetPlaced1(true)
  setBetAmount1(amount)

  setMyBets(prev => [
    {
       id: Date.now().toString() + Math.random().toString(),
      bet: amount,
      multi: "1.00x",
      win: "0"
    },
    ...prev
  ])
}else{
  // 🔥 running round → শুধু queue হবে
  if(!queuedBet1){
    setQueuedBet1(true)
  }
}
}



const handleBet2 = () => {
  if(loadingBet2) return   // 🔥 block double click
  setLoadingBet2(true)

  setTimeout(()=> setLoadingBet2(false), 300)
if(waiting){

  if(betPlaced2 || queuedBet2) return   // 🔥 ADD THIS

  const amount = parseInt(bet2)

  if(amount > balance){
    alert("Insufficient Balance")
    return
  }

  setBalance(prev => prev - amount)
  setBetPlaced2(true)
  setBetAmount2(amount)

  setMyBets(prev => [
    {
       id: Date.now().toString() + Math.random().toString(),
      bet: amount,
      multi: "1.00x",
      win: "0"
    },
    ...prev
  ])
}else{
  if(!queuedBet2){
    setQueuedBet2(true)
  }
}
}



const cancelQueuedBet1 = () => {
  setQueuedBet1(false)
}

const cancelQueuedBet2 = () => {
  setQueuedBet2(false)
}



const cashOut1 = () => {
if(!betPlaced1 || cashedOut1) return
const win = betAmount1 * multiplier
setBalance(prev => prev + win)
setResult(`You Won ${win.toFixed(2)} BDT`)
setCashedOut1(true)
setMyBets(prev =>
  prev.map(item =>
    item.bet === betAmount1 && item.win === "0"
      ? {
          ...item,
          multi: `${multiplier.toFixed(2)}x`,
          win: (betAmount1 * multiplier).toFixed(2)
        }
      : item
  )
)
setTimeout(()=> {
  setBetPlaced1(false)
  setBetAmount1(0)
},1500)
}



const cashOut2 = () => {
if(!betPlaced2 || cashedOut2) return
const win = betAmount2 * multiplier
setBalance(prev => prev + win)
setResult(`You Won ${win.toFixed(2)} BDT`)
setCashedOut2(true)
setMyBets(prev =>
  prev.map(item =>
    item.bet === betAmount2 && item.win === "0"
      ? {
          ...item,
          multi: `${multiplier.toFixed(2)}x`,
          win: (betAmount2 * multiplier).toFixed(2)
        }
      : item
  )
)
setTimeout(()=> {
  setBetPlaced2(false)
  setBetAmount2(0)
},1500)
}



const cancelBet1 = () => {
setBalance(prev => prev + betAmount1)
setBetPlaced1(false)
setBetAmount1(0)
}

const cancelBet2 = () => {
setBalance(prev => prev + betAmount2)
setBetPlaced2(false)
setBetAmount2(0)
}


return( 
<ScrollView> 
<View style={styles.container}>


{/* crush history */}
<View style={styles.topBar}>

<Text style={styles.playersOnline}>
👥 {playersOnline.toLocaleString()} Players Playing
</Text>

 
  </View>

<View style={{flexDirection:"row",alignItems:'stretch'}}>
  
  
  {/* mini history */} 
  {history.slice(0,7).map((item,index)=>{ 
    const color = item < 2 ? "#ff3b30" : "#22c55e" 
    return( 
    <View 
    key={index} 
    style={[styles.historyMini,{borderColor:color}]}> 
    <Text style={{color,fontWeight:"bold"}}> {item}x </Text> 
    </View> 
  ) 
  })} 
  
  {/* history button */} 
  <TouchableOpacity 
  style={styles.historyBtn} 
  onPress={()=>setShowHistory(true)} > 
  <Text 
  style={{color:"#ffffffff",fontWeight:"bold", alignSelf: 'center'}}> ⏱ </Text> 
  </TouchableOpacity> 

  </View>




{/* graph */}

<View style={styles.graph}>

<View style={{height:240, width:'100%'}}>
<PixiGraph
 
  onMessage={(event)=>{
  try {
    const data = JSON.parse(event.nativeEvent.data)

    console.log("DATA:", data)  // 🔥 debug

    if(data.type === "CRASH"){
  crashPoint.current = data.crashPoint

  // 🔥 ADD THIS → history update
  setHistory(prev => {
    const newItem = Number(data.crashPoint.toFixed(2))
    const updated = [newItem, ...prev]
    return updated.slice(0, 20)
  })
// ✅ ADD THIS (VERY IMPORTANT)
  setWaiting(true)

  // reset states
  setCashedOut1(false)
  setCashedOut2(false)
  setBetPlaced1(false)
  setBetPlaced2(false)

}

  } catch(e){
    console.log("Parse Error", e)
  }
}}
/>

{/* 🔥 WAITING OVERLAY */}
  {waiting && (
    <View style={styles.waitOverlay}>
        <Image
          source={require('./assets/aviator.png')}
          style={{ width: 210, height: 60, resizeMode: 'contain' }}
        />
      <Text style={styles.waitTitle}>
        OFFICIAL PARTNERS
      </Text>

      {/* 🔴 progress bar */}
      <View style={styles.progressBarBg}>
        <View style={[
          styles.progressBarFill,
          { width: `${(waitTime / 20) * 100}%` }
        ]}/>
      </View>

      <View style={styles.partnerBox}>
        <Text style={styles.partnerName}>
          Grand_WIN_BET
        </Text>

        <Text style={styles.partnerSub}>
          Official Game ✓
        </Text>

        <Text style={styles.partnerSince}>
          Since 2018
        </Text>
      </View>

    </View>
  )}

</View>





</View>

{/* betting */}

<View style={{padding:10}}>

<BetPanel
bet={bet1}
setBet={setBet1}
mode={mode1}
setMode={setMode1}
autoCash={autoCash1}
setAutoCash={setAutoCash1}
buttonText={
waiting
? ((betPlaced1 || queuedBet1) ? "CANCEL" : `BET\n${bet1} BDT`)
: queuedBet1
  ? "WAIT FOR NEXT ROUND"
  : (betPlaced1 && !cashedOut1
      ? `CASHOUT\n${(betAmount1*multiplier).toFixed(2)}`
      : "BET")
}
buttonColor={
waiting
? ((betPlaced1 || queuedBet1) ? "#ef4444" : "#22c55e")
: queuedBet1
  ? "#64748b"   // grey (waiting)
  : (!cashedOut1 && betPlaced1 ? "#f59e0b" : "#22c55e")
}
onBetPress={()=>{

if(waiting){

  if(betPlaced1){
    cancelBet1()
  }else{
    handleBet1()
  }

}else{

  if(queuedBet1){
    cancelQueuedBet1()   // 🔥 cancel queued bet
  }
  else if(betPlaced1){
    cashOut1()
  }
  else{
    handleBet1()
  }
}
}}
/>




<BetPanel
bet={bet2}
setBet={setBet2}
mode={mode2}
setMode={setMode2}
autoCash={autoCash2}
setAutoCash={setAutoCash2}
buttonText={
waiting
? ((betPlaced2 || queuedBet2) ? "CANCEL" : `BET\n${bet2} BDT`)
: queuedBet2
  ? "WAIT FOR NEXT ROUND"
  : (betPlaced2 && !cashedOut2
      ? `CASHOUT\n${(betAmount2*multiplier).toFixed(2)}`
      : "BET")
}
buttonColor={
waiting
? ((betPlaced2 || queuedBet2) ? "#ef4444" : "#22c55e")
: queuedBet2
  ? "#64748b"   // grey (waiting)
  : (!cashedOut2 && betPlaced2 ? "#f59e0b" : "#22c55e")
}
onBetPress={()=>{

if(waiting){

  if(betPlaced2){
    cancelBet2()
  }else{
    handleBet2()
  }

}else{

  if(queuedBet2){
    cancelQueuedBet2()   // 🔥 cancel queued bet
  }
  else if(betPlaced2){
    cashOut2()
  }
  else{
    handleBet2()
  }

}
}}
/>



</View>


{showHistory && (

<View style={styles.historyModal}>

<View style={styles.historyContent}>

<Text style={styles.historyTitle}>
Crash History
</Text>

<FlatList
data={history}
numColumns={5}
keyExtractor={(item,index)=>index.toString()}
renderItem={({item})=>{

const color = item < 2 ? "#ff3b30" : "#22c55e"

return(
<View style={[styles.historyBoxModal,{borderColor:color,borderWidth:1}]}>
<Text style={{color:"#fff",fontWeight:"bold"}}>
{item}x
</Text>
</View>
)

}}
/>

<TouchableOpacity
style={styles.closeBtn}
onPress={()=>setShowHistory(false)}
>
<Text style={{color:"#000000ff",fontWeight:"bold"}}>
Close
</Text>
</TouchableOpacity>

</View>

</View>

)}


{/* players list */}

<View style={[styles.list, { height: 640 }]}>

<View style={styles.modeRow2}>

<TouchableOpacity 
style={[
  styles.modeBtn2,
  activeTab === "wins" && { backgroundColor:"#90fcfcff" }
]}
onPress={()=>setActiveTab("wins")}
>
<Text style={{color:"#000000ff",fontWeight:"bold"}}>
Recent Wins
</Text>
</TouchableOpacity>

<TouchableOpacity 
style={[
  styles.modeBtn2,
  activeTab === "mybets" && { backgroundColor:"#90fcfcff" }
]}
onPress={()=>setActiveTab("mybets")}
>
<Text style={{color:"#000000ff",fontWeight:"bold"}}>
My Bets
</Text>
</TouchableOpacity>

</View>

<FlatList
  data={activeTab === "wins" ? players : myBets}
  keyExtractor={i => i.id.toString()}
  removeClippedSubviews={true}
  showsVerticalScrollIndicator={false}
  initialNumToRender={20}
  maxToRenderPerBatch={20}
  windowSize={10}
  updateCellsBatchingPeriod={50}
  renderItem={({item}) => <PlayerRow item={item} />}
/>

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
</View>
</ScrollView>

)

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#0b1220",
},

playersOnline:{
color:"#fff",
fontWeight:"bold"
},

graph:{
height:240,
backgroundColor:"#121a2b",
margin:10,
borderRadius:20,
overflow:"hidden",
justifyContent:"center",
alignItems:"center",
borderColor: '#ebe4e4ff',
borderWidth: 1
},

plane:{
position:"absolute",
width:60,
height:60
},

blast:{
position:"absolute",
width:90,
height:90
},

multiplier:{
position:"absolute",
fontSize:60,
color:"#fff",
fontWeight:"bold",
alignSelf: 'center'
},





betBox:{
padding:8,
flexDirection: 'column',
marginTop: -10,
},
betBox2:{
padding:8,
flexDirection: 'column',
marginTop: -10,
},

betRow:{
flexDirection:'row',
alignItems:"center",
height: 27,
marginTop:-35
},

input:{
backgroundColor:"#1e293b",
color:"#ffffffff",
padding:5,
borderRadius:8,
width:100,
textAlign:"center"
},

ctrl:{
backgroundColor:"#3b4252",
padding:5,
borderRadius:8,
marginHorizontal:5,
width: 30,
alignItems: "center"
},

ctrlText:{
color:"#fff",
fontWeight:"bold",
fontSize:18,
marginTop:-4
},
mainRow:{
flexDirection:'row',
alignItems:'center',
gap:10
},

quickRow:{
flexDirection:'row',
flexWrap:'wrap',
marginTop:5,
gap:6,
height: 30,
},

quick:{
backgroundColor:"#3b4252",
padding:5,
borderRadius:8,
width:83,
alignItems:"center",
},

betBtn:{
backgroundColor:"#22c55e",
borderRadius:10,
justifyContent:"center",
alignItems:"center",
width:150,
height:95,
marginLeft:10,

},
modeRow:{
flexDirection:"row",
justifyContent:"center",
marginBottom:8,
height: 30,
marginTop:5
},

modeBtn:{
backgroundColor:"#1e293b",
padding:5,
borderRadius:8,
marginHorizontal:5,
width:100,
alignItems:"center"
},
autoBox:{
flexDirection:"row",
alignItems:"center",
marginBottom:6
},

autoInput:{
backgroundColor:"#1e293b",
color:"#fff",
padding:3,
borderRadius:6,
width:80,
textAlign:"center",
marginBottom:5
},






list:{
flex:1,
padding:5,
height: 600
},

listTitle:{
color:"#fff",
fontWeight:"bold",
marginBottom:2,
marginTop:-25,
},
topBar:{
paddingHorizontal:5,
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around',
marginBottom: -5,
marginTop:1
},

row:{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#1e293b",
padding:5,
borderRadius:5,
marginBottom:6,
height:32
},

id:{color:"#fff",width:90},
bet:{color:"#fff",width:40},
multi:{color:"#60a5fa",width:50},
win:{color:"#fff",width:70},


activeMode:{
backgroundColor:"#22c55e"
},

modeText:{
color:"#fff",
fontWeight:"bold"
},

historyBox:{
backgroundColor:"#1e293b",
paddingVertical:6,
paddingHorizontal:4,
borderRadius:8,
marginRight:6,
height: 30,
},

historyText:{
color:"#22c55e",
fontWeight:"bold"
},
progressBar:{
width:"80%",
height:6,
backgroundColor:"#1e293b",
borderRadius:5,
marginTop:10,
overflow:"hidden",
alignSelf:"center"
},
waitText:{
color:"#fff",
fontSize:18,
marginTop:10,
fontWeight:"bold"
},
waitBox:{
position:"absolute",
top:170,
alignSelf:"center",
alignItems:"center"
},
historyMini:{ 
  backgroundColor:"#1e293aff", 
  paddingHorizontal:6, 
  paddingVertical:2, 
  borderRadius:6, 
  marginRight:1 
}, 
historyBtn:{ 
  backgroundColor:"#445166ff", 
  padding:4, 
  borderRadius:6, 
  width: 30, 
}, 
historyModal:{ 
  position:"absolute", 
  width:"100%", 
  height:"100%", 
  backgroundColor:"rgba(0,0,0,0.7)", 
  justifyContent:"center", 
  alignItems:"center" 
}, 
historyContent:{ 
  backgroundColor:"#212a3fff", 
  padding:5, 
  borderRadius:10, 
  width:"90%" 
}, 
historyTitle:{ 
  color:"#fff", 
  fontSize:18, 
  fontWeight:"bold",
   marginBottom:10, 
   textAlign:"center"
   }, 
  historyBoxModal:{ 
    backgroundColor:"#40526eff",
     padding:8, 
     borderRadius:8, 
     margin:5, 
     width:57, 
     alignItems:"center" 
    }, 
  closeBtn:{ 
    backgroundColor:"#09f76cff",
     padding:10, 
     borderRadius:15,
      marginTop:15,
       alignItems:"center" ,
       width:120,
       alignSelf: 'center'
    },
modeRow2:{
flexDirection:"row",
justifyContent:"center",
marginBottom:8,
height: 23,
marginTop:-10,
},

modeBtn2:{
backgroundColor:"#575f6dff",
padding:0,
borderRadius:8,
marginHorizontal:5,
width:100,
alignItems:"center"
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



waitOverlay:{
  position:"absolute",
  top:0,
  left:0,
  right:0,
  bottom:0,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"rgba(0,0,0,0.6)"
},

waitTitle:{
  color:"#fff",
  fontSize:16,
  fontWeight:"bold",
  marginBottom:10,
  letterSpacing:2
},

progressBarBg:{
  width:"80%",
  height:6,
  backgroundColor:"#374151",
  borderRadius:10,
  overflow:"hidden",
  marginBottom:15
},

progressBarFill:{
  height:"100%",
  backgroundColor:"#ff3b30"
},

partnerBox:{
  borderWidth:2,
  borderColor:"#22c55e",
  borderRadius:15,
  padding:15,
  alignItems:"center",
  width:"70%"
},

partnerName:{
  color:"#fff",
  fontWeight:"bold",
  fontSize:16
},

partnerSub:{
  color:"#22c55e",
  marginTop:5
},

partnerSince:{
  color:"#9ca3af",
  marginTop:3,
  fontSize:12
},



})