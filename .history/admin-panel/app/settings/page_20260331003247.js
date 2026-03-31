"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Settings() {

  const [help, setHelp] = useState("");
  const [contact, setContact] = useState("");
  const [ref, setRef] = useState("");
  const [pay, setPay] = useState("");

  const saveHelp = async () => {
    await supabase.from("Help Center").upsert({
      key: "number",
      value: help
    });
    alert("Help Center Updated");
  };

  const saveContact = async () => {
    await supabase.from("Help Contact").upsert({
      key: "number",
      value: contact
    });
    alert("Contact Updated");
  };

  const saveRef = async () => {
    await supabase.from("Reffer").upsert({
      key: "link",
      value: ref
    });
    alert("Referral Updated");
  };

  const savePay = async () => {
    await supabase.from("payment_numbers").insert({
      method: "bkash",
      number: pay
    });
    alert("Payment Updated");
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Help Center */}
      <div className="bg-gray-800 p-4 rounded">
        <h2>Help Center Number</h2>
        <input onChange={(e) => setHelp(e.target.value)} />
        <button onClick={saveHelp}>Save</button>
      </div>

      {/* Contact */}
      <div className="bg-gray-800 p-4 rounded">
        <h2>Help Contact</h2>
        <input onChange={(e) => setContact(e.target.value)} />
        <button onClick={saveContact}>Save</button>
      </div>

      {/* Referral */}
      <div className="bg-gray-800 p-4 rounded">
        <h2>Referral Link</h2>
        <input onChange={(e) => setRef(e.target.value)} />
        <button onClick={saveRef}>Save</button>
      </div>

      {/* Payment */}
      <div className="bg-gray-800 p-4 rounded">
        <h2>Payment Number</h2>
        <input onChange={(e) => setPay(e.target.value)} />
        <button onClick={savePay}>Save</button>
      </div>

    </div>
  );
}