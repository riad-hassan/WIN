
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {

const [deposits,setDeposits] = useState([])
const [balance, setBalance] = useState(0);
const [loaded,setLoaded] = useState(false)


useEffect(()=>{
if(loaded){
saveBalance()
}
},[balance])
const saveBalance = async () => {
try{
await AsyncStorage.setItem("@balance", balance.toString())
}catch(e){
console.log("Save balance error", e)
}
}


useEffect(() => {
  refreshBalance();
}, []);


const refreshBalance = async () => {
  try {
    const userId = await AsyncStorage.getItem("user_id");

    if (!userId) return;

    const { data, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", Number(userId))
      .single();

    if (error) {
      console.log("Refresh balance error:", error.message);
      return;
    }

    setBalance(data.balance || 0);

  } catch (e) {
    console.log("Refresh balance error", e);
  }
};




const loadDeposits = async () => {

try{

const data = await AsyncStorage.getItem("@deposits")
const savedBalance = await AsyncStorage.getItem("@balance")
if(data){
setDeposits(JSON.parse(data))
}
if(savedBalance){
setBalance(Number(savedBalance))
}

setLoaded(true)

}catch(e){
console.log("Load deposit error",e)
}
}





// storage save

const saveDeposits = async (data,balanceValue)=>{

try{

await AsyncStorage.setItem("@deposits",JSON.stringify(data))
await AsyncStorage.setItem("@balance",balanceValue.toString())

}catch(e){
console.log("Save deposit error",e)
}

}





// add deposit
const addDeposit = (deposit)=>{

const newData = [deposit,...deposits]

setDeposits(newData)

// balance add
const newBalance = balance + Number(deposit.amount)
setBalance(newBalance)

saveDeposits(newData,newBalance)

setTimeout(()=>{

const updated = newData.map(item=>{

if(item.id === deposit.id){

const randomStatus = Math.random() > 0.3 ? "Approved" : "Rejected"

return {...item,status:randomStatus}

}

return item

})

setDeposits(updated)

saveDeposits(updated,newBalance)

},5000)

}





return(

<DepositContext.Provider 
value={{
    deposits,
    addDeposit,
    balance,
        setBalance,
        refreshBalance
        }}>
{children}
</DepositContext.Provider>

)

}