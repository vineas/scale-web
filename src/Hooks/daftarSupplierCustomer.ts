import supabase from '../Lib/db';


export const getDaftarSupplierCustomer = async () => {
  const { data, error } = await supabase
    .from("supplier_customer")
    .select("*");

  if (error) {
    console.error("Error get daftar supplier/customer:", error.message);
    return [];
  }

  return data;
};
