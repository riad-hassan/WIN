"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [users, setUsers] = useState(0);
  const [deposits, setDeposits] = useState(0);
  const [withdraws, setWithdraws] = useState(0);

  const [latestDeposits, setLatestDeposits] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);

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

    // latest data
    const { data: ld } = await supabase
      .from("deposits")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    const { data: lu } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setLatestDeposits(ld || []);
    setLatestUsers(lu || []);
  };

  return (
    <div className="space-y-6">

      {/* TOP STATS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl shadow">
          <h2 className="text-lg">Users</h2>
          <p className="text-2xl font-bold">{users}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl shadow">
          <h2 className="text-lg">Deposits</h2>
          <p className="text-2xl font-bold">{deposits}</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 rounded-xl shadow">
          <h2 className="text-lg">Withdraw</h2>
          <p className="text-2xl font-bold">{withdraws}</p>
        </div>
      </div>

      {/* LATEST DATA */}
      <div className="grid grid-cols-2 gap-6">

        {/* Latest Users */}
        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="mb-4 font-bold">Latest Users</h2>

          {latestUsers.map((u) => (
            <div key={u.id} className="border-b border-gray-700 py-2">
              {u.phone} | {u.uid}
            </div>
          ))}
        </div>

        {/* Latest Deposits */}
        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="mb-4 font-bold">Latest Deposits</h2>

          {latestDeposits.map((d) => (
            <div key={d.id} className="border-b border-gray-700 py-2">
              {d.amount} | {d.status}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}