"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Withdraw() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("withdraw_requests").select("*");
    setList(data || []);
  };

  const approve = async (id) => {
    await supabase.from("withdraw_requests")
      .update({ status: "Approved" })
      .eq("id", id);
    load();
  };

  const reject = async (id) => {
  await supabase
    .from("withdraw_requests")
    .update({ status: "Rejected" })
    .eq("id", id);
};

  return (
    <div>
      <h1 className="text-xl mb-4">Withdraw</h1>

      {list.map((w) => (
        <div key={w.id} className="bg-gray-800 p-3 mb-2">
          {w.username} | {w.amount} | {w.status}

          <button onClick={() => approve(w.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}