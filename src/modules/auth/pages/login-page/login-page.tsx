import { ThemedTitleV2 } from "@refinedev/mantine";
import {
  LoginFormTypes,
  useRouterType,
  useLink,
  useActiveAuthProvider,
  useLogin,
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
} from "./login-page.styles";

export const LoginPage = () => {
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
      password: "",
    },
  });
  const { onSubmit, getInputProps } = form;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const PageTitle = (
    <div style={pageTitleStyles}>
      <ThemedTitleV2
        collapsed={false}
        text="Frontend Test"
        icon={<AppIcon />}
      />
    </div>
  );

  const CardContent = (
    <Card style={cardStyles}>
      <Title
        style={titleStyles}
        color={theme.colorScheme === "dark" ? "brand.5" : "brand.8"}
      >
        {translate("pages.login.title", "Sign in to your account")}
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
          <PasswordInput
            name="password"
            mt="md"
            label={translate("pages.login.fields.password", "Password")}
            placeholder="●●●●●●●●"
            required
            {...getInputProps("password")}
          />
          <Button mt="md" fullWidth size="md" type="submit" loading={isLoading}>
            {translate("pages.login.signin", "Sign in")}
          </Button>
        </form>
      </FormProvider>

      <Text mt="md" size="xs" align="center">
        {translate("pages.login.buttons.noAccount", "Don’t have an account?")}{" "}
        <Anchor component={ActiveLink as any} to="/register" weight={700}>
          {translate("pages.login.signup", "Sign up")}
        </Anchor>
      </Text>
    </Card>
  );

  return (
    <Box style={layoutStyles}>
      {PageTitle}
      {CardContent}
    </Box>
  );
};

LoginPage.noLayout = true;
