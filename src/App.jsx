import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginHome from "./pages/LoginHome";
import VisitHome from "./pages/VisitHome";
import Events from "./pages/CreateEvent";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";

import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/visitHome" element={<VisitHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<LoginHome />} />
              <Route path="/create-event" element={<Events />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </AuthProvider>
  );
}
