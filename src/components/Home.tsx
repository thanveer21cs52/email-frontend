import React from "react";
import buildingbg from "./images/bulding1.jpg";

function Home() {
  async function handleEmail(e:any){
     e.preventDefault();

  const formData:any = new FormData(e.currentTarget);

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  const req=await fetch('http://localhost:3001/send-email',{
    method:'POST',
    body:formData
  })
  const result=await req.json()
  if(result.message=='success'){
    alert('successfully mailed')
  }
  else{
      alert('failed')

  }


  const files = formData.getAll("attachments") as File[];
  console.log("Files:", files);


  }
  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${buildingbg})` }}
    >

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
    
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
        </form>
      </div>
    </div>
  );
}

export default Home;
