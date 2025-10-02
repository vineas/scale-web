import supabase from '../Lib/db';

export const getLaporanNoDoPo = async (
  start: string,
  end: string,
  noDoPo: string
) => {
  let query = supabase
    .from("penimbangan")
    .select("*, barang(*), supplier_customer(*), transporter(*)")
    .gte("waktu_timbang_masuk", start)
    .lte("waktu_timbang_masuk", end);

  if (noDoPo) {
    query = query.eq("no_do_po", noDoPo);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error get laporan by DO/PO:", error.message);
    return [];
  }

  return data;
};