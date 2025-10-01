import { useState } from "react";
import { WeightDisplay } from "../../Components/WeightDisplay/WeightDisplay";
import supabase from "../../Lib/db";
import type { Penimbangan } from "../../Types";

export const PenimbanganDuaPage = () => {
  const [noKendaraan, setNoKendaraan] = useState("");
  const [timbang_I, setTimbang_I] = useState<Penimbangan | null>(null);
  const [timbang_II, setTimbang_II] = useState("");

  const cekNoKendaraan = async () => {
    const { data, error } = await supabase
      .from("penimbangan")
      .select("*, barang(nama_barang), supplier_customer(nama_supplier_customer), transporter(nama_transporter)")
      .eq("no_kendaraan", noKendaraan)
      .is("waktu_timbang_keluar", null) //untuk ngecek yang belum timbang II
      .single();

    if (error) {
      alert("Data tidak ditemukan, sudah timbang keluar");
      setTimbang_I(null);
    } else {
      setTimbang_I(data);
    }
  }

  const updateTimbangII = async () => {
    if (!timbang_I) return;

    const { error } = await supabase
      .from("penimbangan")
      .update({
        berat_timbang_keluar: timbang_II,
        waktu_timbang_keluar: new Date().toISOString(),
      })
      .eq("id", timbang_I.id);

    if (error) {
      alert("Gagal update timbang II: " + error.message);
    } else {
      alert("Timbang II berhasil disimpan!");
      setTimbang_I(null);
      setTimbang_II("");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-5 md:p-8 w-full">
        <div className="flex items-center justify-center">
          <WeightDisplay weight={2455} />
        </div>

        <div className="gap-4">
          {/* Form */}
          <div>
            <form>
              {/* Button Timbang */}
              <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
                <button
                  onClick={cekNoKendaraan}
                  className="mt-8 md:ml-3 w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white
         bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
         rounded-full text-center 
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cek No Kendaraan
                </button>
                <button
                  // onClick={}
                  className="mt-8 md:ml-3 w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white
         bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
         rounded-full text-center 
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Timbang
                </button>
              </div>


              {/* Input Fields */}
              {/* Tipe Penimbangan, No Record, No Kendaraan */}
              <div className="grid gap-3 md:gap-6 mb-6 md:grid-cols-5 mt-5">
                <div></div>
                {/* Tipe Penimbangan */}
                <div>
                  <label
                    htmlFor="tipe_penimbangan"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Tipe Penimbangan
                  </label>
                  <select
                    title="tipe_penimbangan"
                    // disabled={!isEditing}
                    id="first_name"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-full 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:border-gray-600 dark:placeholder-gray-400  
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="Normal"
                  >
                    <option value="normal">Normal</option>
                    <option value="reflaksipersen">Reflaksi %</option>
                    <option value="hargasatuan">Harga Satuan</option>
                    <option value="reflaksikg">Reflaksi kg</option>
                  </select>
                </div>
                {/* No Kendaraan */}
                <div className="">
                  <label
                    htmlFor="no_kendaraan"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    No. Kendaraan
                  </label>
                  <input
                    type="text"
                    id="no_kendaraan"
                    value={noKendaraan}
                    onChange={(e) => setNoKendaraan(e.target.value)}
                    // disabled={!isEditing}
                    className=" border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border 
              dark:border-gray-600 dark:placeholder-gray-400  
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="B1234YN"
                    required
                  />
                </div>
                {/* Timbang II */}
                <div className="">
                  <label
                    htmlFor="timbang_II"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Timbang II
                  </label>
                  <input
                    type="number"
                    id="timbang_II"
                    value={timbang_II}
                    onChange={(e) => setTimbang_II(e.target.value)}
                    className=" border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border 
              dark:border-gray-600 dark:placeholder-gray-400  
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2103 kg"
                    required
                  />
                </div>
              </div>

              {/* Nama Barang, Nama Customer, Transporter */}
              {/* No Operator */}

              {/* Simpan Button */}
              <div>
                <button
                  type="submit"
                  onClick={updateTimbangII}
                  // disabled={!isEditing}
                  className="mt-4 text-white bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold 
              rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
              disabled:opacity-50"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="mt-6 w-full text-left table-auto border-collapse">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-50 font-bold text-xs uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Tanggal & Jam
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Barang
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Supplier/Customer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Transporter
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Penimbangan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Berat
                    </th>
                  </tr>
                </thead>
                {timbang_I && (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-300 dark:border-gray-300 border-gray-200">
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {new Date(timbang_I.waktu_timbang_masuk)
                          .toLocaleString("id-ID", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {timbang_I?.barang?.nama_barang}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {timbang_I?.supplier_customer?.nama_supplier_customer}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {timbang_I?.transporter?.nama_transporter}
                      </td>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        Timbang I
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {timbang_I.berat_timbang_masuk} kg
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-300 dark:border-gray-300 border-gray-200">
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      </td>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        Timbang II
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {timbang_I.berat_timbang_keluar} kg
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-300 dark:border-gray-300 border-gray-200">
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap"></td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                      </td>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        Netto
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {timbang_I.berat_timbang_masuk && timbang_I.berat_timbang_keluar ?
                          timbang_I.berat_timbang_masuk - timbang_I.berat_timbang_keluar
                          : 0} kg
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
