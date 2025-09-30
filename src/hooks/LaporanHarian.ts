import supabase from '../lib/db';

export const getLaporan = async (start: string, end: string) => {
  const { data, error } = await supabase
    .from("penimbangan")
    .select("id, no_record, nama_operator, nama_sopir, no_kendaraan, berat_timbang_masuk, berat_timbang_keluar, waktu_timbang_masuk, waktu_timbang_keluar, barang(nama_barang), supplier_customer(nama_supplier_customer), transporter(nama_transporter), no_do_po")
    .gte("waktu_timbang_masuk", start)
    .lte("waktu_timbang_masuk", end);

  if (error) throw error;
  return data;
};