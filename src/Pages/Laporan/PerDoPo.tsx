import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { FaPrint, FaBook } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Penimbangan } from "../../Types";
import { getLaporanNoDoPo } from "../../Hooks/laporanNoDoPo";

export default function LaporanNoDoPo() {

    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const [noDoPo, setNoDoPo] = useState("");
    const [laporan, setLaporan] = useState([] as Penimbangan[]);

    const handlePrint = async () => {
        if (!startDate || !endDate) return;
        const start = startDate.startOf("day").toISOString();
        const end = endDate.endOf("day").toISOString();

        const data = await getLaporanNoDoPo(start, end, noDoPo);
        setLaporan(data as Penimbangan[]);
        window.open(`/no-do-po-print?start=${start}&end=${end}&noDoPo=${noDoPo}`, "_blank");
    };

    const exportToExcel = (data: Penimbangan[], filename: string) => {
        const formatted = data.map((item) => ({
            Tanggal: item.waktu_timbang_masuk,
            No_Tiket: item.no_record,
            No_Kendaraan: item.no_kendaraan,
            Barang: item.barang?.nama_barang || "",
            Supplier: item.supplier_customer?.nama_supplier_customer || "",
            Transporter: item.transporter?.nama_transporter || "",
            Berat_Masuk: item.berat_timbang_masuk,
            Waktu_Masuk: item.waktu_timbang_masuk,
            Berat_Keluar: item.berat_timbang_keluar,
            Waktu_Keluar: item.waktu_timbang_keluar,
            Nama_Operator: item.nama_operator,
            Nama_Sopir: item.nama_sopir,
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
        if (!startDate || !endDate) return;
        const start = startDate.startOf("day").toISOString();
        const end = endDate.endOf("day").toISOString();

        const data = await getLaporanNoDoPo(start, end, noDoPo);
        setLaporan(data as Penimbangan[]);
        exportToExcel(laporan, "laporan_timbangan_per_no_do_po");
    };

    return (
        <div className="container">
            <div className="p-6 bg-white shadow-sm rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-5 text-center">
                        <div></div>
                        <div></div>
                        <h1 className="text-2xl font-bold text-gray-900">Laporan per Nomor DO/PO</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 xl:grid-cols-5 text-center mt-4">
                    <div></div>
                    <div></div>

                        <div className="mb-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        label="Tanggal Mulai"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <p className="mt-2">Sampai</p>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        label="Tanggal Selesai"
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            {/* No Kendaraan */}
                            <div className="mt-5">
                                <label
                                    htmlFor="no_kendaraan"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    No. DO/PO
                                </label>
                                <input
                                    type="text"
                                    id="no_do_po"
                                    value={noDoPo}
                                    onChange={(e) => setNoDoPo(e.target.value)}
                                    className=" border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border 
              dark:border-gray-600 dark:placeholder-gray-400  
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Masukkan No. DO/PO"
                                    required
                                />
                            </div>

                            <div className="items-center justify-center mt-4 ">
                                <button
                                    onClick={handlePrint}
                                    disabled={!noDoPo}
                                    className={`text-xs font-bold rounded-lg p-2 
                                    ${!noDoPo ? "bg-gray-400 cursor-not-allowed": "text-white bg-blue-500 hover:bg-blue-200 hover:text-blue-500"}`}>
                                    <FaPrint className="inline mr-1" />
                                    Cetak Laporan
                                </button>

                                <button
                                    disabled={!noDoPo} 
                                    onClick={handleExport}
                                    className={`mt-3 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-0 text-xs font-bold rounded-lg p-2
                                    ${!noDoPo ? "bg-gray-400 cursor-not-allowed": "text-white bg-green-500 hover:bg-green-200 hover:text-green-500"}`}>
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
