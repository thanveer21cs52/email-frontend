import React, { useState } from "react";
import buildingbg from "./images/bulding1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faGear ,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import MailHistory from "./Mailhistory";
import { Fragment  } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { spawn } from "child_process";



function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenimport,setIsOpenimport]=useState(false)
  const [activeTab, setActiveTab] = useState<"receive" | "send">("receive")
  const [email,setemail]=useState({
    success:false,
    submited:false

  })
  const [excelsend,setexcelsend]=useState<any[]>([])
  const [excelsubmit,setexcelsubmit]=useState(false)
  async function handleExcelemail(e:any){
  setexcelsubmit(true)
     e.preventDefault();

  const formData:any = new FormData(e.currentTarget)
  const req=await fetch('https://email-backend-1h0r.onrender.com/excel/send-email',{
    method:'POST',
    body:formData
  })
  const result=await req.json()
  if(result.message=='success'){
    console.log(result)
    setexcelsend(result.data)

    alert('successfully mailed')
  }
  else{
      alert('failed')

  }
  setexcelsubmit(false)



  }
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
  const openDrawer = () => {
    setIsOpen(true);

  };
    const openDrawerimport = () => {
    setIsOpenimport(true);

  };


  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${buildingbg})` }}
    >
  

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-start items-center p-4 gap-5">
        <div className="flex justify-between w-full text-sm">
          <button onClick={openDrawer} className=" rounded-md focus:outline-none flex justify-center items-center gap-1 hover:text-black hover:bg-white/40 px-3 py-2   bg-black/40 text-white">
             <FontAwesomeIcon
        icon={faClockRotateLeft}
 
        className=""
      />
       History
        </button>
        <button onClick={openDrawerimport} className=" rounded-md focus:outline-none flex justify-center items-center gap-2 hover:text-black hover:bg-white/40 px-3 py-2   bg-black/40 text-white">
             <FontAwesomeIcon
        icon={faEnvelope}
 
        className=""
      />
       send mail via excel
        </button>
   
            
          </div>
        
       <Transition show={isOpenimport} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden" onClose={() => setIsOpenimport(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <div className="fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-100" leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-100" leaveTo="translate-x-full">
                <Dialog.Panel className="w-screen max-w-md bg-black/40 shadow-xl">
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                    <Dialog.Title className="text-lg text-white font-bold font-mono">excel to mail </Dialog.Title>
                    <button onClick={() => setIsOpenimport(false)} className="text-gray-400 hover:text-white rounded-md">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 sm:px-6 max-h-[80vh] overflow-y-auto">
                    {excelsubmit? <div className="flex items-center justify-center text-sm min-h-14">
        <div className="flex justify-center items-center text-yellow-50 gap-2 animate-pulse">
          <FontAwesomeIcon
        icon={faGear}
        spin   
        className=""
      />
      <span className=" font-semibold">sending ...</span>

        </div>
      
    </div>:
                 <form className="bg-black/40  rounded-md p-6 shadow-md flex flex-col gap-3 w-full max-w-sm text-white"
          encType="multipart/form-data" 
          onSubmit={handleExcelemail}
          >
      <h1 className="bg-orange/10 backdrop-blur-lg border border-yellow-500 text-orange-300 rounded-md p-3 mb-3 text-sm shadow-sm">
  <div className="flex items-center mb-1">
    <span className="text-lg mr-2">⚠️</span>
    <span className="font-bold">Excel Requirements</span>
  </div>
  <ul className="ml-6 list-disc">
    <li><b>Email</b> – required ✅</li>
    <li><b>Subject</b> – optional 🆗</li>
    <li><b>Message</b> – optional 🆗</li>
    <li className="text-red-500"><b>No Attachments Supported</b> 🚫</li>
  </ul>
</h1>



       


         <label className="text-sm font-medium">Import file:</label>
<input
  type="file"
  name="file"
  className="
    block w-full text-sm text-gray-300
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-700 file:text-white
    hover:file:bg-blue-600
    cursor-pointer
  "
/>
          

          <button className="bg-blue-900 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 transition-colors mt-2">
            Send
          </button>
        </form>}
        <div className="p-4">
     

    {excelsend.length>0&&<div className="border-t border-white p-3">
       <h2 className="text-lg font-bold mb-4 text-white">📜 Last Mail History of file {excelsend[0].filename}</h2>
    
      <div className="grid grid-cols-1  gap-4">
        {excelsend.map((item:any) => (
          <div
            key={item.id}
            className="border rounded-2xl shadow p-4 bg-white/30 hover:shadow-lg transition"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-300">From:</span>{" "}
              {item.from}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-300">To:</span>{" "}
              {item.email}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-300">Subject:</span>{" "}
              {item.subject}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-300">Status:</span>{" "}
              {item.sended?<span className="text-green-700">success</span>
              :<span className="text-red-500">failed</span>}
            </div>
            
           
          </div>
        ))}
      </div></div>}
    </div>
                 
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <Transition show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden" onClose={() => setIsOpen(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <div className="fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                <Dialog.Panel className="w-screen max-w-md bg-black/40 shadow-xl">
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                    <Dialog.Title className="text-lg text-white font-bold font-mono">Historys</Dialog.Title>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white rounded-md">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 sm:px-6 max-h-[80vh] overflow-y-auto ">
                  
                     <div className="p-4">
  
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("receive")}
          className={`px-4 py-2 rounded-sm font-medium ${
            activeTab === "receive"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700"
          }`}
        >
        Received mails
        </button>

        <button
          onClick={() => setActiveTab("send")}
          className={`px-4 py-2 rounded-sm font-medium ${
            activeTab === "send"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700"
          }`}
        >
        Sent sended mails
        </button>
      </div>


      <MailHistory method={activeTab}  loadings={null} fn={null}/>
    </div>
                 
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
    {
      email.submited?<div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center text-yellow-50 gap-2 animate-pulse">
          <FontAwesomeIcon
        icon={faGear}
        spin   
        className="text-4xl"
      />
      <span className="text-4xl font-semibold">sending ...</span>

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
          <input type="file"  name='attachments'   multiple className="
    block w-full text-sm text-gray-300
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-700 file:text-white
    hover:file:bg-blue-600
    cursor-pointer
  "
 />
          

          <button className="bg-blue-900 text-white rounded px-3 py-1 text-sm hover:bg-blue-700 transition-colors mt-2">
            Send
          </button>
        </form>}
     
      </div>  
    </div>
  );
}

export default Home;
