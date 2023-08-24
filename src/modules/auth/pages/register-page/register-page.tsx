import { ThemedTitleV2 } from "@refinedev/mantine";
import {
  RegisterFormTypes,
  useRouterType,
  useLink,
  useActiveAuthProvider,
  useRegister,
  useTranslate,
  useRouterContext,
} from "@refinedev/core";
import {
  Box,
  Card,
  PasswordInput,
  Space,
  TextInput,
  Title,
  Anchor,
  Button,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { AppIcon } from "@/components/app-icon";
import { FormContext } from "@/contexts/form-context";

import {
  layoutStyles,
  cardStyles,
  titleStyles,
  pageTitleStyles,
} from "../../styles/auth-layout.styles";

export const RegisterPage = () => {
  const theme = useMantineTheme();
  const { useForm, FormProvider } = FormContext;
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const form = useForm({
    initialValues: {
      username: "",
      profileName: "",
      password: "",
    },
  });
  const { onSubmit, getInputProps } = form;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useRegister<RegisterFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  return (
    <Box style={layoutStyles}>
      <div style={pageTitleStyles}>
        <ThemedTitleV2
          collapsed={false}
          text="Frontend Test"
          icon={<AppIcon />}
        />
      </div>

      <Card style={cardStyles}>
        <Title
          style={titleStyles}
          color={theme.colorScheme === "dark" ? "brand.5" : "brand.8"}
        >
          {translate("pages.register.title", "Sign up for your account")}
        </Title>
        <Space h="sm" />
        <Space h="lg" />
        <FormProvider form={form}>
          <form
            onSubmit={onSubmit((values: any) => {
              return login(values);
            })}
          >
            <TextInput
              name="username"
              label={translate("pages.login.fields.username", "Username")}
              placeholder={translate("pages.login.fields.username", "Username")}
              required
              {...getInputProps("username")}
            />
            <TextInput
              name="profileName"
              mt="md"
              label={translate(
                "pages.register.fields.profileName",
                "Profile Name"
              )}
              placeholder={translate(
                "pages.register.placeholder.profileName",
                "Your name"
              )}
              required
              {...getInputProps("profileName")}
            />
            <PasswordInput
              name="password"
              mt="md"
              label={translate("pages.login.fields.password", "Password")}
              placeholder="●●●●●●●●"
              required
              {...getInputProps("password")}
            />
            <Button
              mt="md"
              fullWidth
              size="md"
              type="submit"
              loading={isLoading}
            >
              {translate("pages.register.buttons.submit", "Register")}
            </Button>
          </form>
        </FormProvider>

        <Text mt="md" size="xs" align="center">
          {translate("pages.register.buttons.haveAccount", "Have an account?")}{" "}
          <Anchor component={ActiveLink as any} to="/login" weight={700}>
            {translate("pages.login.signin", "Sign in")}
          </Anchor>
        </Text>
      </Card>
    </Box>
  );
};

RegisterPage.noLayout = true;
