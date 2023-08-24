import { useMemo } from "react";
import { useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { List, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Table, Group, Pagination, Title } from "@mantine/core";

import { Supplier } from "@/types";

export const SupplierListPage = () => {
  const translate = useTranslate();

  const columns = useMemo<ColumnDef<Supplier>[]>(
    () => [
      {
        id: "supplierName",
        header: translate("supplier.fields.name"),
        accessorKey: "namaSupplier",
      },
      {
        id: "supplierAddress",
        header: translate("supplier.fields.address"),
        accessorKey: "alamat",
      },
      {
        id: "supplierPhone",
        header: translate("supplier.fields.phone"),
        accessorKey: "noTelp",
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
    <List title={<Title order={3}>{translate("supplier.supplier")}</Title>}>
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
