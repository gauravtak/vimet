import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dash from "./pages/dash";
import Room from "./pages/room";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dash />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room/:roomId"
        element={
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
