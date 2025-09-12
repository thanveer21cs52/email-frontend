import React, { useEffect, useState } from "react";

export default function MailHistory({ method, loadings, fn }: {
  method: "send" | "receive",
  loadings: { fetch: boolean, load: boolean } | null,
  fn: any
}) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false); 

  useEffect(() => {
    setHistory([]); 
    setLoading(true);
    setIsFetched(false); 

    const url =
      method === "send"
        ? "gethistory"
        : method === "receive"
        ? "getmails"
        : null;

    if (!url) {
      console.error("Invalid method:", method);
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3001/${url}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.data))
      .catch((err) => console.error("Error fetching history:", err))
      .finally(() => {
        setLoading(false);
        setIsFetched(true); 
      });
  }, [method]);

  useEffect(() => {
    if (!loadings) return;
    if (!loadings.fetch || !loadings.load) return setLoading(false);

    const fetchEmails = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://email-backend-1h0r.onrender.com/getmails");
        const data = await res.json();
        setHistory(data.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
        setIsFetched(true); // ✅ mark as fetched
        fn(false, false);
      }
    };

    fetchEmails();
  }, [loadings]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">📜 {method=='receive'&& 'Unread'} Mail History</h2>

      {loading || (loadings?.load && loadings.fetch) ? (
        <div className="text-white text-center">Fetching ...</div>
      ) : history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-sm gap-4 ">
          {history.map((item: any) => (
            <div
              key={item.id}
              className="border rounded-2xl shadow p-4 bg-white/30 hover:shadow-lg transition"
            >
              <div className="mb-2">
                <span className="font-semibold text-gray-300">From:</span>{" "}
                <span className="break-words w-3/4">{item.sender}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-300">To:</span>{" "}
                <span className=" break-words w-3/4">{item.receiver}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-300">Subject:</span>{" "}
                <span className="  break-words w-3/4">{item.subject}</span>
              </div>
              <div className="text-xs text-gray-400 text-right">
                {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : isFetched ? ( 
        <div className="text-white text-center">No mails found</div>
      ) : <div>...fetching</div>}
    </div>
  );
}
