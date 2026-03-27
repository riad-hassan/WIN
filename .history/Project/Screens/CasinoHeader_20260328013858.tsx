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

  <View style={styles.balanceBox}>

    <View style={styles.balanceRow}>

      <Text
        style={styles.balance}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {balance.toLocaleString()} ৳
      </Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("Deposit")}
      >
        <Text style={styles.addText}>➕</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("Deposit")}
      >
        <Text style={styles.addText}>🔔.</Text>
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
  },

  balanceBox:{
    backgroundColor:"#00000055",
    paddingHorizontal:8,
    paddingVertical:4,
    borderRadius:6,
    width:120,          // 🔥 FIXED WIDTH (সব ফোনে same)
    height:30,          // 🔥 FIXED HEIGHT
    justifyContent:"center",
  },

  balanceRow:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-around', // 🔥 text + button always inside
  },

  balance:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:12,
    flex:1,
    marginRight:5,
  },

  addBtn:{
    backgroundColor:"#f7df0bff",
    width:22,
    height:22,
    borderRadius:4,
    justifyContent:"center",
    alignItems:"center",
  },

  addText:{
    color:"#000",
    fontWeight:"bold",
    fontSize:14
  }
});