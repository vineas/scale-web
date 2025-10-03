import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../Lib/db";
import type { PenimbanganWithRelations } from "../../Types";
import { HeaderReportComponent } from "../../Components/Header/HeaderReport";

export const TicketTimbangan = () => {
  const { id } = useParams();
  const [data, setData] = useState<PenimbanganWithRelations | null>(null);

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
    <HeaderReportComponent/>
      <h1>Ticket Timbangan</h1>
      <p>No Record: {data.no_record}</p>
      <p>Nama Barang: {data?.barang?.nama_barang ?? "-"}</p>
      <p>Transporter: {data?.transporter?.nama_transporter ?? "-"}</p>
      <p>Supplier: {data?.supplier_customer?.nama_supplier_customer ?? "-"}</p>
      <p>No Kendaraan: {data?.no_kendaraan ?? "-"}</p>
      <p>Berat Masuk: {data?.berat_timbang_masuk ?? 0} kg</p>
      <p>Berat Keluar: {data?.berat_timbang_keluar ?? 0} kg</p>
      <p>Sopir: {data?.nama_sopir ?? "-"}</p>
      <p>Operator: {data?.nama_operator ?? "-"}</p>
    </>
  );
};
