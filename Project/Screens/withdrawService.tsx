import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const submitWithdrawRequest = async ({ method, amount, account_number }) => {
  const uid = await AsyncStorage.getItem("uid");
  const username = await AsyncStorage.getItem("@username");

  const { data, error } = await supabase.from("withdraw_requests").insert([
    {
      uid: uid,
      username: username,
      method: method,
      amount: amount,
      account_number: account_number,
      status: "Pending",
    },
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
};