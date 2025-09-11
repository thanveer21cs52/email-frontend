import React, { useEffect, useState } from "react";

export default function MailHistory({method}:{ method: "send" | "receive"}) {
  const [history, setHistory] = useState([]);
  const [loading,setloading]=useState(false)

 useEffect(() => {
  setHistory([])
  setloading(true)


  const url =
    method == "send"
      ? "gethistory"
      : method == "receive"
      ? "read-mails"
      : null;

  if (!url) {
    console.error("Invalid method:", method);
    setloading(false);
    return;
  }

  fetch(`https://email-backend-1h0r.onrender.com/${url}`)
    .then((res) => res.json())
    .then((data) => setHistory(data.data))
    .catch((err) => console.error("Error fetching history:", err))
    .finally(() => setloading(false));
}, [method]); 


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">📜 Mail History</h2>

    {history.length>0?
      <div className="grid grid-cols-1  gap-4">
        {history.map((item:any) => (
          <div
            key={item.id}
            className="border rounded-2xl shadow p-4 bg-white/30 hover:shadow-lg transition"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-300">From:</span>{" "}
              {item.sender}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-300">To:</span>{" "}
              {item.receiver}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-300">Subject:</span>{" "}
              {item.subject}
            </div>
            
            <div className="text-xs text-gray-400 text-right">
              {new Date(item.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>:<div className="text-white">fetching ....</div>}
    </div>
  );
}
