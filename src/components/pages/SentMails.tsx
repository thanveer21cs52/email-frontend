import React, { useState } from "react";
import MailHistory from "../Mailhistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";


function SentMails() {
    const [refresh,setrefresh]=useState(false)
     function refreshmail(){
       
          fetch(`https://email-backend-1h0r.onrender.com/read-mails`)
      .then((res) => res.json())
      .then((data) =>console.log('succesfully'))
      .catch((err) => console.error("Error fetching history:", err))
      .finally(() => setrefresh(false));}
  return (
    <div className="p-4 text-white">
        <div className="flex justify-between w-full p-3 ">
                  <h2 className="text-xl font-bold ">
         Sent Mails</h2>
      

        </div>
     
      <MailHistory method="send" loadings={null} fn={null} />
    </div>
  );
}

export default SentMails;
