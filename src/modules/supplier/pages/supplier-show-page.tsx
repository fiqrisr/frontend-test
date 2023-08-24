import { useShow, useTranslate } from "@refinedev/core";
import { Show } from "@refinedev/mantine";

import { Title, Text } from "@mantine/core";

import { Supplier } from "@/types";

export const SupplierShowPage: React.FC = () => {
  const translation = useTranslate();
  const { queryResult } = useShow<Supplier>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="xs">{record?.id}</Text>

      <Title mt="xs" order={5}>
        {translation("supplier.fields.name")}
      </Title>
      <Text mt="xs">{record?.namaSupplier}</Text>

      <Title mt="xs" order={5}>
        {translation("supplier.fields.address")}
      </Title>
      <Text mt="xs">{record?.alamat}</Text>

      <Title mt="xs" order={5}>
        {translation("supplier.fields.phone")}
      </Title>
      <Text mt="xs">{record?.noTelp}</Text>
    </Show>
  );
};
