import React, { useState } from "react";
import MailHistory from "../Mailhistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
function ReceivedMails() {
    const [refresh,setrefresh]=useState({
        fetch:false,
        load:false
      })
         function refreshmail(){
           
              fetch(`https://email-backend-1h0r.onrender.com/read-mails`)
          .then((res) => res.json())
          .then((data) =>console.log('succesfully'))
          .catch((err) => console.error("Error fetching history:", err))
          .finally(() => setrefresh({
            fetch:true,
        load:true
          }));}


          function load(fetch1:any,load1:any){
            setrefresh({
                fetch:fetch1,
                load:load1

            })

          }
  return (
    <div className="p-4 text-white">
   <div className="flex justify-between w-full p-3 ">
                  <h2 className="text-xl font-bold ">
     Received Mails</h2>
        <button className="text-gray-300 mt-2 bg-black/40 p-3 rounded-full" onClick={()=>{
            setrefresh({
            fetch:false,
        load:true
          })
             refreshmail()}} >
           <FontAwesomeIcon
              icon={faArrowsRotate}
              spin={refresh.load}
              className="text-gray-300 text-xl"
            />
          </button>
          </div>
      <MailHistory method="receive" loadings={refresh} fn={load}/>
    </div>
  );
}

export default ReceivedMails;
