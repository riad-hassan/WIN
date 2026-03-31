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
  const [editingId, setEditingId] = useState(null);
  const [editingNumber, setEditingNumber] = useState("");
  const [receiverUID, setReceiverUID] = useState(""); // Empty = All
  const [notifications, setNotifications] = useState([]);
  const [depositModal, setDepositModal] = useState({});
  // Modal states for withdraws
  const [withdrawModal, setWithdrawModal] = useState({}); // { [id]: { open: bool, adminNote: string } }


const [refferData, setRefferData] = useState({
  referral_link: "",
  referral_bonus: "",
  referral_commission: "",
  referral_status: "on",
});

const [refferLoading, setRefferLoading] = useState(false);





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

  // ===== Load Referral Settings =====
  const { data: refData, error: refError } = await supabase
    .from("Reffer")
    .select("*");

  if (!refError) {
    const refObj = {};
    (refData || []).forEach((item) => {
      refObj[item.key] = item.value;
    });

    setRefferData({
      referral_link: refObj.referral_link || "",
      referral_bonus: refObj.referral_bonus || "",
      referral_commission: refObj.referral_commission || "",
      referral_status: refObj.referral_status || "on",
    });
  }
  };

  


// Load payments from Supabase
  const loadPayments = async () => {
    const { data, error } = await supabase
      .from("payment_numbers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPayments(data || []);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

 
  // Start editing
  const startEdit = (p) => {
    setEditingId(p.id);
    setEditingNumber(p.number);
  };

  // Save edit
  const saveEdit = async () => {
    if (!editingNumber.trim()) return;

    const { error } = await supabase
      .from("payment_numbers")
      .update({ number: editingNumber.trim() })
      .eq("id", editingId);

    if (error) {
      alert("Error updating: " + error.message);
    } else {
      setEditingId(null);
      setEditingNumber("");
      loadPayments();
    }
  };

  // Delete number
  const deleteNumber = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this number?");
    if (!confirm) return;

    const { error } = await supabase.from("payment_numbers").delete().eq("id", id);

    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      loadPayments();
    }
  };



  // Load all notifications
  const loadNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setNotifications(data || []);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  

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
    receiver_uid: receiverUID || null,
    type: receiverUID ? "User" : "All"
  });

  alert("Notification Sent!");
  setTitle("");
  setMessage("");
  setReceiverUID("");
  loadNotifications();
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
        {["dashboard","users","deposits","withdraw","payments","notify", "reffer"].map(t => (
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
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white mb-4">Deposits</h2>

    {deposits.length === 0 && (
      <p className="text-gray-400">No deposit requests yet.</p>
    )}

    {deposits.map((d) => {
      const modal = depositModal[d.id] || { open: false, adminNote: "" };
      const status = d.status || "Pending";

      const handleDepositAction = async (newStatus) => {
        await supabase
          .from("deposits")
          .update({
            status: newStatus,
            admin_note: modal.adminNote,
            approved_at: new Date().toISOString(),
          })
          .eq("id", d.id);

        await supabase.from("notifications").insert({
          title: `Deposit ${newStatus}`,
          message: `Your deposit of ${d.amount} ৳ has been ${newStatus}. Note: ${modal.adminNote}`,
          user_id: d.user_id,
          type: "User",
        });

        setDepositModal((prev) => ({
          ...prev,
          [d.id]: { open: false, adminNote: "" },
        }));

        load();
        alert(`Deposit ${newStatus} & notification sent!`);
      };

      return (
        <div
          key={d.id}
          className="bg-gray-800 p-5 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition relative"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-300 text-sm">Amount</p>
              <p className="text-white font-semibold">{d.amount} ৳</p>
            </div>

            <div>
              <p className="text-gray-300 text-sm">Status</p>
              <p
                className={`font-semibold px-3 py-1 rounded-full text-sm ${
                  status === "Approved"
                    ? "bg-green-500 text-white"
                    : status === "Rejected"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {status}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-gray-300 text-sm">
            <div>
              <p>User ID</p>
              <p className="text-white font-medium">{d.user_id}</p>
            </div>
            <div>
              <p>Method</p>
              <p className="text-white font-medium">{d.method || "-"}</p>
            </div>
            <div>
              <p>TRX ID</p>
              <p className="text-white font-medium">{d.trx_id || "-"}</p>
            </div>
            <div>
              <p>User Number</p>
              <p className="text-white font-medium">{d.user_number || "-"}</p>
            </div>

            {d.screenshot && (
              <div className="col-span-2">
                <p>Screenshot</p>
                <img src={d.screenshot} className="w-48 mt-1 rounded" />
              </div>
            )}
          </div>

          {/* Action Button */}
          {status === "Pending" && (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setDepositModal((prev) => ({
                    ...prev,
                    [d.id]: { ...modal, open: true },
                  }))
                }
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
                <h3 className="text-xl font-bold text-white mb-4">
                  Add Note & Action
                </h3>

                <textarea
                  placeholder="Admin Note..."
                  className="w-full p-2 rounded bg-gray-800 text-white mb-4"
                  value={modal.adminNote}
                  onChange={(e) =>
                    setDepositModal((prev) => ({
                      ...prev,
                      [d.id]: { ...modal, adminNote: e.target.value },
                    }))
                  }
                  rows={4}
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDepositAction("Approved")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleDepositAction("Rejected")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      setDepositModal((prev) => ({
                        ...prev,
                        [d.id]: { open: false, adminNote: "" },
                      }))
                    }
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    })}
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
      {tab === "payments" && (
        <div className="bg-gray-950 p-6 rounded-xl text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Numbers Management</h2>

      {/* New Payment */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add new number..."
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <button
          onClick={addPayment}
          className="bg-green-500 px-4 rounded hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>

      {/* Payment List */}
      <div className="space-y-3">
        {payments.length === 0 && <p className="text-gray-400">No payment numbers found.</p>}

        {payments.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700 shadow hover:shadow-md transition"
          >
            {/* Number Display or Edit */}
            {editingId === p.id ? (
              <input
                type="text"
                value={editingNumber}
                onChange={(e) => setEditingNumber(e.target.value)}
                className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            ) : (
              <div className="flex-1">
                <p className="font-medium">{p.method.toUpperCase()} : {p.number}</p>
                <p className="text-gray-400 text-sm">{new Date(p.created_at).toLocaleString()}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 ml-4">
              {editingId === p.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(p)}
                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNumber(p.id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
      )}

      {/* ================= NOTIFICATION ================= */}
      {tab === "notify" && (
         <div className="bg-gray-950 p-6 rounded-xl text-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Notifications</h2>

      {/* Notification Form */}
      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Message"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Receiver UID (leave empty to notify all)"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={receiverUID}
          onChange={(e) => setReceiverUID(e.target.value)}
        />
        <button
          onClick={sendNotification}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold mb-2">Sent Notifications</h3>
        {notifications.length === 0 && (
          <p className="text-gray-400">No notifications sent yet.</p>
        )}

        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-3 bg-gray-800 rounded-lg border border-gray-700 shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-1">
              <p className="font-medium text-white">{n.title}</p>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  n.type === "All"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {n.type}
              </span>
            </div>
            <p className="text-gray-300 mb-1">{n.message}</p>
            {n.receiver_uid && (
              <p className="text-gray-400 text-sm">UID: {n.receiver_uid}</p>
            )}
            <p className="text-gray-500 text-xs">
              {new Date(n.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
      )}


{/* ================= reffer ================= */}
      {tab === "reffer" && (
  <div className="bg-gray-950 p-6 rounded-xl text-white max-w-3xl mx-auto shadow-lg border border-gray-800">
    <h2 className="text-2xl font-bold mb-2">Referral System Settings</h2>
    <p className="text-gray-400 mb-6">
      Manage referral link, bonus amount and referral status.
    </p>

    <div className="grid gap-4">

      {/* Referral Link */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
        <label className="block text-gray-300 mb-2 font-medium">
          Referral Link / Website URL
        </label>
        <input
          type="text"
          placeholder="https://yourdomain.com/register?ref="
          value={refferData.referral_link}
          onChange={(e) =>
            setRefferData((prev) => ({ ...prev, referral_link: e.target.value }))
          }
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <p className="text-gray-500 text-sm mt-2">
          Example: https://example.com/register?ref=
        </p>
      </div>

      {/* Referral Bonus */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
        <label className="block text-gray-300 mb-2 font-medium">
          Referral Bonus Amount (৳)
        </label>
        <input
          type="number"
          placeholder="Enter bonus amount"
          value={refferData.referral_bonus}
          onChange={(e) =>
            setRefferData((prev) => ({ ...prev, referral_bonus: e.target.value }))
          }
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <p className="text-gray-500 text-sm mt-2">
          Bonus will be added when referral user completes registration.
        </p>
      </div>

      {/* Referral Commission */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
        <label className="block text-gray-300 mb-2 font-medium">
          Referral Commission (%) 
        </label>
        <input
          type="number"
          placeholder="Enter commission percentage"
          value={refferData.referral_commission}
          onChange={(e) =>
            setRefferData((prev) => ({
              ...prev,
              referral_commission: e.target.value,
            }))
          }
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <p className="text-gray-500 text-sm mt-2">
          Example: 5 = 5% commission on deposits.
        </p>
      </div>

      {/* Referral Status */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
        <label className="block text-gray-300 mb-2 font-medium">
          Referral System Status
        </label>

        <select
          value={refferData.referral_status}
          onChange={(e) =>
            setRefferData((prev) => ({ ...prev, referral_status: e.target.value }))
          }
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
        >
          <option value="on">ON (Enabled)</option>
          <option value="off">OFF (Disabled)</option>
        </select>

        <p className="text-gray-500 text-sm mt-2">
          If OFF, referral bonus will not be given.
        </p>
      </div>

      {/* Preview */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-5 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
        <p className="text-sm text-gray-200">
          Referral Link Example:
        </p>
        <p className="bg-black bg-opacity-30 p-3 rounded-lg mt-2 font-mono text-sm break-all">
          {refferData.referral_link}
          USER123
        </p>
        <p className="mt-3 text-sm text-gray-200">
          Bonus: <span className="font-bold">{refferData.referral_bonus || 0} ৳</span>
        </p>
        <p className="text-sm text-gray-200">
          Commission: <span className="font-bold">{refferData.referral_commission || 0}%</span>
        </p>
        <p className="text-sm text-gray-200">
          Status:{" "}
          <span
            className={`font-bold ${
              refferData.referral_status === "on"
                ? "text-green-300"
                : "text-red-300"
            }`}
          >
            {refferData.referral_status.toUpperCase()}
          </span>
        </p>
      </div>

      {/* Save Button */}
      <button
        disabled={refferLoading}
        onClick={saveRefferSettings}
        className={`w-full py-3 rounded-xl font-bold transition ${
          refferLoading
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {refferLoading ? "Saving..." : "Save Referral Settings"}
      </button>
    </div>
  </div>
)}

    </div>
  );
}