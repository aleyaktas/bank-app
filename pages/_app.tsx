import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import React, { createContext, useEffect, useState } from "react";

interface User {
  token: string;
}

interface ContextProps {
  user: User;
  setUser: (user: User) => void;
  modal: string;
  setModal: (modal: string) => void;
}

export const Context = createContext<ContextProps>({
  user: { token: "" },
  setUser: () => {},
  modal: "",
  setModal: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = "http://localhost";
  const [user, setUser] = useState({});

  const [modal, setModal] = useState("");

  return (
    <Context.Provider
      value={{
        user: user as User,
        setUser,
        modal,
        setModal,
      }}
    >
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}
