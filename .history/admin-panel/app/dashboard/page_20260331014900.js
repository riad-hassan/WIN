"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [tab, setTab] = useState("dashboard");

  // USERS state
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // DEPOSITS, WITHDRAW, PAYMENT, NOTIFICATION
  const [deposits, setDeposits] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [payments, setPayments] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [userBalances, setUserBalances] = useState({});

  // Modal states for withdraws
  const [withdrawModal, setWithdrawModal] = useState({}); // { [id]: { open: bool, adminNote: string } }

  // Load data from Supabase
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

    // Initialize balances
    const balances = {};
    (u || []).forEach(user => balances[user.id] = user.balance || 0);
    setUserBalances(balances);
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
  const handleWithdrawAction = async (w, action, note) => {
    await supabase.from("withdraw_requests").update({
      status: action,
      admin_note: note,
      approved_at: new Date().toISOString()
    }).eq("id", w.id);

    await supabase.from("notifications").insert({
      title: `Withdraw ${action}`,
      message: `Your withdraw request of ${w.amount} ৳ has been ${action}. Note: ${note}`,
      user_id: w.uid,
      type: "User"
    });

    setWithdrawModal(prev => ({ ...prev, [w.id]: { open: false, adminNote: "" } }));
    load();
    alert(`Withdraw ${action} & notification sent!`);
  };

  // ================= NOTIFICATION =================
  const sendNotification = async () => {
    await supabase.from("notifications").insert({
      title,
      message,
      type: "All"
    });
    alert("Notification Sent!");
    setTitle("");
    setMessage("");
  };

  // ================= PAYMENT =================
  const addPayment = async () => {
    if (!newNumber) return;
    await supabase.from("payment_numbers").insert({
      method: "bkash",
      number: newNumber
    });
    setNewNumber("");
    load();
  };

  // Filtered users based on search and role
  const filteredUsers = users.filter(u => {
    const matchesSearch = [u.phone, u.email, u.uid, u.username].some(
      field => field?.toLowerCase().includes(search.toLowerCase())
    );
    const matchesRole = filterRole ? u.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 text-white">

      {/* 🔥 TOP MENU */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["dashboard","users","deposits","withdraw","payments","notify"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${tab === t ? "bg-purple-600" : "bg-gray-800"}`}
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
        <div className="space-y-4 bg-gray-950 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Users Management</h2>

          {/* Search & Filter */}
          <div className="flex gap-2 flex-wrap mb-4">
            <input
              placeholder="Search by phone, email, UID, username..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="p-2 rounded bg-gray-800 text-white flex-1"
            />
            <select
              value={filterRole}
              onChange={(e) => { setFilterRole(e.target.value); setPage(1); }}
              className="p-2 rounded bg-gray-800 text-white"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Users List */}
          <div className="grid gap-4">
            {filteredUsers.map((u) => {
              const handleSaveBalance = async () => {
                await updateBalance(u.id, userBalances[u.id]);
                alert(`Balance updated for ${u.phone || u.uid}`);
              };

              return (
                <div key={u.id} className="bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700">
                  <div className="flex justify-between mb-2 text-gray-400 text-sm">
                    <span>ID: {u.id}</span>
                    <span>UID: {u.uid}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-white">
                    <div>
                      <p className="text-gray-300 text-sm">Phone</p>
                      <p className="font-medium">{u.phone || "-"}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="font-medium">{u.email || "-"}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Username</p>
                      <p className="font-medium">{u.username || "-"}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Referral</p>
                      <p className="font-medium">{u.referral || "-"}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Created At</p>
                      <p className="font-medium">{new Date(u.created_at).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Role</p>
                      <p className="font-medium">{u.role}</p>
                    </div>

                    {/* Balance Edit */}
                    <div className="col-span-2">
                      <p className="text-gray-300 text-sm">Balance</p>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="number"
                          value={userBalances[u.id] || 0}
                          onChange={(e) =>
                            setUserBalances(prev => ({ ...prev, [u.id]: Number(e.target.value) }))
                          }
                          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                        />
                        <button
                          onClick={handleSaveBalance}
                          className="bg-green-500 px-3 rounded hover:bg-green-600 transition"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Role Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => updateRole(u.id, "user")}
                      className={`px-3 py-1 rounded ${u.role === "user" ? "bg-green-500" : "bg-gray-700"}`}
                    >
                      User
                    </button>
                    <button
                      onClick={() => updateRole(u.id, "agent")}
                      className={`px-3 py-1 rounded ${u.role === "agent" ? "bg-blue-500" : "bg-gray-700"}`}
                    >
                      Agent
                    </button>
                    <button
                      onClick={() => updateRole(u.id, "admin")}
                      className={`px-3 py-1 rounded ${u.role === "admin" ? "bg-purple-500" : "bg-gray-700"}`}
                    >
                      Admin
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= DEPOSITS ================= */}
      {tab === "deposits" && (
        <div>
          <h2>Deposits</h2>
          {deposits.map((d) => (
            <div key={d.id} className="bg-gray-800 p-3 mb-2 rounded">
              {d.amount} | {d.status}
              {d.screenshot && (
                <img src={d.screenshot} className="w-32 mt-2" />
              )}
              <div className="flex gap-2 mt-2">
                <button onClick={() => updateDeposit(d.id,"Approved")} className="bg-green-500 px-2">Approve</button>
                <button onClick={() => updateDeposit(d.id,"Rejected")} className="bg-red-500 px-2">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= WITHDRAW ================= */}
      {tab === "withdraw" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Withdraw Requests</h2>

          {withdraws.length === 0 && (
            <p className="text-gray-400">No withdraw requests yet.</p>
          )}

          {withdraws.map((w) => {
            const modal = withdrawModal[w.id] || { open: false, adminNote: "" };
            const status = w.status || "Pending";

            return (
              <div key={w.id} className="bg-gray-800 p-5 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition relative">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-300 text-sm">Amount</p>
                    <p className="text-white font-semibold">{w.amount} ৳</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Status</p>
                    <p className={`font-semibold px-3 py-1 rounded-full text-sm ${
                      status === "Approved"
                        ? "bg-green-500 text-white"
                        : status === "Rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}>
                      {status}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-gray-300 text-sm">
                  <div>
                    <p>UID</p>
                    <p className="text-white font-medium">{w.uid}</p>
                  </div>
                  <div>
                    <p>Username</p>
                    <p className="text-white font-medium">{w.username || "-"}</p>
                  </div>
                  <div>
                    <p>Method</p>
                    <p className="text-white font-medium">{w.method}</p>
                  </div>
                  <div>
                    <p>Account Number</p>
                    <p className="text-white font-medium">{w.account_number}</p>
                  </div>
                  <div className="col-span-2">
                    <p>Admin Note</p>
                    <p className="text-white font-medium">{w.admin_note || "-"}</p>
                  </div>
                  <div>
                    <p>Requested At</p>
                    <p className="text-white font-medium">{new Date(w.created_at).toLocaleString()}</p>
                  </div>
                  {w.approved_at && (
                    <div>
                      <p>Approved At</p>
                      <p className="text-white font-medium">{new Date(w.approved_at).toLocaleString()}</p>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWithdrawModal(prev => ({ ...prev, [w.id]: { ...modal, open: true } }))}
                      className="flex-1 bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-md font-semibold"
                    >
                      Approve / Reject
                    </button>
                  </div>
                )}

                {/* Modal */}
                {modal.open && (
                  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-6 rounded-xl w-96">
                      <h3 className="text-xl font-bold text-white mb-4">Add Note & Action</h3>
                      <textarea
                        placeholder="Admin Note..."
                        className="w-full p-2 rounded bg-gray-800 text-white mb-4"
                        value={modal.adminNote}
                        onChange={(e) =>
                          setWithdrawModal(prev => ({ ...prev, [w.id]: { ...modal, adminNote: e.target.value } }))
                        }
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleWithdrawAction(w, "Approved", modal.adminNote)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleWithdrawAction(w, "Rejected", modal.adminNote)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => setWithdrawModal(prev => ({ ...prev, [w.id]: { open: false, adminNote: "" } }))}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification preview */}
                {status !== "Pending" && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm shadow-lg animate-pulse">
                    Notification sent!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= PAYMENT ================= */}
      {tab === "Payment Numbers" && (
        <div>
          <h2>Payment Numbers</h2>
          {payments.map((p) => (
            <div key={p.id} className="bg-gray-800 p-2 mb-2 rounded">
              {p.method} : {p.number}
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <input
              placeholder="New Number"
              className="text-black p-2 flex-1"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
            <button onClick={addPayment} className="bg-green-500 px-3">
              Add
            </button>
          </div>
        </div>
      )}

      {/* ================= NOTIFICATION ================= */}
      {tab === "notify" && (
        <div>
          <h2>Send Notification</h2>
          <input
            placeholder="Title"
            className="text-black p-2 block mb-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Message"
            className="text-black p-2 block mb-2 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendNotification} className="bg-purple-600 px-4 py-2 rounded">
            Send
          </button>
        </div>
      )}

    </div>
  );
}