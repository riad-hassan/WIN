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

  const [appPasswords, setAppPasswords] = useState([]);
const [newPassword, setNewPassword] = useState("");

const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  const u = localStorage.getItem("user");
  if (!u) {
    window.location.href = "/login";
    return;
  }
  setCurrentUser(JSON.parse(u));
}, []);







const filterByAgent = (me, users, data, type) => {
  if (me.role !== "agent") return data;

  if (type === "users") {
    return users.filter((u) => u.referral === me.uid);
  }

  if (type === "deposits") {
    return data.filter((d) =>
      users.some((u) => u.id === d.user_id && u.referral === me.uid)
    );
  }

  if (type === "withdraws") {
    return data.filter((w) =>
      users.some((u) => u.uid === w.uid && u.referral === me.uid)
    );
  }

  return data;
};


const loadAppPasswords = async () => {
  const { data, error } = await supabase
    .from("app_passwords")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error) setAppPasswords(data || []);
};

  // Load data from Supabase
  useEffect(() => {
    load();
  }, []);



  const load = async () => {
  try {
    const stored = localStorage.getItem("user");
    const me = stored ? JSON.parse(stored) : null;

    if (!me) return;

    // সব users
    const { data: allUsers, error: userError } = await supabase
      .from("users")
      .select("*");

    if (userError) throw userError;

    // Agent filter users
    const filteredUsers = filterByAgent(me, allUsers || [], allUsers || [], "users");

    // Deposits
    const { data: allDeposits, error: depError } = await supabase
      .from("deposits")
      .select("*");

    if (depError) throw depError;

    const filteredDeposits = filterByAgent(
      me,
      allUsers || [],
      allDeposits || [],
      "deposits"
    );


    // Withdraws
    const { data: allWithdraws, error: wError } = await supabase
      .from("withdraw_requests")
      .select("*");

    if (wError) throw wError;

    const filteredWithdraws = filterByAgent(
      me,
      allUsers || [],
      allWithdraws || [],
      "withdraws"
    );

    // Payments (ONLY ADMIN)
    let paymentsData = [];
    if (me.role === "admin") {
      const { data } = await supabase.from("payment_numbers").select("*");
      paymentsData = data || [];
    }

    // SET STATE
    setUsers(filteredUsers);
    setDeposits(filteredDeposits);
    setWithdraws(filteredWithdraws);
    setPayments(paymentsData);

    // balances
    const balances = {};
    filteredUsers.forEach((u) => {
      balances[u.id] = u.balance || 0;
    });
    setUserBalances(balances);

  } catch (err) {
    console.error("LOAD ERROR:", err.message);
    alert("Failed to load data!");
  }
};



useEffect(() => {
  loadAppPasswords();
}, []);

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


const togglePassword = async (p) => {
  await supabase
    .from("app_passwords")
    .update({ is_active: !p.is_active })
    .eq("id", p.id);

  loadAppPasswords();
};
 
  

  // ================= USERS =================
  const updateBalance = async (id, balance) => {
  if (currentUser?.role !== "admin") {
    alert("Only admin can update balance!");
    return;
  }

  await supabase.from("users").update({ balance }).eq("id", id);
  load();
};

  const updateRole = async (id, role) => {
  if (currentUser?.role !== "admin") {
    alert("Only admin can change roles!");
    return;
  }

  await supabase.from("users").update({ role }).eq("id", id);
  load();
};

  // ================= DEPOSITS =================
 const addAppPassword = async () => {
  if (!newPassword.trim()) return;

  await supabase.from("app_passwords").insert({
    password: newPassword.trim(),
  });

  setNewPassword("");
  loadAppPasswords();
};


const deleteAppPassword = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this password?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("app_passwords")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Delete failed: " + error.message);
  } else {
    loadAppPasswords();
  }
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



  const handleLogout = () => {
  const confirm = window.confirm("Are you sure you want to logout?");
  if (!confirm) return;

  localStorage.removeItem("user");
  window.location.href = "/login";
};



  // ===== Dashboard Summary Stats =====
const totalDepositAmount = deposits.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
const totalWithdrawAmount = withdraws.reduce((sum, w) => sum + (Number(w.amount) || 0), 0);

const pendingDeposits = deposits.filter(d => (d.status || "Pending") === "Pending").length;
const approvedDeposits = deposits.filter(d => d.status === "Approved").length;
const rejectedDeposits = deposits.filter(d => d.status === "Rejected").length;

const pendingWithdraws = withdraws.filter(w => (w.status || "Pending") === "Pending").length;
const approvedWithdraws = withdraws.filter(w => w.status === "Approved").length;
const rejectedWithdraws = withdraws.filter(w => w.status === "Rejected").length;


