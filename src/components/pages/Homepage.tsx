import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faList,
  faInbox,
  faPaperPlane,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import buildingbg from "../images/bulding1.jpg";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <div
      className="w-screen h-screen flex bg-cover bg-center relative"
      style={{ backgroundImage: `url(${buildingbg})` }}
    >
   
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>


      <div className="relative z-10 flex w-full h-full">
      
        <aside className="hidden md:flex flex-col w-64 bg-black/40 text-white p-4 gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <FontAwesomeIcon icon={faList} /> Menu
          </h2>
          <nav className="flex flex-col gap-3">
            <Link
              to="received"
              className={`hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2 ${
                location.pathname.includes("received") ? "bg-white/20" : ""
              }`}
            >
              <FontAwesomeIcon icon={faInbox} /> Received
            </Link>
            <Link
              to="sent"
              className={`hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2 ${
                location.pathname.includes("sent") ? "bg-white/20" : ""
              }`}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Sent
            </Link>
            <Link
              to="send"
              className={`hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2 ${
                location.pathname.includes("send") ? "bg-white/20" : ""
              }`}
            >
              <FontAwesomeIcon icon={faEnvelope} /> Send Mail
            </Link>
            <Link
              to="excel"
              className={`hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2 ${
                location.pathname.includes("excel") ? "bg-white/20" : ""
              }`}
            >
              <FontAwesomeIcon icon={faFileExcel} /> Send via Excel
            </Link>
          </nav>
        </aside>

  
        <button
          onClick={openDrawer}
          className="absolute top-4 left-4
          mb-5 z-20 bg-white/20 text-white px-3 py-2 rounded-md hover:bg-white/30 md:hidden"
        >
          <FontAwesomeIcon icon={faList} />
        </button>

        <Transition show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50" onClose={closeDrawer}>
            <div className="absolute inset-0 bg-gray-900/50" />
            <div className="fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="w-[80vw] sm:w-[250px] bg-gray-800 shadow-xl h-full">
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                    <Dialog.Title className="text-lg text-white font-bold font-mono">
                      📋 Mail Menu
                    </Dialog.Title>
                    <button
                      onClick={closeDrawer}
                      className="text-gray-400 hover:text-white rounded-md"
                    >
                      ✖
                    </button>
                  </div>
                  <nav className="flex flex-col gap-3 px-4">
                    <Link to="received" onClick={closeDrawer} className="hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FontAwesomeIcon icon={faInbox} /> Received
                    </Link>
                    <Link to="sent" onClick={closeDrawer} className="hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FontAwesomeIcon icon={faPaperPlane} /> Sent
                    </Link>
                    <Link to="send" onClick={closeDrawer} className="hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FontAwesomeIcon icon={faEnvelope} /> Send Mail
                    </Link>
                    <Link to="excel" onClick={closeDrawer} className="hover:bg-white/20 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FontAwesomeIcon icon={faFileExcel} /> Send via Excel
                    </Link>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        <main className="flex-1 flex flex-col px-2 py-12 sm:py-3 text-white overflow-y-auto ">
          <Outlet />
          {["/", ""].includes(location.pathname) && (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <h1 className="text-4xl font-bold drop-shadow-lg">
                📧 Welcome to Mail Dashboard
              </h1>
              <p className="text-lg text-gray-300 max-w-md mt-3">
                Manage your received mails, sent mails, and send emails (or bulk
                emails via Excel) — all in one place.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Homepage;
