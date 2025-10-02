import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import type { Penimbangan } from "../../Types";
import { FaPrint } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { getLaporanBarang } from "../../Hooks/laporanPerBarang";



export default function LaporanPerBarangPrint() {
    const [searchParams] = useSearchParams();
    const barang = searchParams.get("barang");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const [laporan, setLaporan] = useState<Penimbangan[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!start || !end || !barang) return;
            setLoading(true)
            try {
                const data = await getLaporanBarang(start, end, barang);
                setLaporan(data as unknown as Penimbangan[]);
            } catch (err) {
                console.error("Error fetching laporan:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [start, end, barang]);



    return (
        <div className="p-4 ">
            {loading ? (
                <p>Loading data...</p>
            ) : laporan.length > 0 ? (
                <div>
                    <div ref={contentRef} className="print:p-8">
                        <h2 className="text-2xl font-bold mb-4 text-center">Laporan Penimbangan per Barang</h2>
                        <div className="flex">
                            <p className="text-xs">Periode: </p>
                            <p className="text-xs ml-1">{start ? new Date(start).toLocaleDateString("id-ID") : ""}  s/d {" "}
                                {end ? new Date(end).toLocaleDateString("id-ID") : ""}</p>
                        </div>
                        <div className="flex">
                            <p className="text-xs">Barang: </p>
                            <p className="text-xs ml-1">{searchParams.get("barang")}</p>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-200 border">
                                    <th className="border">Tanggal</th>
                                    <th className="border">No Ticket</th>
                                    <th className="border">No Kendaraan</th>
                                    {/* <th className="border">Nama Barang</th> */}
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
                                        {/* <td className="text-center">{item?.barang?.nama_barang}</td> */}
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