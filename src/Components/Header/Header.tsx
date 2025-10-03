import { useEffect, useState } from "react";
import supabase from "../../Lib/db";
import type { Company } from "../../Types";

export const HeaderComponent = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const fetchCompany = async () => {
      const { data, error } = await supabase.from("company").select("*");
      if (error) console.error("error: ", error);
      else setCompanies(data);
    };
    fetchCompany();
  }, [setCompanies]);
  return (
    <header className="fixed w-full h-12 bg-blue-900 text-white shadow-md z-50 p-2">
      {companies.map((company) => (
      <h2 className="text-2xl font-bold">
        {company.company_name}
      </h2>
      ))}
    </header>
  );
};
