import React, { useContext, useState } from "react";
import styleFn from "./Navbar.styles";
import LoginModal from "../modals/LoginModal/LoginModal";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { Context } from "../../pages/_app";

const Navbar = () => {
  const styles = styleFn();
  const router = useRouter();
  const { setModal } = useContext(Context);

  const login = () => {
    setModal("login");
  };
  const logout = () => {
    console.log("logout");
    router.push("/");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={styles.appBar} position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: "2rem" }}
            >
              BankApp
            </Typography>

            <Button sx={{ fontSize: "1.6rem" }} onClick={login} color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
