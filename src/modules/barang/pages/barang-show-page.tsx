import { useShow, useTranslate } from "@refinedev/core";
import { Show } from "@refinedev/mantine";

import { Title, Text } from "@mantine/core";

import { Barang } from "@/types";

export const BarangShowPage: React.FC = () => {
  const translation = useTranslate();
  const { queryResult } = useShow<Barang>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="xs">{record?.id}</Text>

      <Title mt="xs" order={5}>
        {translation("catalog.fields.name")}
      </Title>
      <Text mt="xs">{record?.namaBarang}</Text>

      <Title mt="xs" order={5}>
        {translation("catalog.fields.stock")}
      </Title>
      <Text mt="xs">{record?.stok}</Text>

      <Title mt="xs" order={5}>
        {translation("catalog.fields.price")}
      </Title>
      <Text mt="xs">{record?.harga}</Text>

      <Title mt="xs" order={5}>
        {translation("supplier.fields.name")}
      </Title>
      <Text mt="xs">{record?.supplier?.namaSupplier}</Text>

      <Title mt="xs" order={5}>
        {translation("supplier.fields.address")}
      </Title>
      <Text mt="xs">{record?.supplier?.alamat}</Text>

      <Title mt="xs" order={5}>
        {translation("supplier.fields.phone")}
      </Title>
      <Text mt="xs">{record?.supplier?.noTelp}</Text>
    </Show>
  );
};
