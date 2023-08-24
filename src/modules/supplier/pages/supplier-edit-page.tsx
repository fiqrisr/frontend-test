import { Edit, useForm } from "@refinedev/mantine";
import { TextInput, Title } from "@mantine/core";
import { useTranslate } from "@refinedev/core";

export const SupplierEditPage: React.FC = () => {
  const translation = useTranslate();

  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      namaSupplier: "",
      alamat: "",
      noTelp: "",
    },
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      title={<Title order={3}>{translation("supplier.titles.edit")}</Title>}
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
    </Edit>
  );
};
