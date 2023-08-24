import { Create, useForm } from "@refinedev/mantine";
import { TextInput, Title } from "@mantine/core";
import { useTranslate } from "@refinedev/core";

export const SupplierCreatePage: React.FC = () => {
  const translation = useTranslate();

  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      namaSupplier: "",
      alamat: "",
      noTelp: "",
    },
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={<Title order={3}>{translation("supplier.titles.create")}</Title>}
    >
      <form>
        <TextInput
          mt={8}
          required
          label={translation("supplier.fields.name")}
          placeholder={translation("supplier.fields.name")}
          {...getInputProps("namaSupplier")}
        />
        <TextInput
          mt={8}
          required
          label={translation("supplier.fields.address")}
          placeholder={translation("supplier.fields.address")}
          {...getInputProps("alamat")}
        />
        <TextInput
          mt={8}
          required
          label={translation("supplier.fields.phone")}
          placeholder={translation("supplier.fields.phone")}
          {...getInputProps("noTelp")}
        />
      </form>
    </Create>
  );
};
