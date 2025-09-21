interface Penimbangan {
    id: number;
    no_record: string;
    nama_operator: string;
    nama_sopir: string;
    no_kendaraan: string;
    berat_timbang_masuk: number;
    berat_timbang_keluar: number;
    waktu_timbang_masuk: Date;
    waktu_timbang_keluar: Date;
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

export type { Barang, Transporter, SupplierCustomer, WeightDisplayProps, Penimbangan };