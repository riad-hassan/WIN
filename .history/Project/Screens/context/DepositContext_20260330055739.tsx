import React, { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);
const [freezeRealtime, setFreezeRealtime] = useState(false);



  // 🔹 User ID fetch no change
  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      if (id) setUserId(Number(id));
    });
  }, []);





  // 🔹 Fetch balance once no change
  const fetchBalance = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", userId)
      .single();

    if (!error && data) setBalance(data.balance);
  }, [userId]);




 // no change
  useEffect(() => {
    if (userId) fetchBalance();
  }, [userId]);





  // 🔹 Realtime listener no change
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("balance")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          if (freezeRealtime) return;
          if (Number(payload.new.id) === Number(userId)) {
            
              setBalance(payload.new.balance);
            
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId, freezeRealtime]);





  // 🔹 Optional backup interval (10 sec) no change
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [userId]);





// 🔹 Withdraw function (Instant deduction)
const withdrawBalance = async (amount) => {
  if (!userId) return;

  // Step 1: Update local state immediately
  setBalance(prev => prev - amount);

  // Step 2: Update Supabase balance
  const { data, error } = await supabase
    .from("users")
    .update({ balance: balance - amount })  // direct subtraction works
    .eq("id", userId);

  if (error) {
    console.log("Balance update failed:", error);
    setBalance(prev => prev + amount); // rollback
    return false;
  }

  return true;
};





  return (
    <DepositContext.Provider
      value={{
        balance,
        fetchBalance,
        userId,
        withdrawBalance,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};