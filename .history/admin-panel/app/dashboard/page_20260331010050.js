"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [tab, setTab] = useState("dashboard");

  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [payments, setPayments] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data: u } = await supabase.from("users").select("*");
    const { data: d } = await supabase.from("deposits").select("*");
    const { data: w } = await supabase.from("withdraw_requests").select("*");
    const { data: p } = await supabase.from("payment_numbers").select("*");

    setUsers(u || []);
    setDeposits(d || []);
    setWithdraws(w || []);
    setPayments(p || []);
  };

  // ================= USERS =================
  const updateBalance = async (id, balance) => {
    await supabase.from("users").update({ balance }).eq("id", id);
    load();
  };

  const updateRole = async (id, role) => {
    await supabase.from("users").update({ role }).eq("id", id);
    load();
  };

  // ================= DEPOSITS =================
  const updateDeposit = async (id, status) => {
    await supabase.from("deposits").update({ status }).eq("id", id);
    load();
  };

  // ================= WITHDRAW =================
  const updateWithdraw = async (id, status) => {
    await supabase.from("withdraw_requests").update({ status }).eq("id", id);
    load();
  };

  // ================= NOTIFICATION =================
  const sendNotification = async () => {
    await supabase.from("notifications").insert({
      title,
      message,
      type: "All"
    });
    alert("Notification Sent!");
  };

  // ================= PAYMENT =================
  const addPayment = async () => {
    await supabase.from("payment_numbers").insert({
      method: "bkash",
      number: newNumber
    });
    setNewNumber("");
    load();
  };

  return (
    <div className="p-4 text-white">

      {/* 🔥 TOP MENU */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["dashboard","users","deposits","withdraw","payments","notify"].map(t=>(
          <button
            key={t}
            onClick={()=>setTab(t)}
            className={`px-4 py-2 rounded ${
              tab===t ? "bg-purple-600" : "bg-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================= DASHBOARD ================= */}
      {tab === "dashboard" && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-600 p-5 rounded">Users: {users.length}</div>
          <div className="bg-green-600 p-5 rounded">Deposits: {deposits.length}</div>
          <div className="bg-red-600 p-5 rounded">Withdraw: {withdraws.length}</div>
        </div>
      )}

      {/* ================= USERS ================= */}
      {tab === "users" && (
        <div>
          <h2 className="mb-4">Users</h2>

          {users.map((u) => (
            <div key={u.id} className="bg-gray-800 p-3 mb-2 rounded">

              <div>{u.phone} | {u.uid}</div>
              <div>Balance: {u.balance}</div>
              <div>Role: {u.role}</div>

              {/* balance edit */}
              <input
                placeholder="New Balance"
                onBlur={(e)=>updateBalance(u.id, e.target.value)}
                className="text-black p-1 mt-2"
              />

              {/* role buttons */}
              <div className="flex gap-2 mt-2">
                <button onClick={()=>updateRole(u.id,"agent")} className="bg-blue-500 px-2">Agent</button>
                <button onClick={()=>updateRole(u.id,"admin")} className="bg-purple-500 px-2">Admin</button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ================= DEPOSITS ================= */}
      {tab === "deposits" && (
        <div>
          <h2>Deposits</h2>

          {deposits.map((d) => (
            <div key={d.id} className="bg-gray-800 p-3 mb-2 rounded">
              {d.amount} | {d.status}

              {/* screenshot */}
              {d.screenshot && (
                <img src={d.screenshot} className="w-32 mt-2" />
              )}

              <div className="flex gap-2 mt-2">
                <button onClick={()=>updateDeposit(d.id,"Approved")} className="bg-green-500 px-2">Approve</button>
                <button onClick={()=>updateDeposit(d.id,"Rejected")} className="bg-red-500 px-2">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= WITHDRAW ================= */}
      {tab === "withdraw" && (
        <div>
          <h2>Withdraw</h2>

          {withdraws.map((w) => (
            <div key={w.id} className="bg-gray-800 p-3 mb-2 rounded">
              {w.amount} | {w.status}

              <div className="flex gap-2 mt-2">
                <button onClick={()=>updateWithdraw(w.id,"Approved")} className="bg-green-500 px-2">Approve</button>
                <button onClick={()=>updateWithdraw(w.id,"Rejected")} className="bg-red-500 px-2">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= PAYMENT ================= */}
      {tab === "payments" && (
        <div>
          <h2>Payment Numbers</h2>

          {payments.map((p)=>(
            <div key={p.id} className="bg-gray-800 p-2 mb-2 rounded">
              {p.method} : {p.number}
            </div>
          ))}

          <input
            placeholder="New Number"
            className="text-black p-2 mt-2"
            value={newNumber}
            onChange={(e)=>setNewNumber(e.target.value)}
          />

          <button onClick={addPayment} className="bg-green-500 px-3 ml-2">
            Add
          </button>
        </div>
      )}

      {/* ================= NOTIFICATION ================= */}
      {tab === "notify" && (
        <div>
          <h2>Send Notification</h2>

          <input
            placeholder="Title"
            className="text-black p-2 block mb-2"
            onChange={(e)=>setTitle(e.target.value)}
          />

          <input
            placeholder="Message"
            className="text-black p-2 block mb-2"
            onChange={(e)=>setMessage(e.target.value)}
          />

          <button onClick={sendNotification} className="bg-purple-600 px-4 py-2">
            Send
          </button>
        </div>
      )}

    </div>
  );
}