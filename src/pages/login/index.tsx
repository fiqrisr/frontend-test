import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LoginPage } from "@/modules/auth";
import { authProvider } from "@/providers";

export default LoginPage;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: redirectTo ?? "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
