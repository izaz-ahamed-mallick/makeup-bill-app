import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Layout from "./layout/Layout";
import Navbar from "./Nav/Navbar";
import CreateBill from "./components/CreateBill";
import PreviousBills from "./components/PreviousBills";
import LatestBookings from "./components/LatestBookings";
import BillView from "./components/Ui/BillView";
import UpcomingBookings from "./components/UpcomingBookings";


function App() {
  return (
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
  );
}

export default App;
