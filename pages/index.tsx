import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LoginModal from "../components/modals/LoginModal/LoginModal";
import { Context } from "../pages/_app";

export default function Home() {
  const router = useRouter();
  const { modal, setModal } = useContext(Context);
  const modalClose = () => setModal("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/banks");
    }
  }, []);

  return (
    <div>
      <LoginModal modal={modal} handleClose={modalClose} />
      <div
        style={{
          width: "100%",
          height: "93vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="300" sx={{ color: "black" }} variant="h1">
          Welcome Bank App
        </Typography>
      </div>
    </div>
  );
}
