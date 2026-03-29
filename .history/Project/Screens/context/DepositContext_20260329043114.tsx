import React, { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [deposits, setDeposits] = useState([]);
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);

  // ✅ user_id load from AsyncStorage
  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem("user_id");
      if (id) setUserId(Number(id));
    };

    loadUserId();
  }, []);



  const withdrawBalance = async (amount) => {
  try {
    const id = await AsyncStorage.getItem("user_id");
    if (!id) return;

    const newBalance = balance - Number(amount);

    if (newBalance < 0) return;

    // ✅ Supabase balance update
    const { error } = await supabase
      .from("users")
      .update({ balance: newBalance })
      .eq("id", Number(id));

    if (error) {
      console.log("Withdraw balance error:", error.message);
      return;
    }

    // ✅ UI instantly update
    setBalance(newBalance);

  } catch (e) {
    console.log("Withdraw balance error:", e);
  }
};


const addBalance = async (amount) => {
  try {
    const id = await AsyncStorage.getItem("user_id");
    if (!id) return;

    const newBalance = balance + Number(amount);

    const { error } = await supabase
      .from("users")
      .update({ balance: newBalance })
      .eq("id", Number(id));

    if (error) {
      console.log("Add balance error:", error.message);
      return;
    }

    setBalance(newBalance);

  } catch (e) {
    console.log("Add balance error:", e);
  }
};




  // ✅ Refresh balance from Supabase
  const refreshBalance = useCallback(async () => {
    try {
      const id = await AsyncStorage.getItem("user_id");
      if (!id) return;

      const { data, error } = await supabase
        .from("users")
        .select("balance")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.log("Refresh balance error:", error.message);
        return;
      }

      setBalance(data?.balance || 0);
    } catch (e) {
      console.log("Refresh balance error:", e);
    }
  }, []);

  // ✅ Load deposits list from Supabase
  const fetchDeposits = useCallback(async () => {
    try {
      const id = await AsyncStorage.getItem("user_id");
      if (!id) return;

      const { data, error } = await supabase
        .from("deposits")
        .select("*")
        .eq("user_id", Number(id))
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Fetch deposits error:", error.message);
        return;
      }

      setDeposits(data || []);
    } catch (e) {
      console.log("Fetch deposits error:", e);
    }
  }, []);

  // ✅ App open হলে প্রথমেই fetch করবে
  useEffect(() => {
    if (userId) {
      refreshBalance();
      fetchDeposits();
    }
  }, [userId]);

  // ✅ Realtime listener for deposits update
  useEffect(() => {
    if (!userId) return;

    const depositChannel = supabase
      .channel("deposit-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deposits" },
        (payload) => {
          // শুধু নিজের deposit হলে refresh
          if (payload.new?.user_id === userId) {
            fetchDeposits();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(depositChannel);
    };
  }, [userId]);

  // ✅ Realtime listener for balance update
  useEffect(() => {
    if (!userId) return;

    const balanceChannel = supabase
      .channel("balance-update")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          if (payload.new?.id === userId) {
            refreshBalance();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(balanceChannel);
    };
  }, [userId]);

  // ✅ Deposit add (UI instant add না, শুধু list refresh করবে)
  const addDeposit = async () => {
    fetchDeposits();
    refreshBalance();
  };

  return (
    <DepositContext.Provider
      value={{
        deposits,
        balance,
        refreshBalance,
        fetchDeposits,
        addDeposit,
        setBalance, 
        withdrawBalance,
        addBalance 
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};