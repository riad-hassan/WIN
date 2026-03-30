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



// 🔹 Withdraw function (Instant deduction)no change
const withdrawBalance = async (amount) => {
    try {
      if (!userId) return false;

      const { data, error } = await supabase
        .from("users")
        .select("balance")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("Withdraw fetch error:", error.message);
        return false;
      }

      const currentBalance = Number(data.balance) || 0;
      const newBalance = currentBalance - Number(amount);

      if (newBalance < 0) return false;

      const { error: updateError } = await supabase
        .from("users")
        .update({ balance: newBalance })
        .eq("id", userId);

      if (updateError) {
        console.log("Withdraw update error:", updateError.message);
        return false;
      }

      setBalance(newBalance);
      return true;
    } catch (e) {
      console.log("Withdraw error:", e);
      return false;
    }
  };

  // ✅ Add balance (Win হলে)
  const addBalance = async (amount) => {
    try {
      if (!userId) return false;

      const { data, error } = await supabase
        .from("users")
        .select("balance")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("Add fetch error:", error.message);
        return false;
      }

      const currentBalance = Number(data.balance) || 0;
      const newBalance = currentBalance + Number(amount);

      const { error: updateError } = await supabase
        .from("users")
        .update({ balance: newBalance })
        .eq("id", userId);

      if (updateError) {
        console.log("Add update error:", updateError.message);
        return false;
      }

      setBalance(newBalance);
      return true;
    } catch (e) {
      console.log("Add error:", e);
      return false;
    }
  };





  return (
    <DepositContext.Provider
      value={{
        balance,
        fetchBalance,
        userId,
        withdrawBalance,
        addBalance,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};