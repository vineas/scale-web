import { FaBook, FaPrint } from "react-icons/fa";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function LaporanHarian() {

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
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Tanggal Laporan" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <p className="mt-2">Sampai</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Tanggal Laporan" />
                            </DemoContainer>
                        </LocalizationProvider>

                        <div className="items-center justify-center mt-4">
                            <button
                                onClick={() => window.open(`/harian-print`, "_blank")}
                                className="text-xs font-bold text-white bg-blue-500 hover:bg-blue-200 hover:text-blue-500 rounded-lg p-2">
                                <FaPrint className="inline mr-1" />
                                Cetak Laporan
                            </button>

                            <button
                                onClick={() => window.open(`/ticket-timbangan/`, "_blank")}
                                className="mt-3 text-xs font-bold text-white bg-green-500 hover:bg-green-200 hover:text-green-500 rounded-lg p-2">
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
