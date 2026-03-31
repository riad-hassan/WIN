"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [tab, setTab] = useState("dashboard");

  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data: u } = await supabase.from("users").select("*");
    const { data: d } = await supabase.from("deposits").select("*");
    const { data: w } = await supabase.from("withdraw_requests").select("*");

    setUsers(u || []);
    setDeposits(d || []);
    setWithdraws(w || []);
  };

  // deposit approve
  const approveDeposit = async (id) => {
    await supabase.from("deposits").update({ status: "Approved" }).eq("id", id);
    load();
  };

  const rejectDeposit = async (id) => {
    await supabase.from("deposits").update({ status: "Rejected" }).eq("id", id);
    load();
  };

  // withdraw
  const approveWithdraw = async (id) => {
    await supabase.from("withdraw_requests").update({ status: "Approved" }).eq("id", id);
    load();
  };

  const rejectWithdraw = async (id) => {
    await supabase.from("withdraw_requests").update({ status: "Rejected" }).eq("id", id);
    load();
  };

  // notification
  const sendNotification = async () => {
    await supabase.from("notifications").insert({
      title,
      message,
      type: "All"
    });
    alert("Sent!");
  };

  return (
    <div>

      {/* 🔥 MENU */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button onClick={() => setTab("dashboard")}>Dashboard</button>
        <button onClick={() => setTab("users")}>Users</button>
        <button onClick={() => setTab("deposits")}>Deposits</button>
        <button onClick={() => setTab("withdraw")}>Withdraw</button>
        <button onClick={() => setTab("notify")}>Notify</button>
      </div>

      {/* DASHBOARD */}
      {tab === "dashboard" && (
        <div>
          <h2>Total Users: {users.length}</h2>
          <h2>Total Deposits: {deposits.length}</h2>
          <h2>Total Withdraw: {withdraws.length}</h2>
        </div>
      )}

      {/* USERS */}
      {tab === "users" && (
        <div>
          <h1>Users</h1>

          {users.map((u) => (
            <div key={u.id} className="border p-2 mb-2">
              {u.phone} | {u.balance} | {u.role}

              <button
                onClick={() =>
                  supabase.from("users").update({ role: "agent" }).eq("id", u.id)
                }
              >
                Make Agent
              </button>

              <button
                onClick={() =>
                  supabase.from("users").update({ role: "admin" }).eq("id", u.id)
                }
              >
                Make Admin
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DEPOSITS */}
      {tab === "deposits" && (
        <div>
          <h1>Deposits</h1>

          {deposits.map((d) => (
            <div key={d.id} className="border p-2 mb-2">
              {d.amount} | {d.status}

              <button onClick={() => approveDeposit(d.id)}>Approve</button>
              <button onClick={() => rejectDeposit(d.id)}>Reject</button>
            </div>
          ))}
        </div>
      )}

      {/* WITHDRAW */}
      {tab === "withdraw" && (
        <div>
          <h1>Withdraw</h1>

          {withdraws.map((w) => (
            <div key={w.id} className="border p-2 mb-2">
              {w.amount} | {w.status}

              <button onClick={() => approveWithdraw(w.id)}>Approve</button>
              <button onClick={() => rejectWithdraw(w.id)}>Reject</button>
            </div>
          ))}
        </div>
      )}

      {/* NOTIFICATION */}
      {tab === "notify" && (
        <div>
          <h1>Send Notification</h1>

          <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Message" onChange={(e) => setMessage(e.target.value)} />

          <button onClick={sendNotification}>Send</button>
        </div>
      )}

    </div>
  );
}