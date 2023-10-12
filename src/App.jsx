import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/guessHome" element={<h1>guessHome</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/events" element={<h1>Events</h1>} />
        <Route path="/contacts" element={<h1>Contactos</h1>} />
        <Route path="/activities" element={<h1>Activities</h1>} />
        <Route path="/add-activities" element={<h1>Add activities</h1>} />
        <Route path="/createEvent" element={<h1>createEvent</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
