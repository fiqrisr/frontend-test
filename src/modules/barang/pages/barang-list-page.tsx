import { useMemo } from "react";
import { useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { List, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Table, Group, Pagination, Title } from "@mantine/core";

import { Barang } from "@/types";

export const BarangListPage = () => {
  const translate = useTranslate();

  const columns = useMemo<ColumnDef<Barang>[]>(
    () => [
      {
        id: "namaBarang",
        header: translate("catalog.fields.name"),
        accessorKey: "namaBarang",
      },
      {
        id: "stok",
        header: translate("catalog.fields.stock"),
        accessorKey: "stok",
      },
      {
        id: "harga",
        header: translate("catalog.fields.price"),
        accessorKey: "harga",
      },
      {
        id: "supplierName",
        header: translate("supplier.fields.name"),
        accessorKey: "supplier.namaSupplier",
      },
      {
        id: "supplierAddress",
        header: translate("supplier.fields.address"),
        accessorKey: "supplier.alamat",
      },
      {
        id: "supplierPhone",
        header: translate("supplier.fields.phone"),
        accessorKey: "supplier.noTelp",
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap position="center">
              <ShowButton hideText recordItemId={getValue() as number} />
              <EditButton hideText recordItemId={getValue() as number} />
              <DeleteButton hideText recordItemId={getValue() as number} />
            </Group>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({ columns });

  return (
    <List title={<Title order={3}>{translate("catalog.catalog")}</Title>}>
      <Table withBorder highlightOnHover withColumnBorders verticalSpacing="sm">
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        mt="lg"
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
