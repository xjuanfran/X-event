import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/guessHome" element={<h1>guessHome</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>UserRegister</h1>} />
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
