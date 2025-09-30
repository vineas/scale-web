interface Penimbangan {
    id: number;
    no_record: string;
    nama_operator: string;
    nama_sopir: string;
    no_kendaraan: string;
    no_do_po: number;
    berat_timbang_masuk: number;
    berat_timbang_keluar: number;
    waktu_timbang_masuk: string;
    waktu_timbang_keluar: string;
    id_barang: number;
    id_transporter: number;
    id_supplier_customer: number;
    barang: Barang | null;
    transporter: Transporter | null;
    supplier_customer: SupplierCustomer | null;
}

interface PenimbanganWithRelations extends Omit<Penimbangan, "id_barang" | "id_transporter" | "id_supplier_customer"> {
    barang: Pick<Barang, "id" | "nama_barang"> | null;
    transporter: Pick<Transporter, "id" | "nama_transporter"> | null;
    supplier_customer: Pick<SupplierCustomer, "id" | "nama_supplier_customer"> | null;
}

interface Barang {
    id: number;
    kode_barang: number;
    nama_barang: string;
}

interface Transporter {
    id: number;
    kode_transporter: number;
    nama_transporter: string;
}

interface SupplierCustomer {
    id: number;
    kode_supplier_customer: number;
    nama_supplier_customer: string;
    alamat: string;
    kota: string;
    telepon: number;
    facsimile: number;
    pic: string;
}

type WeightDisplayProps = {
    weight: number;
};

export type { Barang, Transporter, SupplierCustomer, WeightDisplayProps, Penimbangan, PenimbanganWithRelations };