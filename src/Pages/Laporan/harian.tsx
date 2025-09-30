import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { FaPrint, FaBook } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Penimbangan } from "../../types";
import { getLaporan } from "../../hooks/LaporanHarian";

const exportToExcel = (data: Penimbangan[], filename: string) => {
    const formatted = data.map((item) => ({
    No_Record: item.no_record,
    Nama_Operator: item.nama_operator,
    Nama_Sopir: item.nama_sopir,
    No_Kendaraan: item.no_kendaraan,
    Barang: item.barang?.nama_barang || "",
    Supplier: item.supplier_customer?.nama_supplier_customer || "",
    Transporter: item.transporter?.nama_transporter || "",
    Berat_Masuk: item.berat_timbang_masuk,
    Berat_Keluar: item.berat_timbang_keluar,
    Waktu_Masuk: item.waktu_timbang_masuk,
    Waktu_Keluar: item.waktu_timbang_keluar,
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

export default function LaporanHarian() {
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

    const handlePrint = async () => {
        if (!startDate || !endDate) return;

        const start = startDate.startOf("day").toISOString();
        const end = endDate.endOf("day").toISOString();

        // redirect ke halaman print
        window.open(`/harian-print?start=${start}&end=${end}`, "_blank");
    };

    const handleExport = async () => {
        if (!startDate || !endDate) return;

        const start = startDate.startOf("day").toISOString();
        const end = endDate.endOf("day").toISOString();

        const data = await getLaporan(start, end);
        exportToExcel(data as unknown as Penimbangan[], "laporan-harian");
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
                        <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
                        <h1 className="text-2xl font-bold text-gray-900">Harian</h1>
                        <div></div>
                        <div></div>
                        <div></div>
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

                        <div className="items-center justify-center mt-4">
                            <button
                                onClick={handlePrint}
                                className="text-xs font-bold text-white bg-blue-500 hover:bg-blue-200 hover:text-blue-500 rounded-lg p-2"
                            >
                                <FaPrint className="inline mr-1" />
                                Cetak Laporan
                            </button>

                            <button
                                onClick={handleExport}
                                className="mt-3 text-xs font-bold text-white bg-green-500 hover:bg-green-200 hover:text-green-500 rounded-lg p-2"
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
