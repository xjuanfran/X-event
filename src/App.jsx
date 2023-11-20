import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import { ActivityProvider } from "./context/ActivityContext";

import NavBar from "./components/NavBar";

import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginHome from "./pages/LoginHome";
import VisitHome from "./pages/VisitHome";
import Events from "./pages/CreateEvent";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import CreateActivity from "./pages/CreateActivity";
import EventActivity from "./pages/EventActivity";
import Activity from "./pages/Activity";

import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <ActivityProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/visitHome" element={<VisitHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} index />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<LoginHome />} />
                <Route path="/create-event" element={<Events />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/create-activity" element={<CreateActivity />} />
                <Route path="/eventsActivities/:id" element={<EventActivity />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ActivityProvider>
      </EventProvider>
    </AuthProvider>
  );
}
