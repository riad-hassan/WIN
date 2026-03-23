import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, {useContext, useRef, useState} from "react";
import {View,Text,StyleSheet,TouchableOpacity, Animated} from "react-native";
import { DepositContext } from "./context/DepositContext";


export default function CasinoHeader(){

const { balance, refreshBalance } = useContext(DepositContext)


const spinValue = useRef(new Animated.Value(0)).current

const handleRefresh = () => {

  // animation start
  Animated.timing(spinValue,{
    toValue:1,
    duration:700,
    useNativeDriver:true
  }).start(()=>{

    spinValue.setValue(0)

  })

  // balance reload
  refreshBalance()

}

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


<TouchableOpacity onPress={refreshBalance}>
➕
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
marginRight:-7
},

iconBox:{
marginHorizontal:8
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