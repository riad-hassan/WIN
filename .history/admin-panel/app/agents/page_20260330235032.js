"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("role", "agent");

    setAgents(data || []);
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Agents</h1>

      {agents.map((a) => (
        <div key={a.id} className="bg-gray-800 p-3 mb-2">
          {a.phone} | {a.uid}
        </div>
      ))}
    </div>
  );
}