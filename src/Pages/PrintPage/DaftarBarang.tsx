import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import type { Barang, } from "../../Types";
import { FaPrint } from "react-icons/fa";
import { getDaftarBarang } from "../../Hooks/daftarBarang";



export default function DaftarBarangPrint() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [laporan, setLaporan] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getDaftarBarang();
      setLaporan(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 ">
      {loading ? (
        <p>Loading data...</p>
      ) : laporan.length > 0 ? (
        <div>
          <div ref={contentRef} className="print:p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Daftar Barang</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200 border">
                  <th className="border">Kode Barang</th>
                  <th className="border">Nama Barang</th>
                </tr>
              </thead>
              <tbody>
                {laporan.map((item, idx) => (
                  <tr key={idx} className="">
                    {/* <td className="text-center">{new Date(item.waktu_timbang_masuk).toLocaleDateString()}</td> */}
                    <td className="text-center">{item.kode_barang}</td>
                    <td className="text-center">{item.nama_barang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mb-4">
            <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg" onClick={reactToPrintFn}>
              <FaPrint className="inline mr-2" />
              Print or Export PDF
            </button>
          </div>
        </div>
      ) : (
        <p>Tidak ada data untuk periode ini.</p>
      )}
    </div>
  );
}