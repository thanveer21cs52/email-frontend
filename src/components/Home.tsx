import React, { useState } from "react";
import buildingbg from "./images/bulding1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [email,setemail]=useState({
    success:false,
    submited:false

  })
  async function handleEmail(e:any){
    setemail(prev=>({...prev,submited:true}))
     e.preventDefault();

  const formData:any = new FormData(e.currentTarget);

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const req=await fetch('https://email-backend-1h0r.onrender.com/send-email',{
    method:'POST',
    body:formData
  })
  const result=await req.json()
  if(result.message=='success'){
   setemail(prev=>({...prev,success:true}))
    alert('successfully mailed')
  }
  else{
      alert('failed')

  }


  const files = formData.getAll("attachments") as File[];
  console.log("Files:", files);

  setemail({
     success:false,
    submited:false
  })


  }

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${buildingbg})` }}
    >
  

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
    {
      email.submited?<div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center text-yellow-50 gap-2 animate-pulse">
          <FontAwesomeIcon
        icon={faGear}
        spin   
        className="text-4xl"
      />
      <span className="text-4xl font-semibold">loading ...</span>

        </div>
      
    </div>:
        <form className="bg-black/40  rounded-md p-6 shadow-md flex flex-col gap-3 w-full max-w-sm text-white"
          encType="multipart/form-data" 
          onSubmit={handleEmail}
          >
          <h2 className="text-xl font-bold text-center mb-3">Send Email</h2>

        

          <label className="text-sm font-medium">Email:</label>
          <input
            type="email"
             name="to"
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white/10"
          />

          <label className="text-sm font-medium">Subject:</label>
          <input
            type="text"
             name="subject"
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white/10"
          />

          <label className="text-sm font-medium">Message:</label>
          <textarea
            rows={3}
            name='message'
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white/10" 
          ></textarea>

          <label className="text-sm font-medium">Attachment:</label>
          <input type="file"  name='attachments'   multiple className="text-sm " />

          <button className="bg-blue-900 text-white rounded px-3 py-1 text-sm hover:bg-blue-700 transition-colors mt-2">
            Send
          </button>
        </form>}
      </div>  
    </div>
  );
}

export default Home;
