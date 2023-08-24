import { useMemo } from "react";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { NumberInput, Select, TextInput, Title } from "@mantine/core";
import { useTranslate } from "@refinedev/core";

import { Supplier } from "@/types";

export const BarangCreatePage: React.FC = () => {
  const translation = useTranslate();

  const { selectProps, queryResult } = useSelect<Supplier>({
    resource: "supplier",
    optionLabel: "namaSupplier",
    optionValue: "id",
  });

  const supplierSelectData = useMemo(() => {
    if (queryResult.data?.data) {
      return queryResult.data?.data.map((item) => ({
        label: item.namaSupplier ?? item.id.toString(),
        value: item.id.toString(),
      }));
    }

    return [];
  }, [queryResult.data?.data]);

  const selectData = useMemo(() => {
    if (queryResult?.data?.data?.length! > 0) return queryResult?.data?.data;

    return [];
  }, [queryResult?.data?.data]);

  console.log(selectData);

  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      namaBarang: "",
      harga: 0,
      stok: 0,
      supplier: {
        id: "",
      },
    },
    transformValues: (values) => ({
      ...values,
      supplier: { ...selectData!.find((s) => +values.supplier.id === s.id) },
    }),
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={<Title order={3}>{translation("catalog.titles.create")}</Title>}
    >
      <form>
        <TextInput
          mt={8}
          required
          label={translation("catalog.fields.name")}
          placeholder={translation("catalog.fields.name")}
          {...getInputProps("namaBarang")}
        />
        <NumberInput
          mt={8}
          required
          label={translation("catalog.fields.price")}
          placeholder={translation("catalog.fields.price")}
          {...getInputProps("harga")}
        />
        <NumberInput
          mt={8}
          required
          label={translation("catalog.fields.stock")}
          placeholder={translation("catalog.fields.stock")}
          {...getInputProps("stok")}
        />
        <Select
          mt={8}
          required
          label={translation("supplier.supplier")}
          placeholder={translation("catalog.fields.selectSupplier")}
          {...getInputProps("supplier.id")}
          {...selectProps}
          data={supplierSelectData}
        />
      </form>
    </Create>
  );
};