const getTabs = () => {
  if (!currentUser) return [];

  const baseTabs = ["dashboard", "users", "deposits", "withdraw"];

  if (currentUser.role === "admin") {
    return [...baseTabs, "payments", "notify", "appPasswords"];
  }

  return baseTabs; // agent / user
};

  return (
    <div className="p-4 text-white">

      {/* 🔥 TOP MENU */}
      <div className="flex gap-2 mb-6 flex-wrap">

      <div className="flex gap-2 mb-6 flex-wrap items-center justify-between">

  <div className="flex gap-2 flex-wrap">
    {getTabs().map((t) => (
      <button
        key={t}
        onClick={() => setTab(t)}
        className={`px-4 py-2 rounded ${
          tab === t ? "bg-purple-600" : "bg-gray-800"
        }`}
      >
        {t}
      </button>
    ))}
  </div>

  {/* 🔴 Logout Button */}
  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
  >
    Logout
  </button>

</div>

</div>

{/* 2️⃣ Tab Content */}
 <div className="tab-content">
  {tab === "dashboard" && ( 
  <div className="space-y-6">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-7 rounded-2xl shadow-xl border border-gray-800">
      <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
      <p className="text-gray-200 mt-2 text-sm">
        Manage users, deposits, withdraw requests and system settings.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full text-xs text-gray-200">
          System: Active
        </span>
        <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full text-xs text-gray-200">
          Total Users: {users.length}
        </span>
        <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full text-xs text-gray-200">
          Total Deposits: {deposits.length}
        </span>
        <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full text-xs text-gray-200">
          Total Withdraws: {withdraws.length}
        </span>
      </div>
    </div>

    {/* STATS CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl transition">
        <p className="text-gray-400 text-sm">Total Users</p>
        <p className="text-3xl font-bold text-white mt-2">{users.length}</p>
        <p className="text-green-400 text-sm mt-2">All registered users</p>
      </div>

      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl transition">
        <p className="text-gray-400 text-sm">Deposits</p>
        <p className="text-3xl font-bold text-white mt-2">{deposits.length}</p>
        <p className="text-yellow-400 text-sm mt-2">Pending: {pendingDeposits}</p>
      </div>

      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl transition">
        <p className="text-gray-400 text-sm">Withdraw Requests</p>
        <p className="text-3xl font-bold text-white mt-2">{withdraws.length}</p>
        <p className="text-yellow-400 text-sm mt-2">Pending: {pendingWithdraws}</p>
      </div>

      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl transition">
        <p className="text-gray-400 text-sm">Payment Numbers</p>
        <p className="text-3xl font-bold text-white mt-2">{payments.length}</p>
        <p className="text-purple-400 text-sm mt-2">Manage payment settings</p>
      </div>

    </div>

    {/* TOTAL AMOUNT SUMMARY */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-6 rounded-2xl shadow-xl border border-gray-800">
        <p className="text-gray-200 text-sm">Total Deposit Amount</p>
        <p className="text-3xl font-bold text-white mt-2">
          ৳ {totalDepositAmount.toLocaleString()}
        </p>
        <p className="text-gray-100 text-sm mt-2">
          Approved: {approvedDeposits} | Rejected: {rejectedDeposits}
        </p>
      </div>

      <div className="bg-gradient-to-r from-red-700 to-pink-600 p-6 rounded-2xl shadow-xl border border-gray-800">
        <p className="text-gray-200 text-sm">Total Withdraw Amount</p>
        <p className="text-3xl font-bold text-white mt-2">
          ৳ {totalWithdrawAmount.toLocaleString()}
        </p>
        <p className="text-gray-100 text-sm mt-2">
          Approved: {approvedWithdraws} | Rejected: {rejectedWithdraws}
        </p>
      </div>

    </div>

    {/* RECENT ACTIVITY */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

      {/* Latest Deposits */}
      <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">Latest Deposits</h3>

        {deposits.length === 0 ? (
          <p className="text-gray-500">No deposits found.</p>
        ) : (
          <div className="space-y-3">
            {deposits
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 6)
              .map((d) => (
                <div
                  key={d.id}
                  className="flex justify-between items-center bg-gray-900 p-3 rounded-xl border border-gray-800 hover:bg-gray-800 transition"
                >
                  <div>
                    <p className="text-white font-semibold">
                      ৳ {Number(d.amount).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      User ID: {d.user_id}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      d.status === "Approved"
                        ? "bg-green-600 text-white"
                        : d.status === "Rejected"
                        ? "bg-red-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {d.status || "Pending"}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Latest Withdraw */}
      <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">Latest Withdraw Requests</h3>

        {withdraws.length === 0 ? (
          <p className="text-gray-500">No withdraw requests found.</p>
        ) : (
          <div className="space-y-3">
            {withdraws
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 6)
              .map((w) => (
                <div
                  key={w.id}
                  className="flex justify-between items-center bg-gray-900 p-3 rounded-xl border border-gray-800 hover:bg-gray-800 transition"
                >
                  <div>
                    <p className="text-white font-semibold">
                      ৳ {Number(w.amount).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      UID: {w.uid}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      w.status === "Approved"
                        ? "bg-green-600 text-white"
                        : w.status === "Rejected"
                        ? "bg-red-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {w.status || "Pending"}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

    </div>

    {/* QUICK ACTIONS */}
    <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setTab("users")}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl font-semibold"
        >
          Users
        </button>

        <button
          onClick={() => setTab("deposits")}
          className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-xl font-semibold"
        >
          Deposits
        </button>

        <button
          onClick={() => setTab("withdraw")}
          className="bg-yellow-600 hover:bg-yellow-700 transition px-5 py-2 rounded-xl font-semibold"
        >
          Withdraws
        </button>

        <button
          onClick={() => setTab("payments")}
          className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-xl font-semibold"
        >
          Payments
        </button>

        <button
          onClick={() => setTab("notify")}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl font-semibold"
        >
          Notifications
        </button>
      </div>
    </div>

  </div>
)}


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




  {tab === "deposits" && ( <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white mb-4">Deposits</h2>

    {deposits.length === 0 && (
      <p className="text-gray-400">No deposit requests yet.</p>
    )}

    {deposits.map((d) => {
      const modal = depositModal[d.id] || { open: false, adminNote: "" };
      const status = d.status || "Pending";

      const handleDepositAction = async (newStatus) => {
  console.log("Updating deposit:", d.id, newStatus);

  // 1️⃣ Update deposit status
  const { data: depositData, error: depositError } = await supabase
    .from("deposits")
    .update({
      status: newStatus,
      admin_note: modal.adminNote,
      approved_at: new Date().toISOString(),
    })
    .eq("id", d.id)
    .select();

  if (depositError) {
    console.error("Deposit update error:", depositError.message);
    alert("Deposit update failed!");
    return;
  }

  // 2️⃣ Only add balance if Approved
  if (newStatus === "Approved") {
    // Fetch current balance
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("balance")
      .eq("id", d.user_id)
      .single();

    if (userError) {
      console.error("Fetch user error:", userError.message);
      alert("Failed to fetch user balance!");
      return;
    }

    const newBalance = (Number(userData.balance) || 0) + Number(d.amount);

    // Update balance
    const { error: updateError } = await supabase
      .from("users")
      .update({ balance: newBalance })
      .eq("id", d.user_id);

    if (updateError) {
      console.error("Balance update error:", updateError.message);
      alert("Balance update failed!");
      return;
    }

    console.log(`Balance updated for user ${d.user_id}: ${newBalance}`);
  }

  // 3️⃣ Send notification
  await supabase.from("notifications").insert({
    title: `Deposit ${newStatus}`,
    message: `Your deposit of ${d.amount} ৳ has been ${newStatus}. Note: ${modal.adminNote}`,
    user_id: d.user_id,
    type: "User",
  });

  // 4️⃣ Close modal
  setDepositModal((prev) => ({
    ...prev,
    [d.id]: { open: false, adminNote: "" },
  }));

  // 5️⃣ Reload data
  await load();

  alert(`Deposit ${newStatus} successful!`);
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
  </div> )}





  {tab === "withdraw" && ( <div className="space-y-4">
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
        </div> )}






  {tab === "payments" && (
    currentUser?.role === "admin" ? (
      ( <div className="bg-gray-950 p-6 rounded-xl text-white max-w-2xl mx-auto">
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
    </div> )
    ) : (
      <p className="text-red-500 font-bold text-center mt-4">
        Access Denied
      </p>
    )
  )}

  {tab === "notify" && (
    currentUser?.role === "admin" ? (
      ( <div className="bg-gray-950 p-6 rounded-xl text-white max-w-3xl mx-auto">
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
    </div> )
    ) : (
      <p className="text-red-500 font-bold text-center mt-4">
        Access Denied
      </p>
    )
  )}



{tab === "appPasswords" && (
  currentUser?.role === "admin" ? (
    <div className="bg-gray-950 p-6 rounded-xl text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">App Password Manager</h2>

      {/* Add password */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new password..."
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={addAppPassword}
          className="bg-green-500 px-4 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {appPasswords.length === 0 && (
          <p className="text-gray-400">No passwords found.</p>
        )}

        {appPasswords.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center bg-gray-800 p-3 rounded border border-gray-700"
          >
            <div>
              <p className="font-semibold">{p.password}</p>
              <p className="text-sm text-gray-400">
                {new Date(p.created_at).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => togglePassword(p)}
              className={`px-3 py-1 rounded ${
                p.is_active
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {p.is_active ? "Active" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-red-500 text-center">Access Denied</p>
  )
)}


</div>


    </div>
  );
}