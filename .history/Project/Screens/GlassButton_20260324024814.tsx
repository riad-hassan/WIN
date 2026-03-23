import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {BlurView} from "@react-native-community/blur";

export default function GlassButton({title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <BlurView
          style={styles.blur}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    width:120,
    height:50,
    borderRadius:12,
    overflow:"hidden",
    justifyContent:"center",
    alignItems:"center",
    margin:5,
    borderWidth:1,
    borderColor:"rgba(255,255,255,0.3)",
    shadowColor:"#000",
    shadowOpacity:0.25,
    shadowRadius:8,
    shadowOffset:{width:0,height:5},
  },
  blur:{
    ...StyleSheet.absoluteFillObject,
  },
  text:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16,
  }
});