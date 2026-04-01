"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";


export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
const router = useRouter();


  const login = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Invalid phone or password");
      return;
    }

    // শুধু admin বা agent ঢুকতে পারবে
    if (data.role !== "admin" && data.role !== "agent") {
      alert("You are not allowed!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "/dashboard";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-96 shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin / Agent Login
        </h2>

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}