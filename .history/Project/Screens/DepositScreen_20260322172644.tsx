import MaterialIcons from "@react-native-vector-icons/material-icons";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import pay from '../Screens/assets/pay.png';
import suport from '../Screens/assets/suport.png';
import Clipboard from "@react-native-clipboard/clipboard";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useContext } from "react";
import { DepositContext } from "./context/DepositContext";



const gateways = [ 
    { id: "1", name: "bKash", image: require("../Screens/assets/bkash.png"),number: "qqqqqqqq", },  
    { id: "2", name: "Nagad", image: require("../Screens/assets/nogod.png"), number: "eeeeee", }, 
    { id: "3", name: "Rocket", image: require("../Screens/assets/rocket.png"), number: "00000000",  }, 
];


 



export default function DepositScreen () {
  
const [loading,setLoading] = useState(false)


const { addDeposit } = useContext(DepositContext);

  // j ta select korbo oita asbe number
  const [selectedGateway, setSelectedGateway] = useState(gateways[0]);
const handleSelectGateway = (item) => {
  setSelectedGateway(item);
};

// number copy er jonno
const copyNumber = () => {
  Clipboard.setString(selectedGateway.number);
  Alert.alert("Copied", "Payment number copied successfully");
};

// amount check dibe
const [amount,setAmount] = useState("")
const [trxId,setTrxId] = useState("")
const handleSubmit = () => {

if(!amount){
Alert.alert("Error","অনুগ্রহ করে Amount লিখুন")
return
}

if(Number(amount) < 500){
Alert.alert("Minimum Deposit","সর্বনিম্ন ৫০০ টাকা জমা দিতে হবে")
return
}

if(!trxId){
Alert.alert("Error","Transaction ID দিন")
return
}

const newDeposit = {
   id: Date.now().toString(),
  method: selectedGateway.name,
  amount: amount,
  trxId: trxId,
  status: "Pending",
  time: new Date().toLocaleString()
}

addDeposit(newDeposit)

Alert.alert("Deposit Submitted",
            "আপনার ডিপোজিট রিকুয়েস্ট সফলভাবে সাবমিট হয়েছে"
            )

setAmount("")
setTrxId("")
}




    return(
      <KeyboardAwareScrollView
              enableOnAndroid={true}
              extraScrollHeight={20}
              keyboardShouldPersistTaps="handled"
              
>
  
           <View style={styles.container}>
            <TouchableOpacity >
              <MaterialIcons name="account-balance" size={90} color={"#066b24ff"} />
              <Text >  Add Money</Text>
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
                style={[
                  styles.gatewayBox,
                  selectedGateway.id === item.id && styles.selectedBox
                       ]}
                  onPress={() => handleSelectGateway(item)}
              >
                <Image source={item.image} style={styles.gatewayImage} />
                <Text style={styles.gatewayLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>


          <Text style={styles.label}>   পেমেন্ট নাম্বারঃ</Text>
              <View style={styles.numberBox}>
                <Text style={styles.numberText}> {selectedGateway.number} </Text>
                <TouchableOpacity onPress={copyNumber}>
                  <Text style={styles.copyText}>কপি</Text>
                </TouchableOpacity>
              </View>



          <Text style={styles.label}>   AMOUNT (BDT)</Text>
              <TextInput 
              style={styles.input} 
              placeholder="সর্বনিম্ন ৫০০ টাকা" 
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              />
            
            <Text style={styles.label}>   TRANSACTION ID </Text>
              <TextInput 
              style={styles.input} 
              placeholder="Example:- 3Ft56FgR6" 
              value={trxId}
              onChangeText={setTrxId}
              />


            <TouchableOpacity 
              style={styles.submitBtn} 
              onPress={handleSubmit}
              disabled={loading}
            >
            {loading ? (
                         <ActivityIndicator color="#fff"/>
                     ) : (
                             <Text style={styles.submitText}>জমা দিন</Text>
                       )}
                
            </TouchableOpacity>



            <View style={styles.payImageContainer}>
                       <Image source={pay}
                       style={styles.payImage1} />
                       <Image source={suport}
                       style={styles.payImage2} />
                       
                    </View> 
            

        </KeyboardAwareScrollView>   
    )
}



const styles = StyleSheet.create ({
   container: {
    height: 100,
    width: 110,
    backgroundColor: "#f1f1f1ff",  // "#f1f1f1ff" matching color 
    alignSelf: 'center',
    margin: 20,
    padding: 13,
    marginBottom: 30,
   },
   gatewayContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  gatewayBox: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    width: 90,
  },
  selectedBox: { borderColor: "#e30613", backgroundColor: "#ffdadaff" },
  gatewayImage: { width: 70, height: 45, resizeMode: "contain" },
  gatewayLabel: { marginTop: 5, fontWeight: "500", color: "#fc0303ff" },
 label: { fontSize: 14, color: "#000", marginTop: 10 },
 input: {
    borderWidth: 1,
    borderColor: "#ccc",
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
numberBox: {
    width: '96%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    alignSelf: 'center'
  },
  numberText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  copyText: { color: "#e30613", fontWeight: "bold" },


})