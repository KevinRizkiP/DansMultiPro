import { useEffect } from "react";
import Main from "./pages/Main";
import Logins from "./pages/Logins";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-black h-screen">
      <Routes>
        <Route path="/" element={<Logins />} />
        <Route path="/index" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
