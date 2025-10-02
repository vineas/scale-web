import supabase from '../Lib/db';

export const getLaporanTransporter = async (
  start: string,
  end: string,
  idTransporter?: string | null // Ubah nama parameter agar lebih jelas
) => {
  let query = supabase
    .from("penimbangan")
    .select("*, barang(*), supplier_customer(*), transporter!inner(*)")
    .gte("waktu_timbang_masuk", start)
    .lte("waktu_timbang_masuk", end);

  if (idTransporter) {
    query = query.ilike("transporter.nama_transporter", idTransporter);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error get laporan by transporter:", error.message);
    return [];
  }

  return data;
};