import { FaPrint, FaBook } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Barang } from "../../Types";
import { getDaftarBarang } from "../../Hooks/daftarBarang";

export default function DaftarBarang() {

    const handlePrint = async () => {
        window.open(`/daftar-barang-print`, "_blank");
    };

    const exportToExcel = (data: Barang[], filename: string) => {
        const formatted = data.map((item) => ({
            Kode_Barang: item.kode_barang,
            Nama_Barang: item.nama_barang,
        }));
        const worksheet = XLSX.utils.json_to_sheet(formatted);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, `${filename}.xlsx`);
    };
    const handleExport = async () => {
        const data = await getDaftarBarang();
        exportToExcel(data as unknown as Barang[], "laporan-daftar-barang");
    };

    return (
        <div className="container">
            <div className="p-6 bg-white shadow-sm rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-1 xl:grid-cols-8 text-center">
                        <div></div>
                        <div></div>
                        <div></div>
                        <h1 className="text-2xl font-bold text-gray-900">Daftar</h1>
                        <h1 className="text-2xl font-bold text-gray-900">Barang</h1>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 xl:grid-cols-5 text-center mt-4">
                    <div></div>
                    <div></div>


                    <div className="mb-4">

                        <div className="items-center justify-center mt-4 ">
                            <button
                                onClick={handlePrint}
                                className="text-xs font-bold text-white bg-blue-500 hover:bg-blue-200 hover:text-blue-500 rounded-lg p-2"
                            >
                                <FaPrint className="inline mr-1" />
                                Cetak Daftar Barang
                            </button>

                            <button
                                onClick={handleExport}
                                className="mt-3 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-0 text-xs font-bold text-white bg-green-500 hover:bg-green-200 hover:text-green-500 rounded-lg p-2"
                            >
                                <FaBook className="inline mr-1" />
                                Export Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
