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
import LaporanNoKendaraan from "./Pages/Laporan/PerNoKendaraan";
import LaporanNoKendaraanPrint from "./Pages/PrintPage/LaporanNoKendaraan";
import LaporanBarang from "./Pages/Laporan/PerBarang";
import LaporanPerBarangPrint from "./Pages/PrintPage/LaporanPerBarang";
import LaporanSupplierCustomer from "./Pages/Laporan/PerSupplierCustomer";
import LaporanPerSupplierCustomerPrint from "./Pages/PrintPage/LaporanPerSupplierCustomer";
import LaporanTransporter from "./Pages/Laporan/PerTransporter";
import LaporanPerTransporterPrint from "./Pages/PrintPage/LaporanPerTransporter";
import LaporanNoDoPo from "./Pages/Laporan/PerDoPo";
import LaporanNoDoPoPrint from "./Pages/PrintPage/LaporanNoDoPo";
import DaftarBarang from "./Pages/Laporan/DaftarBarang";
import DaftarBarangPrint from "./Pages/PrintPage/DaftarBarang";
import DaftarTransporter from "./Pages/Laporan/DaftarTransporter";
import DaftarTransporterPrint from "./Pages/PrintPage/DaftarTransporter";
import DaftarSupplierCustomer from "./Pages/Laporan/DaftarSupplierCustomer";
import DaftarSupplierCustomerPrint from "./Pages/PrintPage/DaftarSupplierCustomer";

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
                    <Route path="/laporan-per-no-kendaraan" element={<LaporanNoKendaraan />} />
                    <Route path="/laporan-per-barang" element={<LaporanBarang />} />
                    <Route path="/laporan-per-supplier-customer" element={<LaporanSupplierCustomer />} />
                    <Route path="/laporan-per-transporter" element={<LaporanTransporter />} />
                    <Route path="/laporan-per-nomor-do-po" element={<LaporanNoDoPo />} />
                    <Route path="/daftar-barang" element={<DaftarBarang />} />
                    <Route path="/daftar-supplier-customer" element={<DaftarSupplierCustomer />} />
                    <Route path="/daftar-transporter" element={<DaftarTransporter />} />
                  </Routes>
                </main>
              </div>
            }
          />

          {/* Route khusus tanpa sidebar */}
          <Route path="/ticket-timbangan/:id" element={<TicketTimbangan />} />
          <Route path="/harian-print" element={<LaporanHarianPrint />} />
          <Route path="/no-kendaraan-print" element={<LaporanNoKendaraanPrint />} />
          <Route path="/barang-print" element={<LaporanPerBarangPrint />} />
          <Route path="/supplier-customer-print" element={<LaporanPerSupplierCustomerPrint />} />
          <Route path="/transporter-print" element={<LaporanPerTransporterPrint />} />
          <Route path="/no-do-po-print" element={<LaporanNoDoPoPrint />} />
          <Route path="/daftar-barang-print" element={<DaftarBarangPrint />} />
          <Route path="/daftar-transporter-print" element={<DaftarTransporterPrint />} />
          <Route path="/daftar-supplier-customer-print" element={<DaftarSupplierCustomerPrint />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;