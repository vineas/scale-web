import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import supabase from "../../Lib/db";
import type { PenimbanganWithRelations } from "../../Types";
import { HeaderReportComponent } from "../../Components/Header/HeaderReport";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

export const TicketTimbangan = () => {
  const { id } = useParams();
  const [data, setData] = useState<PenimbanganWithRelations | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("penimbangan")
        .select("*, barang(*), transporter(*), supplier_customer(*)")
        .eq("id", id)
        .single();
      if (!error) setData(data as PenimbanganWithRelations);
    };
    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;
  return (
    <>
      <div>
        <div ref={contentRef} className="py-4 px-8 print:p-8">
          <div>
            <HeaderReportComponent />
          </div>
          <div>
            <div className="border-b-2">
              <div className=" flex justify-center">
                <h1 className="text-2xl flex justify-end font-bold text-gray-900 ">Slip Timbangan</h1>
              </div>
              <p className="flex justify-end text-xs">No Record: {String(data.no_record).padStart(6, "0")}</p>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-4">
                <div>
                  <p>No Kendaraan</p>
                  <p>Nama Barang</p>
                  <p>Supplier/Customer</p>
                </div>
                <div>
                  <p>: {data?.no_kendaraan ?? "-"}</p>
                  <p>: {data?.barang?.nama_barang ?? "-"}</p>
                  <p>: {data?.supplier_customer?.nama_supplier_customer ?? "-"}</p>
                </div>
                <div>
                  <p>Transporter</p>
                  <p>Nomor SPK</p>
                </div>
                <div>
                  <p>: {data?.transporter?.nama_transporter ?? "-"}</p>
                  <p>: {data.no_do_po}</p>
                </div>
              </div>
              <div className="grid grid-cols-6 mt-8">
                <div></div>

                <div className="border-l border-t border-b pl-8">
                  <p className="text-white">.</p>
                  <p>Timbang I</p>
                  <p>Timbang II</p>
                  <p>Netto</p>
                </div>
                <div className="border-t border-b">
                  <p className="font-bold">Berat</p>
                  <p>{data?.berat_timbang_masuk ?? "-"}</p>
                  <p>{data?.berat_timbang_keluar ?? "-"}</p>
                  <p className="font-bold">{data.berat_timbang_keluar - data.berat_timbang_masuk}</p>
                </div>
                <div className="border-t border-b">
                  <p className="font-bold">Jam</p>
                  <p>{new Date(data?.waktu_timbang_masuk ?? "-").toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</p>
                  <p>{new Date(data?.waktu_timbang_keluar ?? "-").toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</p>
                </div>
                <div className="border-r border-t border-b">
                  <p className="font-bold">Tanggal</p>
                  <p>{new Date(data?.waktu_timbang_masuk ?? "-").toLocaleDateString("en-GB")}</p>
                  <p>{new Date(data?.waktu_timbang_keluar ?? "-").toLocaleDateString("en-GB")}</p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 text-center">
              <div>
                <p className="mb-15">Operator</p>
                <p>{data?.nama_operator ?? "-"}</p>
              </div>
              <div>
                <p className="mb-15">Sopir</p>
                <p>{data?.nama_sopir ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg" onClick={reactToPrintFn}>
            <FaPrint className="inline mr-2" />
            Print or Export PDF
          </button>
        </div>
      </div>
    </>
  );
};
