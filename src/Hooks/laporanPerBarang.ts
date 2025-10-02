import supabase from '../Lib/db';

export const getLaporanBarang = async (
  start: string,
  end: string,
  idBarang?: string | null // Ubah nama parameter agar lebih jelas
) => {
  let query = supabase
    .from("penimbangan")
    .select("*, barang!inner(*), supplier_customer(*), transporter(*)")
    .gte("waktu_timbang_masuk", start)
    .lte("waktu_timbang_masuk", end);

  if (idBarang) {
    query = query.ilike("barang.nama_barang", idBarang);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error get laporan by barang:", error.message);
    return [];
  }

  return data;
};