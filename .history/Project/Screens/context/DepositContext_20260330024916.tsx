import React, { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      if (id) setUserId(Number(id));
    });
  }, []);

  const refreshBalance = async () => {
    const { data } = await supabase
      .from("users")
      .select("balance")
      .eq("id", userId)
      .single();

    setBalance(data?.balance || 0);
  };

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