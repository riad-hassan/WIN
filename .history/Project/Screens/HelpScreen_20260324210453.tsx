import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  Alert,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import support from "./assets/support.png";


export default function HelpScreen() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({ whatsapp_number: "", telegram_link: "" });
  const [saving, setSaving] = useState(false);


  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    ToastAndroid.show("✅ কপি করা হয়েছে", ToastAndroid.SHORT);
  };

  const handleUpdate = async () => {
    if (!editData.whatsapp_number || !editData.telegram_link) {
      Alert.alert("ত্রুটি", "সব ফিল্ড পূরণ করুন!");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("helpline")
      .update(editData)
      .eq("id", info.id);

    setSaving(false);

    if (error) {
      Alert.alert("❌ আপডেট ব্যর্থ", error.message);
    } else {
      Alert.alert("✅ হেল্পলাইন আপডেট হয়েছে");
      setInfo({ ...info, ...editData });
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>☎️ 24h Help Line</Text>
      <Text style={styles.subtitle}>আমাদের হেল্প লাইনে আপনাকে স্বাগতম</Text>

      <Image source={support} style={styles.image} />

      <Text style={styles.description}>
        আপনার যে কোনো সমস্যা সমাধানে বা কোনো কিছু জানার হলে আমাদের হেল্পলাইনের হোয়াটসঅ্যাপে যোগাযোগ করুন।
        আমাদের হেল্পলাইন চব্বিশ ঘন্টা আপনাদের সেবার জন্য প্রস্তুত।
      </Text>

      <Text style={styles.subtitle}>হোয়াটসঅ্যাপ নাম্বারঃ</Text>
      
        <TextInput
          style={styles.input}
          value={editData.whatsapp_number}
          onChangeText={(text) => setEditData({ ...editData, whatsapp_number: text })}
          placeholder="WhatsApp নাম্বার"
        />
     
        <TouchableOpacity
          style={styles.numberBox}
          onPress={() => copyToClipboard(info?.whatsapp_number)}
        >
          <Text style={styles.numberText}>📞 {info?.whatsapp_number} </Text>
        </TouchableOpacity>


      <Text style={styles.subtitle}>টেলিগ্রাম লিংকঃ</Text>
      
        <TextInput
          style={styles.input}
          value={editData.telegram_link}
          onChangeText={(text) => setEditData({ ...editData, telegram_link: text })}
          placeholder="Telegram লিংক"
        />
      
        <TouchableOpacity
          style={styles.numberBox}
          onPress={() => copyToClipboard(info?.telegram_link)}
        >
          <Text style={styles.numberText}>{info?.telegram_link}</Text>
        </TouchableOpacity>
      

      

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 10 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#f83232", marginBottom: 10 },
  subtitle: { fontSize: 20, fontWeight: "600", textAlign: "center", marginVertical: 5 },
  image: { width: "100%", height: 250, resizeMode: "contain", marginVertical: 20 },
  description: { fontSize: 18, lineHeight: 28, textAlign: "justify", marginHorizontal: 5, marginBottom: 15 },
  numberBox: {
    backgroundColor: "#faeded",
    borderColor: "#111",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 12,
  },
  numberText: { fontSize: 18, fontWeight: "500", textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#e30613",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 12,
    fontSize: 18,
  },
  saveBtn: {
    backgroundColor: "#e30613",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});