import React, { useContext } from "react";
import styleFn from "./Navbar.styles";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { Context } from "../../pages/_app";
import { handleLogout } from "../../pages/api";
import Link from "next/link";

const Navbar = () => {
  const styles = styleFn();
  const router = useRouter();
  const { setModal, user, setUser } = useContext(Context);

  const login = () => {
    setModal("login");
  };
  const logout = () => {
    setUser("");
    handleLogout();
    router.push("/");
  };
  return (
    <>
      <AppBar sx={styles.appBar} position="static">
        <Grid container sx={{ width: "inherit" }}>
          <Toolbar sx={{ width: "inherit" }}>
            <Link href="/banks">
              <Button
                component="div"
                variant="text"
                color="inherit"
                sx={{ mr: 2, fontSize: "1.8rem", fontStyle: "italic" }}
              >
                BANKAPP
              </Button>
            </Link>
            {user ? (
              <>
                <Grid container justifyContent="start" alignItems="center">
                  <Link href="/calculate">
                    <Button
                      color="inherit"
                      sx={{ fontSize: "1.4rem" }}
                      onClick={() => router.push("/calculate")}
                    >
                      Hesaplama
                    </Button>
                  </Link>

                  <Link href="/banks">
                    <Button
                      color="inherit"
                      sx={{ fontSize: "1.4rem" }}
                      onClick={() => router.push("/banks")}
                    >
                      Banka Ekle
                    </Button>
                  </Link>
                </Grid>
                <Button
                  onClick={logout}
                  variant="contained"
                  sx={{
                    ml: "auto",
                    fontSize: "1.4rem",
                    backgroundColor: "#264653",
                    ":hover": {
                      backgroundColor: "#264653",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={login}
                sx={{
                  ml: "auto",
                  fontSize: "1.4rem",
                  backgroundColor: "#264653",
                  ":hover": {
                    backgroundColor: "#264653",
                  },
                }}
                variant="contained"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
