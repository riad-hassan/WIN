import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import suport from '../Screens/assets/suport.png';
import { useContext } from "react";
import { CashoutContext } from "./context/CashoutContext";



export default function WithDrawListScreen () {

const { cashouts } = useContext(CashoutContext);

// ✅ EMPTY LIST UI
  if (!cashouts || cashouts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>কোনো তথ্য পাওয়া যায়নি</Text>

        <Image source={suport} style={styles.emptyImage} />
      </View>
    );
  }

  
return(

<ScrollView>

{cashouts.length === 0 ? (

<View style={styles.container}>
<Text style={styles.text}>কোনো তথ্য পাওয়া যায়নি</Text>
</View>

) : (

cashouts.map((item)=>(
<View key={item.id} style={styles.card}>

<Text>Method: {item.method}</Text>
<Text>Amount: {item.amount} Tk</Text>
<Text style={[
styles.status,
item.status === "Pending" && {color:"orange"},
item.status === "Approved" && {color:"green"},
item.status === "Rejected" && {color:"red"},
]}>
Status: {item.status}
</Text>

<Text style={styles.time}>{item.time}</Text>

</View>
))

)}

<View style={styles.payImageContainer}>
<Image source={suport} style={styles.payImage2}/>
</View>

</ScrollView>

)

}




const styles = StyleSheet.create ({
    container: {
        height: 300,
        backgroundColor: "#f1f1f1ff",
        margin: 20,
        alignContent: 'center',
        alignSelf: 'center',
    },
    text: {
        alignSelf: 'center',
        marginTop: 150,
        fontSize: 18,
    },
payImageContainer: {
    marginTop: 25,
    padding: 1,          // 🔹 ভিতরে কিছু স্পেস
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 12,
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
card:{
backgroundColor:"#fff",
margin:10,
padding:15,
borderRadius:10,
elevation:3
},
status:{
marginTop:5,
fontWeight:"bold"
},

time:{
fontSize:12,
color:"#777",
marginTop:4
},


})