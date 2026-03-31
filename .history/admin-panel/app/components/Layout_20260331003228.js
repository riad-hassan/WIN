"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Layout({ children }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setRole(user.role);
  }, []);

  return (
    <div className="flex h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-5">
        <h1 className="text-xl mb-6 font-bold">Admin Panel</h1>

        <ul className="space-y-3">

          <li><Link href="/dashboard">📊 Dashboard</Link></li>

          {role === "admin" && (
            <>
              <li><Link href="/users">👤 Users</Link></li>
              <li><Link href="/agents">👑 Agents</Link></li>
              <li><Link href="/settings">⚙️ Settings</Link></li>
            </>
          )}

          <li><Link href="/deposits">💰 Deposits</Link></li>
          <li><Link href="/withdraw">💸 Withdraw</Link></li>
          <li><Link href="/notifications">🔔 Notifications</Link></li>

        </ul>
      </div>

      {/* Main */}
      <div className="flex-1">
        <div className="bg-gray-900 p-4 flex justify-between">
          <span>{role}</span>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-60px)]">
          {children}
        </div>
      </div>
    </div>
  );
}