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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { publicRuntimeConfig } = getConfig();

interface ContextProps {
  user: string;
  setUser: (user: string) => void;
  modal: string;
  setModal: (modal: string) => void;
  banks: any[] | null;
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}
