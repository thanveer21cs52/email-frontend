import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate,faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";

function Allmails() {
  const [refreshing, setRefreshing] = useState(false);
  const [unreadMails, setUnreadMails] = useState<any[]>([]);
  const [allMails, setAllMails] = useState<any[]>([]);

  const [unreadPage, setUnreadPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const limit = 10;

  async function fetchUnreadMails(page = 0) {
    try {
      setRefreshing(true);
      const res = await fetch(`https://email-backend-1h0r.onrender.com/sync-delta`);
      const data = await res.json();
      setUnreadMails(data.data || []);
    } catch (err) {
      console.error("Error fetching unread mails:", err);
    } finally {
      setRefreshing(false);
    }
  }

  async function fetchAllMails(page = 0) {
    try {
      setRefreshing(true);
      const res = await fetch(`https://email-backend-1h0r.onrender.com/get-mails?limit=${limit}&offset=${page * limit}`);
      const data = await res.json();
      setAllMails(data.data || []);
    } catch (err) {
      console.error("Error fetching all mails:", err);
    } finally {
      setRefreshing(false);
    }
  }

  async function refreshMail() {
    await fetchUnreadMails(unreadPage);
    await fetchAllMails(allPage);
  }
  
const didFetch = React.useRef(false);

useEffect(() => {
  if (!didFetch.current) {
    refreshMail();
    didFetch.current = true;
  }
}, []);

  return (
    <div className="p-6 min-h-screen text-white space-y-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📧 Mail Dashboard</h1>
        <button
          className="text-gray-300 bg-gray-800/50 hover:bg-gray-700/60 p-3 rounded-full transition-transform transform hover:scale-110"
          onClick={refreshMail}
        >
          <FontAwesomeIcon icon={faArrowsRotate} spin={refreshing} className="text-white text-xl" />
        </button>
      </div>

    
      <div className="bg-gray-800/10 backdrop-blur-md p-5 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            Unread Mails
            {unreadMails.length > 0 && (
              <span className="ml-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                {unreadMails.length}
              </span>
            )}
          </h3>
        </div>

        {refreshing ? (
          <p className="text-center text-gray-300 py-4">Loading...</p>
        ) : unreadMails.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-sm">
              {unreadMails.map((mail) => (
                <div
                  key={mail.id}
                  className="p-4 rounded-2xl shadow-lg bg-white/10 backdrop-blur-sm  transition cursor-pointer"
                >
                  <div className="mb-2"><strong>From:</strong> {mail.sender}</div>
                  <div className="mb-2"><strong>To:</strong> {mail.receiver}</div>
                  <div className="mb-2"><strong>Subject:</strong> {mail.subject}</div>
                  <div className="text-xs text-gray-400 text-right">
                    {new Date(mail.received_at || mail.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
             {unreadMails.length>10&&
              <div className="flex justify-between mt-5">
              <button
                disabled={unreadPage === 0}
                onClick={() => {setUnreadPage(unreadPage - 1)
                    refreshMail()
                }}
                className="px-5 py-2 bg-white/30 hover:bg-white rounded-lg shadow transition disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => {setUnreadPage(unreadPage + 1)
                    refreshMail()
                }}
                className="px-5 py-2 bg-white/30 hover:bg-white rounded-lg shadow transition"
              >
                Next
              </button>
            </div>
             
             }
           
          </>
        ) : (
          <p className="text-gray-400 text-center py-4">No unread mails 🎉</p>
        )}
      </div>

     
      <div className="bg-black-800/50 backdrop-blur-md p-5 rounded-3xl shadow-xl">
        <h3 className="text-xl font-semibold mb-4">All Mails</h3>
        {refreshing ? (
          <p className="text-center text-gray-300 py-4">Loading...</p>
        ) : allMails.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {allMails.map((mail) => (
                <div
                  key={mail.id}
                  className="p-4 rounded-2xl shadow-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition cursor-pointer"
                >
                  <div className="mb-2"><strong>From:</strong> {mail.sender}</div>
                  <div className="mb-2"><strong>To:</strong> {mail.receiver}</div>
                  <div className="mb-2"><strong>Subject:</strong> {mail.subject}</div>
                  <div className="text-xs text-gray-400 text-right">
                    {new Date(mail.received_at || mail.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-5">
              <button
                disabled={allPage === 0}
                onClick={() => {setAllPage(allPage - 1)
                    refreshMail()
                }}
                className="px-5 py-2 bg-white/30 hover:bg-white/10 rounded-lg shadow transition disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => {setAllPage(allPage + 1)
                     refreshMail()}}
                className="px-5 py-2 bg-white/30 hover:bg-white/10 rounded-lg shadow transition"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center py-4">No mails found</p>
        )}
      </div>
    </div>
  );
}

export default Allmails;
