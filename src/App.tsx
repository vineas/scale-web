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
import { TicketTimbangan } from "./Pages/PrintPage/ticket";
import LaporanHarian from "./Pages/Laporan/harian";
import LaporanHarianPrint from "./components/PrintPage/LaporanHarian";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Layout dengan sidebar */}
          <Route
            path="/*"
            element={
              <div className="flex h-screen">
                <HeaderComponent />
                <SidebarComponent />
                <main className="p-4 pt-15 overflow-y-scroll bg-gray-300">
                  <Routes>
                    <Route path="/" element={<PenimbanganPage />} />
                    <Route
                      path="/penimbangan-dua"
                      element={<PenimbanganDuaPage />}
                    />
                    <Route path="/barang" element={<MasterProductsPage />} />
                    <Route
                      path="/supplier-customer"
                      element={<CustomerPage />}
                    />
                    <Route path="/transporter" element={<TransporterPage />} />
                    <Route path="/timbang-masuk" element={<TimbangMasuk />} />
                    <Route path="/timbang-keluar" element={<TimbangKeluar />} />
                    <Route path="/laporan-harian" element={<LaporanHarian />} />
                  </Routes>
                </main>
              </div>
            }
          />

          {/* Route khusus tanpa sidebar */}
          <Route path="/ticket-timbangan/:id" element={<TicketTimbangan />} />
          <Route path="/harian-print" element={<LaporanHarianPrint />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
