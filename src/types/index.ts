export type Supplier = {
  id: number;
  namaSupplier: string;
  noTelp: string;
  alamat: string;
};

export type Barang = {
  id: number;
  namaBarang: string;
  harga: number;
  stok: number;
  supplier: Supplier;
};
