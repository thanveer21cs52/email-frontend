import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function SendMail() {
  const [email, setEmail] = useState({ success: false, submited: false });

  async function handleEmail(e: any) {
    e.preventDefault();
    setEmail((prev) => ({ ...prev, submited: true }));

    const formData: any = new FormData(e.currentTarget);

    const req = await fetch("https://email-backend-1h0r.onrender.com/send-email", {
      method: "POST",
      body: formData,
    });

    const result = await req.json();
    if (result.message === "success") {
      setEmail((prev) => ({ ...prev, success: true }));
      alert("✅ Successfully mailed");
    } else {
      alert("❌ Failed to send");
    }

    setEmail({ success: false, submited: false });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      {email.submited ? (
        <div className="flex justify-center items-center text-yellow-50 gap-2 animate-pulse">
          <FontAwesomeIcon icon={faGear} spin className="text-4xl" />
          <span className="text-4xl font-semibold">Sending...</span>
        </div>
      ) : (
        <form
          className="bg-black/40 rounded-md p-6 shadow-md flex flex-col gap-3 w-full max-w-sm text-white"
          encType="multipart/form-data"
          onSubmit={handleEmail}
        >
          <h2 className="text-xl font-bold text-center mb-3">Send Email</h2>

          <label className="text-sm font-medium">Email:</label>
          <input type="email" name="to" className="border rounded px-2 py-1 text-sm bg-white/10" />

          <label className="text-sm font-medium">Subject:</label>
          <input type="text" name="subject" className="border rounded px-2 py-1 text-sm bg-white/10" />

          <label className="text-sm font-medium">Message:</label>
          <textarea rows={3} name="message" className="border rounded px-2 py-1 text-sm bg-white/10"></textarea>

          <label className="text-sm font-medium">Attachment:</label>
          <input type="file" name="attachments" multiple className="    block w-full text-sm text-gray-300
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-700 file:text-white
    hover:file:bg-blue-600
    cursor-pointer" />

          <button className="bg-blue-900 text-white rounded px-3 py-1 text-sm hover:bg-blue-700 mt-2">
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default SendMail;
