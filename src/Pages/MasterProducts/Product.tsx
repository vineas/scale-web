import { useEffect, useState } from "react";
import type { Barang } from "../../Types";
import supabase from "../../Lib/db";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

export const MasterProductsPage = () => {
  // CRUD Barang
  const [barangs, setBarangs] = useState<Barang[]>([]);
  const [insertKodeBarangs, setInsertKodeBarangs] = useState<number | null>(null);
  const [insertBarangs, setInsertBarangs] = useState("");
  const [editBarangs, setEditBarangs] = useState<number | null>(null);

  // Edit barang from supabase
  const handleEdit = (barang: Barang) => {
    setEditBarangs(barang.id); // simpan id yang lagi diedit
    setInsertKodeBarangs(barang.kode_barang);
    setInsertBarangs(barang.nama_barang);
  };

  // Alert
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  // Get data barang from supabase
  useEffect(() => {
    const fetchBarang = async () => {
      const { data, error } = await supabase.from("barang").select("*");
      if (error) console.error("error: ", error);
      else setBarangs(data);
    };
    fetchBarang();
  }, []);

  // Insert and Update data to supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editBarangs) {
      // update data
      const { error } = await supabase
        .from("barang")
        .update({
          kode_barang: insertKodeBarangs,
          nama_barang: insertBarangs,
        })
        .eq("id", editBarangs);

      if (error) {
        setMessage("Gagal update barang: " + error.message);
        setSeverity("error");
        setOpen(true);
      } else {
        setMessage("Berhasil update barang");
        setSeverity("success");
        setOpen(true);

        // update state agar tabel langsung berubah
        setBarangs((prev) =>
          prev.map((item) =>
            item.id === editBarangs
              ? ({
                  ...item,
                  kode_barang: Number(insertKodeBarangs),
                  nama_barang: String(insertBarangs),
                } as Barang)
              : item
          )
        );

        // reset
        setEditBarangs(null);
        setInsertKodeBarangs(0);
        setInsertBarangs("");
      }
    } else {
      // Insert data ke supabase
      const { data, error } = await supabase
        .from("barang")
        .insert({
          kode_barang: insertKodeBarangs,
          nama_barang: insertBarangs,
        })
        .select();

      if (error) {
        setMessage("Gagal menambahkan barang: " + error.message);
        setSeverity("error");
        setOpen(true);
      } else {
        setMessage("Berhasil menambahkan barang");
        setSeverity("success");
        setOpen(true);

        if (data) {
          setBarangs((prev) => [...prev, ...data]);
        }

        setInsertKodeBarangs(0);
        setInsertBarangs("");
      }
    }
  };

  const handleCancel = () => {
    setInsertKodeBarangs(0);
    setInsertBarangs("");
    setEditBarangs(null);
  };

  // Delete data from supabase
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("barang").delete().eq("id", id);
    if (error) {
      setMessage("Gagal menghapus barang: " + error.message);
      setSeverity("error");
      setOpen(true);
    } else {
      setMessage("Barang telah dihapus");
      setSeverity("success");
      setOpen(true);
      // update tabel tanpa reload
      setBarangs((prev) => prev.filter((barang) => barang.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg ">
      <div className="max-w-7xl mx-auto">
        <div>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Daftar Barang
            </h2>
          </div>

          {/* Form Section */}
          <div className="mb-10">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <div className="xl:col-start-1">
                  <label
                    htmlFor="kode_barang"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Kode
                  </label>
                  <input
                    type="number"
                    value={insertKodeBarangs ?? ""}
                    onChange={(e) => setInsertKodeBarangs(Number(e.target.value))}
                    id="kode_barang"
                    name="kode_barang"
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
                    htmlFor="nama_barang"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nama Barang
                  </label>
                  <input
                    value={insertBarangs}
                    onChange={(e) => setInsertBarangs(e.target.value)}
                    type="text"
                    id="nama_barang"
                    name="nama_barang"
                    className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
                    hover:border-gray-400 transition-colors duration-200"
                    placeholder="Beras"
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
                  {editBarangs ? "Perbarui" : "Simpan"}
                </button>
                {editBarangs && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded-full"
                  >
                    Batalkan
                  </button>
                )}
              </div>
            </form>
            {/* Alert hanya tampil kalau open = true */}
            <Collapse in={open}>
              <Alert severity={severity} onClose={() => setOpen(false)}>
                {message}
              </Alert>
            </Collapse>
          </div>

          {/* Table Section */}
          <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full table-fixed border-collapse">
                  <thead className="sticky top-0 bg-slate-50 z-10">
                    <tr className="text-slate-500 border-b border-slate-300">
                      <th className="w-2/5 p-4 text-left">
                        <p className="text-sm leading-none font-normal">
                          Nama Barang
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
                    {barangs.map((barang) => (
                      <tr
                        key={barang.id}
                        className="hover:bg-slate-50 border-b border-slate-200 transition-colors duration-150"
                      >
                        <td className="w-2/5 p-4">
                          <div className="text-sm font-bold text-gray-800 break-words">
                            {barang.nama_barang}
                          </div>
                        </td>
                        <td className="w-1/5 p-4">
                          <div className="text-sm text-gray-600 break-words">
                            {String(barang.kode_barang).padStart(4, "0")}
                          </div>
                        </td>
                        <td className="w-2/5 p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(barang)}
                              className="text-sm font-semibold text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors duration-150"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(barang.id)}
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
