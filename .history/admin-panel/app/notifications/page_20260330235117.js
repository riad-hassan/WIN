"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Notifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const send = async () => {
    await supabase.from("notifications").insert({
      title,
      message,
      type: "All",
    });

    alert("Sent!");
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Send Notification</h1>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={send}>Send</button>
    </div>
  );
}