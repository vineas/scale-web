import supabase from '../Lib/db';

export const getDaftarBarang = async () => {
  const { data, error } = await supabase
    .from("barang")
    .select("*");

  if (error) {
    console.error("Error get daftar barang:", error.message);
    return [];
  }

  return data;
};
