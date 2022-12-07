import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = "http://localhost";

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
