import React, {useContext, useRef, useState} from "react";
import {View,Text,StyleSheet,TouchableOpacity, Animated} from "react-native";
import { DepositContext } from "./context/DepositContext";
import { useNavigation } from "@react-navigation/native";



export default function CasinoHeader(){

const { balance, refreshBalance } = useContext(DepositContext)


const spinValue = useRef(new Animated.Value(0)).current


// balance er plus er jonno
const navigation = useNavigation();



const spin = spinValue.interpolate({
  inputRange:[0,1],
  outputRange:["0deg","360deg"]
})

return(

<View style={styles.container}>

{/* balance */}
<View style={styles.balanceBox}>
<Text style={styles.balanceLabel}>Balance</Text>

<View style={styles.balanceRow}>

<Text style={styles.balance}>
{balance.toLocaleString()} ৳
</Text>
{/* ➕ ADD BUTTON */}
  <TouchableOpacity
    style={styles.addBtn}
    onPress={() => navigation.navigate("Deposit")}
  >
    <Text style={{color:"#000", fontWeight:"bold", fontSize:16}}>
      ➕
    </Text>
  </TouchableOpacity>

</View>

</View>

</View>

)

}

const styles = StyleSheet.create({

container:{
flexDirection:"row",
alignItems:"center",
marginRight:-15
},
addBtn:{
  backgroundColor:"#22c55e",
  width:22,
  height:22,
  borderRadius:4,
  justifyContent:"center",
  alignItems:"center",
  marginLeft:2
},

balanceBox:{
backgroundColor:"#00000055",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:8,
marginHorizontal:6
},

balanceLabel:{
color:"#ffffffff",
fontSize:14,
alignSelf: 'center'
},

balanceRow:{
flexDirection:"row",
alignItems:"center"
},

balance:{
color:"#fff",
fontWeight:"bold",
marginRight:6,
fontSize:12
}

})