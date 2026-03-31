"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("users").select("*");
    setUsers(data || []);
  };

  const makeAgent = async (id) => {
    await supabase.from("users").update({ role: "agent" }).eq("id", id);
    load();
  };

  const deleteUser = async (id) => {
    await supabase.from("users").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Users</h1>

      {users.map((u) => (
        <div key={u.id} className="bg-gray-800 p-3 mb-2 flex justify-between">
          <span>{u.phone} | {u.uid} | {u.balance}</span>

          <div className="space-x-2">
            <button onClick={() => makeAgent(u.id)}>Agent</button>
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}