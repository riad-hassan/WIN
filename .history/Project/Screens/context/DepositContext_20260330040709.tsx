import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);




  // 🔹 User ID fetch
  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      if (id) setUserId(Number(id));
    });
  }, []);





  // 🔹 Fetch balance once
  const fetchBalance = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setBalance(data.balance);
    }
  };





  useEffect(() => {
    if (userId) fetchBalance();
  }, [userId]);





  // 🔹 Realtime listener (safe, no double update)
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("balance")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          if (Number(payload.new.id) === Number(userId)) {
            // ⚡️ Double update avoid: check old vs new
            if (payload.new.balance !== balance) {
              setBalance(payload.new.balance);
            }
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);





  // 🔹 Optional backup interval (10 sec)
  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      fetchBalance(); // fetchBalance already safe
    }, 10000);

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