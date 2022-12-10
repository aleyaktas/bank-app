import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import axios, { AxiosRequestConfig } from "axios";
import Layout from "../components/Layout/Layout";
import React, { createContext, useEffect, useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import getConfig from "next/config";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig();

interface ContextProps {
  user: string;
  setUser: (user: string) => void;
  modal: string;
  setModal: (modal: string) => void;
  banks: any[];
  setBanks: (banks: any[]) => void;
}

export const Context = createContext<ContextProps>({
  user: "",
  setUser: () => {},
  modal: "",
  setModal: () => {},
  banks: [],
  setBanks: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState("");
  const [modal, setModal] = useState("");
  const [banks, setBanks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      setUser(token);
    } else {
      setUser("");
      router.push("/");
    }
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        modal,
        setModal,
        banks,
        setBanks,
      }}
    >
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}
