import supabase from '../Lib/db';

export const getLaporanNoKendaraan = async (
  start: string,
  end: string,
  noKendaraan: string
) => {
  let query = supabase
    .from("penimbangan")
    .select("*, barang(*), supplier_customer(*), transporter(*)")
    .gte("waktu_timbang_masuk", start)
    .lte("waktu_timbang_masuk", end);

  if (noKendaraan) {
    query = query.eq("no_kendaraan", noKendaraan);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error get laporan by kendaraan:", error.message);
    return [];
  }

  return data;
};