import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faFileExcel } from "@fortawesome/free-solid-svg-icons";

function SendMailViaExcel() {
  const [excelsubmit, setExcelsubmit] = useState(false);
  const [excelsend, setExcelsend] = useState<any[]>([]);

  async function handleExcelemail(e: any) {
    e.preventDefault();
    setExcelsubmit(true);

    const formData = new FormData(e.currentTarget);
    const req = await fetch("https://email-backend-1h0r.onrender.com/excel/send-email", {
      method: "POST",
      body: formData,
    });

    const result = await req.json();
    if (result.message === "success") {
      setExcelsend(result.data);
    } else {
      alert("❌ Failed to send mail via Excel");
    }

    setExcelsubmit(false);
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen px-4 py-10 text-white ">

      <div className="w-full max-w-lg rounded-2xl shadow-2xl p-8 border bg-black/50 backdrop-blur-sm border-white/10">
   
        <div className="flex flex-col items-center mb-6">
          <FontAwesomeIcon
            icon={faFileExcel}
            className="text-blue-400 text-4xl mb-2"
          />
          <h2 className="text-2xl font-bold tracking-wide">
            Send Mail via Excel
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Upload your Excel sheet to send bulk emails easily
          </p>
        </div>

   
        {excelsubmit ? (
          <div className="flex justify-center items-center gap-3 py-8 animate-pulse">
            <FontAwesomeIcon
              icon={faGear}
              spin
              className="text-yellow-400 text-3xl"
            />
            <span className="font-semibold text-lg">Sending mails...</span>
          </div>
        ) : (
          <form
            className="flex flex-col gap-5"
            encType="multipart/form-data"
            onSubmit={handleExcelemail}
          >
       
            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 text-sm space-y-2">
              <p className="text-yellow-300 font-semibold">
                ! Excel Requirements:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-200">
                <li>Email – required</li>
                <li>Subject – optional</li>
                <li>Message – optional</li>
                <li className="text-red-400">No Attachments Supported</li>
              </ul>
            </div>


            <input
              type="file"
              name="file"
              className="    block w-full text-sm text-gray-300
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-700 file:text-white
    hover:file:bg-blue-600
    cursor-pointer"
            />

            <button
              className="bg-blue-700 hover:bg-blue-600 rounded-xl px-6 py-3 text-lg font-semibold shadow-md transition-all duration-200"
            >
             Send Mails
            </button>
          </form>
        )}
      </div>

   
      {excelsend.length > 0 && (
        <div className="mt-8 w-full max-w-4xl bg-white/10 rounded-2xl p-6 shadow-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-5">
            📜 Last Mail History{" "}
            <span className="text-gray-300 text-lg">
              ({excelsend[0].filename})
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {excelsend.map((item: any) => (
              <div
                key={item.id}
                className="border border-white/20 rounded-xl shadow p-4 bg-black/40 flex flex-col gap-2 hover:bg-black/60 transition-all duration-200"
              >
                <p><b>From:</b> {item.from}</p>
                <p><b>To:</b> {item.email}</p>
                <p><b>Subject:</b> {item.subject || "(No Subject)"}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold ${
                      item.sended ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.sended ? " Success" : " Failed"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SendMailViaExcel;
