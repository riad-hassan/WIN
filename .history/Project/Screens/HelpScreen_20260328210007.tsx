import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import support from "./assets/support.png";
import { supabase } from "./supabase";

export default function HelpScreen() {
  const [info, setInfo] = useState({ whatsapp_number: "", telegram_link: "" });
  const [loading, setLoading] = useState(true);

  const copyToClipboard = (text) => {
    if (!text) return;
    Clipboard.setString(text);
    ToastAndroid.show("✅ কপি করা হয়েছে", ToastAndroid.SHORT);
  };

  // লিংক লোড করা
  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .in("key", ["whatsapp_number", "telegram_link"]);

    if (error) return Alert.alert("Error fetching links", error.message);

    let newInfo = { whatsapp_number: "", telegram_link: "" };
    data.forEach((item) => {
      newInfo[item.key] = item.value;
    });
    setInfo(newInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

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
      <TouchableOpacity
        style={styles.numberBox}
        onPress={() => copyToClipboard(info.whatsapp_number)}
      >
        <Text style={styles.numberText}>📞 {info.whatsapp_number}</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>টেলিগ্রাম লিংকঃ</Text>
      <TouchableOpacity
        style={styles.numberBox}
        onPress={() => copyToClipboard(info.telegram_link)}
      >
        <Text style={styles.numberText}>🔗 {info.telegram_link}</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 10 },
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
});