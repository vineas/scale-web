import { useEffect, useState } from "react";
import { getLaporan } from "../../hooks/LaporanHarian";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import type { Penimbangan } from "../../types";
import { FaPrint } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";



export default function LaporanHarianPrint() {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [laporan, setLaporan] = useState<Penimbangan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!start || !end) return;
      const data = await getLaporan(start, end);
      setLaporan(data as unknown as Penimbangan[]);
    };
    fetchData();
  }, [start, end]);



  return (
    <div className="p-4 ">
      <div ref={contentRef} className="print:p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Laporan Penimbangan Harian</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200 border">
              <th className="border">Tanggal</th>
              <th className="border">No Ticket</th>
              <th className="border">No Kendaraan</th>
              <th className="border">Nama Barang</th>
              <th className="border">Supplier/Customer</th>
              <th className="border">Nomor SPK</th>
              <th className="border">Timbang I</th>
              <th className="border">Jam</th>
              <th className="border">Timbang II</th>
              <th className="border">Jam</th>
              <th className="border">Reflaksi</th>
              <th className="border">Jumlah Harga</th>
              <th className="border">Netto(kg)</th>
              {/* <th>Waktu Masuk</th> */}
            </tr>
          </thead>
          <tbody>
            {laporan.map((item, idx) => (
              <tr key={idx} className="">
                <td className="text-center">{new Date(item.waktu_timbang_masuk).toLocaleDateString()}</td>
                <td className="text-center">{item.no_record}</td>
                <td className="text-center">{item.no_kendaraan}</td>
                <td className="text-center">{item?.barang?.nama_barang}</td>
                <td className="text-center">{item?.supplier_customer?.nama_supplier_customer ?? "-"}</td>
                <td className="text-center">{item.no_do_po}</td>
                <td className="text-center">{item.berat_timbang_masuk}</td>
                <td className="text-center">{new Date(item.waktu_timbang_masuk).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, })}</td>
                <td className="text-center">{item.berat_timbang_keluar}</td>
                <td className="text-center">{item.waktu_timbang_keluar ? new Date(item.waktu_timbang_keluar).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false, }) : ""}</td>
                <td></td>
                <td></td>
                <td className="text-center">{item.berat_timbang_masuk - item.berat_timbang_keluar}</td>
              </tr>
            ))}
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3">Total Penimbangan</th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3">{laporan.reduce((acc, item) => acc + (item.berat_timbang_masuk || 0), 0)}</th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3">{laporan.reduce((acc, item) => acc + (item.berat_timbang_keluar || 0), 0)}</th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3"></th>
            <th className="border-t border-b mt-3">{laporan.reduce((acc, item) => acc + (item.berat_timbang_masuk - item.berat_timbang_keluar) || 0, 0)}</th>
            {/* <th></th> */}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mb-4">
        <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg" onClick={reactToPrintFn}>
          <FaPrint className="inline mr-1" />
          Print Disini
        </button>
      </div>

    </div>
  );
}