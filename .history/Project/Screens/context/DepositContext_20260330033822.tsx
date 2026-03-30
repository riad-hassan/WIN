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





  // 🔹 2. Balance fetch function
  const refreshBalance = async () => {
    if (!userId) return; // userId না থাকলে skip
    const { data, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", Number(userId))
      .single();
    if (error) return console.log(error);
    setBalance(data?.balance || 0);
  };






  // 🔹 3. UserId load হয়ে গেলে একবার fetch
  useEffect(() => {
    if (userId) refreshBalance();
  }, [userId]);





  // 🔹 4. Realtime update listener
 useEffect(() => {
  if (!userId) return;

  const channel = supabase
    .channel("balance")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "users" },
      (payload) => {
        if (Number(payload.new.id) === Number(userId)) {
          // 🔹 Old balance vs new balance check
          if (payload.new.balance !== balance) {
            setBalance(payload.new.balance);
          }
        }
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [userId, balance]); // ⚡️ balance dependency add





  return (
    <DepositContext.Provider value={{ balance, refreshBalance, userId }}>
      {children}
    </DepositContext.Provider>
  );
};