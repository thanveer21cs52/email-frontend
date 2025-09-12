import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReceivedMails from "./components/pages/ReceivedMails";
import SentMails from "./components/pages/SentMails";
import SendMail from "./components/pages/SendMail";
import SendMailViaExcel from "./components/pages/SendMailViaExcel";
import Home from "./components/Home";
import Homepage from "./components/pages/Homepage";
import { Dialog, Transition } from "@headlessui/react";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home acts as a layout with sidebar + content */}
        <Route path="/" element={<Homepage />}>
          <Route path="received" element={<ReceivedMails />} />
          <Route path="sent" element={<SentMails />} />
          <Route path="send" element={<SendMail />} />
          <Route path="excel" element={<SendMailViaExcel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
