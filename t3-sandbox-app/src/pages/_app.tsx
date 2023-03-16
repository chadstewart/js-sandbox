import { type AppType } from "next/app";
import { useEffect } from "react";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    // @ts-ignore
    import('preline');
  }, [])

  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
