import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/Signup.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route 
				path="/" 
				element={authUser ? <Home /> : <Navigate to={"/Login"} /> } 
				/>
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
