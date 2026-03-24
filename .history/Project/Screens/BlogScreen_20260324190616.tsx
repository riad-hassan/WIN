import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import pay from '../Screens/assets/pay.png';
import suport from '../Screens/assets/suport.png';
import one from '../Screens/assets/one.png';
import two from '../Screens/assets/two.png';
import three from '../Screens/assets/three.png';
import four from '../Screens/assets/four.png';




export default function BlogScreen () {
    return(
        <ScrollView> 
            <View style={styles.container}> 
            <Image source={one}style={styles.one}/>
            <Image source={two}style={styles.two}/>
            <Image source={three}style={styles.three}/>
            <Image source={four}style={styles.four}/>
        </View>

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
        height: 2300,
        width: "98%",
        backgroundColor: "#f7d7d7ff",
        borderRadius: 15,
        margin: 5,
        marginTop: 15,
    },
one:{
    height: 500,
    width: 376,
    borderRadius: 15,
},
two:{
    height: 590,
    width: 376,
    marginTop: 10,
    borderRadius: 15,
},
three:{
    height: 700,
    width: 376,
    marginTop: 10,
    borderRadius: 15,
},
four:{
    height: 480,
    width: 376,
    marginTop: 10,
    borderRadius: 15,
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
   borderRadius: 5,
},


})