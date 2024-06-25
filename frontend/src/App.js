import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Signup } from "./pages/Signup";
// import { Signin } from "./pages/Signin";
// import { Dashboard } from "./pages/Dashboard";
// import { SendMoney } from "./pages/SendMoney";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SendMoney from "./pages/SendMoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
