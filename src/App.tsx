import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Layout from "./layout/Layout";
import Navbar from "./Nav/Navbar";
import CreateBill from "./components/CreateBill";
import PreviousBills from "./components/PreviousBills";

function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-bill" element={<CreateBill />} />
        <Route path="/previous-bills" element={<PreviousBills />} />
      </Routes>
    </Layout>
  );
}

export default App;
