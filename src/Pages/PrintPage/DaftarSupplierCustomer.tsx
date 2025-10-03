import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import type { SupplierCustomer } from "../../Types";
import { FaPrint } from "react-icons/fa";
import { getDaftarSupplierCustomer } from "../../Hooks/daftarSupplierCustomer";
import { HeaderReportComponent } from "../../Components/Header/HeaderReport";

export default function DaftarSupplierCustomerPrint() {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const [laporan, setLaporan] = useState<SupplierCustomer[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getDaftarSupplierCustomer();
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
                        <div>
                            <HeaderReportComponent />
                        </div>
                        <div className="">
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                Daftar Supplier/Customer
                            </h2>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-200 border">
                                    <th className="border">No</th>
                                    <th className="border">Kode</th>
                                    <th className="border">Nama Supplier/Customer</th>
                                    <th className="border">Alamat</th>
                                    <th className="border">Kota</th>
                                    <th className="border">Telepon</th>
                                    <th className="border">Fax</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laporan.map((item, idx) => (
                                    <tr key={idx} className="">
                                        <td className="text-center">{idx + 1}</td>
                                        <td className="text-center">{String(item.kode_supplier_customer).padStart(4, "0")}</td>
                                        <td className="text-center">{item.nama_supplier_customer}</td>
                                        <td className="text-center">{item.alamat}</td>
                                        <td className="text-center">{item.kota}</td>
                                        <td className="text-center">{item.telepon}</td>
                                        <td className="text-center">{item.facsimile}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg"
                            onClick={reactToPrintFn}
                        >
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
