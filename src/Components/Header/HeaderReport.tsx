import { useEffect, useState } from "react";
import supabase from "../../Lib/db";
import type { Company } from "../../Types";

export const HeaderReportComponent = () => {
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
    <div className="text-grey-900 mb-5">
      {companies.map((company) => (
        <div key={company.id}>
          <div className="max-w-screen-xl">
            <h2 className="text-2xl font-bold">
              {company.company_name}
            </h2>
            <p className="text-sm">
              {company.address}
            </p>
            <p className="text-sm">
              {company.city}, {company.province}
            </p>
          </div>
          <div className="max-w-screen-xl mt-3 flex">
            <p className="text-sm">
              Telp. 021.{company.telephone}
            </p>
            <p className="text-sm ml-3">
              Fax. {company.facsimile}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
