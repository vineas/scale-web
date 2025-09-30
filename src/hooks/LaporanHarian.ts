import supabase from '../lib/db';

export const getLaporan = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from("penimbangan")
    .select("*, barang(*), transporter(*), supplier_customer(*)")
    .gte("waktu_timbang_masuk", startDate)
    .lte("waktu_timbang_masuk", endDate);

  if (error) throw error;
  return data;
};