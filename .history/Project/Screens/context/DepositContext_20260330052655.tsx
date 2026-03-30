import React, { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);




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
          if (Number(payload.new.id) === Number(userId)) {
            
              setBalance(payload.new.balance);
            
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);





  // 🔹 Optional backup interval (10 sec) no change
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [userId]);





  return (
    <DepositContext.Provider
      value={{
        balance,
        fetchBalance,
        userId,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};