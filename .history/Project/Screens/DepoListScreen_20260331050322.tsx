import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import suport from '../Screens/assets/suport.png';
import { supabase } from "./supabase";
import { useEffect, useState } from "react";

export default function DepoListScreen() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  // একটাই useEffect
  useEffect(() => {
    // আগের ডাটা খালি করা
    setDeposits([]);
    setLoading(true);

    // ফাংশন ডিফাইন
    const fetchDeposits = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("deposits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Fetch deposits error:", error.message);
        setLoading(false);
        return;
      }

      setDeposits(data);
      setLoading(false);
    };

    // প্রথমবার কল
    fetchDeposits();

    // প্রতি 20 সেকেন্ড পর ফেচ করা
    const interval = setInterval(fetchDeposits, 20000);

    // ক্লিনআপ
    return () => clearInterval(interval);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView>
      {deposits.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.text}>কোনো তথ্য পাওয়া যায়নি</Text>
        </View>
      ) : (
        deposits.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text>Method: {item.method}</Text>
            <Text>Amount: {item.amount} Tk</Text>
            <Text>TRX ID: {item.trxId}</Text>
            <Text
              style={[
                styles.status,
                item.status === "Pending" && { color: "orange" },
                item.status === "Approved" && { color: "green" },
                item.status === "Rejected" && { color: "red" },
              ]}
            >
              Status: {item.status}
            </Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))
      )}

      <View style={styles.payImageContainer}>
        <Image source={suport} style={styles.payImage2} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "#f1f1f1ff",
    margin: 20,
    alignContent: "center",
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    marginTop: 150,
    fontSize: 18,
  },
  payImageContainer: {
    marginTop: 25,
    padding: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 3,
    alignItems: "center",
    borderRadius: 10,
  },
  payImage1: {
    height: 186,
    width: "98%",
  },
  payImage2: {
    height: 500,
    width: "98%",
  },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});