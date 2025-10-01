import { useEffect, useState } from "react";
import type { SupplierCustomer } from "../../Types";
import supabase from "../../Lib/db";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

export const CustomerPage = () => {
  // CRUD SupplierCustomer
  const [supplierCustomers, setSupplierCustomers] = useState<
    SupplierCustomer[]
  >([]);
  const [insertKodeSupplierCustomers, setInsertKodeSupplierCustomers] =
    useState<number | null>(null);
  const [insertSupplierCustomers, setInsertSupplierCustomers] = useState("");
  const [insertAlamatSupplierCustomers, setInsertAlamatSupplierCustomers] =
    useState("");
  const [insertKotaSupplierCustomers, setInsertKotaSupplierCustomers] =
    useState("");
  const [insertTeleponSupplierCustomers, setInsertTeleponSupplierCustomers] =
    useState<number | null>(null);
  const [
    insertFacsimileSupplierCustomers,
    setInsertFacsimileSupplierCustomers,
  ] = useState<number | null>(null);
  const [insertPICSupplierCustomers, setInsertPICSupplierCustomers] =
    useState("");
  const [editSupplierCustomers, setEditSupplierCustomers] = useState<
    number | null
  >(null);

  // Edit supplier customer from supabase
  const handleEdit = (supplierCustomer: SupplierCustomer) => {
    setEditSupplierCustomers(supplierCustomer.id); // simpan id yang lagi diedit
    setInsertKodeSupplierCustomers(supplierCustomer.kode_supplier_customer);
    setInsertSupplierCustomers(supplierCustomer.nama_supplier_customer);
    setInsertAlamatSupplierCustomers(supplierCustomer.alamat);
    setInsertKotaSupplierCustomers(supplierCustomer.kota);
    setInsertTeleponSupplierCustomers(supplierCustomer.telepon);
    setInsertFacsimileSupplierCustomers(supplierCustomer.facsimile);
    setInsertPICSupplierCustomers(supplierCustomer.pic);
  };

  // Alert
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  // Get data supplier/customer from supabase
  useEffect(() => {
    const fetchSupplierCustomers = async () => {
      const { data, error } = await supabase
        .from("supplier_customer")
        .select("*");
      if (error) console.error("error: ", error);
      else setSupplierCustomers(data);
    };
    fetchSupplierCustomers();
  }, []);

  // Insert and Update data to supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editSupplierCustomers) {
      // update data
      const { error } = await supabase
        .from("supplier_customer")
        .update({
          kode_supplier_customer: insertKodeSupplierCustomers,
          nama_supplier_customer: insertSupplierCustomers,
          alamat: insertAlamatSupplierCustomers,
          kota: insertKotaSupplierCustomers,
          telepon: insertTeleponSupplierCustomers,
          facsimile: insertFacsimileSupplierCustomers,
          pic: insertPICSupplierCustomers,
        })
        .eq("id", editSupplierCustomers);

      if (error) {
        setMessage("Gagal update supplier/customer: " + error.message);
        setSeverity("error");
        setOpen(true);
      } else {
        setMessage("Berhasil update supplier/customer");
        setSeverity("success");
        setOpen(true);

        // update state agar tabel langsung berubah
        setSupplierCustomers((prev) =>
          prev.map((item) =>
            item.id === editSupplierCustomers
              ? ({
                  ...item,
                  kode_supplier_customer: Number(insertKodeSupplierCustomers),
                  nama_supplier_customer: String(insertSupplierCustomers),
                  alamat: String(insertAlamatSupplierCustomers),
                  kota: String(insertKotaSupplierCustomers),
                  telepon: Number(insertTeleponSupplierCustomers),
                  facsimile: Number(insertFacsimileSupplierCustomers),
                  pic: String(insertPICSupplierCustomers),
                } as SupplierCustomer)
              : item
          )
        );

        // reset
        setInsertKodeSupplierCustomers(null);
        setInsertSupplierCustomers("");
        setInsertAlamatSupplierCustomers("");
        setInsertKotaSupplierCustomers("");
        setInsertTeleponSupplierCustomers(null);
        setInsertFacsimileSupplierCustomers(null);
        setInsertPICSupplierCustomers("");
        setEditSupplierCustomers(null);
      }
    } else {
      // Insert data ke supabase
      const { data, error } = await supabase
        .from("supplier_customer")
        .insert({
          kode_supplier_customer: insertKodeSupplierCustomers,
          nama_supplier_customer: insertSupplierCustomers,
          alamat: insertAlamatSupplierCustomers,
          kota: insertKotaSupplierCustomers,
          telepon: insertTeleponSupplierCustomers,
          facsimile: insertFacsimileSupplierCustomers,
          pic: insertPICSupplierCustomers,
        })
        .select();

      if (error) {
        setMessage("Gagal menambahkan supplier/customer: " + error.message);
        setSeverity("error");
        setOpen(true);
      } else {
        setMessage("Berhasil menambahkan supplier/customer");
        setSeverity("success");
        setOpen(true);

        if (data) {
          setSupplierCustomers((prev) => [...prev, ...data]);
        }

        setInsertKodeSupplierCustomers(null);
        setInsertSupplierCustomers("");
        setInsertAlamatSupplierCustomers("");
        setInsertKotaSupplierCustomers("");
        setInsertTeleponSupplierCustomers(null);
        setInsertFacsimileSupplierCustomers(null);
        setInsertPICSupplierCustomers("");
      }
    }
  };

  const handleCancel = () => {
    setEditSupplierCustomers(null);
    setInsertKodeSupplierCustomers(null);
    setInsertSupplierCustomers("");
    setInsertAlamatSupplierCustomers("");
    setInsertKotaSupplierCustomers("");
    setInsertTeleponSupplierCustomers(null);
    setInsertFacsimileSupplierCustomers(null);
    setInsertPICSupplierCustomers("");
  };

  // Delete data from supabase
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("supplier_customer")
      .delete()
      .eq("id", id);
    if (error) {
      setMessage("Gagal menghapus supplier/customer: " + error.message);
      setSeverity("error");
      setOpen(true);
    } else {
      setMessage("Supplier/customer telah dihapus");
      setSeverity("success");
      setOpen(true);
      // update tabel tanpa reload
      setSupplierCustomers((prev) =>
        prev.filter((supplier_customer) => supplier_customer.id !== id)
      );
    }
  };

  return (
    <div className="container">
      <div className="p-6 bg-white shadow-sm rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Daftar Customer / Supplier
          </h2>
        </div>

        {/* Form */}
        <div className="my-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {/* Kode */}
              <div>
                <label
                  htmlFor="kode_customer"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kode
                </label>
                <input
                  type="text"
                  value={
                    insertKodeSupplierCustomers !== null
                      ? insertKodeSupplierCustomers.toString().padStart(4, "0")
                      : ""
                  }
                  onChange={(e) =>
                    setInsertKodeSupplierCustomers(parseInt(e.target.value))
                  }
                  id="kode_customer"
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
              hover:border-gray-400 transition-colors duration-200"
                  placeholder="0001"
                  maxLength={4}
                  required
                />
              </div>

              {/* Nama Customer / Supplier */}
              <div>
                <label
                  htmlFor="nama_customer"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer / Supplier
                </label>
                <input
                  type="text"
                  value={insertSupplierCustomers}
                  onChange={(e) => setInsertSupplierCustomers(e.target.value)}
                  id="nama_customer"
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
              hover:border-gray-400 transition-colors duration-200"
                  placeholder="Boiler Farm"
                  required
                />
              </div>

              {/* Alamat */}
              <div>
                <label
                  htmlFor="alamat"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  value={insertAlamatSupplierCustomers}
                  onChange={(e) =>
                    setInsertAlamatSupplierCustomers(e.target.value)
                  }
                  id="alamat"
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
              hover:border-gray-400 transition-colors duration-200"
                  placeholder="Jalan Industri Desa"
                  required
                />
              </div>

              {/* Kota */}
              <div>
                <label
                  htmlFor="kota"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kota
                </label>
                <input
                  type="text"
                  value={insertKotaSupplierCustomers}
                  onChange={(e) =>
                    setInsertKotaSupplierCustomers(e.target.value)
                  }
                  id="kota"
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
              hover:border-gray-400 transition-colors duration-200"
                  placeholder="Bekasi"
                  required
                />
              </div>

              {/* Telepon */}
              <div>
                <label
                  htmlFor="telepon"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Telepon
                </label>
                <input
                  type="phone"
                  value={
                    insertTeleponSupplierCustomers !== null
                      ? insertTeleponSupplierCustomers
                          .toString()
                          .padStart(9, "0")
                      : ""
                  }
                  onChange={(e) =>
                    setInsertTeleponSupplierCustomers(parseInt(e.target.value))
                  }
                  id="telepon"
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
              hover:border-gray-400 transition-colors duration-200"
                  placeholder="0211234567"
                  required
                />
              </div>

              {/* Facsimile */}
              <div>
                <label
                  htmlFor="facsimile"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Facsimile
                </label>
                <input
                  type="number"
                  value={
                    insertFacsimileSupplierCustomers !== null
                      ? insertFacsimileSupplierCustomers
                          .toString()
                          .padStart(9, "0")
                      : ""
                  }
                  onChange={(e) =>
                    setInsertFacsimileSupplierCustomers(
                      parseInt(e.target.value)
                    )
                  }
                  id="facsimile"
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
              hover:border-gray-400 transition-colors duration-200"
                  placeholder="Facsimile"
                />
              </div>

              {/* PIC */}
              <div>
                <label
                  htmlFor="pic"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  P.I.C
                </label>
                <input
                  type="text"
                  value={insertPICSupplierCustomers}
                  onChange={(e) =>
                    setInsertPICSupplierCustomers(e.target.value)
                  }
                  id="pic"
                  className="border-2 border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3
              hover:border-gray-400 transition-colors duration-200"
                  placeholder="PIC"
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
                {editSupplierCustomers ? "Perbarui" : "Simpan"}
              </button>
              {editSupplierCustomers && (
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
        {/* Table */}
        <div className="container mx-auto">
          <div className="max-h-46 md:max-h-96 my-8 overflow-x-scroll overflow-y-scroll text-gray-700 bg-white shadow-md rounded-lg">
            <table className="min-w-full table-fixed border-collapse">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="text-slate-500 border-b border-slate-300">
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">
                      Customer/Supplier
                    </p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Kode</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Telepon</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Alamat</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Kota</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">FAX</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">PIC</p>
                  </th>
                  <th className="p-4">
                    <p className="text-sm leading-none font-normal">Action</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {supplierCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-4">
                      <p className="text-sm font-bold">
                        {customer.nama_supplier_customer}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">
                        {customer.kode_supplier_customer
                          .toString()
                          .padStart(4, "0")}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">
                        {customer.telepon.toString().padStart(9, "0")}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{customer.alamat}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{customer.kota}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{customer.facsimile}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{customer.pic}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="text-sm font-semibold text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors duration-150"
                          >
                            Delete
                          </button>
                        </div>
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
  );
};
