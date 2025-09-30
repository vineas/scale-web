import { useEffect, useState } from "react";
import { getLaporan } from "../../hooks/LaporanHarian";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import type { Penimbangan } from "../../types";


export default function LaporanHarianPrint() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [laporan, setLaporan] = useState<Penimbangan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLaporan("2025-09-01", "2025-09-30"); // contoh range
      setLaporan(data);
      // setTimeout(() => window.print(), 500); // auto print
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 ">
      <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg" onClick={reactToPrintFn}>Print</button>
      <div ref={contentRef} className="print:p-8">

        <h2 className="text-2xl font-bold mb-4 text-center">Laporan Penimbangan Harian</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th>Tanggal</th>
              <th>No Ticket</th>
              <th>Nama Sopir</th>
              <th>No Kendaraan</th>
              <th>Timbang I</th>
              <th>Jam</th>
              <th>Timbang II</th>
              <th>Jam</th>
              <th>Reflaksi</th>
              <th>Jumlah Harga</th>
              <th>Netto(kg)</th>
              {/* <th>Waktu Masuk</th> */}
            </tr>
          </thead>
          <tbody>
            {laporan.map((item, idx) => (
              <tr key={idx} className="border-b ">
                <td className="text-center">{new Date(item.waktu_timbang_masuk).toLocaleDateString()}</td>
                <td className="text-center">{item.no_record}</td>
                <td className="text-center">{item.nama_sopir}</td>
                <td className="text-center">{item.no_kendaraan}</td>
                <td className="text-center">{item.berat_timbang_masuk}</td>
                <td className="text-center">{new Date(item.waktu_timbang_masuk).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="text-center">{item.berat_timbang_keluar}</td>
                <td className="text-center">{item.waktu_timbang_keluar ? new Date(item.waktu_timbang_keluar).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", }) : ""}</td>
                <td></td>
                <td></td>
                <td className="text-center">{item.berat_timbang_masuk - item.berat_timbang_keluar}</td>
                {/* <td className="text-center">{new Date(item.waktu_timbang_masuk).toLocaleString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}