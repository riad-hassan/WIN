"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [users, setUsers] = useState(0);
  const [deposits, setDeposits] = useState(0);
  const [withdraws, setWithdraws] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data: u } = await supabase.from("users").select("*");
    const { data: d } = await supabase.from("deposits").select("*");
    const { data: w } = await supabase.from("withdraw_requests").select("*");

    setUsers(u?.length || 0);
    setDeposits(d?.length || 0);
    setWithdraws(w?.length || 0);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded">Users: {users}</div>
      <div className="bg-gray-800 p-6 rounded">Deposits: {deposits}</div>
      <div className="bg-gray-800 p-6 rounded">Withdraw: {withdraws}</div>
    </div>
  );
}