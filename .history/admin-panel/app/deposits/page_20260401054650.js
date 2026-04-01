"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Deposits() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("deposits").select("*");
    setList(data || []);
  };

  const approve = async (id) => {
    await supabase.from("deposits").update({ status: "Approved" }).eq("id", id);
    load();
  };

  const reject = async (id) => {
    await supabase.from("deposits").update({ status: "Rejected" }).eq("id", id);
    load();
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Deposits</h1>

      {list.map((d) => (
        <div key={d.id} className="bg-gray-800 p-3 mb-2">
          {d.amount} | {d.trx_id} | {d.status}

          {/* Screenshot */}
          {d.screenshot && (
            <img src={d.screenshot} width="100" alt="Screenshot" />
          )}

          <button onClick={() => approve(d.id)}>Approve</button>
          <button onClick={() => reject(d.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}