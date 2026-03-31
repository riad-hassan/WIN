"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Layout({ children }) {
  

  useEffect(() => {
    getRole();
  }, []);

  const { data } = await supabase.auth.getUser();
const userId = data.user.id;

const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", userId)
  .single();

const role = profile?.role;

  return (
    <div className="flex h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-5">
        <h1 className="text-xl mb-6 font-bold">Panel</h1>

        <ul className="space-y-3">
          <li>Dashboard</li>

          {role === "admin" && (
            <>
              <li>Users</li>
              <li>Agents</li>
            </>
          )}

          <li>Deposits</li>
          <li>Withdraw</li>
          <li>Notifications</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1">
        <div className="bg-gray-900 p-4 flex justify-between">
          <span>{role}</span>

          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}