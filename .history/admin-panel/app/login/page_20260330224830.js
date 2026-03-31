"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const login = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("phone", email)   // এখানে phone use করবো
    .eq("password", password)
    .single();

  if (error || !data) {
    alert("Invalid phone or password");
    return;
  }

  // role check
  if (data.role !== "admin") {
    alert("You are not admin");
    return;
  }

  // login success
  localStorage.setItem("user", JSON.stringify(data));

  window.location.href = "/dashboard";
};

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-96 shadow-lg">
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-white/20 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}