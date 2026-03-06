import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Layout from "./layout/Layout";
import Navbar from "./Nav/Navbar";
import CreateBill from "./components/CreateBill";
import PreviousBills from "./components/PreviousBills";
import LatestBookings from "./components/LatestBookings";
import BillView from "./components/Ui/BillView";
import UpcomingBookings from "./components/UpcomingBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";

function App() {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Navbar />
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/create-bill" element={<CreateBill />} />
                <Route path="/previous-bills" element={<PreviousBills />} />
                <Route path="/latest-bookings" element={<LatestBookings />} />
                <Route path="/edit-bill/:id" element={<CreateBill />} />
                <Route path="/view-bill/:id" element={<BillView />} />
                <Route path="/upcoming-bookings" element={<UpcomingBookings />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
