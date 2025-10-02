import supabase from '../Lib/db';

export const getDaftarTransporter = async () => {
  const { data, error } = await supabase
    .from("transporter")
    .select("*");

  if (error) {
    console.error("Error get daftar transporter:", error.message);
    return [];
  }

  return data;
};
