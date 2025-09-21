import { useEffect, useState } from "react";
import supabase from "../../lib/db";
import type { Penimbangan } from "../../types";

export default function TimbangMasuk() {
    // Get data supplier/customer from supabase
    const [timbangMasuk, setTimbangMasuk] = useState<Penimbangan[]>([]);
      useEffect(() => {
        const fetchTimbangMasuk = async () => {
          const { data, error } = await supabase
            .from("penimbangan")
            .select(`id, no_record, nama_operator, nama_sopir,  no_kendaraan, berat_timbang_masuk, waktu_timbang_masuk, berat_timbang_keluar`);
          if (error) console.error("error: ", error);
          else setTimbangMasuk(data as Penimbangan[]);
        };
        fetchTimbangMasuk();
      }, []);
  return (
    <div className="container">
      <div className="p-6 bg-white shadow-sm rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-1 xl:grid-cols-9 text-center">
            <div></div>
            <div></div>
            <div></div>
            <h1 className="text-2xl font-bold text-gray-900">Kendaraan</h1>
            <h1 className="text-2xl font-bold text-gray-900">Masuk</h1>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        {/* Table */}
        <div className="container mx-auto">
          <div className="max-h-46 md:max-h-96 my-8 overflow-x-scroll overflow-y-scroll text-gray-700 bg-white shadow-md rounded-lg">
            <table className="min-w-full table-fixed border-collapse">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="text-slate-500 border-b border-slate-300">
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Tanggal</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">
                      No. Record
                    </p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">
                      No. Kendaraan
                    </p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">
                      Timbang I
                    </p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">
                      Tanggal Jam
                    </p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Jam</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Operator</p>
                  </th>
                  {/* <th className="p-4">
                        <p className="text-sm leading-none font-normal">Action</p>
                      </th> */}
                </tr>
              </thead>
              <tbody>
                {timbangMasuk
                  .filter(
                    (item) =>
                      !item.berat_timbang_keluar
                  )
                  .map((item) => (
                <tr className="hover:bg-slate-50 border-b border-slate-200">
                  <td className="p-4">
                    <p className="text-sm font-bold">
                        {new Date(item.waktu_timbang_masuk).toLocaleDateString("en-GB")}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                        {item.no_record}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                        {item.no_kendaraan}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                        {item.berat_timbang_masuk} kg
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                        {new Date(item.waktu_timbang_masuk).toLocaleDateString("en-GB")}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                        {new Date(item.waktu_timbang_masuk).toLocaleTimeString("en-GB")}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">
                        {item.nama_operator}
                    </p>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
