import React,{createContext,useState,useEffect} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const CashoutContext = createContext()

export const CashoutProvider = ({children}) => {

const [cashouts,setCashouts] = useState([])

useEffect(()=>{
loadCashouts()
},[])


const loadCashouts = async ()=>{

try{

const data = await AsyncStorage.getItem("@cashouts")

if(data){
setCashouts(JSON.parse(data))
}

}catch(e){
console.log(e)
}

}


const saveCashouts = async(data)=>{

await AsyncStorage.setItem("@cashouts",JSON.stringify(data))

}


const addCashout = (item)=>{

const newData = [item,...cashouts]

setCashouts(newData)

saveCashouts(newData)

}


return(

<CashoutContext.Provider value={{cashouts,addCashout}}>
{children}
</CashoutContext.Provider>

)

}