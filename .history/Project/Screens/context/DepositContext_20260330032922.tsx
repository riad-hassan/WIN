import React, { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);

  // 🔹 1. UserId load
  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      console.log("Loaded userId:", id); // debug
      if (id) setUserId(Number(id));
    });
  }, []);





 

  useEffect(() => {
    if (userId) refreshBalance();
  }, [userId]);






  

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("balance")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          if (payload.new.id === userId) {
            refreshBalance();
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);


  const refreshBalance = async () => {
  try {
    if (!userId) return; // 🔥 IMPORTANT

    const { data, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", Number(userId))
      .single();

    if (error) {
      console.log("Balance fetch error:", error.message);
      return;
    }

    console.log("Fetched balance:", data.balance); // 🔥 debug

    setBalance(data?.balance || 0);
  } catch (e) {
    console.log("Balance error:", e);
  }
};

  return (
    <DepositContext.Provider
    value={{
      balance,
      refreshBalance,
      userId // 🔥 এটা add করো
    }}>
      {children}
    </DepositContext.Provider>
  );
};