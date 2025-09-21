import { useEffect, useState } from "react";
import type { Transporter } from "../../types";
import supabase from "../../lib/db";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

export const TransporterPage = () => {
  // CRUD Transporter
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [insertKodeTransporter, setInsertKodeTransporter] = useState<number | null>(null);
  const [insertNamaTransporter, setInsertNamaTransporter] = useState("");
  const [editTransporterId, setEditTransporterId] = useState<number | null>(
    null
  );

  // Edit transporter from supabase
  const handleEdit = (transporter: Transporter) => {
    setEditTransporterId(transporter.id);
    setInsertKodeTransporter(transporter.kode_transporter);
    setInsertNamaTransporter(transporter.nama_transporter);
  };

  // Alert
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  // Get data transporter from supabase
  useEffect(() => {
    const fetchTransporters = async () => {
      const { data, error } = await supabase.from("transporter").select("*");
      if (error) console.error("error: ", error);
      else setTransporters(data as Transporter[]);
    };
    fetchTransporters();
  }, []);

  // Insert and Update data to supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editTransporterId) {
      // update data
      const { error } = await supabase
        .from("transporter")
        .update({
          kode_transporter: insertKodeTransporter,
          nama_transporter: insertNamaTransporter,
        })
        .eq("id", editTransporterId);

      if (error) {
        setMessage("Gagal update transporter: " + error.message);
        setSeverity("error");
        setOpen(true);
      } else {
        setMessage("Berhasil update transporter");
        setSeverity("success");
        setOpen(true);

        // update state agar tabel langsung berubah
        setTransporters((prev) =>
          prev.map((item) =>
            item.id === editTransporterId
              ? ({
                  ...item,
                  kode_transporter: Number(insertKodeTransporter),
                  nama_transporter: String(insertNamaTransporter),
                } as Transporter)
              : item
          )
        );

        // reset
        setEditTransporterId(null);
        setInsertKodeTransporter(0);
        setInsertNamaTransporter("");
      }
    } else {
      // Insert data ke supabase
      const { data, error } = await supabase
        .from("transporter")
        .insert({
          kode_transporter: Number(insertKodeTransporter),
          nama_transporter: String(insertNamaTransporter),
        })
        .select();

      if (error) {
        setMessage("Gagal menambahkan transporter: " + error.message);
        setSeverity("error");
        setOpen(true);
      } else {
        setMessage("Berhasil menambahkan transporter");
        setSeverity("success");
        setOpen(true);

        if (data) {
          setTransporters((prev) => [...prev, ...data]);
        }

        setInsertKodeTransporter(0);
        setInsertNamaTransporter("");
      }
    }
  };

  const handleCancel = () => {
    setInsertKodeTransporter(0);
    setInsertNamaTransporter("");
    setEditTransporterId(null);
  };

  // Delete data from supabase
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("transporter").delete().eq("id", id);
    if (error) {
      setMessage("Gagal menghapus transporter: " + error.message);
      setSeverity("error");
      setOpen(true);
    } else {
      setMessage("Transporter telah dihapus");
      setSeverity("success");
      setOpen(true);
      // update tabel tanpa reload
      setTransporters((prev) =>
        prev.filter((transporter) => transporter.id !== id)
      );
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg ">
      <div className="max-w-7xl mx-auto">
        <div>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Daftar Transporter
            </h2>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <div className="xl:col-start-1">
                  <label
                    htmlFor="kode_transporter"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Kode
                  </label>
                  <input
                    value={insertKodeTransporter ?? ""}
                    onChange={(e) => setInsertKodeTransporter(Number(e.target.value))}
                    type="number"
                    id="kode_transporter"
                    name="kode_transporter"
                    className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
                    hover:border-gray-400 transition-colors duration-200"
                    placeholder="0001"
                    maxLength={4}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="nama_transporter"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nama Transporter
                  </label>
                  <input
                    value={insertNamaTransporter}
                    onChange={(e) => setInsertNamaTransporter(e.target.value)}
                    type="text"
                    id="nama_transporter"
                    name="nama_transporter"
                    className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
                    hover:border-gray-400 transition-colors duration-200"
                    placeholder="Cargo"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium 
                  rounded-full px-8 py-3 transition-colors duration-200 
                  focus:ring-4 focus:ring-blue-300 focus:outline-none
                  shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {editTransporterId ? "Perbarui" : "Simpan"}
                </button>
                {editTransporterId && (
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded-full"
                  >
                    Batalkan
                  </button>
                )}
              </div>
            </div>
          </form>
          {/* Alert hanya tampil kalau open = true */}
          <Collapse in={open}>
            <Alert severity={severity} onClose={() => setOpen(false)}>
              {message}
            </Alert>
          </Collapse>

          {/* Table Section */}
          <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full table-fixed border-collapse">
                  <thead className="sticky top-0 bg-slate-50 z-10">
                    <tr className="text-slate-500 border-b border-slate-300">
                      <th className="w-2/5 p-4 text-left">
                        <p className="text-sm leading-none font-normal">
                          Nama Transporter
                        </p>
                      </th>
                      <th className="w-1/5 p-4 text-left">
                        <p className="text-sm leading-none font-normal">Kode</p>
                      </th>
                      <th className="w-2/5 p-4 text-left">
                        <p className="text-sm leading-none font-normal">
                          Action
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transporters.map((transporter) => (
                      <tr
                        key={transporter.id}
                        className="hover:bg-slate-50 border-b border-slate-200 transition-colors duration-150"
                      >
                        <td className="w-2/5 p-4">
                          <div className="text-sm font-bold text-gray-800 break-words">
                            {transporter.nama_transporter}
                          </div>
                        </td>
                        <td className="w-1/5 p-4">
                          <div className="text-sm text-gray-600 break-words">
                            {transporter.kode_transporter
                              .toString()
                              .padStart(4, "0")}
                          </div>
                        </td>
                        <td className="w-2/5 p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(transporter)}
                              className="text-sm font-semibold text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors duration-150"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(transporter.id)}
                              className="text-sm font-semibold text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors duration-150"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
