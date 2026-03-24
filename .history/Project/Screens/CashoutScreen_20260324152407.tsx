import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import pay from '../Screens/assets/pay.png';
import suport from '../Screens/assets/suport.png';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react"
import { CashoutContext } from "./context/CashoutContext"
import { DepositContext } from "./context/DepositContext";



const gateways = [ 
    { id: "1", name: "bKash", image: require("../Screens/assets/bkash.png"), action: "popup", },  
    { id: "2", name: "nagad", image: require("../Screens/assets/nogod.png"), action: "popup" }, 
    { id: "3", name: "rocket", image: require("../Screens/assets/rocket.png"), action: "popup" }, 
];


export default function CashoutScreen () {

const [selectedMethod,setSelectedMethod] = useState("")
const [number,setNumber] = useState("")
const [savedMethod,setSavedMethod] = useState("")
const [savedNumber,setSavedNumber] = useState("")
const { balance, setBalance } = useContext(DepositContext);
const { addCashout } = useContext(CashoutContext)
const [amount,setAmount] = useState("")

// profile থেকে payment data load
useEffect(() => {

const loadPayment = async () => {
 try{

 const method = await AsyncStorage.getItem("@payment_method")
 const num = await AsyncStorage.getItem("@payment_number")

 if(method && num){
 setSavedMethod(method)
 setSavedNumber(num)
 }

 }catch(e){
 console.log("Load error",e)
 }

}

loadPayment()

},[])


// gateway select করলে
const selectGateway = (method)=>{

setSelectedMethod(method)

// যদি profile এ একই method থাকে → number auto fill
if(method === savedMethod && savedNumber){
setNumber(savedNumber)
}else{
setNumber("")
}

}



const handleWithdraw = async ()=>{

if(!selectedMethod){
alert("Method select করুন")
return
}

if(!amount){
alert("Amount লিখুন")
return
}

if(Number(amount) < 5000){
alert("Minimum withdraw 5000")
return
}

if(!number){
alert("Number লিখুন")
return
}

// balance check
if(Number(amount) > balance){
alert("আপনার পর্যাপ্ত বেলেন্স নেই")
return
}

const newCashout = {

id: Date.now().toString(),
method: selectedMethod,
amount: amount,
number: number,
status: "Pending",
time: new Date().toLocaleString()

}

addCashout(newCashout)

// balance কমানো
const newBalance = balance - Number(amount)

setBalance(newBalance)

await AsyncStorage.setItem("@balance", newBalance.toString())

alert("Withdraw request submitted")

setAmount("")
setNumber("")
}



    return(
        <ScrollView>
           <View style={styles.container}>
            <TouchableOpacity >
              <MaterialIcons name="account-balance" size={90} color={"#066b24ff"} />
              <Text >Withdraw Money</Text>
            </TouchableOpacity>
            </View>

            <View>
                <Text>                                    (Official Gateway) </Text>
            </View>
            <Text>    </Text>
            <Text>   SELECT METHOD : </Text>
            <View style={styles.gatewayContainer}>
            {gateways.map((item) => (
              <TouchableOpacity
                key={item.id} 
                onPress={()=>selectGateway(item.name)}
                style={[
                  styles.gatewayBox,
                  selectedMethod === item.name && styles.selectedBox
                ]}
              >
                <Image source={item.image} style={styles.gatewayImage} />
                <Text style={styles.gatewayLabel}>{item.name.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          
          
            <Text style={styles.label}>   AMOUNT (BDT)</Text>
            <TextInput 
            style={styles.input} 
            placeholder="সর্বনিম্ন ৫০০০ টাকা" 
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            />
            <Text style={styles.label}>   NUMBER </Text>
            <TextInput style={styles.input} value={number} onChangeText={setNumber} placeholder="Example:- 017........" keyboardType="numeric" />

            <Text style={styles.label}>   PASSWARD </Text>
            <TextInput style={styles.input} keyboardType="numeric"  placeholder="Type Your Passward" keyboardType='name-phone-pad' />

            <TouchableOpacity 
              style={styles.submitBtn} 
              onPress={handleWithdraw}
              >
                <Text style={styles.submitText}>WITH DRAW</Text>
                
            </TouchableOpacity>



            <View style={styles.payImageContainer}>
                       <Image source={pay}
                       style={styles.payImage1} />
                       <Image source={suport}
                       style={styles.payImage2} />
                       
                    </View> 
            

        </ScrollView>
        
    )
}



const styles = StyleSheet.create ({
   container: {
    height: 100,
    width: 130,
    backgroundColor: "#f1f1f1ff",  // "#f1f1f1ff" matching color 
    alignSelf: 'center',
    margin: 20,
    padding: 10,
    marginBottom: 30,
    alignItems: 'center'
   },
   gatewayContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  gatewayBox: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1c6400ff",
    borderRadius: 10,
    padding: 10,
    width: 90,
  },
  selectedBox: { borderColor: "#e30613", backgroundColor: "#ffdadaff" },
  gatewayImage: { width: 70, height: 45, resizeMode: "contain" },
  gatewayLabel: { marginTop: 5, fontWeight: "500", color: "#fc0303ff" },
 label: { fontSize: 14, color: "#000", marginTop: 10 },
 input: {
    borderWidth: 2,
    borderColor: "#1c6400ff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
    width: '96%',
    alignSelf: 'center'
  },
submitBtn: {
    backgroundColor: "#066b24ff",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    width: '70%',
    alignSelf: 'center'
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
payImageContainer: {
    marginTop: 25,
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
})