import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HeaderComponent } from "./Components/Header/Header";
import { SidebarComponent } from "./Components/Sidebar/Sidebar";
import { CustomerPage } from "./Pages/Customer/Customer";
import { PenimbanganPage } from "./Pages/Penimbangan/Penimbangan";
import { PenimbanganDuaPage } from "./Pages/Penimbangan/PenimbanganDua";
import { MasterProductsPage } from "./Pages/MasterProducts/Product";
import { TransporterPage } from "./Pages/Transporter";
import TimbangMasuk from "./Pages/TimbangMasuk/TimbangMasuk";
import TimbangKeluar from "./Pages/TimbangKeluar/TimbangKeluar";
import { TicketTimbangan } from "./Pages/PrintPage/TicketTimbangan";
import LaporanHarian from "./Pages/Laporan/Harian";
import LaporanHarianPrint from "./Pages/PrintPage/LaporanHarian";

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