import React, { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [deposits, setDeposits] = useState([]);
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);




  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem("user_id");
      if (id) setUserId(Number(id));
    };
    loadUserId();
  }, []);






  const refreshBalance = async () => {
    const id = await AsyncStorage.getItem("user_id");

    const { data } = await supabase
      .from("users")
      .select("balance")
      .eq("id", Number(id))
      .single();

    setBalance(data?.balance || 0);
  };






  const fetchDeposits = async () => {
    const id = await AsyncStorage.getItem("user_id");

    const { data } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", Number(id))
      .order("created_at", { ascending: false });

    setDeposits(data || []);
  };





  // initial load
  useEffect(() => {
    if (userId) {
      refreshBalance();
      fetchDeposits();
    }
  }, [userId]);





  // 🔥 deposit realtime
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("deposit")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deposits" },
        (payload) => {
          if (Number(payload.new?.user_id) === Number(userId)) {
            fetchDeposits();
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);






  // 🔥 balance realtime
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("balance")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          if (Number(payload.new?.id) === Number(userId)) {
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
        deposits,
        balance,
        refreshBalance,
        fetchDeposits,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};