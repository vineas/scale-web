import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HeaderComponent } from "./components/Header";
import { SidebarComponent } from "./components/Sidebar";
import { CustomerPage } from "./Pages/Customer";
import { PenimbanganPage } from "./Pages/Penimbangan";
import { PenimbanganDuaPage } from "./Pages/Penimbangan/penimbangan-dua";
import { MasterProductsPage } from "./Pages/MasterProducts";
import { TransporterPage } from "./Pages/Transporter";
import TimbangMasuk from "./Pages/TimbangMasuk";
import TimbangKeluar from "./Pages/TimbangKeluar";

function App() {
  
  return (
    <>
      <Router>
          <HeaderComponent />
        <div className="flex h-screen ">
          <SidebarComponent />
          <main className="p-4 pt-15 overflow-y-scroll bg-gray-300">
            <Routes>
              <Route path="/" element={<PenimbanganPage />} />
              <Route path="/penimbangan" element={<PenimbanganPage />} />
              <Route path="/penimbangan-dua" element={<PenimbanganDuaPage />} />
              <Route path="/barang" element={<MasterProductsPage />} />
              <Route path="/supplier-customer" element={<CustomerPage />} />
              <Route path="/transporter" element={<TransporterPage />} />
              <Route path="/timbang-masuk" element={<TimbangMasuk />} />
              <Route path="/timbang-keluar" element={<TimbangKeluar />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
