import supabase from '../Lib/db';

export const getLaporanSupplierCustomer = async (
  start: string,
  end: string,
  idSupplierCustomer?: string | null // Ubah nama parameter agar lebih jelas
) => {
  let query = supabase
    .from("penimbangan")
    .select("*, barang(*), supplier_customer!inner(*), transporter(*)")
    .gte("waktu_timbang_masuk", start)
    .lte("waktu_timbang_masuk", end);

  if (idSupplierCustomer) {
    query = query.ilike("supplier_customer.nama_supplier_customer", idSupplierCustomer);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error get laporan by supplier/customer:", error.message);
    return [];
  }

  return data;
};