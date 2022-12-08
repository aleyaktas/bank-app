import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LoginModal from "../components/modals/LoginModal/LoginModal";
import { Context } from "../pages/_app";

export default function Home() {
  const router = useRouter();
  const { modal, setModal } = useContext(Context);
  const modalClose = () => setModal("");

  return (
    <div>
      <LoginModal modal={modal} handleClose={modalClose} />
      <h1>Home</h1>
    </div>
  );
}
